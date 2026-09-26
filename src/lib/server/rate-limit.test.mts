import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { collectEnvIssues, fatalEnvMessages, shouldEnforceProductionRateLimit } from "./env.ts";
import {
  LIMITS,
  MemoryRateLimitStore,
  POSTGRES_RATE_LIMIT_UPSERT,
  RATE_LIMIT_CLEANUP_BATCH,
  RATE_LIMIT_WINDOW_INDEX_SQL,
  buildRateLimitCleanupStatement,
  consumeFixedWindow,
  cronRequestAuthorized,
  isRateLimitRowExpired,
  maxRateLimitWindowMs,
  purgeExpiredRows,
  rateLimitHttpError,
  rateLimitStoreMode,
  runRateLimitCleanup,
  type RateLimitRow,
} from "./rate-limit-core.ts";

const pepper = "test-pepper";
const now = 1_700_000_000_000;

function row(policy: string, windowStart: number, extra = "abc"): RateLimitRow {
  return { bucket: `rl:${policy}:${extra}:-:${windowStart}`, windowStart: String(windowStart) };
}

describe("shared production configuration", () => {
  it("closes production when no shared store is configured", () => {
    assert.equal(
      rateLimitStoreMode({ nodeEnv: "production", databaseUrl: "", upstashUrl: "", upstashToken: "" }),
      "closed",
    );
    const issues = collectEnvIssues({ NODE_ENV: "production" } as NodeJS.ProcessEnv);
    const store = issues.find((issue) => issue.code === "RATE_LIMIT_STORE");
    assert.equal(store?.level, "error");
    assert.equal(shouldEnforceProductionRateLimit({ NODE_ENV: "production" } as NodeJS.ProcessEnv), true);
    assert.equal(
      fatalEnvMessages(issues, { NODE_ENV: "production" } as NodeJS.ProcessEnv).some((message) => message.includes("DATABASE_URL")),
      true,
    );
  });

  it("does not fail the production build step for a missing store", () => {
    const env = { NODE_ENV: "production", npm_lifecycle_event: "build" } as NodeJS.ProcessEnv;
    assert.equal(shouldEnforceProductionRateLimit(env), false);
    assert.deepEqual(fatalEnvMessages(collectEnvIssues(env), env), []);
    const phase = { NODE_ENV: "production", NEXT_PHASE: "phase-production-build" } as NodeJS.ProcessEnv;
    assert.equal(shouldEnforceProductionRateLimit(phase), false);
  });

  it("accepts Postgres or Upstash and keeps memory for local development", () => {
    assert.equal(rateLimitStoreMode({ nodeEnv: "production", databaseUrl: "postgres://db", upstashUrl: "", upstashToken: "" }), "postgres");
    assert.equal(
      rateLimitStoreMode({ nodeEnv: "production", databaseUrl: "", upstashUrl: "https://example.upstash.io", upstashToken: "token" }),
      "upstash",
    );
    assert.equal(rateLimitStoreMode({ nodeEnv: "development", databaseUrl: "", upstashUrl: "", upstashToken: "" }), "memory");
    assert.equal(
      collectEnvIssues({ NODE_ENV: "development" } as NodeJS.ProcessEnv).some((issue) => issue.code === "RATE_LIMIT_STORE"),
      false,
    );
  });
});

describe("consumeFixedWindow", () => {
  it("returns HTTP 429 once the fixed window is full", async () => {
    const memory = new MemoryRateLimitStore();
    const spec = { ...LIMITS.orderIp };
    const results = [];
    for (let i = 0; i < spec.limit + 1; i++) {
      results.push(
        await consumeFixedWindow({ spec, ip: "203.0.113.8", now, pepper, mode: "memory", memory }),
      );
    }
    assert.equal(results.filter((result) => result.ok).length, spec.limit);
    const blocked = results.at(-1);
    assert.equal(blocked?.ok, false);
    if (!blocked || blocked.ok) return;
    assert.equal(blocked.reason, "limited");
    const http = rateLimitHttpError(blocked);
    assert.deepEqual(http, { status: 429, error: "too_many_requests", retryAfterSec: blocked.retryAfterSec });
    assert.ok(blocked.retryAfterSec >= 1);
    assert.ok(blocked.retryAfterSec <= spec.windowMs / 1000);
  });

  it("counts concurrent requests without handing out extra slots", async () => {
    const memory = new MemoryRateLimitStore();
    const spec = { name: "ORDER_IP", limit: 5, windowMs: 60_000 };
    const results = await Promise.all(
      Array.from({ length: 20 }, () =>
        consumeFixedWindow({ spec, ip: "203.0.113.9", now, pepper, mode: "memory", memory }),
      ),
    );
    assert.equal(results.filter((result) => result.ok).length, 5);
    assert.equal(results.filter((result) => !result.ok && result.reason === "limited").length, 15);
  });

  it("fails closed when production has no shared store", async () => {
    const memory = new MemoryRateLimitStore();
    const decision = await consumeFixedWindow({
      spec: LIMITS.enquiryIp,
      ip: "203.0.113.10",
      now,
      pepper,
      mode: "closed",
      memory,
    });
    assert.deepEqual(rateLimitHttpError(decision), { status: 503, error: "service_unavailable" });
  });

  it("fails closed when the shared backend throws and does not use memory", async () => {
    const memory = new MemoryRateLimitStore();
    let memoryUsed = false;
    const original = memory.hit.bind(memory);
    memory.hit = async (...args) => {
      memoryUsed = true;
      return original(...args);
    };
    const decision = await consumeFixedWindow({
      spec: LIMITS.enquiryIp,
      ip: "203.0.113.11",
      now,
      pepper,
      mode: "postgres",
      memory,
      sharedHit: async () => {
        throw new Error("connection refused postgres://user:secret@host/db");
      },
    });
    assert.equal(decision.ok, false);
    if (!decision.ok) assert.equal(decision.reason, "unavailable");
    assert.equal(rateLimitHttpError(decision)?.status, 503);
    assert.equal(memoryUsed, false);
  });
});

describe("expired window cleanup", () => {
  it("deletes expired rows in batches and keeps active windows", () => {
    const hour = 60 * 60 * 1000;
    const ten = 10 * 60 * 1000;
    const activeLogin = Math.floor(now / ten) * ten;
    const activeAccount = Math.floor(now / hour) * hour;
    const rows: RateLimitRow[] = [
      row("LOGIN_IP", activeLogin, "active"),
      row("LOGIN_ACCOUNT", activeAccount, "active-hour"),
      row("LOGIN_IP", activeLogin - ten, "just-expired"),
      row("LOGIN_ACCOUNT", activeAccount - hour, "hour-expired"),
      row("LOGIN_IP", now - maxRateLimitWindowMs() - 1, "old"),
      { bucket: "rl:UNKNOWN:abc:-:1", windowStart: "not-a-time" },
    ];
    for (let i = 0; i < 600; i++) rows.push(row("ORDER_IP", now - maxRateLimitWindowMs() - 10_000 - i, `old-${i}`));

    assert.equal(isRateLimitRowExpired(rows[0], now), false);
    assert.equal(isRateLimitRowExpired(rows[1], now), false);
    assert.equal(isRateLimitRowExpired(rows[2], now), true);
    assert.equal(isRateLimitRowExpired(rows[3], now), true);

    const { kept, deleted, batches } = purgeExpiredRows(rows, now, 500, 20);
    assert.equal(kept.length, 2);
    assert.ok(kept.every((item) => item.bucket.includes(":active")));
    assert.equal(deleted, rows.length - 2);
    assert.ok(batches >= 2);
    assert.equal(RATE_LIMIT_CLEANUP_BATCH, 500);
  });

  it("builds a parameterized, indexed DELETE that matches the expiry predicate", () => {
    const statement = buildRateLimitCleanupStatement(now, 500);
    assert.match(statement.text, /DELETE FROM rate_limits/);
    assert.match(statement.text, /LIMIT \$/);
    assert.match(statement.text, /\(window_start\)::bigint/);
    assert.match(RATE_LIMIT_WINDOW_INDEX_SQL, /rate_limits_window_start_idx/);
    assert.match(RATE_LIMIT_WINDOW_INDEX_SQL, /\(window_start\)::bigint/);
    assert.equal(statement.text.includes(String(now)), false);
    assert.equal(statement.values[0], now);
    assert.equal(statement.values.at(-1), 500);
    for (const name of ["LOGIN_IP", "LOGIN_ACCOUNT", "ENQUIRY_IP", "ORDER_IP", "SUBSCRIBE_EMAIL"]) {
      assert.equal(statement.values.includes(name), true);
    }

    const active = row("ENQUIRY_IP", Math.floor(now / LIMITS.enquiryIp.windowMs) * LIMITS.enquiryIp.windowMs, "keep");
    assert.equal(isRateLimitRowExpired(active, now), false);
    const expired = row("ENQUIRY_IP", Math.floor(now / LIMITS.enquiryIp.windowMs) * LIMITS.enquiryIp.windowMs - LIMITS.enquiryIp.windowMs, "drop");
    assert.equal(isRateLimitRowExpired(expired, now), true);
  });

  it("increments the Postgres counter in one conflict update", () => {
    assert.match(POSTGRES_RATE_LIMIT_UPSERT, /ON CONFLICT \(bucket\) DO UPDATE/);
    assert.match(POSTGRES_RATE_LIMIT_UPSERT, /hits \+ 1/);
    assert.match(POSTGRES_RATE_LIMIT_UPSERT, /\$1/);
    assert.equal(POSTGRES_RATE_LIMIT_UPSERT.includes("203.0.113.8"), false);
  });
});

describe("cleanup endpoint", () => {
  const secret = "cron-secret-value-32chars-minimum";

  it("rejects missing or wrong credentials", async () => {
    const response = await runRateLimitCleanup(new Request("https://allayurvedics.in/api/cron/rate-limit-cleanup"), {
      secret,
      purge: async () => {
        throw new Error("should not run");
      },
    });
    assert.equal(response.status, 401);
    assert.deepEqual(await response.json(), { ok: false, error: "unauthorized" });
    assert.equal(cronRequestAuthorized("Bearer wrong-secret-value-but-long", secret), false);
    assert.equal(cronRequestAuthorized(`Bearer ${secret}`, "short"), false);
  });

  it("runs the purge only with the cron secret and hides backend errors", async () => {
    const ok = await runRateLimitCleanup(new Request("https://allayurvedics.in/api/cron/rate-limit-cleanup", {
      headers: { authorization: `Bearer ${secret}` },
    }), {
      secret,
      purge: async () => ({ deleted: 3, batches: 1 }),
    });
    assert.equal(ok.status, 200);
    assert.deepEqual(await ok.json(), { ok: true, deleted: 3, batches: 1 });

    const failed = await runRateLimitCleanup(new Request("https://allayurvedics.in/api/cron/rate-limit-cleanup", {
      headers: { authorization: `Bearer ${secret}` },
    }), {
      secret,
      purge: async () => {
        throw new Error("password=super-secret postgres://user:pw@host/db");
      },
    });
    assert.equal(failed.status, 500);
    const body = await failed.json();
    assert.deepEqual(body, { ok: false, error: "internal_server_error" });
    assert.equal(JSON.stringify(body).includes("super-secret"), false);
  });
});

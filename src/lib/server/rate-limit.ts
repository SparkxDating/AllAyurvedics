import "server-only";
import { neon } from "@neondatabase/serverless";
import { serverConfig } from "./config";
import { logEvent } from "./log";
import {
  MemoryRateLimitStore,
  POSTGRES_RATE_LIMIT_UPSERT,
  RATE_LIMIT_CLEANUP_BATCH,
  RATE_LIMIT_CLEANUP_MAX_BATCHES,
  RATE_LIMIT_TABLE_SQL,
  RATE_LIMIT_WINDOW_INDEX_SQL,
  buildRateLimitCleanupStatement,
  clientIp,
  consumeFixedWindow,
  fingerprint as hashFingerprint,
  rateLimitStoreMode,
  type ConsumeResult,
  type LimitSpec,
} from "./rate-limit-core";

/**
 * API rate limits. Production uses a shared store so limits hold across
 * Vercel/serverless instances:
 *
 *   1. Upstash Redis REST, if both UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set.
 *   2. Otherwise Postgres (`rate_limits`) when DATABASE_URL is set.
 *   3. Process memory only when neither store is configured AND NODE_ENV is not production.
 *
 * Production with no shared store does not use memory. `consumeLimit` fails closed
 * (HTTP 503). `validateServerEnv` also refuses to boot a production server in that case.
 * A configured store that errors fails closed for every policy. It does not fall open.
 *
 * Limits (fixed window):
 *
 * | Policy            | Limit | Window   | Key                          |
 * |-------------------|-------|----------|------------------------------|
 * | LOGIN_IP          | 30    | 10 min   | IP                           |
 * | LOGIN_IP_ACCOUNT  | 5     | 10 min   | IP + account                 |
 * | LOGIN_ACCOUNT     | 20    | 1 hour   | account (distributed guesses)|
 * | REGISTER_IP       | 5     | 1 hour   | IP                           |
 * | ENQUIRY_IP        | 10    | 1 hour   | IP                           |
 * | SUBSCRIBE_IP      | 10    | 1 hour   | IP                           |
 * | SUBSCRIBE_EMAIL   | 10    | 1 hour   | email                        |
 * | ORDER_IP          | 6     | 1 hour   | IP                           |
 * | LOGOUT_IP         | 30    | 1 hour   | IP                           |
 *
 * Buckets store hashes, not raw IPs or email addresses.
 * Expired Postgres rows are removed by /api/cron/rate-limit-cleanup, not on the request path.
 */

export {
  LIMITS,
  loginAccountLimits,
  subscribeEmailLimit,
  type ConsumeResult,
  type LimitSpec,
  rateLimitHttpError,
} from "./rate-limit-core";

const memory = new MemoryRateLimitStore();
let schemaReady: Promise<void> | null = null;

function pepper(): string {
  return serverConfig.authSecret || "allayurvedics-rl-v1";
}

/** Short hash for logs. Uses the server pepper. Not reversible to the raw email or IP. */
export function fingerprint(value: string): string {
  return hashFingerprint(value, pepper());
}

async function upstashHit(key: string, windowMs: number, limit: number): Promise<ConsumeResult> {
  const response = await fetch(`${serverConfig.upstashRedisUrl}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${serverConfig.upstashRedisToken}`, "Content-Type": "application/json" },
    body: JSON.stringify([
      ["INCR", key],
      ["PEXPIRE", key, windowMs, "NX"],
    ]),
  });
  if (!response.ok) throw new Error(`Upstash ${response.status}`);
  const body = (await response.json()) as { result?: number | string }[];
  const hits = Number(body?.[0]?.result);
  if (!Number.isFinite(hits)) throw new Error("Upstash malformed");
  if (hits > limit) return { ok: false, reason: "limited", retryAfterSec: Math.ceil(windowMs / 1000) };
  return { ok: true };
}

async function ensureRateTable() {
  const sql = neon(serverConfig.databaseUrl);
  if (!schemaReady) {
    schemaReady = sql
      .query(RATE_LIMIT_TABLE_SQL)
      .then(() => sql.query(RATE_LIMIT_WINDOW_INDEX_SQL))
      .then(() => undefined)
      .catch((err: unknown) => {
        schemaReady = null;
        throw err;
      });
  }
  await schemaReady;
  return sql;
}

async function postgresHit(key: string, windowStart: number, limit: number): Promise<ConsumeResult> {
  const sql = await ensureRateTable();
  const rows = (await sql.query(POSTGRES_RATE_LIMIT_UPSERT, [key, String(windowStart)])) as { hits: number | string }[];
  const hits = Number(rows[0]?.hits ?? 0);
  if (hits > limit) return { ok: false, reason: "limited", retryAfterSec: 1 };
  return { ok: true };
}

function currentMode() {
  return rateLimitStoreMode({
    nodeEnv: process.env.NODE_ENV,
    databaseUrl: serverConfig.databaseUrl,
    upstashUrl: serverConfig.upstashRedisUrl,
    upstashToken: serverConfig.upstashRedisToken,
  });
}

export async function consumeLimit(request: Request, spec: LimitSpec, route: string): Promise<ConsumeResult> {
  const mode = currentMode();
  const now = Date.now();
  const sharedHit =
    mode === "upstash"
      ? (key: string, _windowStart: number, windowMs: number, limit: number) => upstashHit(key, windowMs, limit)
      : mode === "postgres"
        ? (key: string, windowStart: number, _windowMs: number, limit: number) => postgresHit(key, windowStart, limit)
        : undefined;

  return consumeFixedWindow({
    spec,
    ip: clientIp(request),
    now,
    pepper: pepper(),
    mode,
    memory,
    sharedHit,
    onError: () => {
      logEvent(
        { requestId: "rate-limit", route, event: "DATABASE_ERROR", errorType: "RATE_LIMIT_BACKEND", detail: spec.name },
      );
    },
  });
}

export type RateLimitCleanupResult = { deleted: number; batches: number; skipped?: "no_database" };

/** Delete expired rate_limits rows in bounded batches. Does nothing when Postgres is not configured. */
export async function purgeExpiredRateLimits(now = Date.now()): Promise<RateLimitCleanupResult> {
  if (!serverConfig.databaseUrl) return { deleted: 0, batches: 0, skipped: "no_database" };
  const sql = await ensureRateTable();
  let deleted = 0;
  let batches = 0;
  for (let i = 0; i < RATE_LIMIT_CLEANUP_MAX_BATCHES; i++) {
    const statement = buildRateLimitCleanupStatement(now, RATE_LIMIT_CLEANUP_BATCH);
    const rows = await sql.query(statement.text, statement.values);
    const count = Array.isArray(rows) ? rows.length : 0;
    batches += 1;
    deleted += count;
    if (count < RATE_LIMIT_CLEANUP_BATCH) break;
  }
  return { deleted, batches };
}

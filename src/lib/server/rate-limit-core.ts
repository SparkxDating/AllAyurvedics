import { createHash, timingSafeEqual } from "node:crypto";

/**
 * Pure rate-limit policy, in-memory counter, and Postgres cleanup statement.
 * No database client and no server-only import, so tests can load this file.
 *
 * Windows are fixed. The longest current window is one hour. A row is expired
 * when its own policy window has ended. Unknown policy names use that longest
 * window so a cleanup never treats an unfamiliar active bucket as expired.
 */

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

export type LimitSpec = {
  name: string;
  limit: number;
  windowMs: number;
  /** Extra key material such as a normalised email. Hashed before it is stored. */
  identity?: string;
};

export const LIMITS = {
  loginIp: { name: "LOGIN_IP", limit: 30, windowMs: 10 * MINUTE },
  registerIp: { name: "REGISTER_IP", limit: 5, windowMs: HOUR },
  enquiryIp: { name: "ENQUIRY_IP", limit: 10, windowMs: HOUR },
  subscribeIp: { name: "SUBSCRIBE_IP", limit: 10, windowMs: HOUR },
  orderIp: { name: "ORDER_IP", limit: 6, windowMs: HOUR },
  logoutIp: { name: "LOGOUT_IP", limit: 30, windowMs: HOUR },
} as const satisfies Record<string, Omit<LimitSpec, "identity">>;

export function loginAccountLimits(email: string): LimitSpec[] {
  const identity = email.trim().toLowerCase();
  return [
    { name: "LOGIN_IP_ACCOUNT", limit: 5, windowMs: 10 * MINUTE, identity },
    { name: "LOGIN_ACCOUNT", limit: 20, windowMs: HOUR, identity },
  ];
}

export function subscribeEmailLimit(email: string): LimitSpec {
  return { name: "SUBSCRIBE_EMAIL", limit: 10, windowMs: HOUR, identity: email.trim().toLowerCase() };
}

export type ConsumeResult =
  | { ok: true; degraded?: boolean }
  | { ok: false; reason: "limited"; retryAfterSec: number }
  | { ok: false; reason: "unavailable" };

export type RateLimitStoreMode = "upstash" | "postgres" | "memory" | "closed";

export function knownRateLimitWindows(): Map<string, number> {
  const windows = new Map<string, number>();
  for (const spec of Object.values(LIMITS)) windows.set(spec.name, spec.windowMs);
  for (const spec of loginAccountLimits("policy")) windows.set(spec.name, spec.windowMs);
  const email = subscribeEmailLimit("policy");
  windows.set(email.name, email.windowMs);
  return windows;
}

export function maxRateLimitWindowMs(): number {
  let max = 0;
  for (const windowMs of knownRateLimitWindows().values()) max = Math.max(max, windowMs);
  return max;
}

export function shortestRateLimitWindowMs(): number {
  let min = maxRateLimitWindowMs();
  for (const windowMs of knownRateLimitWindows().values()) min = Math.min(min, windowMs);
  return min;
}

export function fingerprint(value: string, pepper: string): string {
  return createHash("sha256").update(`${pepper}:${value}`).digest("hex").slice(0, 16);
}

export function clientIp(request: Request): string {
  const raw =
    request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "";
  const ip = raw.split(",")[0]?.trim() || "unknown";
  return ip.slice(0, 80);
}

export function bucketKey(spec: LimitSpec, ip: string, now: number, pepper: string): { key: string; windowStart: number } {
  const windowStart = Math.floor(now / spec.windowMs) * spec.windowMs;
  const key = ["rl", spec.name, fingerprint(ip, pepper), spec.identity ? fingerprint(spec.identity, pepper) : "-", String(windowStart)].join(":");
  return { key, windowStart };
}

export function rateLimitStoreMode(input: {
  nodeEnv: string | undefined;
  databaseUrl: string;
  upstashUrl: string;
  upstashToken: string;
}): RateLimitStoreMode {
  if (input.upstashUrl && input.upstashToken) return "upstash";
  if (input.databaseUrl) return "postgres";
  if (input.nodeEnv === "production") return "closed";
  return "memory";
}

/** In-process counter for local development. Calls are queued so overlapping requests cannot share one slot. */
export class MemoryRateLimitStore {
  private buckets = new Map<string, { windowStart: number; hits: number }>();
  private tail: Promise<void> = Promise.resolve();

  hit(key: string, windowStart: number, limit: number): Promise<ConsumeResult> {
    const run = this.tail.then(() => {
      const current = this.buckets.get(key);
      const hits = current && current.windowStart === windowStart ? current.hits + 1 : 1;
      this.buckets.set(key, { windowStart, hits });
      if (this.buckets.size > 5000) {
        for (const [stored, value] of this.buckets) {
          if (value.windowStart < windowStart) this.buckets.delete(stored);
        }
      }
      if (hits > limit) return { ok: false as const, reason: "limited" as const, retryAfterSec: 0 };
      return { ok: true as const };
    });
    this.tail = run.then(
      () => undefined,
      () => undefined,
    );
    return run;
  }
}

export async function consumeFixedWindow(input: {
  spec: LimitSpec;
  ip: string;
  now: number;
  pepper: string;
  mode: RateLimitStoreMode;
  memory: MemoryRateLimitStore;
  sharedHit?: (key: string, windowStart: number, windowMs: number, limit: number) => Promise<ConsumeResult>;
  onError?: (err: unknown) => void;
}): Promise<ConsumeResult> {
  const { key, windowStart } = bucketKey(input.spec, input.ip, input.now, input.pepper);
  const retryAfterSec = Math.max(1, Math.ceil((windowStart + input.spec.windowMs - input.now) / 1000));

  if (input.mode === "closed") return { ok: false, reason: "unavailable" };

  try {
    if (input.mode === "memory") {
      const result = await input.memory.hit(key, windowStart, input.spec.limit);
      if (!result.ok) return { ok: false, reason: "limited", retryAfterSec };
      return { ok: true, degraded: true };
    }
    if (!input.sharedHit) return { ok: false, reason: "unavailable" };
    const result = await input.sharedHit(key, windowStart, input.spec.windowMs, input.spec.limit);
    if (!result.ok && result.reason === "limited") return { ok: false, reason: "limited", retryAfterSec };
    return result;
  } catch (err) {
    input.onError?.(err);
    return { ok: false, reason: "unavailable" };
  }
}

export function rateLimitHttpError(
  decision: ConsumeResult,
): { status: 429 | 503; error: "too_many_requests" | "service_unavailable"; retryAfterSec?: number } | null {
  if (decision.ok) return null;
  if (decision.reason === "limited") {
    return { status: 429, error: "too_many_requests", retryAfterSec: decision.retryAfterSec };
  }
  return { status: 503, error: "service_unavailable" };
}

export type RateLimitRow = { bucket: string; windowStart: string };

/** True when the row's own window has ended. Malformed timestamps are not active windows. */
export function isRateLimitRowExpired(row: RateLimitRow, now: number): boolean {
  if (!/^[0-9]+$/.test(row.windowStart)) return true;
  const start = Number(row.windowStart);
  if (!Number.isSafeInteger(start)) return true;
  const policy = row.bucket.split(":")[1] ?? "";
  const windowMs = knownRateLimitWindows().get(policy) ?? maxRateLimitWindowMs();
  return start + windowMs <= now;
}

export const RATE_LIMIT_CLEANUP_BATCH = 500;
export const RATE_LIMIT_CLEANUP_MAX_BATCHES = 20;

export const RATE_LIMIT_TABLE_SQL = `CREATE TABLE IF NOT EXISTS rate_limits (
  bucket TEXT PRIMARY KEY,
  window_start TEXT NOT NULL,
  hits INTEGER NOT NULL
)`;

/** Expression index used by the cleanup DELETE. Additive; existing rows are not rewritten. */
export const RATE_LIMIT_WINDOW_INDEX_SQL =
  "CREATE INDEX IF NOT EXISTS rate_limits_window_start_idx ON rate_limits (((window_start)::bigint))";

export const POSTGRES_RATE_LIMIT_UPSERT = `INSERT INTO rate_limits (bucket, window_start, hits)
  VALUES ($1, $2, 1)
  ON CONFLICT (bucket) DO UPDATE SET
    hits = CASE WHEN rate_limits.window_start = $2 THEN rate_limits.hits + 1 ELSE 1 END,
    window_start = $2
  RETURNING hits`;

export type SqlStatement = { text: string; values: Array<string | number> };

/**
 * Batched DELETE of rows whose policy window has ended.
 * Policy names and window lengths are bound parameters. The bigint predicate
 * matches rate_limits_window_start_idx. Active windows are not selected:
 * a row is eligible only when start + that policy's window <= now.
 */
export function buildRateLimitCleanupStatement(now: number, batchSize: number): SqlStatement {
  const windows = [...knownRateLimitWindows().entries()].sort((a, b) => a[0].localeCompare(b[0]));
  const values: Array<string | number> = [now];
  const clauses: string[] = [];
  const namePositions: number[] = [];
  for (const [name, windowMs] of windows) {
    values.push(name);
    const namePos = values.length;
    namePositions.push(namePos);
    values.push(windowMs);
    const windowPos = values.length;
    clauses.push(`(split_part(bucket, ':', 2) = $${namePos} AND (window_start)::bigint + $${windowPos} <= $1)`);
  }
  values.push(maxRateLimitWindowMs());
  const maxPos = values.length;
  values.push(batchSize);
  const batchPos = values.length;
  const knownNames = namePositions.map((pos) => `$${pos}`).join(", ");
  const text = `DELETE FROM rate_limits
WHERE bucket IN (
  SELECT bucket
  FROM rate_limits
  WHERE window_start !~ '^[0-9]+$'
     OR (
       window_start ~ '^[0-9]+$'
       AND (
         ${clauses.join("\n         OR ")}
         OR (
           split_part(bucket, ':', 2) <> ALL (ARRAY[${knownNames}]::text[])
           AND (window_start)::bigint + $${maxPos} <= $1
         )
       )
     )
  ORDER BY CASE WHEN window_start ~ '^[0-9]+$' THEN (window_start)::bigint ELSE 0 END
  LIMIT $${batchPos}
)
RETURNING bucket`;
  return { text, values };
}

export function purgeExpiredRows<T extends RateLimitRow>(rows: T[], now: number, batchSize: number, maxBatches: number): { kept: T[]; deleted: number; batches: number } {
  const kept = rows.slice();
  let deleted = 0;
  let batches = 0;
  for (let i = 0; i < maxBatches; i++) {
    const doomed: T[] = [];
    const rest: T[] = [];
    for (const row of kept) {
      if (doomed.length < batchSize && isRateLimitRowExpired(row, now)) doomed.push(row);
      else rest.push(row);
    }
    batches += 1;
    deleted += doomed.length;
    kept.length = 0;
    kept.push(...rest);
    if (doomed.length < batchSize) break;
  }
  return { kept, deleted, batches };
}

const MIN_CRON_SECRET_LENGTH = 16;

/** Compare Authorization to Bearer CRON_SECRET without leaking the secret through a length check. */
export function cronRequestAuthorized(authorization: string | null, secret: string | undefined): boolean {
  if (!secret || secret.length < MIN_CRON_SECRET_LENGTH) return false;
  const actual = createHash("sha256").update(authorization ?? "").digest();
  const expected = createHash("sha256").update(`Bearer ${secret}`).digest();
  return timingSafeEqual(actual, expected);
}

export async function runRateLimitCleanup(
  request: Request,
  deps: {
    secret: string | undefined;
    purge: (now: number) => Promise<{ deleted: number; batches: number; skipped?: "no_database" }>;
    now?: number;
  },
): Promise<Response> {
  if (!cronRequestAuthorized(request.headers.get("authorization"), deps.secret)) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }
  try {
    const result = await deps.purge(deps.now ?? Date.now());
    return Response.json(
      { ok: true, deleted: result.deleted, batches: result.batches, ...(result.skipped ? { skipped: result.skipped } : {}) },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json({ ok: false, error: "internal_server_error" }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}

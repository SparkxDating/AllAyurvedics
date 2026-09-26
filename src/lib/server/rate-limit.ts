import "server-only";
import { createHash } from "node:crypto";
import { neon } from "@neondatabase/serverless";
import { serverConfig } from "./config";
import { logEvent } from "./log";

/**
 * API rate limits. Production uses a shared store so limits hold across
 * Vercel/serverless instances:
 *
 *   1. Upstash Redis REST, if UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set (optional).
 *   2. Otherwise Postgres (`rate_limits` table) when DATABASE_URL is set. Preferred, because the app already uses Neon.
 *   3. Process memory ONLY when neither store is configured. That is not safe for multi-instance production.
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
 * Auth policies fail closed when the shared store errors. Public forms fail open
 * and log RATE_LIMIT_BACKEND so a database blip does not drop enquiries.
 */

export type LimitSpec = {
  name: string;
  limit: number;
  windowMs: number;
  /** Extra key material such as a normalised email. Hashed before it is stored. */
  identity?: string;
  /** When true, a store outage is treated as "try again" instead of allowing the request. */
  failClosed?: boolean;
};

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

export const LIMITS = {
  loginIp: { name: "LOGIN_IP", limit: 30, windowMs: 10 * MINUTE, failClosed: true },
  registerIp: { name: "REGISTER_IP", limit: 5, windowMs: HOUR, failClosed: true },
  enquiryIp: { name: "ENQUIRY_IP", limit: 10, windowMs: HOUR },
  subscribeIp: { name: "SUBSCRIBE_IP", limit: 10, windowMs: HOUR },
  orderIp: { name: "ORDER_IP", limit: 6, windowMs: HOUR },
  logoutIp: { name: "LOGOUT_IP", limit: 30, windowMs: HOUR },
} as const satisfies Record<string, Omit<LimitSpec, "identity">>;

export function loginAccountLimits(email: string): LimitSpec[] {
  const identity = email.trim().toLowerCase();
  return [
    { name: "LOGIN_IP_ACCOUNT", limit: 5, windowMs: 10 * MINUTE, identity, failClosed: true },
    { name: "LOGIN_ACCOUNT", limit: 20, windowMs: HOUR, identity, failClosed: true },
  ];
}

export function subscribeEmailLimit(email: string): LimitSpec {
  return { name: "SUBSCRIBE_EMAIL", limit: 10, windowMs: HOUR, identity: email.trim().toLowerCase() };
}

export type ConsumeResult =
  | { ok: true; degraded?: boolean }
  | { ok: false; reason: "limited"; retryAfterSec: number }
  | { ok: false; reason: "unavailable" };

type MemoryBucket = { windowStart: number; hits: number };

/** Dev / degraded fallback. Not shared across server instances. */
const memoryBuckets = new Map<string, MemoryBucket>();
let degradedLogged = false;
let schemaReady: Promise<void> | null = null;

function pepper(): string {
  return serverConfig.authSecret || "allayurvedics-rl-v1";
}

export function fingerprint(value: string): string {
  return createHash("sha256").update(`${pepper()}:${value}`).digest("hex").slice(0, 16);
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

function bucketKey(spec: LimitSpec, ip: string, now: number): { key: string; windowStart: number } {
  const windowStart = Math.floor(now / spec.windowMs) * spec.windowMs;
  const key = ["rl", spec.name, fingerprint(ip), spec.identity ? fingerprint(spec.identity) : "-", String(windowStart)].join(":");
  return { key, windowStart };
}

function upstashConfigured(): boolean {
  return Boolean(serverConfig.upstashRedisUrl && serverConfig.upstashRedisToken);
}

function memoryHit(key: string, windowStart: number, limit: number): ConsumeResult {
  const current = memoryBuckets.get(key);
  const hits = current && current.windowStart === windowStart ? current.hits + 1 : 1;
  memoryBuckets.set(key, { windowStart, hits });
  if (memoryBuckets.size > 5000) {
    for (const [stored, value] of memoryBuckets) {
      if (value.windowStart < windowStart) memoryBuckets.delete(stored);
    }
  }
  if (hits > limit) return { ok: false, reason: "limited", retryAfterSec: Math.ceil(windowStart / 1000) };
  return { ok: true };
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
    schemaReady = sql`CREATE TABLE IF NOT EXISTS rate_limits (
      bucket TEXT PRIMARY KEY,
      window_start TEXT NOT NULL,
      hits INTEGER NOT NULL
    )`
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
  const windowKey = String(windowStart);
  const rows = (await sql`INSERT INTO rate_limits (bucket, window_start, hits)
      VALUES (${key}, ${windowKey}, 1)
      ON CONFLICT (bucket) DO UPDATE SET
        hits = CASE WHEN rate_limits.window_start = ${windowKey} THEN rate_limits.hits + 1 ELSE 1 END,
        window_start = ${windowKey}
      RETURNING hits`) as { hits: number | string }[];
  const hits = Number(rows[0]?.hits ?? 0);
  if (hits > limit) return { ok: false, reason: "limited", retryAfterSec: 1 };
  return { ok: true };
}

function noteDegraded(route: string) {
  if (degradedLogged) return;
  degradedLogged = true;
  logEvent({
    requestId: "startup",
    route,
    event: "VALIDATION_ERROR",
    errorType: "RATE_LIMIT_DEGRADED",
    detail: "Using in-process memory. Set DATABASE_URL or Upstash for a shared limiter.",
  });
}

export async function consumeLimit(request: Request, spec: LimitSpec, route: string): Promise<ConsumeResult> {
  const now = Date.now();
  const { key, windowStart } = bucketKey(spec, clientIp(request), now);
  const retryAfterSec = Math.max(1, Math.ceil((windowStart + spec.windowMs - now) / 1000));

  try {
    if (upstashConfigured()) {
      const result = await upstashHit(key, spec.windowMs, spec.limit);
      if (!result.ok && result.reason === "limited") return { ...result, retryAfterSec };
      return result;
    }
    if (serverConfig.databaseUrl) {
      const result = await postgresHit(key, windowStart, spec.limit);
      if (!result.ok && result.reason === "limited") return { ok: false, reason: "limited", retryAfterSec };
      return result;
    }
  } catch (err) {
    logEvent(
      { requestId: "rate-limit", route, event: "DATABASE_ERROR", errorType: "RATE_LIMIT_BACKEND", detail: spec.name },
      err,
    );
    if (spec.failClosed) return { ok: false, reason: "unavailable" };
  }

  if (!upstashConfigured() && !serverConfig.databaseUrl && process.env.NODE_ENV === "production") {
    noteDegraded(route);
  }
  const memory = memoryHit(key, windowStart, spec.limit);
  if (!memory.ok) return { ok: false, reason: "limited", retryAfterSec };
  return { ok: true, degraded: !upstashConfigured() && !serverConfig.databaseUrl };
}

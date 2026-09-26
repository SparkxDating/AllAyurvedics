import "server-only";
import { logEvent, type LogEvent } from "./log";
import { consumeLimit, type ConsumeResult, type LimitSpec } from "./rate-limit";
import { json } from "./respond";

/**
 * CSRF
 * ----
 * Mutation routes are same-origin `fetch` calls from this site. They do not use
 * a separate CSRF token framework:
 *
 * 1. The session cookie is HttpOnly + SameSite=Lax, so a cross-site form POST
 *    does not include it (logout and any future authenticated mutation).
 * 2. Browsers send `Origin` on POST. When it is present it must match the
 *    request Host (the page that rendered the form). `Sec-Fetch-Site: cross-site`
 *    is rejected when Origin is missing.
 * 3. Non-browser clients that omit both headers are allowed. They cannot ride
 *    a victim's cookie across sites because of (1).
 *
 * CORS is not enabled. Unlisted HTTP methods are rejected by Next.js with 405.
 */

export type ApiCtx = { requestId: string; route: string };

const REQUEST_ID_PATTERN = /^[A-Za-z0-9._:-]{8,80}$/;

export function requestIdFrom(request: Request): string {
  const incoming = request.headers.get("x-request-id");
  if (incoming && REQUEST_ID_PATTERN.test(incoming)) return incoming;
  return crypto.randomUUID();
}

function originAllowed(request: Request): boolean {
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      return Boolean(host) && new URL(origin).host === host;
    } catch {
      return false;
    }
  }
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site") return false;
  return true;
}

export function apiError(status: number, error: string, requestId: string, extraHeaders?: Record<string, string>) {
  return json({ ok: false, error }, status, requestId, extraHeaders);
}

export async function enforceLimits(request: Request, ctx: ApiCtx, limits: LimitSpec[]): Promise<Response | null> {
  for (const limit of limits) {
    const decision: ConsumeResult = await consumeLimit(request, limit, ctx.route);
    if (!decision.ok && decision.reason === "limited") {
      logEvent({ requestId: ctx.requestId, route: ctx.route, event: "RATE_LIMITED", errorType: limit.name });
      return apiError(429, "too_many_requests", ctx.requestId, { "Retry-After": String(decision.retryAfterSec) });
    }
    if (!decision.ok && decision.reason === "unavailable") {
      logEvent({
        requestId: ctx.requestId,
        route: ctx.route,
        event: "RATE_LIMITED",
        errorType: "RATE_LIMIT_BACKEND",
        detail: limit.name,
      });
      return apiError(503, "service_unavailable", ctx.requestId);
    }
  }
  return null;
}

export async function beginApi(request: Request, route: string, limits: LimitSpec[] = []): Promise<ApiCtx | Response> {
  const requestId = requestIdFrom(request);
  if (!originAllowed(request)) {
    logEvent({ requestId, route, event: "VALIDATION_ERROR", errorType: "cross_origin" });
    return apiError(403, "forbidden", requestId);
  }
  const ctx = { requestId, route };
  const limited = await enforceLimits(request, ctx, limits);
  if (limited) return limited;
  return ctx;
}

export function isApiResponse(value: ApiCtx | Response): value is Response {
  return value instanceof Response;
}

export function logFailure(ctx: ApiCtx, event: LogEvent, err: unknown, errorType?: string) {
  logEvent({ requestId: ctx.requestId, route: ctx.route, event, errorType }, err);
}

export function internalError(ctx: ApiCtx, err: unknown) {
  const message = err instanceof Error ? err.message : "";
  const database = /postgres|neon|constraint|sql/i.test(message);
  logFailure(ctx, database ? "DATABASE_ERROR" : "INTERNAL_ERROR", err, database ? "DATABASE_ERROR" : "INTERNAL_ERROR");
  return apiError(500, "internal_server_error", ctx.requestId);
}

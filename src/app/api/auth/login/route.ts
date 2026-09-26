import { fieldErrors, looksLikeSpam, loginSchema } from "@/lib/validation";
import { accountsEnabled } from "@/lib/server/config";
import { getStore } from "@/lib/server/store";
import { createSessionToken, sessionCookieOptions, SESSION_COOKIE, verifyPasswordOrDummy } from "@/lib/server/auth";
import { json, readBody } from "@/lib/server/respond";
import { apiError, beginApi, enforceLimits, internalError, isApiResponse } from "@/lib/server/api";
import { logEvent } from "@/lib/server/log";
import { fingerprint, LIMITS, loginAccountLimits } from "@/lib/server/rate-limit";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const route = "/api/auth/login";
  const opened = await beginApi(request, route, [LIMITS.loginIp]);
  if (isApiResponse(opened)) return opened;

  if (!accountsEnabled()) return json({ ok: true, status: "coming_soon" }, 200, opened.requestId);

  const body = await readBody(request);
  if (!body) {
    logEvent({ requestId: opened.requestId, route, event: "VALIDATION_ERROR", errorType: "bad_request" });
    return apiError(400, "bad_request", opened.requestId);
  }
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    logEvent({ requestId: opened.requestId, route, event: "VALIDATION_ERROR", errorType: "login" });
    return json({ ok: false, errors: fieldErrors(parsed.error) }, 400, opened.requestId);
  }

  const limited = await enforceLimits(request, opened, loginAccountLimits(parsed.data.email));
  if (limited) return limited;
  if (looksLikeSpam(parsed.data)) {
    logEvent({ requestId: opened.requestId, route, event: "AUTH_LOGIN_FAILED", errorType: "spam" });
    return apiError(401, "invalid_credentials", opened.requestId);
  }

  try {
    const user = await getStore().findUserByEmail(parsed.data.email);
    const valid = await verifyPasswordOrDummy(parsed.data.password, user?.password_hash);
    if (!user || !valid) {
      logEvent({
        requestId: opened.requestId,
        route,
        event: "AUTH_LOGIN_FAILED",
        errorType: "invalid_credentials",
        detail: `account=${fingerprint(parsed.data.email)}`,
      });
      return apiError(401, "invalid_credentials", opened.requestId);
    }

    const { token, maxAge } = createSessionToken(user);
    const store = await cookies();
    store.set(SESSION_COOKIE, token, sessionCookieOptions(maxAge));
    logEvent({ requestId: opened.requestId, route, event: "AUTH_LOGIN_SUCCESS", detail: `uid=${user.id}` });
    return json({ ok: true, status: "ok" }, 200, opened.requestId);
  } catch (err) {
    return internalError(opened, err);
  }
}

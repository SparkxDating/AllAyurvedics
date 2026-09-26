import { fieldErrors, looksLikeSpam, registerSchema } from "@/lib/validation";
import { accountsEnabled } from "@/lib/server/config";
import { getStore } from "@/lib/server/store";
import { getMailer } from "@/lib/server/email";
import { hashPassword } from "@/lib/server/auth";
import { json, readBody } from "@/lib/server/respond";
import { apiError, beginApi, internalError, isApiResponse } from "@/lib/server/api";
import { logEvent } from "@/lib/server/log";
import { LIMITS } from "@/lib/server/rate-limit";

export async function POST(request: Request) {
  const route = "/api/auth/register";
  const opened = await beginApi(request, route, [LIMITS.registerIp]);
  if (isApiResponse(opened)) return opened;

  const body = await readBody(request);
  if (!body) {
    logEvent({ requestId: opened.requestId, route, event: "VALIDATION_ERROR", errorType: "bad_request" });
    return apiError(400, "bad_request", opened.requestId);
  }

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    logEvent({ requestId: opened.requestId, route, event: "VALIDATION_ERROR", errorType: "register" });
    return json({ ok: false, errors: fieldErrors(parsed.error) }, 400, opened.requestId);
  }
  const data = parsed.data;
  if (looksLikeSpam(data)) return json({ ok: true, status: "coming_soon" }, 200, opened.requestId);

  const store = getStore();

  // Accounts not switched on yet: record interest (waitlist) and say "coming soon".
  if (!accountsEnabled()) {
    const record = { email: data.email, name: data.name, source: "accounts-waitlist", locale: data.locale };
    try {
      await Promise.all([store.saveSubscriber(record), getMailer().addToList(record)]);
      logEvent({ requestId: opened.requestId, route, event: "AUTH_REGISTER", detail: "waitlist" });
    } catch (err) {
      logEvent({ requestId: opened.requestId, route, event: "DATABASE_ERROR", errorType: "WAITLIST" }, err);
    }
    return json({ ok: true, status: "coming_soon" }, 200, opened.requestId);
  }

  if (!data.password) return json({ ok: false, errors: { password: "tooShort" } }, 400, opened.requestId);

  try {
    // Hash even when the email already exists so the response time does not reveal that.
    const passwordHash = await hashPassword(data.password);
    const existing = await store.findUserByEmail(data.email);
    if (existing) {
      // Same response as a new account. Do not change the existing password.
      logEvent({ requestId: opened.requestId, route, event: "AUTH_REGISTER", detail: "duplicate" });
      return json({ ok: true, status: "created" }, 200, opened.requestId);
    }
    await store.createUser({
      name: data.name,
      email: data.email,
      passwordHash,
      locale: data.locale,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (/duplicate|unique/i.test(message)) {
      logEvent({ requestId: opened.requestId, route, event: "AUTH_REGISTER", detail: "duplicate" });
      return json({ ok: true, status: "created" }, 200, opened.requestId);
    }
    return internalError(opened, err);
  }
  logEvent({ requestId: opened.requestId, route, event: "AUTH_REGISTER", detail: "created" });
  return json({ ok: true, status: "created" }, 200, opened.requestId);
}

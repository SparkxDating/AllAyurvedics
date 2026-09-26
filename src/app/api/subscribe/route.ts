import { fieldErrors, looksLikeSpam, subscribeSchema } from "@/lib/validation";
import { getStore } from "@/lib/server/store";
import { getMailer } from "@/lib/server/email";
import { json, readBody } from "@/lib/server/respond";
import { apiError, beginApi, enforceLimits, internalError, isApiResponse } from "@/lib/server/api";
import { logEvent } from "@/lib/server/log";
import { LIMITS, subscribeEmailLimit } from "@/lib/server/rate-limit";

export async function POST(request: Request) {
  const route = "/api/subscribe";
  const opened = await beginApi(request, route, [LIMITS.subscribeIp]);
  if (isApiResponse(opened)) return opened;

  const body = await readBody(request);
  if (!body) {
    logEvent({ requestId: opened.requestId, route, event: "VALIDATION_ERROR", errorType: "bad_request" });
    return apiError(400, "bad_request", opened.requestId);
  }

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    logEvent({ requestId: opened.requestId, route, event: "VALIDATION_ERROR", errorType: "subscribe" });
    return json({ ok: false, errors: fieldErrors(parsed.error) }, 400, opened.requestId);
  }

  const data = parsed.data;
  const limited = await enforceLimits(request, opened, [subscribeEmailLimit(data.email)]);
  if (limited) return limited;
  if (looksLikeSpam(data)) return json({ ok: true, status: "sent" }, 200, opened.requestId);

  const record = { email: data.email, name: data.name || undefined, source: data.source, locale: data.locale };
  const store = getStore();
  const mailer = getMailer();
  try {
    await Promise.all([store.saveSubscriber(record), mailer.addToList(record)]);
    await mailer.sendWelcome(record).catch((err) => {
      logEvent({ requestId: opened.requestId, route, event: "INTERNAL_ERROR", errorType: "WELCOME_EMAIL" }, err);
    });
  } catch (err) {
    return internalError(opened, err);
  }

  logEvent({ requestId: opened.requestId, route, event: "SUBSCRIBER_CREATED", detail: `source=${data.source}` });
  const delivered = store.configured || mailer.marketing;
  return json({ ok: true, status: delivered ? "sent" : "pending" }, 200, opened.requestId);
}

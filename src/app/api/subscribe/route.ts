import { fieldErrors, looksLikeSpam, subscribeSchema } from "@/lib/validation";
import { getStore } from "@/lib/server/store";
import { getMailer } from "@/lib/server/email";
import { json, readBody } from "@/lib/server/respond";

export async function POST(request: Request) {
  const body = await readBody(request);
  if (!body) return json({ ok: false, error: "bad_request" }, 400);

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) return json({ ok: false, errors: fieldErrors(parsed.error) }, 422);

  const data = parsed.data;
  if (looksLikeSpam(data)) return json({ ok: true, status: "sent" });

  const record = { email: data.email, name: data.name || undefined, source: data.source, locale: data.locale };
  const store = getStore();
  const mailer = getMailer();
  try {
    await Promise.all([store.saveSubscriber(record), mailer.addToList(record)]);
    // Welcome mail is best-effort.
    await mailer.sendWelcome(record).catch((e) => console.error("[subscribe] welcome failed", e));
  } catch (err) {
    console.error("[subscribe] failed", err);
    return json({ ok: false, error: "server_error" }, 500);
  }

  const delivered = store.configured || mailer.marketing;
  return json({ ok: true, status: delivered ? "sent" : "pending" });
}

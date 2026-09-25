import { enquirySchema, fieldErrors, looksLikeSpam } from "@/lib/validation";
import { getStore } from "@/lib/server/store";
import { getMailer } from "@/lib/server/email";
import { json, readBody } from "@/lib/server/respond";

export async function POST(request: Request) {
  const body = await readBody(request);
  if (!body) return json({ ok: false, error: "bad_request" }, 400);

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) return json({ ok: false, errors: fieldErrors(parsed.error) }, 422);

  const data = parsed.data;
  // Silently accept spam so bots don't learn anything.
  if (looksLikeSpam(data)) return json({ ok: true, status: "sent" });

  const record = {
    name: data.name,
    email: data.email,
    phone: data.phone || undefined,
    subject: data.subject,
    message: data.message,
    product: data.product || undefined,
    locale: data.locale,
  };

  const store = getStore();
  const mailer = getMailer();
  try {
    await Promise.all([store.saveEnquiry(record), mailer.notifyEnquiry(record)]);
  } catch (err) {
    console.error("[enquiry] failed", err);
    return json({ ok: false, error: "server_error" }, 500);
  }

  const delivered = store.configured || mailer.transactional;
  return json({ ok: true, status: delivered ? "sent" : "pending" });
}

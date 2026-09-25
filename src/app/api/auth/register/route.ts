import { fieldErrors, looksLikeSpam, registerSchema } from "@/lib/validation";
import { accountsEnabled } from "@/lib/server/config";
import { getStore } from "@/lib/server/store";
import { getMailer } from "@/lib/server/email";
import { hashPassword } from "@/lib/server/auth";
import { json, readBody } from "@/lib/server/respond";

export async function POST(request: Request) {
  const body = await readBody(request);
  if (!body) return json({ ok: false, error: "bad_request" }, 400);

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) return json({ ok: false, errors: fieldErrors(parsed.error) }, 422);
  const data = parsed.data;
  if (looksLikeSpam(data)) return json({ ok: true, status: "coming_soon" });

  const store = getStore();

  // Accounts not switched on yet: record interest (waitlist) and say "coming soon".
  if (!accountsEnabled()) {
    const record = { email: data.email, name: data.name, source: "accounts-waitlist", locale: data.locale };
    try {
      await Promise.all([store.saveSubscriber(record), getMailer().addToList(record)]);
    } catch (err) {
      console.error("[register:waitlist] failed", err);
    }
    return json({ ok: true, status: "coming_soon" });
  }

  if (!data.password) return json({ ok: false, errors: { password: "tooShort" } }, 422);

  try {
    const existing = await store.findUserByEmail(data.email);
    if (existing) return json({ ok: false, error: "email_taken" }, 409);
    await store.createUser({
      name: data.name,
      email: data.email,
      passwordHash: await hashPassword(data.password),
      locale: data.locale,
    });
  } catch (err) {
    console.error("[register] failed", err);
    return json({ ok: false, error: "server_error" }, 500);
  }
  return json({ ok: true, status: "created" });
}

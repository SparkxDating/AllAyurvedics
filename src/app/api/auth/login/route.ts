import { fieldErrors, looksLikeSpam, loginSchema } from "@/lib/validation";
import { accountsEnabled } from "@/lib/server/config";
import { getStore } from "@/lib/server/store";
import { createSessionToken, SESSION_COOKIE, verifyPassword } from "@/lib/server/auth";
import { json, readBody } from "@/lib/server/respond";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  if (!accountsEnabled()) return json({ ok: true, status: "coming_soon" });

  const body = await readBody(request);
  if (!body) return json({ ok: false, error: "bad_request" }, 400);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return json({ ok: false, errors: fieldErrors(parsed.error) }, 422);
  if (looksLikeSpam(parsed.data)) return json({ ok: false, error: "invalid_credentials" }, 401);

  try {
    const user = await getStore().findUserByEmail(parsed.data.email);
    const valid = user ? await verifyPassword(parsed.data.password, user.password_hash) : false;
    if (!user || !valid) return json({ ok: false, error: "invalid_credentials" }, 401);

    const { token, maxAge } = createSessionToken(user);
    const store = await cookies();
    store.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    });
    return json({ ok: true, status: "ok" });
  } catch (err) {
    console.error("[login] failed", err);
    return json({ ok: false, error: "server_error" }, 500);
  }
}

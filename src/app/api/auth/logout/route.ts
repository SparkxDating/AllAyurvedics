import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/server/auth";
import { json } from "@/lib/server/respond";

export async function POST() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  return json({ ok: true, status: "ok" });
}

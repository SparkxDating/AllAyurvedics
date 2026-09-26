import { cookies } from "next/headers";
import { sessionCookieOptions, SESSION_COOKIE } from "@/lib/server/auth";
import { json } from "@/lib/server/respond";
import { beginApi, isApiResponse } from "@/lib/server/api";
import { logEvent } from "@/lib/server/log";
import { LIMITS } from "@/lib/server/rate-limit";

export async function POST(request: Request) {
  const route = "/api/auth/logout";
  const opened = await beginApi(request, route, [LIMITS.logoutIp]);
  if (isApiResponse(opened)) return opened;

  const store = await cookies();
  store.set(SESSION_COOKIE, "", sessionCookieOptions(0));
  logEvent({ requestId: opened.requestId, route, event: "AUTH_LOGOUT" });
  return json({ ok: true, status: "ok" }, 200, opened.requestId);
}

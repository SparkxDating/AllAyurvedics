import { serverConfig } from "@/lib/server/config";
import { logEvent } from "@/lib/server/log";
import { runRateLimitCleanup } from "@/lib/server/rate-limit-core";
import { purgeExpiredRateLimits } from "@/lib/server/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Vercel Cron calls this with GET and `Authorization: Bearer $CRON_SECRET`.
 * Schedule: 03:17 UTC daily (`vercel.json`). See SETUP.md.
 * Upstash keys expire on their own; this only deletes old Postgres rows.
 */
export async function GET(request: Request) {
  return runRateLimitCleanup(request, {
    secret: serverConfig.cronSecret,
    purge: async (now) => {
      try {
        return await purgeExpiredRateLimits(now);
      } catch (err) {
        logEvent(
          { requestId: "rate-limit-cleanup", route: "/api/cron/rate-limit-cleanup", event: "DATABASE_ERROR", errorType: "RATE_LIMIT_CLEANUP" },
          err,
        );
        throw err;
      }
    },
  });
}

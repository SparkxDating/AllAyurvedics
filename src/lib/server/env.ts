/**
 * Server environment checks. Imported from instrumentation and other server modules.
 * Do not import this from client components — it must never run in the browser.
 *
 * Missing optional integrations (database, email, accounts) are warnings, not crashes.
 * The site is designed to keep serving content when those are unset.
 */

const PUBLIC_SECRET = /^NEXT_PUBLIC_.*(SECRET|PASSWORD|DATABASE|API_KEY|PRIVATE_KEY|SERVICE_ROLE|TOKEN)/i;

export type EnvIssue = { level: "error" | "warn"; code: string; message: string };

export function collectEnvIssues(env: NodeJS.ProcessEnv = process.env): EnvIssue[] {
  const issues: EnvIssue[] = [];

  for (const key of Object.keys(env)) {
    if (PUBLIC_SECRET.test(key) && env[key]) {
      issues.push({
        level: "error",
        code: "PUBLIC_SECRET",
        message: `${key} would be sent to the browser. Remove the NEXT_PUBLIC_ prefix.`,
      });
    }
  }

  const databaseUrl = env.DATABASE_URL?.trim() ?? "";
  if (databaseUrl && !/^postgres(?:ql)?:\/\//i.test(databaseUrl)) {
    issues.push({
      level: "error",
      code: "DATABASE_URL",
      message: "DATABASE_URL must be a postgres connection string.",
    });
  }

  const authSecret = env.AUTH_SECRET?.trim() ?? "";
  const accountsOn = env.ACCOUNTS_ENABLED === "true";
  if (accountsOn && authSecret.length < 32) {
    issues.push({
      level: "error",
      code: "AUTH_SECRET",
      message: "ACCOUNTS_ENABLED=true requires AUTH_SECRET of at least 32 characters. Accounts stay disabled.",
    });
  }
  if (accountsOn && !databaseUrl) {
    issues.push({
      level: "error",
      code: "ACCOUNTS_DATABASE",
      message: "ACCOUNTS_ENABLED=true requires DATABASE_URL. Accounts stay disabled.",
    });
  }

  const upstashUrl = env.UPSTASH_REDIS_REST_URL?.trim() ?? "";
  const upstashToken = env.UPSTASH_REDIS_REST_TOKEN?.trim() ?? "";
  if ((upstashUrl && !upstashToken) || (!upstashUrl && upstashToken)) {
    issues.push({
      level: "warn",
      code: "UPSTASH",
      message: "Set both UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN, or neither.",
    });
  }

  if (env.NODE_ENV === "production" && !databaseUrl && !(upstashUrl && upstashToken)) {
    issues.push({
      level: "error",
      code: "RATE_LIMIT_STORE",
      message:
        "Production requires DATABASE_URL or both UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN. In-memory rate limits are not used in production.",
    });
  }

  if (env.NODE_ENV === "production" && !(env.CRON_SECRET?.trim())) {
    issues.push({
      level: "warn",
      code: "CRON_SECRET",
      message: "CRON_SECRET is unset. GET /api/cron/rate-limit-cleanup will reject every request until it is set.",
    });
  }

  return issues;
}

let validated = false;

/**
 * Production servers must have a shared limiter. Skip that refusal while
 * `next build` is running so a build machine without secrets can still compile.
 * The runtime process (Vercel functions / `next start`) still refuses to boot.
 */
export function shouldEnforceProductionRateLimit(env: NodeJS.ProcessEnv = process.env): boolean {
  if (env.NODE_ENV !== "production") return false;
  if (env.NEXT_PHASE === "phase-production-build") return false;
  if (env.npm_lifecycle_event === "build") return false;
  return true;
}

/** Messages that must stop the server. Malformed values, leaked secrets, or a production process with no shared limiter. */
export function fatalEnvMessages(issues: EnvIssue[], env: NodeJS.ProcessEnv = process.env): string[] {
  const messages: string[] = [];
  for (const issue of issues) {
    if (issue.level !== "error") continue;
    if (issue.code === "PUBLIC_SECRET" || issue.code === "DATABASE_URL") messages.push(issue.message);
    if (issue.code === "RATE_LIMIT_STORE" && shouldEnforceProductionRateLimit(env)) messages.push(issue.message);
  }
  return messages;
}

/** Log configuration problems once per server process. */
export function validateServerEnv(): void {
  if (validated) return;
  validated = true;
  const issues = collectEnvIssues();
  for (const issue of issues) {
    const line = JSON.stringify({
      timestamp: new Date().toISOString(),
      route: "startup",
      event: issue.level === "error" ? "INTERNAL_ERROR" : "VALIDATION_ERROR",
      errorType: issue.code,
      message: issue.message,
    });
    if (issue.level === "error") console.error(line);
    else console.warn(line);
  }
  const fatal = fatalEnvMessages(issues);
  if (fatal.length) {
    throw new Error(fatal.join(" "));
  }
}

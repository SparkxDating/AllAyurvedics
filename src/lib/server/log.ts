import "server-only";

/**
 * Structured server logs for API events.
 * Never include passwords, tokens, cookies, authorization headers, payment secrets,
 * or full personal data (email, phone, address, message body).
 */
export type LogEvent =
  | "AUTH_LOGIN_FAILED"
  | "AUTH_LOGIN_SUCCESS"
  | "AUTH_REGISTER"
  | "AUTH_LOGOUT"
  | "ENQUIRY_CREATED"
  | "SUBSCRIBER_CREATED"
  | "ORDER_SUBMISSION"
  | "RATE_LIMITED"
  | "DATABASE_ERROR"
  | "VALIDATION_ERROR"
  | "INTERNAL_ERROR";

export type LogFields = {
  requestId: string;
  route: string;
  event: LogEvent;
  errorType?: string;
  /** Non-sensitive detail such as a policy name or outcome. Never an email or token. */
  detail?: string;
};

const SECRET_PATTERNS = [
  /postgres(?:ql)?:\/\/\S+/gi,
  /bearer\s+\S+/gi,
  /\b(api[_-]?key|secret|password|token|authorization)\b[^,\s]*/gi,
  /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,
];

export function redact(value: string): string {
  let out = value;
  for (const pattern of SECRET_PATTERNS) out = out.replace(pattern, "[redacted]");
  return out.slice(0, 240);
}

export function logEvent(fields: LogFields, err?: unknown): void {
  const entry: Record<string, string> = {
    timestamp: new Date().toISOString(),
    requestId: fields.requestId,
    route: fields.route,
    event: fields.event,
  };
  if (fields.errorType) entry.errorType = fields.errorType;
  if (fields.detail) entry.detail = redact(fields.detail);
  if (err instanceof Error) {
    entry.errorType = fields.errorType ?? err.name;
    entry.message = redact(err.message);
    if (process.env.NODE_ENV !== "production" && err.stack) entry.stack = redact(err.stack);
  } else if (err !== undefined) {
    entry.errorType = fields.errorType ?? "Error";
  }
  const line = JSON.stringify(entry);
  if (fields.event.endsWith("ERROR") || fields.event === "AUTH_LOGIN_FAILED" || fields.event === "RATE_LIMITED") {
    console.error(line);
  } else {
    console.info(line);
  }
}

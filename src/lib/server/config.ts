import "server-only";

/**
 * Feature flags derived from environment variables.
 * Everything degrades gracefully when a variable is missing.
 */
export const serverConfig = {
  databaseUrl: process.env.DATABASE_URL || "",
  resendApiKey: process.env.RESEND_API_KEY || "",
  resendSegmentId: process.env.RESEND_SEGMENT_ID || "",
  brevoApiKey: process.env.BREVO_API_KEY || "",
  brevoListId: process.env.BREVO_LIST_ID ? Number(process.env.BREVO_LIST_ID) : undefined,
  emailFrom: process.env.EMAIL_FROM || "",
  enquiryToEmail: process.env.ENQUIRY_TO_EMAIL || "",
  authSecret: process.env.AUTH_SECRET || "",
  accountsFlag: process.env.ACCOUNTS_ENABLED === "true",
};

export const hasDatabase = () => Boolean(serverConfig.databaseUrl);
export const hasTransactionalEmail = () =>
  Boolean((serverConfig.resendApiKey || serverConfig.brevoApiKey) && serverConfig.emailFrom);
export const hasMarketingList = () =>
  Boolean(serverConfig.brevoApiKey && serverConfig.brevoListId) ||
  Boolean(serverConfig.resendApiKey);

/** Customer accounts need a database, a signing secret (32+ chars) and an explicit opt-in flag. */
export const accountsEnabled = () =>
  serverConfig.accountsFlag && hasDatabase() && serverConfig.authSecret.length >= 32;

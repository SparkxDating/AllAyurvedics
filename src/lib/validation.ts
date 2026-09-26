import { z } from "zod";
import { MAX_ORDER_QTY, normaliseIndianMobile, ORDER_REF_PATTERN, PINCODE_PATTERN, UTR_PATTERN } from "@/lib/upi";

const locale = z.enum(["en", "hi"]).default("en");
/** Milliseconds timestamp when the form was rendered (basic bot timing check). */
const startedAt = z.coerce.number().optional();

/** Drop ASCII control characters except tab/newline/carriage return. */
function stripControls(value: string, multiline: boolean): string {
  const cleaned = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  return multiline ? cleaned.trim() : cleaned.replace(/\s+/g, " ").trim();
}

function text(max: number) {
  return z.string().transform((value) => stripControls(value, false)).pipe(z.string().min(1).max(max));
}

function multiline(min: number, max: number) {
  return z
    .string()
    .transform((value) => stripControls(value, true))
    .pipe(z.string().min(min).max(max));
}

const email = z
  .email("invalidEmail")
  .max(200)
  .transform((value) => value.trim().toLowerCase());

const optionalPhone = z
  .string()
  .trim()
  .max(20)
  .optional()
  .or(z.literal(""))
  .transform((value) => (value ?? "").trim())
  .refine((value) => value === "" || (/^[+()\-\s\d]+$/.test(value) && value.replace(/\D/g, "").length >= 8 && value.replace(/\D/g, "").length <= 15), "invalidPhone");

const slug = z
  .string()
  .trim()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "required")
  .max(80);

export const enquirySubjects = ["general", "remedy", "product", "consultation", "partnership"] as const;

export const enquirySchema = z.object({
  name: text(100).pipe(z.string().min(2, "tooShort")),
  email,
  phone: optionalPhone,
  subject: z.enum(enquirySubjects).default("general"),
  message: multiline(10, 3000),
  product: z.string().trim().max(120).optional().or(z.literal("")),
  locale,
  website: z.string().max(200).optional(),
  startedAt,
});
export type EnquiryInput = z.infer<typeof enquirySchema>;

/**
 * UPI order from /[locale]/checkout/[slug].
 * Price, MRP, discount, product name and payment status are NOT accepted.
 * The route looks up the catalogue product and computes the amount.
 */
export const orderSchema = z.object({
  type: z.literal("order"),
  orderRef: z.string().trim().regex(ORDER_REF_PATTERN, "required"),
  product: slug,
  name: text(100).pipe(z.string().min(2, "tooShort")),
  phone: z
    .string()
    .trim()
    .max(20)
    .transform((value, ctx) => {
      const normalised = normaliseIndianMobile(value);
      if (!normalised) {
        ctx.addIssue({ code: "custom", message: "invalidPhone" });
        return z.NEVER;
      }
      return normalised;
    }),
  email: email.optional().or(z.literal("")),
  address: multiline(10, 500),
  city: text(80).pipe(z.string().min(2, "tooShort")),
  state: text(80).pipe(z.string().min(2, "tooShort")),
  pincode: z.string().trim().regex(PINCODE_PATTERN, "invalidPincode"),
  quantity: z.coerce.number().int("invalidQty").min(1, "invalidQty").max(MAX_ORDER_QTY, "invalidQty"),
  utr: z
    .string()
    .max(32)
    .transform((value) => value.replace(/\s/g, ""))
    .pipe(z.string().regex(UTR_PATTERN, "invalidUtr")),
  /** Campaign source from utm_* params, e.g. "source=instagram, campaign=reel_12" */
  source: z
    .string()
    .max(160)
    .optional()
    .or(z.literal(""))
    .transform((value) => stripControls(value ?? "", false).slice(0, 160)),
  locale,
  website: z.string().max(200).optional(),
  startedAt,
});
export type OrderInput = z.infer<typeof orderSchema>;

export const subscribeSchema = z.object({
  email,
  name: z
    .string()
    .max(100)
    .optional()
    .or(z.literal(""))
    .transform((value) => stripControls(value ?? "", false).slice(0, 100)),
  source: z
    .string()
    .max(60)
    .optional()
    .or(z.literal(""))
    .transform((value) => stripControls(value || "website", false).slice(0, 60) || "website"),
  locale,
  website: z.string().max(200).optional(),
  startedAt,
});
export type SubscribeInput = z.infer<typeof subscribeSchema>;

export const registerSchema = z.object({
  name: text(100).pipe(z.string().min(2, "tooShort")),
  email,
  password: z.string().min(8, "tooShort").max(200).optional(),
  locale,
  website: z.string().max(200).optional(),
  startedAt,
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "required").max(200),
  website: z.string().max(200).optional(),
  startedAt,
});

const SPAM_MIN_MS = 1500;
const SPAM_MAX_AGE_MS = 24 * 60 * 60 * 1000;

/** Honeypot and timing are a secondary layer. Rate limiting is the primary control. */
export function looksLikeSpam(data: { website?: string; startedAt?: number }): boolean {
  if (typeof data.website === "string" && data.website.trim() !== "") return true;
  if (typeof data.startedAt === "number" && Number.isFinite(data.startedAt)) {
    const delta = Date.now() - data.startedAt;
    if (delta >= 0 && delta < SPAM_MIN_MS) return true;
    if (delta < -60_000) return true;
    if (delta > SPAM_MAX_AGE_MS) return true;
  }
  return false;
}

/** Flatten zod issues to { field: messageKey } */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message && !issue.message.includes(" ") ? issue.message : "required";
  }
  return out;
}

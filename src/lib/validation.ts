import { z } from "zod";
import { MAX_ORDER_QTY, normaliseIndianMobile, ORDER_REF_PATTERN, PINCODE_PATTERN, UTR_PATTERN } from "@/lib/upi";

const locale = z.enum(["en", "hi"]).default("en");
/** Milliseconds timestamp when the form was rendered (basic bot timing check). */
const startedAt = z.coerce.number().optional();

export const enquirySubjects = ["general", "remedy", "product", "consultation", "partnership"] as const;

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "tooShort").max(100),
  email: z.email("invalidEmail").max(200),
  phone: z
    .string()
    .trim()
    .max(20)
    .regex(/^[+()\-\s\d]*$/, "invalidPhone")
    .optional()
    .or(z.literal("")),
  subject: z.enum(enquirySubjects).default("general"),
  message: z.string().trim().min(10, "tooShort").max(3000),
  product: z.string().trim().max(120).optional().or(z.literal("")),
  locale,
  website: z.string().optional(),
  startedAt,
});
export type EnquiryInput = z.infer<typeof enquirySchema>;

/** UPI order submitted from /[locale]/checkout/[slug] (sent to the same /api/enquiry endpoint with type "order") */
export const orderSchema = z.object({
  type: z.literal("order"),
  orderRef: z.string().trim().regex(ORDER_REF_PATTERN, "required"),
  product: z.string().trim().min(1, "required").max(120),
  name: z.string().trim().min(2, "tooShort").max(100),
  phone: z
    .string()
    .trim()
    .max(20)
    .transform((v, ctx) => {
      const n = normaliseIndianMobile(v);
      if (!n) {
        ctx.addIssue({ code: "custom", message: "invalidPhone" });
        return z.NEVER;
      }
      return n;
    }),
  email: z.email("invalidEmail").max(200).optional().or(z.literal("")),
  address: z.string().trim().min(10, "tooShort").max(500),
  city: z.string().trim().min(2, "tooShort").max(80),
  state: z.string().trim().min(2, "tooShort").max(80),
  pincode: z.string().trim().regex(PINCODE_PATTERN, "invalidPincode"),
  quantity: z.coerce.number().int("invalidQty").min(1, "invalidQty").max(MAX_ORDER_QTY, "invalidQty"),
  utr: z
    .string()
    .transform((v) => v.replace(/\s/g, ""))
    .pipe(z.string().regex(UTR_PATTERN, "invalidUtr")),
  locale,
  website: z.string().optional(),
  startedAt,
});
export type OrderInput = z.infer<typeof orderSchema>;

export const subscribeSchema = z.object({
  email: z.email("invalidEmail").max(200),
  name: z.string().trim().max(100).optional().or(z.literal("")),
  source: z.string().trim().max(60).default("website"),
  locale,
  website: z.string().optional(),
  startedAt,
});
export type SubscribeInput = z.infer<typeof subscribeSchema>;

export const registerSchema = z.object({
  name: z.string().trim().min(2, "tooShort").max(100),
  email: z.email("invalidEmail").max(200),
  password: z.string().min(8, "tooShort").max(200).optional(),
  locale,
  website: z.string().optional(),
  startedAt,
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email("invalidEmail").max(200),
  password: z.string().min(1, "required").max(200),
  website: z.string().optional(),
  startedAt,
});

/** Returns true when the submission looks automated (honeypot filled or submitted implausibly fast). */
export function looksLikeSpam(data: { website?: string; startedAt?: number }): boolean {
  if (data.website && data.website.trim() !== "") return true;
  if (data.startedAt && Date.now() - data.startedAt < 1500) return true;
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

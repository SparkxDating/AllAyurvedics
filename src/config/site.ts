/**
 * Site-level shop settings.
 *
 * UPI "Buy now" checkout: the payee VPA is public by design (it is shown to the customer).
 * There is no private UPI credential in this app. Prefer environment variables so the value
 * can change without a code edit. A product can still override both with `upiId` / `upiPayeeName`.
 *
 * Resolution order: product override → NEXT_PUBLIC_UPI_* → the defaults below.
 *
 * `whatsappNumber` powers the "Send order on WhatsApp" hand-off after checkout, the product-page
 * WhatsApp button, the checkout help line, the footer/contact links and the floating button.
 *
 * While the UPI ID is empty (and a product has no `paymentLink`), product pages show
 * "Online payment coming soon" and the checkout page returns 404.
 */
export const siteConfig = {
  upiId: "manojkts29-2@oksbi",
  upiPayeeName: "MKS AnalytIQ",
  /** Optional WhatsApp number for customer help, digits only with country code, e.g. "919876543210" */
  whatsappNumber: "919560814623",
};

/**
 * Canonical origin for sitemap, robots, hreflang, Open Graph and JSON-LD.
 *
 * Production default is https://allayurvedics.in. Set NEXT_PUBLIC_SITE_URL to override
 * (required for local production builds that should not point at the live domain, and
 * optional on Vercel preview). `next dev` uses http://localhost:3000 when the variable
 * is unset. Do not branch on a hardcoded DOMAIN_LIVE flag.
 *
 * Only NEXT_PUBLIC_* and NODE_ENV are read here so server and client bundles agree.
 */
export const CANONICAL_DOMAIN = "https://allayurvedics.in";

function stripTrailingSlash(url: string) {
  return url.replace(/\/$/, "");
}

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return stripTrailingSlash(explicit);
  if (process.env.NODE_ENV !== "production") return "http://localhost:3000";
  return CANONICAL_DOMAIN;
}

export const siteUrl = resolveSiteUrl();

/**
 * Google Search Console "HTML tag" verification code, set in Vercel as NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION.
 * Paste just the content="…" value; if the whole <meta …> tag is pasted, the value is extracted.
 */
function readVerification(raw: string | undefined) {
  const value = raw?.trim();
  if (!value) return undefined;
  const match = value.match(/content=["']([^"']+)["']/i);
  return (match ? match[1] : value).trim() || undefined;
}
export const googleSiteVerification = readVerification(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION);

/**
 * Base URL used for share previews (Open Graph / Twitter images, og:url on ad landing pages).
 * Follows siteUrl; override with NEXT_PUBLIC_OG_BASE_URL only if previews must come from another host.
 */
export const ogBaseUrl = stripTrailingSlash(process.env.NEXT_PUBLIC_OG_BASE_URL?.trim() || siteUrl);

export function ogAbsolute(pathOrUrl: string) {
  return /^https?:\/\//.test(pathOrUrl) ? pathOrUrl : `${ogBaseUrl}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

export type UpiConfig = { upiId: string; payeeName: string };

const UPI_ID_PATTERN = /^[a-zA-Z0-9._-]{2,256}@[a-zA-Z][a-zA-Z0-9.-]{1,64}$/;

/** Resolve the UPI settings for a product (product override → env → site config). Null when not configured. */
export function getUpiConfig(overrides?: { upiId?: string; upiPayeeName?: string }): UpiConfig | null {
  const upiId = (overrides?.upiId || process.env.NEXT_PUBLIC_UPI_ID || siteConfig.upiId || "").trim();
  if (!upiId || !UPI_ID_PATTERN.test(upiId)) return null;
  const payeeName = (
    overrides?.upiPayeeName ||
    process.env.NEXT_PUBLIC_UPI_PAYEE_NAME ||
    siteConfig.upiPayeeName ||
    "All Ayurvedics"
  ).trim();
  return { upiId, payeeName };
}

export function getWhatsappNumber(): string | undefined {
  const n = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || siteConfig.whatsappNumber || "").replace(/\D/g, "");
  return n.length >= 10 ? n : undefined;
}

/** Contact email shown as a fallback only when explicitly configured (not the placeholder default) */
export function getConfiguredContactEmail(): string | undefined {
  return process.env.NEXT_PUBLIC_CONTACT_EMAIL || undefined;
}

/**
 * Site-level shop settings.
 *
 * UPI "Buy now" checkout: set `upiId` (e.g. "yourname@okhdfcbank") and `upiPayeeName`
 * (the name shown in the customer's UPI app) here, OR set the environment variables
 * NEXT_PUBLIC_UPI_ID / NEXT_PUBLIC_UPI_PAYEE_NAME in Vercel and redeploy.
 * The values in this file take priority over the env vars. A product can override both with
 * its own `upiId` / `upiPayeeName` fields in src/content/products.ts.
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
 * ── Site URL switch ──────────────────────────────────────────────────────────────────────────
 * Canonical links, hreflang, sitemap, robots.txt and structured-data URLs all use `siteUrl`.
 *
 * allayurvedics.in is registered but on "clientHold" at the registry (it does not resolve), and
 * Google will not index pages whose canonical points to a dead host. So until the domain works,
 * everything uses the live Vercel URL.
 *
 * ONE-LINE FLIP when allayurvedics.in resolves: set DOMAIN_LIVE = true (or set the Vercel env var
 * NEXT_PUBLIC_SITE_URL=https://allayurvedics.in), redeploy, then add allayurvedics.in to the Vercel
 * project and redirect allayurvedics.vercel.app → allayurvedics.in (see SETUP.md 7d).
 */
export const CANONICAL_DOMAIN = "https://allayurvedics.in";
export const VERCEL_URL = "https://allayurvedics.vercel.app";
export const DOMAIN_LIVE = false;
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || (DOMAIN_LIVE ? CANONICAL_DOMAIN : VERCEL_URL)).replace(/\/$/, "");

/**
 * Google Search Console "HTML tag" verification code, set in Vercel as NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION.
 * Paste just the content="…" value; if the whole <meta …> tag is pasted, the value is extracted.
 */
function readVerification(raw: string | undefined) {
  const v = raw?.trim();
  if (!v) return undefined;
  const m = v.match(/content=["']([^"']+)["']/i);
  return (m ? m[1] : v).trim() || undefined;
}
export const googleSiteVerification = readVerification(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION);

/**
 * Base URL used for share previews (Open Graph / Twitter images, og:url on ad landing pages).
 * Follows siteUrl; override with NEXT_PUBLIC_OG_BASE_URL only if previews must come from another host.
 */
export const ogBaseUrl = (process.env.NEXT_PUBLIC_OG_BASE_URL || siteUrl).replace(/\/$/, "");

export function ogAbsolute(pathOrUrl: string) {
  return /^https?:\/\//.test(pathOrUrl) ? pathOrUrl : `${ogBaseUrl}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

export type UpiConfig = { upiId: string; payeeName: string };

const UPI_ID_PATTERN = /^[a-zA-Z0-9._-]{2,256}@[a-zA-Z][a-zA-Z0-9.-]{1,64}$/;

/** Resolve the UPI settings for a product (product override → site config → env). Null when not configured. */
export function getUpiConfig(overrides?: { upiId?: string; upiPayeeName?: string }): UpiConfig | null {
  const upiId = (overrides?.upiId || siteConfig.upiId || process.env.NEXT_PUBLIC_UPI_ID || "").trim();
  if (!upiId || !UPI_ID_PATTERN.test(upiId)) return null;
  const payeeName = (
    overrides?.upiPayeeName ||
    siteConfig.upiPayeeName ||
    process.env.NEXT_PUBLIC_UPI_PAYEE_NAME ||
    "All Ayurvedics"
  ).trim();
  return { upiId, payeeName };
}

export function getWhatsappNumber(): string | undefined {
  const n = (siteConfig.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, "");
  return n.length >= 10 ? n : undefined;
}

/** Contact email shown as a fallback only when explicitly configured (not the placeholder default) */
export function getConfiguredContactEmail(): string | undefined {
  return process.env.NEXT_PUBLIC_CONTACT_EMAIL || undefined;
}

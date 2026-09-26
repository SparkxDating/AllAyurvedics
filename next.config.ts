import type { NextConfig } from "next";

/**
 * Security headers.
 *
 * External resources actually used by this app:
 * - next/font/google (Mukta, Lora, Noto Serif Devanagari) is self-hosted by Next at build time
 * - images, video and the OG emblem are files under /public (no remote image hosts)
 * - /api/og renders with next/og from that local emblem
 * - JSON-LD is an inline application/ld+json script
 * - WhatsApp (wa.me) and UPI (upi:) are user navigations, not framed or fetched by us
 * - Google Search Console verification is a meta tag, not a script
 * - transactional email calls Resend/Brevo from the server only
 *
 * No analytics snippet, tag manager, or third-party script is loaded.
 * script-src keeps 'unsafe-inline' because the App Router and JSON-LD emit inline scripts
 * and this app does not use per-request nonces. 'unsafe-eval' is dev-only (React refresh).
 * Do not add a wildcard img-src or script-src.
 */
const isProd = process.env.NODE_ENV === "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "media-src 'self' blob:",
  "worker-src 'self' blob:",
  "frame-src 'none'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "manifest-src 'self'",
  ...(isProd ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(), gyroscope=(), magnetometer=(), browsing-topics=()",
  },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  ...(isProd ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }] : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Catalogue, article and brand images are local files in /public.
    // Leave remotePatterns unset — a wildcard host list is not required.
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;

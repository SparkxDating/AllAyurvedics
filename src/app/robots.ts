import type { MetadataRoute } from "next";
import { siteUrl } from "@/i18n/config";

export default function robots(): MetadataRoute.Robots {
  // Account and checkout are private flows. /api/og stays crawlable so share images resolve.
  // Public pages are indexable. Canonical host comes from siteUrl (production: https://allayurvedics.in).
  return {
    rules: [{ userAgent: "*", allow: ["/", "/api/og"], disallow: ["/api/", "/en/account", "/hi/account", "/en/checkout/", "/hi/checkout/"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

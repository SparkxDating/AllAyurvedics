import type { MetadataRoute } from "next";
import { siteUrl } from "@/i18n/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: ["/", "/api/og"], disallow: ["/api/", "/en/account", "/hi/account"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

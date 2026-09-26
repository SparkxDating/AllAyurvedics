import type { MetadataRoute } from "next";
import { locales, siteUrl } from "@/i18n/config";
import { remedies } from "@/content/remedies";
import { articles } from "@/content/articles";
import { products } from "@/content/products";
import { campaigns } from "@/content/campaigns";
import { activeClusters } from "@/content/clusters";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/remedies", "/articles", "/products", "/enquiry", "/subscribe", "/about", "/privacy", "/terms", "/disclaimer"];
  const entries: { path: string; lastModified?: string; priority: number }[] = [
    ...staticPaths.map((p) => ({ path: p, priority: p === "/" ? 1 : 0.7 })),
    { path: "/home-remedies", priority: 0.8 },
    ...activeClusters.map((c) => ({ path: `/home-remedies/${c.slug}`, priority: 0.9 })),
    ...remedies.map((r) => ({ path: `/remedies/${r.slug}`, priority: 0.8 })),
    ...articles.map((a) => ({ path: `/articles/${a.slug}`, lastModified: a.date, priority: 0.8 })),
    ...products.map((p) => ({ path: `/products/${p.slug}`, priority: 0.5 })),
    ...campaigns.map((c) => ({ path: `/lp/${c.slug}`, priority: 0.6 })),
    { path: "/lp/shilajit", priority: 0.6 },
  ];

  const url = (locale: string, path: string) => `${siteUrl}/${locale}${path === "/" ? "" : path}`;

  return entries.flatMap((e) =>
    locales.map((locale) => ({
      url: url(locale, e.path),
      lastModified: e.lastModified ? new Date(e.lastModified) : new Date("2026-09-26"),
      priority: e.priority,
      alternates: {
        languages: {
          "en-IN": url("en", e.path),
          "hi-IN": url("hi", e.path),
          "x-default": url("en", e.path),
        },
      },
    }))
  );
}

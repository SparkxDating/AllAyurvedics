import type { Metadata } from "next";
import { type Locale, localeLabels, localePath, siteName, siteUrl } from "@/i18n/config";
import { ogAbsolute } from "@/config/site";

type BuildMetadataInput = {
  locale: Locale;
  /** path without locale prefix, e.g. "/remedies/golden-turmeric-milk" or "/" */
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
  /** Use the title as-is (no " | All Ayurvedics" suffix), e.g. a hand-written SEO title */
  absoluteTitle?: boolean;
  /** Custom Open Graph / Twitter image (path under /public or absolute URL) */
  image?: { url: string; width: number; height: number; alt: string };
  /** Absolute og:url override (ad landing pages use a URL that resolves today, see ogBaseUrl) */
  ogUrl?: string;
};

export function buildMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
  publishedTime,
  noIndex,
  absoluteTitle,
  image,
  ogUrl,
}: BuildMetadataInput): Metadata {
  const rawImage = image ?? { url: `/api/og?locale=${locale}`, width: 1200, height: 630, alt: siteName };
  // Share images always use an absolute URL on a host that resolves (see ogBaseUrl in src/config/site.ts)
  const ogImage = { ...rawImage, url: ogAbsolute(rawImage.url) };
  const url = localePath(locale, path);
  const other: Locale = locale === "en" ? "hi" : "en";
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "en-IN": localePath("en", path),
        "hi-IN": localePath("hi", path),
        "x-default": localePath("en", path),
      },
    },
    openGraph: {
      title,
      description,
      url: ogUrl ?? url,
      siteName,
      locale: localeLabels[locale].ogLocale,
      alternateLocale: [localeLabels[other].ogLocale],
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

export function absoluteUrl(path: string) {
  return `${siteUrl}${path}`;
}

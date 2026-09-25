import type { Metadata } from "next";
import { type Locale, localeLabels, localePath, siteName, siteUrl } from "@/i18n/config";

type BuildMetadataInput = {
  locale: Locale;
  /** path without locale prefix, e.g. "/remedies/golden-turmeric-milk" or "/" */
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
  publishedTime,
  noIndex,
}: BuildMetadataInput): Metadata {
  const url = localePath(locale, path);
  const other: Locale = locale === "en" ? "hi" : "en";
  return {
    title,
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
      url,
      siteName,
      locale: localeLabels[locale].ogLocale,
      alternateLocale: [localeLabels[other].ogLocale],
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [{ url: `/api/og?locale=${locale}`, width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/api/og?locale=${locale}`],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

export function absoluteUrl(path: string) {
  return `${siteUrl}${path}`;
}

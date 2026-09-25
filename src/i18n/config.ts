export const locales = ["en", "hi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Public base URL of the site (used for canonical URLs, sitemap, OG). */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://allayurvedics.in"
).replace(/\/$/, "");

export const siteName = "All Ayurvedics";

/** Build a locale-prefixed path, e.g. localePath("hi", "/remedies") -> "/hi/remedies" */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

/** Swap the locale prefix of a pathname, keeping the rest of the path. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const parts = pathname.split("/");
  if (parts.length > 1 && isLocale(parts[1] ?? "")) {
    parts[1] = target;
    return parts.join("/") || `/${target}`;
  }
  return localePath(target, pathname);
}

export const localeLabels: Record<Locale, { short: string; native: string; htmlLang: string; ogLocale: string }> = {
  en: { short: "EN", native: "English", htmlLang: "en-IN", ogLocale: "en_IN" },
  hi: { short: "हि", native: "हिन्दी", htmlLang: "hi-IN", ogLocale: "hi_IN" },
};

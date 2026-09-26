import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["en", "hi"];

/**
 * Short ad links, served with a REWRITE (one 200 response, no redirect chain; better in the
 * Instagram / Facebook in-app browsers). Query strings such as utm_source are kept.
 *   /shilajit            -> Hindi landing page (default; ?lang=en switches to English)
 *   /shilajit/hi, /shilajit/en
 */
const SHORT_LINKS: Record<string, string> = { "/shilajit": "shilajit" };

function shortLink(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const clean = pathname.replace(/\/+$/, "").toLowerCase() || "/";
  for (const [prefix, slug] of Object.entries(SHORT_LINKS)) {
    let locale: string | undefined;
    if (clean === prefix) locale = searchParams.get("lang") === "en" ? "en" : "hi";
    else if (clean === `${prefix}/en` || clean === `${prefix}/hi`) locale = clean.slice(-2);
    if (locale) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/lp/${slug}`;
      url.searchParams.delete("lang");
      return NextResponse.rewrite(url);
    }
  }
  return undefined;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const short = shortLink(request);
  if (short) return short;
  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return;

  // Anything without a locale prefix goes to the English version.
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Skip API routes, Next internals, metadata files and anything with a file extension.
    "/((?!api|_next|sitemap.xml|robots.txt|icon|apple-icon|opengraph-image|.*\\..*).*)",
  ],
};

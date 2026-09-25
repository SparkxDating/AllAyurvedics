import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["en", "hi"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
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

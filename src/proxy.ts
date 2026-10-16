import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

/** Sends any path without a language prefix to the Spanish version, e.g. /menu -> /es/menu. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  request.nextUrl.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals and any file with an extension (images, icons, sitemap.xml, robots.txt).
  matcher: ["/((?!_next|.*\\..*).*)"],
};

import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { isLocale } from "./i18n/locales";
import { routing } from "./i18n/routing";

const intl = createMiddleware(routing);

/**
 * Language routing for the public site. A prefixed path (/de/act) goes
 * through next-intl, which serves German, French and Italian and sends /en/act
 * back to /act. An unprefixed path is English and passes straight on: the
 * rewrite to /en is next.config's, never this file's — a rewrite returned from
 * here fails behind the box's reverse proxy. See src/i18n/english.ts.
 */
export default function proxy(request: NextRequest) {
  const first = request.nextUrl.pathname.split("/")[1] ?? "";
  return isLocale(first) ? intl(request) : NextResponse.next();
}

export const config = {
  // Only the public pages are translated by URL. Signed-in pages, the API,
  // auth, share pictures and files are not touched.
  matcher: ["/((?!api|og|auth|_next|_vercel|assessments|bookings|ops|preferences|protector|training|.*\\..*).*)"],
};

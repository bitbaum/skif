import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/** Language routing for the public site: /de/act is German, /act English. */
export default createMiddleware(routing);

export const config = {
  // Only the public pages are translated by URL. Signed-in pages, the API,
  // auth, share pictures and files are not touched.
  matcher: ["/((?!api|og|auth|_next|_vercel|assessments|bookings|ops|preferences|protector|.*\\..*).*)"],
};

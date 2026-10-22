import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { routing } from "./routing";

/**
 * The language of a request: the URL's (/de/…), else the NEXT_LOCALE cookie
 * the switch writes (signed-in pages have no prefix), else English. Skif's
 * words live in typed config (src/config/text), not message files, so no
 * messages are loaded here.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  let locale: string = routing.defaultLocale;
  if (hasLocale(routing.locales, requested)) locale = requested;
  else {
    const fromCookie = (await cookies()).get("NEXT_LOCALE")?.value;
    if (hasLocale(routing.locales, fromCookie)) locale = fromCookie;
  }
  return { locale, messages: {} };
});

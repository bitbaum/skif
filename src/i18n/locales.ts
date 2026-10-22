/**
 * The languages Skif's site is written in. English is the default and has no
 * URL prefix (/act); the others do (/de/act). The choice is the URL's, never a
 * guess from the browser, and a cookie carries it into the signed-in pages,
 * which have no prefix. Pure: imported by the proxy, tests and config.
 */
export const LOCALES = ["en", "de", "fr", "it"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** Each language in its own words, for the switch. */
export const LOCALE_NAMES: Record<Locale, string> = { en: "English", de: "Deutsch", fr: "Français", it: "Italiano" };

/** For dates and numbers: Swiss conventions in Skif's three national languages. */
export const LOCALE_TAGS: Record<Locale, string> = { en: "en-GB", de: "de-CH", fr: "fr-CH", it: "it-CH" };

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** A path as it is served in a language: /act → /de/act; English unchanged. */
export function localizedPath(path: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE || !path.startsWith("/") || path.startsWith("//")) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

const PREFIX = new RegExp(`^/(${LOCALES.join("|")})(?=/|$|\\?|#)`);

/** The path without its language prefix: /de/act → /act. English has one
 * too inside the app: the proxy serves /act from /en/act, and that is the
 * path Next's usePathname reports. */
export function unlocalizedPath(path: string): string {
  const m = path.match(PREFIX);
  return m ? path.slice(m[0].length) || "/" : path;
}

/** First path segments of the signed-in pages, the API and other routes
 * that carry no language in their URL; src/proxy.ts leaves them alone (its
 * matcher must be a literal, so i18n.test.ts checks the two agree). */
export const UNLOCALIZED_SEGMENTS = ["api", "og", "auth", "assessments", "bookings", "ops", "preferences", "protector"] as const;

export function isUnlocalizedPath(path: string): boolean {
  const first = path.split(/[/?#]/)[1] ?? "";
  return (UNLOCALIZED_SEGMENTS as readonly string[]).includes(first);
}

/** The cookie that carries the chosen language into unprefixed pages. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

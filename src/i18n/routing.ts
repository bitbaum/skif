import { defineRouting } from "next-intl/routing";
import { DEFAULT_LOCALE, LOCALES } from "./locales";

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  // /de/act, /fr/act, /it/act; English has no prefix.
  localePrefix: "as-needed",
  // The URL decides, never the browser's Accept-Language: a Swiss reader with
  // an English phone should not be switched about.
  localeDetection: false,
});

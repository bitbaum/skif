"use client";

import { Languages } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { GUIDES_SLUGS } from "@/config/guides/slug-list";
import { allGuidesTranslated, isGuideTranslated } from "@/config/guides/translated-slugs";
import { siteText } from "@/config/site";
import { DEFAULT_LOCALE, isLocale, unlocalizedPath, type Locale } from "@/i18n/locales";
import { SHELL } from "./shell";

/** Pages whose every word is already in German, French and Italian. The rest
 * say so, rather than pass off English as a translation. */
const TRANSLATED: readonly string[] = [
  "/",
  "/act",
  "/emergency",
  "/signin",
  "/library",
  "/academy",
  "/method",
  "/protectors",
  "/business",
  "/join",
  "/privacy",
  "/research/science-of-safety",
  "/research/protective-methods",
];

function isTranslated(path: string, locale: Locale): boolean {
  if (TRANSLATED.includes(path)) return true;
  // Checklists and fields: their own words and the guides they link to.
  if (/^\/(act|safety)\/[^/]+$/.test(path)) return true;
  if (path === "/guides") return allGuidesTranslated(GUIDES_SLUGS, locale);
  const guide = path.match(/^\/guides\/([^/]+)$/);
  return guide ? isGuideTranslated(guide[1], locale) : false;
}

export function TranslationNotice() {
  const found = useLocale();
  const pathname = usePathname();
  if (!isLocale(found) || found === DEFAULT_LOCALE || isTranslated(unlocalizedPath(pathname), found)) return null;
  return (
    <p className={`${SHELL} flex items-center gap-2 py-3 text-sm text-fg-tertiary`}>
      <Languages aria-hidden className="size-4 shrink-0" />
      {siteText(found).NOT_TRANSLATED}
    </p>
  );
}

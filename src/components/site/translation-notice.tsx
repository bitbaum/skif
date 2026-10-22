"use client";

import { Languages } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { siteText } from "@/config/site";
import { DEFAULT_LOCALE, isLocale, unlocalizedPath } from "@/i18n/locales";
import { SHELL } from "./shell";

/** Pages whose every word is already in German, French and Italian. The rest
 * say so, rather than pass off English as a translation. */
const TRANSLATED: readonly string[] = ["/emergency", "/signin"];

export function TranslationNotice() {
  const found = useLocale();
  const pathname = usePathname();
  if (!isLocale(found) || found === DEFAULT_LOCALE || TRANSLATED.includes(unlocalizedPath(pathname))) return null;
  return (
    <p className={`${SHELL} flex items-center gap-2 py-3 text-sm text-fg-tertiary`}>
      <Languages aria-hidden className="size-4 shrink-0" />
      {siteText(found).NOT_TRANSLATED}
    </p>
  );
}

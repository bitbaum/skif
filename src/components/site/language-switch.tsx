"use client";

import { useLocale } from "next-intl";
import { isLocale, isUnlocalizedPath, LOCALE_COOKIE, LOCALE_NAMES, LOCALES, localizedPath, unlocalizedPath } from "@/i18n/locales";

/**
 * The site's language, as a native select: compact, accessible and the same
 * on every screen. On a public page it opens the same page in the chosen
 * language; on a signed-in page (no language in the URL) it sets the cookie
 * those pages read and reloads. Either way the choice is remembered.
 */
export function LanguageSwitch({ label, className = "" }: { label: string; className?: string }) {
  const current = useLocale();
  const change = (next: string) => {
    if (!isLocale(next)) return;
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    const { pathname, search, hash } = window.location;
    const here = unlocalizedPath(pathname);
    window.location.assign(isUnlocalizedPath(here) ? `${pathname}${search}${hash}` : `${localizedPath(here, next)}${search}${hash}`);
  };
  return (
    <label className={`inline-flex items-center ${className}`}>
      <span className="sr-only">{label}</span>
      <select
        value={current}
        onChange={(e) => change(e.target.value)}
        className="min-h-11 cursor-pointer rounded-full border-2 border-strong bg-surface-page px-3 text-sm font-medium text-fg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {LOCALES.map((l) => (
          <option key={l} value={l} lang={l}>
            {LOCALE_NAMES[l]}
          </option>
        ))}
      </select>
    </label>
  );
}

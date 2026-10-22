/**
 * Guide pages, from src/config/guides. The page opens with the guide's own
 * statement, then a jump list of its sections, so a long guide reads as a
 * document you can move around in.
 */
import type { SitePage } from "@bitbaum/sitekit";
import type { Guide } from "@/config/guides";
import { wordsFor } from "@/config/text";
import { fieldWords } from "@/config/text/fields";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/locales";

export function guideHref(guide: Guide): string {
  return `/guides/${guide.slug}`;
}

/** The page for `guide`, already in the reader's language (guideIn). */
export function guidePage(guide: Guide, locale: Locale = DEFAULT_LOCALE): SitePage {
  const w = wordsFor(locale).guides;
  const jumps = guide.sections.flatMap((s) => (s.heading && "anchor" in s && s.anchor ? [{ label: s.heading, anchor: s.anchor }] : []));
  return {
    path: guide.slug,
    title: guide.title,
    intro: guide.summary,
    sections: [
      {
        kind: "hero",
        eyebrow: `${w.eyebrow} · ${guide.fields.map((f) => fieldWords(f, locale).label).join(" · ")}${guide.sources ? ` · ${w.sources(guide.sources.length)}` : ""}`,
        statement: guide.statement,
        lead: [...guide.lead],
        actions: [
          { label: w.check, href: "/#check" },
          { label: w.all, href: "/guides" },
        ],
      },
      ...(jumps.length > 2 ? [{ kind: "index" as const, heading: w.inThis, entries: jumps }] : []),
      ...guide.sections,
    ],
  };
}

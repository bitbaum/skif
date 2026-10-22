/**
 * Research article pages, from src/config/research. Same shape as a guide —
 * an opening, a jump list, sitekit sections — plus a numbered source list,
 * drawn after the sections (SourceList) and so not part of the sitekit data.
 */
import type { SitePage } from "@bitbaum/sitekit";
import type { Research } from "@/config/research";
import { wordsFor } from "@/config/text";
import { fieldWords } from "@/config/text/fields";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/locales";

export function researchHref(r: Research): string {
  return `/research/${r.slug}`;
}

/** Every [n] cited anywhere in an article's (or a guide's) text. */
export function citations(r: Pick<Research, "lead" | "sections">): number[] {
  const text = JSON.stringify([r.lead, r.sections]);
  return [...new Set([...text.matchAll(/\[(\d+)\]/g)].map((m) => Number(m[1])))].sort((a, b) => a - b);
}

export function researchPage(r: Research, locale: Locale = DEFAULT_LOCALE): SitePage {
  const w = wordsFor(locale).research;
  const jumps = r.sections.flatMap((s) => (s.heading && "anchor" in s && s.anchor ? [{ label: s.heading, anchor: s.anchor }] : []));
  return {
    path: r.slug,
    title: r.title,
    intro: r.summary,
    sections: [
      {
        kind: "hero",
        eyebrow: `${w.eyebrow} · ${r.fields.map((f) => fieldWords(f, locale).label).join(" · ")} · ${w.sources(r.sources.length)}`,
        statement: r.statement,
        lead: [...r.lead],
        actions: [{ label: w.library, href: "/library" }],
      },
      { kind: "index", heading: w.inThis, entries: jumps },
      ...r.sections,
    ],
  };
}

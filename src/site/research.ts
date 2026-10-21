/**
 * Research article pages, from src/config/research. Same shape as a guide —
 * an opening, a jump list, sitekit sections — plus a numbered source list,
 * drawn after the sections (SourceList) and so not part of the sitekit data.
 */
import type { SitePage } from "@bitbaum/sitekit";
import { familyLabel } from "@/config/harm-families";
import type { Research } from "@/config/research";

export function researchHref(r: Research): string {
  return `/research/${r.slug}`;
}

/** Every [n] cited anywhere in an article's text. */
export function citations(r: Research): number[] {
  const text = JSON.stringify(r.sections);
  return [...new Set([...text.matchAll(/\[(\d+)\]/g)].map((m) => Number(m[1])))].sort((a, b) => a - b);
}

export function researchPage(r: Research): SitePage {
  const jumps = r.sections.flatMap((s) => (s.heading && "anchor" in s && s.anchor ? [{ label: s.heading, anchor: s.anchor }] : []));
  return {
    path: r.slug,
    title: r.title,
    intro: r.summary,
    sections: [
      {
        kind: "hero",
        eyebrow: `Research · ${r.fields.map(familyLabel).join(" · ")} · ${r.sources.length} sources`,
        statement: r.statement,
        lead: [...r.lead],
        actions: [{ label: "The Library", href: "/library" }],
      },
      { kind: "index", heading: "In this article", entries: jumps },
      ...r.sections,
    ],
  };
}

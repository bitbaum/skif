/**
 * Guide pages, from src/config/guides. The page opens with the guide's own
 * statement, then a jump list of its sections, so a long guide reads as a
 * document you can move around in.
 */
import type { SitePage } from "@bitbaum/sitekit";
import { familyLabel } from "@/config/harm-families";
import type { Guide } from "@/config/guides";

export function guideHref(guide: Guide): string {
  return `/guides/${guide.slug}`;
}

export function guidePage(guide: Guide): SitePage {
  const jumps = guide.sections.flatMap((s) => (s.heading && "anchor" in s && s.anchor ? [{ label: s.heading, anchor: s.anchor }] : []));
  return {
    path: guide.slug,
    title: guide.title,
    intro: guide.summary,
    sections: [
      {
        kind: "hero",
        eyebrow: `Guide · ${guide.fields.map(familyLabel).join(" · ")}`,
        statement: guide.statement,
        lead: [...guide.lead],
        actions: [
          { label: "Check your own situation", href: "/#check" },
          { label: "All guides", href: "/guides" },
        ],
      },
      ...(jumps.length > 2 ? [{ kind: "index" as const, heading: "In this guide", entries: jumps }] : []),
      ...guide.sections,
    ],
  };
}

/**
 * The Academy page, from src/config/academy.ts. Each course names the
 * Protector capability it builds, read from the capability graph.
 */
import type { SitePage, SiteSection } from "@bitbaum/sitekit";
import { ACADEMY_AREAS, COURSE_STATUS, coursesIn, deliveryLabel } from "@/config/academy";
import { capabilityLabel } from "@/config/capabilities";
import { partnerMailto } from "@/config/site";

function courseMeta(c: { delivery: Parameters<typeof deliveryLabel>[0]; builds: readonly string[] }): string {
  const builds = c.builds.length ? ` · Builds ${c.builds.map(capabilityLabel).join(", ").toLowerCase()}` : "";
  return `${COURSE_STATUS.label} · ${deliveryLabel(c.delivery)}${builds}`;
}

export function academyPage(): SitePage {
  const areas: SiteSection[] = ACADEMY_AREAS.map((area) => ({
    kind: "cards",
    heading: area.title,
    blurb: area.intro,
    anchor: area.slug,
    columns: 3,
    cards: coursesIn(area.key).map((c) => ({ title: c.title, body: c.outcome, meta: courseMeta(c) })),
  }));

  return {
    path: "academy",
    title: "Academy",
    intro: "What Protectors learn, open to anyone.",
    sections: [
      {
        kind: "hero",
        eyebrow: `Academy · ${COURSE_STATUS.label}`,
        statement: "Learn what Protectors learn.",
        lead: [
          "From first aid and de-escalation to parkour, Muay Thai, Jiu-Jitsu, weapons and the law, and keeping your accounts and money safe. Open to anyone who wants to be more capable and freer for it, and the route by which a Protector's skills become verified.",
          "No course runs yet. This is the curriculum Skif is building: some courses with its own exams, others with partner schools it will send people to.",
        ],
        actions: [
          { label: "Teach with Skif", href: partnerMailto("teaching with the Academy") },
          { label: "Become a Protector", href: "/join" },
        ],
      },
      {
        kind: "index",
        heading: "Areas",
        entries: [
          ...ACADEMY_AREAS.map((a) => ({ label: a.title, meta: String(coursesIn(a.key).length), anchor: a.slug })),
          { label: "From course to capability", anchor: "capability" },
        ],
      },
      ...areas,
      {
        kind: "prose",
        heading: "From course to capability",
        anchor: "capability",
        paragraphs: [
          "Every Protector carries a capability graph rather than a star rating: each skill with a level, the evidence for it, and a certificate's expiry where there is one. A skill counts fully in matching only once it is verified, and an expired certificate stops counting.",
          "A Skif exam, or a partner's certificate Skif recognises, is how a declared skill becomes a verified one.",
        ],
      },
    ],
  };
}

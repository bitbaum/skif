/**
 * The public page for each field of safety, assembled from the same config
 * the assessment runs on: the concerns it asks about and the steps it can
 * recommend, ranked the way a plan ranks them. Nothing here is written for
 * the page alone, so the page cannot say something the product does not do.
 */
import type { SitePage, SiteSection } from "@bitbaum/sitekit";
import { costLabel } from "@/config/assessment";
import { CONCERNS } from "@/config/concerns";
import { environmentTypeLabel } from "@/config/environments";
import { HARM_FAMILIES, type HarmFamilyEntry } from "@/config/harm-families";
import { INTERVENTIONS, kindLabel, levelText, providerOf, type Intervention } from "@/config/interventions";
import { providerLabel } from "@/config/providers";
import { leastIntrusive } from "@/domain/safety-plan";

export function fieldNumber(field: HarmFamilyEntry): string {
  return String(HARM_FAMILIES.indexOf(field) + 1).padStart(2, "0");
}

export function fieldHref(field: HarmFamilyEntry): string {
  return `/safety/${field.slug}`;
}

/** The concerns a person can tick in this field. */
export function fieldConcerns(field: HarmFamilyEntry) {
  return CONCERNS.filter((c) => c.family === field.key && !c.derived);
}

/** Every step that answers a concern in this field, least intrusive first. */
export function fieldSteps(field: HarmFamilyEntry): Intervention[] {
  const concerns = new Set<string>(fieldConcerns(field).map((c) => c.key));
  return (INTERVENTIONS as readonly Intervention[])
    .filter((i) => i.addresses.some((c) => concerns.has(c)))
    .sort(leastIntrusive);
}

function takes(i: Intervention): string {
  const provider = providerOf(i);
  return provider && i.kind !== "PROTECTOR" ? `${kindLabel(i.kind)}: ${providerLabel(provider).toLowerCase()}` : kindLabel(i.kind);
}

export function fieldPage(field: HarmFamilyEntry): SitePage {
  const concerns = fieldConcerns(field);
  const steps = fieldSteps(field);
  const sections: SiteSection[] = [
    {
      kind: "hero",
      eyebrow: `Field ${fieldNumber(field)} of ${HARM_FAMILIES.length} · ${field.label}`,
      statement: field.headline,
      lead: [...field.explainer],
      actions: [
        { label: "Check this for yourself", href: "/#check" },
        { label: "Start an assessment", href: "/assessments" },
      ],
    },
    {
      kind: "cards",
      heading: "What can go wrong",
      blurb: "What the assessment asks about in this field, and for which places.",
      anchor: "concerns",
      columns: 3,
      cards: concerns.map((c) => ({
        title: c.label,
        body: `Asked about: ${c.environments.map((e) => environmentTypeLabel(e).toLowerCase()).join(", ")}.`,
      })),
    },
    {
      kind: "table",
      heading: "What helps, and what it costs",
      blurb:
        "Every step a Safety Plan can recommend here, least intrusive first: privacy, then money, then freedom. A plan picks one per worry, within your limits and your budget.",
      anchor: "steps",
      columns: ["Step", "What it takes", "Cost", "Privacy", "Freedom", "Benefit"],
      rows: steps.map((i) => [
        i.title,
        takes(i),
        costLabel(i.cost),
        `${i.privacyImpact} of 3`,
        `${i.autonomyImpact} of 3`,
        `${levelText(i.benefit)} · ${levelText(i.evidence.confidence).toLowerCase()} confidence`,
      ]),
      monoColumns: [2, 3, 4, 5],
      note: "Benefit and confidence are Skif's own judgment until research is cited. The scales are explained under Method.",
    },
  ];
  return {
    path: field.slug,
    title: field.label,
    intro: field.description,
    sections,
  };
}

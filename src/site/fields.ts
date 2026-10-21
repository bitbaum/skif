/**
 * What a field's public page shows, read from the same config the assessment
 * runs on: the concerns it asks about and the steps it can recommend, ranked
 * the way a plan ranks them. Nothing here is written for the page alone, so
 * the page cannot say something the product does not do.
 */
import { CONCERNS } from "@/config/concerns";
import { HARM_FAMILIES, type HarmFamilyEntry } from "@/config/harm-families";
import { INTERVENTIONS, type Intervention } from "@/config/interventions";
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

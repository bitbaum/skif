import { DIGITAL_INTERVENTIONS } from "./digital";
import { HOME_INTERVENTIONS } from "./home";
import { HOUSEHOLD_INTERVENTIONS } from "./household";
import { PERSONAL_INTERVENTIONS } from "./personal";
import { RESILIENCE_INTERVENTIONS } from "./resilience";
import type { Intervention } from "./types";
import { VENUE_INTERVENTIONS } from "./venue";

export * from "./types";

/** The whole catalogue. Order is irrelevant: the plan sorts by proportionality. */
export const INTERVENTIONS = [
  ...HOME_INTERVENTIONS,
  ...PERSONAL_INTERVENTIONS,
  ...VENUE_INTERVENTIONS,
  ...DIGITAL_INTERVENTIONS,
  ...HOUSEHOLD_INTERVENTIONS,
  ...RESILIENCE_INTERVENTIONS,
] as const;

export type InterventionKey = (typeof INTERVENTIONS)[number]["key"];

export function findIntervention(key: string): Intervention | undefined {
  return (INTERVENTIONS as readonly Intervention[]).find((i) => i.key === key);
}

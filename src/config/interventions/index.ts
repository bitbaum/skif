import { HOME_INTERVENTIONS } from "./home";
import { PERSONAL_INTERVENTIONS } from "./personal";
import type { Intervention } from "./types";
import { VENUE_INTERVENTIONS } from "./venue";

export * from "./types";

/** The whole catalogue. Order is irrelevant: the plan sorts by proportionality. */
export const INTERVENTIONS = [...HOME_INTERVENTIONS, ...PERSONAL_INTERVENTIONS, ...VENUE_INTERVENTIONS] as const;


export type InterventionKey = (typeof INTERVENTIONS)[number]["key"];

export function findIntervention(key: string): Intervention | undefined {
  return (INTERVENTIONS as readonly Intervention[]).find((i) => i.key === key);
}

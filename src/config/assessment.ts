/**
 * SSOT for the Safety Assessment's questions: what a person can be worried
 * about, what they already do, and what things cost. The interventions that
 * answer them live in ./interventions.ts.
 */
export const CONCERNS = [
  { key: "BURGLARY", label: "A break-in while I'm away" },
  { key: "UNWANTED_VISITORS", label: "Unwanted people at my door" },
  { key: "ARRIVING_AT_NIGHT", label: "Feeling unsafe arriving home at night" },
  { key: "BEING_FOUND", label: "Someone finding out where I live" },
] as const;

export type ConcernKey = (typeof CONCERNS)[number]["key"];
export const CONCERN_KEYS = CONCERNS.map((c) => c.key) as [ConcernKey, ...ConcernKey[]];

export const MEASURES = [
  { key: "SOLID_DOOR_LOCK", label: "A solid door with a multi-point or security lock" },
  { key: "DOOR_VIEWER", label: "A door viewer or chain" },
  { key: "ENTRANCE_LIGHTING", label: "A well-lit entrance" },
  { key: "NEIGHBOUR_CONTACT", label: "A neighbour who keeps an eye out" },
  { key: "CHECK_IN_CONTACT", label: "Someone I message when I get home" },
  { key: "ADDRESS_BLOCKED", label: "My address is not in public directories" },
] as const;

export type MeasureKey = (typeof MEASURES)[number]["key"];
export const MEASURE_KEYS = MEASURES.map((m) => m.key) as [MeasureKey, ...MeasureKey[]];

export const COST_TIERS = [
  { key: "FREE", label: "Free", rank: 0 },
  { key: "LOW", label: "Under CHF 100", rank: 1 },
  { key: "MEDIUM", label: "CHF 100–500", rank: 2 },
  { key: "HIGH", label: "Over CHF 500 or a subscription", rank: 3 },
] as const;

export type CostTier = (typeof COST_TIERS)[number]["key"];

export function concernLabel(key: string): string {
  return CONCERNS.find((c) => c.key === key)?.label ?? key;
}

export function costLabel(key: CostTier): string {
  return COST_TIERS.find((c) => c.key === key)?.label ?? key;
}

export function costRank(key: CostTier): number {
  return COST_TIERS.find((c) => c.key === key)?.rank ?? Number.MAX_SAFE_INTEGER;
}

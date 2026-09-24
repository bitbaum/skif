/**
 * The kinds of place or situation an assessment can be about (SPEC §1, §12,
 * §18). An environment belongs to one person for now; organisations come later.
 */
export const ENVIRONMENT_TYPES = [
  { key: "HOME", label: "Home", description: "A flat or house you live in." },
  { key: "VENUE", label: "Venue", description: "A club, bar, shop or event space you run." },
  { key: "WORKPLACE", label: "Workplace", description: "Where you or your team work." },
  { key: "VEHICLE", label: "Vehicle", description: "A car you drive or are driven in." },
  { key: "JOURNEY", label: "Journey", description: "A route you take regularly, e.g. home from work." },
  { key: "EVENT", label: "Event", description: "A one-off occasion: a party, a trip, a public appearance." },
] as const;

export type EnvironmentType = (typeof ENVIRONMENT_TYPES)[number]["key"];
export const ENVIRONMENT_TYPE_KEYS = ENVIRONMENT_TYPES.map((e) => e.key) as [EnvironmentType, ...EnvironmentType[]];

export function environmentTypeLabel(key: string): string {
  return ENVIRONMENT_TYPES.find((e) => e.key === key)?.label ?? key;
}

export const ENVIRONMENT_LIMITS = { nameMax: 80 } as const;

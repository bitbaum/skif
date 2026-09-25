/**
 * What an assessment can be about (SPEC §1, §12, §18). PERSON is the
 * Protected Life itself (docs/DOCTRINE.md: the person is the root, places hang
 * off it): digital life, identity, reputation, family, money and what happens
 * when things go wrong — none of which live at one address. Everyone has at
 * most one; the rest are places or situations, and a person can have many.
 * An environment belongs to one person for now; organisations come later.
 */
export const ENVIRONMENT_TYPES = [
  {
    key: "PERSON",
    label: "My life as a whole",
    description: "You and the people you love: accounts, identity, reputation, money, health, family.",
    place: false,
  },
  { key: "HOME", label: "Home", description: "A flat or house you live in.", place: true },
  { key: "VENUE", label: "Venue", description: "A club, bar, shop or event space you run.", place: true },
  { key: "WORKPLACE", label: "Workplace", description: "Where you or your team work.", place: true },
  { key: "VEHICLE", label: "Vehicle", description: "A car you drive or are driven in.", place: true },
  { key: "JOURNEY", label: "Journey", description: "A route you take regularly, e.g. home from work.", place: true },
  { key: "EVENT", label: "Event", description: "A one-off occasion: a party, a trip, a public appearance.", place: true },
] as const;

export type EnvironmentType = (typeof ENVIRONMENT_TYPES)[number]["key"];
export const ENVIRONMENT_TYPE_KEYS = ENVIRONMENT_TYPES.map((e) => e.key) as [EnvironmentType, ...EnvironmentType[]];

/** The types someone adds by hand; PERSON is created for them, once. */
export const PLACE_TYPES = ENVIRONMENT_TYPES.filter((e) => e.place);
export const PLACE_TYPE_KEYS = PLACE_TYPES.map((e) => e.key) as [EnvironmentType, ...EnvironmentType[]];

export function environmentTypeLabel(key: string): string {
  return ENVIRONMENT_TYPES.find((e) => e.key === key)?.label ?? key;
}

export const ENVIRONMENT_LIMITS = { nameMax: 80 } as const;

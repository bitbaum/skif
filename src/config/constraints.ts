/**
 * SSOT for the hard constraints a person can set in their Safety Preference
 * Profile. A hard constraint is never traded off: a recommendation or a
 * booking detail that needs one of these capabilities is excluded outright,
 * and the exclusion is shown with its reason.
 */
export const HARD_CONSTRAINTS = [
  {
    key: "NO_FACIAL_RECOGNITION",
    label: "No facial recognition",
    description: "Nothing that identifies faces, on any device, anywhere.",
  },
  {
    key: "NO_INTERIOR_CAMERAS",
    label: "No cameras inside my home",
    description: "No camera pointing into a private space.",
  },
  {
    key: "NO_CLOUD_VIDEO",
    label: "No cloud video",
    description: "Video, if any, never leaves the premises.",
  },
  {
    key: "NO_AUTO_POLICE_SHARING",
    label: "No automatic police sharing",
    description: "Nothing is passed to the police unless I decide it, case by case.",
  },
] as const;

export type HardConstraintKey = (typeof HARD_CONSTRAINTS)[number]["key"];

export const HARD_CONSTRAINT_KEYS = HARD_CONSTRAINTS.map((c) => c.key) as [
  HardConstraintKey,
  ...HardConstraintKey[],
];

export function constraintLabel(key: HardConstraintKey): string {
  return HARD_CONSTRAINTS.find((c) => c.key === key)?.label ?? key;
}

/** How visible the person wants a Protector to be. */
export const PRESENCE_STYLES = [
  { key: "DISCREET", label: "Discreet", description: "Blends in; nobody needs to know." },
  { key: "VISIBLE", label: "Visible", description: "Clearly accompanying me, as a deterrent." },
] as const;

export type PresenceStyle = (typeof PRESENCE_STYLES)[number]["key"];
export const PRESENCE_STYLE_KEYS = PRESENCE_STYLES.map((p) => p.key) as [
  PresenceStyle,
  ...PresenceStyle[],
];

export const LANGUAGES = [
  { key: "de", label: "German" },
  { key: "gsw", label: "Swiss German" },
  { key: "en", label: "English" },
  { key: "fr", label: "French" },
  { key: "it", label: "Italian" },
] as const;

export type LanguageKey = (typeof LANGUAGES)[number]["key"];
export const LANGUAGE_KEYS = LANGUAGES.map((l) => l.key) as [LanguageKey, ...LanguageKey[]];

export function languageLabel(key: string): string {
  return LANGUAGES.find((l) => l.key === key)?.label ?? key;
}

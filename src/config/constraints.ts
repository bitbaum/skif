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
  {
    key: "LOCAL_ONLY_PROCESSING",
    label: "Local processing only",
    description: "No data about my home or me leaves it for a vendor's servers or a monitoring centre.",
  },
  {
    key: "NO_PERSISTENT_RECORDING",
    label: "No persistent recording",
    description: "Nothing records continuously, not even locally.",
  },
  {
    key: "NO_EXTERIOR_CAMERAS",
    label: "No cameras outside either",
    description: "No camera at my door or on my building, pointed anywhere.",
  },
  {
    key: "NO_HUMAN_PROTECTOR",
    label: "No one accompanying me",
    description: "Don't recommend a Protector; I want other options.",
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

/**
 * Trade-offs a person leans on, not limits (SPEC §3). Each is answered left,
 * balanced or right, and shapes which of several acceptable options comes
 * first — it never excludes anything. "Discretion ↔ visible deterrence" is
 * the presence style below, so it isn't repeated here.
 */
export const PREFERENCE_AXES = [
  { key: "PRIVACY", left: "Privacy", right: "Observability" },
  { key: "AUTONOMY", left: "Doing it myself", right: "Automation" },
  { key: "HUMAN_TECH", left: "Human protection", right: "Technology" },
  { key: "PROCESSING", left: "Local processing", right: "Cloud convenience" },
  { key: "SCOPE", left: "Individual solutions", right: "Community solutions" },
  { key: "HARDENING", left: "Convenience", right: "Maximum hardening" },
] as const;

export type AxisKey = (typeof PREFERENCE_AXES)[number]["key"];
export const AXIS_KEYS = PREFERENCE_AXES.map((a) => a.key) as [AxisKey, ...AxisKey[]];

/** -1 leans to the left pole, 1 to the right, 0 is balanced. */
export const AXIS_LEANS = [-1, 0, 1] as const;
export type AxisLean = (typeof AXIS_LEANS)[number];
export type AxisLeans = Partial<Record<AxisKey, AxisLean>>;

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

/** Languages a person can ask to be spoken to in, and a Protector can offer.
 * Switzerland's own languages, English, and the two most likely beside them
 * (Spanish, Portuguese) are shown; a few widely spoken ones sit behind
 * "more" (`folded`). The list stays short on purpose: Skif works in
 * Switzerland. Keys are ISO 639 codes ("gsw" is Swiss German). */
export const LANGUAGES = [
  { key: "en", label: "English" },
  { key: "de", label: "German" },
  { key: "gsw", label: "Swiss German" },
  { key: "fr", label: "French" },
  { key: "it", label: "Italian" },
  { key: "rm", label: "Romansh" },
  { key: "es", label: "Spanish" },
  { key: "pt", label: "Portuguese" },
  { key: "ar", label: "Arabic", folded: true },
  { key: "zh", label: "Chinese", folded: true },
  { key: "ja", label: "Japanese", folded: true },
  { key: "ko", label: "Korean", folded: true },
  { key: "ru", label: "Russian", folded: true },
] as const;

/** How many languages show before "more"; the folded ones come last. */
export const LANGUAGES_SHOWN = LANGUAGES.filter((l) => !("folded" in l)).length;

export type LanguageKey = (typeof LANGUAGES)[number]["key"];
export const LANGUAGE_KEYS = LANGUAGES.map((l) => l.key) as [LanguageKey, ...LanguageKey[]];

export function languageLabel(key: string): string {
  return LANGUAGES.find((l) => l.key === key)?.label ?? key;
}

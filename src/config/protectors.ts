/**
 * SSOT for the qualities a Protector can declare. Chosen for judgment and
 * calm, not intimidation — there is no "size" or "strength" here on purpose.
 */
export const PROTECTOR_SKILLS = [
  { key: "DE_ESCALATION", label: "De-escalation training" },
  { key: "FIRST_AID", label: "First aid" },
  { key: "TRAUMA_INFORMED", label: "Trauma-informed care" },
  { key: "NIGHTLIFE", label: "Nightlife experience" },
  { key: "CLOSE_PROTECTION", label: "Close protection training" },
  { key: "CHILDREN", label: "Experience with children" },
] as const;

export type ProtectorSkill = (typeof PROTECTOR_SKILLS)[number]["key"];
export const PROTECTOR_SKILL_KEYS = PROTECTOR_SKILLS.map((s) => s.key) as [
  ProtectorSkill,
  ...ProtectorSkill[],
];

export function skillLabel(key: string): string {
  return PROTECTOR_SKILLS.find((s) => s.key === key)?.label ?? key;
}

export const PROTECTOR_LIMITS = {
  displayNameMax: 60,
  bioMax: 800,
} as const;

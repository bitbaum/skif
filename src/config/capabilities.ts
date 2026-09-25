/**
 * SSOT for the Protector capability graph (SPEC §7). A capability is declared
 * with a level, may carry a certificate with an expiry, and counts fully in
 * matching only once Operations has verified it.
 *
 * Physical skills are here because they are real capabilities, but the
 * matching weights (src/config/matching.ts) favour judgment and calm (§8).
 */
export const CAPABILITY_CATEGORIES = [
  { key: "HUMAN", label: "Human" },
  { key: "MEDICAL", label: "Medical" },
  { key: "PHYSICAL", label: "Physical" },
  { key: "PROFESSIONAL", label: "Professional" },
  { key: "MOBILITY", label: "Mobility" },
  { key: "TECHNICAL", label: "Technical" },
] as const;

export type CapabilityCategory = (typeof CAPABILITY_CATEGORIES)[number]["key"];

type CapabilityDef = {
  key: string;
  label: string;
  category: CapabilityCategory;
  /** Normally evidenced by a certificate or licence that can expire. */
  certified: boolean;
};

export const CAPABILITIES = [
  { key: "DE_ESCALATION", label: "De-escalation", category: "HUMAN", certified: false },
  { key: "TRAUMA_INFORMED", label: "Trauma-informed care", category: "HUMAN", certified: false },
  { key: "COMMUNICATION", label: "Communication", category: "HUMAN", certified: false },
  { key: "SITUATIONAL_AWARENESS", label: "Situational awareness", category: "HUMAN", certified: false },
  { key: "CONFLICT_MANAGEMENT", label: "Conflict management", category: "HUMAN", certified: false },
  { key: "FIRST_AID", label: "First aid", category: "MEDICAL", certified: true },
  { key: "EMERGENCY_RESPONSE", label: "Emergency response", category: "MEDICAL", certified: true },
  { key: "ADVANCED_MEDICAL", label: "Advanced medical qualification", category: "MEDICAL", certified: true },
  { key: "GRAPPLING", label: "Grappling (BJJ, judo, wrestling)", category: "PHYSICAL", certified: false },
  { key: "RESTRAINT_CONTROL", label: "Restraint and control", category: "PHYSICAL", certified: true },
  { key: "ENDURANCE", label: "Endurance and mobility", category: "PHYSICAL", certified: false },
  { key: "CLOSE_PROTECTION", label: "Close protection", category: "PROFESSIONAL", certified: true },
  { key: "NIGHTLIFE", label: "Nightlife", category: "PROFESSIONAL", certified: false },
  { key: "EVENT_SECURITY", label: "Event security", category: "PROFESSIONAL", certified: false },
  { key: "EXECUTIVE_PROTECTION", label: "Executive protection", category: "PROFESSIONAL", certified: true },
  { key: "CHILDREN", label: "Families and children", category: "PROFESSIONAL", certified: false },
  { key: "VULNERABLE_PERSON_SUPPORT", label: "Vulnerable-person support", category: "PROFESSIONAL", certified: false },
  { key: "PROFESSIONAL_DRIVING", label: "Professional driving", category: "MOBILITY", certified: true },
  { key: "DEFENSIVE_DRIVING", label: "Defensive driving", category: "MOBILITY", certified: true },
  { key: "CYBERSECURITY_LITERACY", label: "Cybersecurity literacy", category: "TECHNICAL", certified: false },
  { key: "DIGITAL_ASSET_LITERACY", label: "Digital-asset literacy", category: "TECHNICAL", certified: false },
  { key: "PRIVACY_TECH", label: "Privacy and security technology", category: "TECHNICAL", certified: false },
] as const satisfies readonly CapabilityDef[];

export type CapabilityKey = (typeof CAPABILITIES)[number]["key"];
export const CAPABILITY_KEYS = CAPABILITIES.map((c) => c.key) as [CapabilityKey, ...CapabilityKey[]];

export function findCapability(key: string): CapabilityDef | undefined {
  return (CAPABILITIES as readonly CapabilityDef[]).find((c) => c.key === key);
}

export function capabilityLabel(key: string): string {
  return findCapability(key)?.label ?? key;
}

export const CAPABILITY_LEVELS = [
  { key: "BASIC", label: "Basic" },
  { key: "PROFICIENT", label: "Proficient" },
  { key: "ADVANCED", label: "Advanced" },
] as const;

export type CapabilityLevel = (typeof CAPABILITY_LEVELS)[number]["key"];
export const CAPABILITY_LEVEL_KEYS = CAPABILITY_LEVELS.map((l) => l.key) as [CapabilityLevel, ...CapabilityLevel[]];

export function levelLabel(key: string): string {
  return CAPABILITY_LEVELS.find((l) => l.key === key)?.label ?? key;
}

export const VERIFICATION_STATUSES = [
  { key: "SELF_DECLARED", label: "Self-declared" },
  { key: "VERIFIED", label: "Verified" },
  { key: "REJECTED", label: "Not accepted" },
] as const;

export type VerificationStatus = (typeof VERIFICATION_STATUSES)[number]["key"];
export const VERIFICATION_KEYS = VERIFICATION_STATUSES.map((v) => v.key) as [
  VerificationStatus,
  ...VerificationStatus[],
];

export function verificationLabel(key: string): string {
  return VERIFICATION_STATUSES.find((v) => v.key === key)?.label ?? key;
}

export const CAPABILITY_LIMITS = { evidenceMax: 300, certificationMax: 120 } as const;

/** Form field name for one part of a capability row — shared by the form, the
 * parser (src/domain/inputs.ts) and the AI form registry. */
export const capabilityFieldName = (key: string, part: "level" | "certification" | "evidence" | "expiresOn") =>
  `cap.${key}.${part}`;

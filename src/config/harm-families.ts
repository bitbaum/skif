/**
 * SSOT for the families of harm (docs/DOCTRINE.md "Families of harm"). Every
 * concern an assessment can raise belongs to exactly one family, and the
 * catalogue must answer every family — a threat model with only the physical
 * row is the conventional security company the doctrine rejects.
 */
export const HARM_FAMILIES = [
  { key: "PHYSICAL", label: "Physical", description: "Violence, stalking, break-ins, being followed." },
  { key: "CYBER", label: "Cyber and digital", description: "Accounts, devices, phishing, crypto keys." },
  { key: "PRIVACY", label: "Privacy", description: "Being found, tracked or profiled; leaked addresses." },
  { key: "REPUTATIONAL", label: "Reputation", description: "Impersonation, coordinated attacks, fabricated material." },
  { key: "FAMILY", label: "Family and loved ones", description: "Children, partners, vulnerable relatives." },
  { key: "HEALTH", label: "Health and emergencies", description: "First aid and preparedness — never instead of medical care." },
  { key: "FINANCIAL", label: "Money and assets", description: "Fraud, scams, coercion, access to valuables." },
  { key: "ENVIRONMENTAL", label: "Places and surroundings", description: "Hazards at home or work, the area around you, occasions." },
  {
    key: "INSTITUTIONAL",
    label: "Institutions and rights",
    description: "Dealing with authorities, employers or companies — we point to professionals, never pretend to be one.",
  },
  { key: "RESILIENCE", label: "When things go wrong", description: "Backup access, trusted contacts, what to do next." },
] as const;

export type HarmFamily = (typeof HARM_FAMILIES)[number]["key"];
export const HARM_FAMILY_KEYS = HARM_FAMILIES.map((f) => f.key) as [HarmFamily, ...HarmFamily[]];

export function familyLabel(key: HarmFamily): string {
  return HARM_FAMILIES.find((f) => f.key === key)?.label ?? key;
}

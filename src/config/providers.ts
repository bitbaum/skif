/**
 * Who delivers an intervention that needs spending money (docs/DOCTRINE.md
 * "The Safety Graph and the marketplace"): people, products and services, not
 * only Protectors. These are kinds of provider; named, vetted providers are the
 * marketplace (docs/GAP.md P2).
 */
export const PROVIDER_TYPES = [
  { key: "PROTECTOR", label: "A Skif Protector" },
  { key: "INSTALLER", label: "A locksmith or installer" },
  { key: "RETAILER", label: "Any shop — nothing to install" },
  { key: "ALARM_MONITORING", label: "An alarm-monitoring company" },
  { key: "DEESCALATION_TRAINER", label: "A de-escalation trainer" },
  { key: "CYBER_SPECIALIST", label: "A cyber-security specialist" },
  { key: "PRIVACY_SPECIALIST", label: "A privacy and data-removal specialist" },
  { key: "REPUTATION_RESPONSE", label: "A reputation and crisis-response specialist" },
  { key: "PREPAREDNESS_TRAINER", label: "A first-aid and preparedness trainer" },
  { key: "LEGAL", label: "An independent lawyer — Skif refers, it never gives legal advice" },
] as const;

export type ProviderType = (typeof PROVIDER_TYPES)[number]["key"];

export function providerLabel(key: ProviderType): string {
  return PROVIDER_TYPES.find((p) => p.key === key)?.label ?? key;
}

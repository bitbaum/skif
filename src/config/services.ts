/**
 * SSOT for the services a customer can book. Prices are deliberately absent:
 * Operations quotes each booking, and payment stays PAYMENT_PENDING until it
 * is settled manually (see src/domain/payment.ts).
 */
export const SERVICES = [
  {
    key: "NIGHT_OUT",
    label: "Night Out",
    description: "A calm, qualified person with you for an evening in the city.",
  },
  {
    key: "GET_HOME",
    label: "Getting home",
    description: "Accompanied home after unwanted attention or a late night.",
  },
  {
    key: "HIGH_EXPOSURE",
    label: "High-exposure person",
    description: "Low-key protection for someone with a public or financial profile.",
  },
  {
    key: "FAMILY",
    label: "Family",
    description: "A steady presence for a family outing or a difficult occasion.",
  },
  {
    key: "VENUE_STAFF",
    label: "Venue de-escalation staff",
    description: "For nightclubs and venues: staff who defuse rather than confront.",
  },
] as const;

export type ServiceKey = (typeof SERVICES)[number]["key"];
export const SERVICE_KEYS = SERVICES.map((s) => s.key) as [ServiceKey, ...ServiceKey[]];

export function serviceLabel(key: string): string {
  return SERVICES.find((s) => s.key === key)?.label ?? key;
}

/** Zürich districts (Kreise). Coarse on purpose: the exact meeting point is
 * only revealed to the Protector once they have accepted the job. */
export const AREAS = [
  "Kreis 1",
  "Kreis 2",
  "Kreis 3",
  "Kreis 4",
  "Kreis 5",
  "Kreis 6",
  "Kreis 7",
  "Kreis 8",
  "Kreis 9",
  "Kreis 10",
  "Kreis 11",
  "Kreis 12",
  "Outside the city",
] as const;

export type Area = (typeof AREAS)[number];

export const BOOKING_LIMITS = {
  minHours: 1,
  maxHours: 12,
  notesMax: 1000,
  meetingPointMax: 300,
} as const;

/**
 * Swiss public emergency numbers (SPEC §24). Skif is not an emergency
 * service: wherever someone might reach for help through Skif, these are
 * the numbers it points to instead.
 */
export const EMERGENCY_NUMBERS = [
  { number: "117", label: "Police" },
  { number: "144", label: "Ambulance" },
  { number: "118", label: "Fire" },
  { number: "112", label: "European emergency number" },
] as const;

export const NOT_AN_EMERGENCY_SERVICE =
  "Skif is not an emergency service. Operations and Protectors cannot send police, an ambulance or the fire brigade.";

/** "117 (police), 144 (ambulance), …" for prose that names the numbers inline. */
export function emergencyNumbersText(): string {
  return EMERGENCY_NUMBERS.map((e) => `${e.number} (${e.label.toLowerCase()})`).join(", ");
}

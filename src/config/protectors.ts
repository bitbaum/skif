/** Limits on what a Protector writes about themselves. Capabilities live in
 * src/config/capabilities.ts. */
export const PROTECTOR_LIMITS = {
  displayNameMax: 60,
  bioMax: 800,
  experienceYearsMax: 60,
} as const;

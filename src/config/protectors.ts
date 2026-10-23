/** Limits on what a Protector writes about themselves. Capabilities live in
 * src/config/capabilities.ts. */
export const PROTECTOR_LIMITS = {
  displayNameMax: 60,
  bioMax: 800,
  experienceYearsMax: 60,
} as const;

/** The form's own words for each field, so an error reads like the form
 * does ("Styles you work in: choose at least one") and not like the code. */
export const APPLICATION_FIELD_LABELS: Record<string, string> = {
  displayName: "Name shown to customers",
  bio: "About you",
  experienceYears: "Years of relevant experience",
  languages: "Languages",
  services: "Services you offer",
  presenceStyles: "Styles you work in",
  capabilities: "What you can show",
};

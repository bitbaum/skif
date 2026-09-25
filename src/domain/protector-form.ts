import { capabilityFieldName } from "@/config/capabilities";

type SavedProfile = {
  displayName: string;
  bio: string;
  services: readonly string[];
  languages: readonly string[];
  experienceYears: number;
  presenceStyles: readonly string[];
};
type SavedCapability = { capability: string; level: string; evidence: string };

/**
 * The application form's starting values, keyed exactly as the form posts
 * them. A first application starts blank — experience included, so it is
 * the person (or the assistant, from what they wrote) who sets it, not a
 * silent 0.
 */
export function applicationValues(
  profile: SavedProfile | null,
  held: readonly SavedCapability[],
): Record<string, string | string[]> {
  const values: Record<string, string | string[]> = profile
    ? {
        displayName: profile.displayName,
        bio: profile.bio,
        services: [...profile.services],
        languages: [...profile.languages],
        experienceYears: String(profile.experienceYears),
        presenceStyles: [...profile.presenceStyles],
      }
    : {};
  for (const row of held) {
    values[capabilityFieldName(row.capability, "level")] = row.level;
    values[capabilityFieldName(row.capability, "evidence")] = row.evidence;
  }
  return values;
}

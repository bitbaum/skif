import type { DevelopmentProfile } from "bip-kit";
import { DevelopmentPage } from "bip-kit/react";
import "bip-kit/styles.css";
import { DEVELOPMENT_LABELS, DEVELOPMENT_SOURCE } from "@/config/development";

/**
 * Skif's roadmap or changelog, rendered by bip-kit's shared renderer so every
 * fleet product shows these records the same way. Colours and faces come from
 * Skif's tokens: the `--bp-*` variables are mapped in globals.css.
 * `profile === null` renders bip-kit's "temporarily unavailable" state.
 */
export function DevelopmentRecords({
  profile,
  section,
}: {
  profile: DevelopmentProfile | null;
  section: "roadmap" | "changelog";
}) {
  return (
    <DevelopmentPage
      profile={profile}
      section={section}
      profileHref={DEVELOPMENT_SOURCE.profileUrl}
      labels={DEVELOPMENT_LABELS}
    />
  );
}

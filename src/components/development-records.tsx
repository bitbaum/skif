import { DevelopmentPage } from "bip-kit/react";
import "bip-kit/styles.css";
import { DEVELOPMENT_LABELS, DEVELOPMENT_PRINCIPLES_URL, PUBLIC_DEVELOPMENT } from "@/config/development";

/**
 * Skif's roadmap or changelog, rendered by bip-kit's shared renderer so every
 * fleet product shows these records the same way. Colours and faces come from
 * Skif's tokens: the `--bp-*` variables are mapped in globals.css.
 */
export function DevelopmentRecords({ section }: { section: "roadmap" | "changelog" }) {
  return (
    <DevelopmentPage
      profile={PUBLIC_DEVELOPMENT}
      section={section}
      profileHref={DEVELOPMENT_PRINCIPLES_URL}
      labels={DEVELOPMENT_LABELS}
    />
  );
}

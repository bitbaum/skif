import type { Metadata } from "next";
import { shareMetadata } from "@/site/share";
import { SiteSectionsView } from "@/components/site/site-sections";
import { PHOTOS } from "@/config/photos";
import { protectorsPage } from "@/site/protectors";

export const metadata: Metadata = shareMetadata("/protectors");

export default function ProtectorsPage() {
  return <SiteSectionsView sections={protectorsPage().sections} photo={PHOTOS.doorway} />;
}

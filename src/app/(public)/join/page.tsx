import type { Metadata } from "next";
import { shareMetadata } from "@/site/share";
import { SiteSectionsView } from "@/components/site/site-sections";
import { PHOTOS } from "@/config/photos";
import { joinPage } from "@/site/join";

export const metadata: Metadata = shareMetadata("/join");

export default function JoinPage() {
  return <SiteSectionsView sections={joinPage().sections} photo={PHOTOS.parkour} />;
}

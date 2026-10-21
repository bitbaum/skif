import type { Metadata } from "next";
import { shareMetadata } from "@/site/share";
import { SiteSectionsView } from "@/components/site/site-sections";
import { PHOTOS } from "@/config/photos";
import { businessPage } from "@/site/business";

export const metadata: Metadata = shareMetadata("/business");

export default function BusinessPage() {
  return <SiteSectionsView sections={businessPage().sections} photo={PHOTOS.tramStop} />;
}

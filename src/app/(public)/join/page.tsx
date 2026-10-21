import type { Metadata } from "next";
import { SiteSectionsView } from "@/components/site/site-sections";
import { PHOTOS } from "@/config/photos";
import { joinPage } from "@/site/join";

export const metadata: Metadata = {
  title: "Work with Skif",
  description: "Work with Skif as a Protector, a school or a specialist.",
};

export default function JoinPage() {
  return <SiteSectionsView sections={joinPage().sections} photo={PHOTOS.parkour} />;
}

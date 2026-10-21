import type { Metadata } from "next";
import { SiteSectionsView } from "@/components/site/site-sections";
import { PHOTOS } from "@/config/photos";
import { protectorsPage } from "@/site/protectors";

export const metadata: Metadata = {
  title: "Protectors",
  description: "A vetted, calm professional beside you: what people book a Protector for, how a booking works, and the rules it keeps.",
};

export default function ProtectorsPage() {
  return <SiteSectionsView sections={protectorsPage().sections} photo={PHOTOS.doorway} />;
}

import type { Metadata } from "next";
import { SiteSectionsView } from "@/components/site/site-sections";
import { PHOTOS } from "@/config/photos";
import { businessPage } from "@/site/business";

export const metadata: Metadata = {
  title: "For businesses and venues",
  description: "Shops, bars, clubs, offices and events: an assessment of the place, staff who defuse, training, and the day a protest comes past.",
};

export default function BusinessPage() {
  return <SiteSectionsView sections={businessPage().sections} photo={PHOTOS.tramStop} />;
}

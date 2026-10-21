import type { Metadata } from "next";
import { SitePageView } from "@/components/site/site-page";
import { academyPage } from "@/site/academy";

export const metadata: Metadata = {
  title: "Academy",
  description: "The Skif Academy: first aid, de-escalation, martial arts, driving and digital security. What Protectors learn, open to anyone.",
};

export default function AcademyPage() {
  return <SitePageView page={academyPage()} />;
}

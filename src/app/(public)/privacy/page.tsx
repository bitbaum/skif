import type { Metadata } from "next";
import { LockKeyhole } from "lucide-react";
import { SiteSectionsView } from "@/components/site/site-sections";
import { privacyPage } from "@/site/privacy";

export const metadata: Metadata = {
  title: "What Skif keeps",
  description: "Every record Skif stores about you, who sees it, and what Skif never collects.",
};

export default function PrivacyPage() {
  return <SiteSectionsView sections={privacyPage().sections} icon={<LockKeyhole aria-hidden className="size-6" strokeWidth={1.75} />} />;
}

import type { Metadata } from "next";
import { shareMetadata } from "@/site/share";
import { LockKeyhole } from "lucide-react";
import { SiteSectionsView } from "@/components/site/site-sections";
import { privacyPage } from "@/site/privacy";

export const metadata: Metadata = shareMetadata("/privacy");

export default function PrivacyPage() {
  return <SiteSectionsView sections={privacyPage().sections} icon={<LockKeyhole aria-hidden className="size-6" strokeWidth={1.75} />} />;
}

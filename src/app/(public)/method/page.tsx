import type { Metadata } from "next";
import { shareMetadata } from "@/site/share";
import { Scale } from "lucide-react";
import { SiteSectionsView } from "@/components/site/site-sections";
import { methodPage } from "@/site/method";

export const metadata: Metadata = shareMetadata("/method");

export default function MethodPage() {
  return <SiteSectionsView sections={methodPage().sections} icon={<Scale aria-hidden className="size-6" strokeWidth={1.75} />} />;
}

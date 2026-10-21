import type { Metadata } from "next";
import { Scale } from "lucide-react";
import { SiteSectionsView } from "@/components/site/site-sections";
import { methodPage } from "@/site/method";

export const metadata: Metadata = {
  title: "How Skif decides",
  description: "The most proportionate step, what every step costs, hard limits, and how a Protector is chosen.",
};

export default function MethodPage() {
  return <SiteSectionsView sections={methodPage().sections} icon={<Scale aria-hidden className="size-6" strokeWidth={1.75} />} />;
}

import type { Metadata } from "next";
import { SitePageView } from "@/components/site/site-page";
import { methodPage } from "@/site/method";

export const metadata: Metadata = {
  title: "Method",
  description: "How Skif decides: the most proportionate step, what every step costs, hard limits and how a Protector is chosen.",
};

export default function MethodPage() {
  return <SitePageView page={methodPage()} />;
}

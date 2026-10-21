import type { Metadata } from "next";
import { SitePageView } from "@/components/site/site-page";
import { joinPage } from "@/site/join";

export const metadata: Metadata = {
  title: "Join",
  description: "Work with Skif as a Protector, a school or a specialist.",
};

export default function JoinPage() {
  return <SitePageView page={joinPage()} />;
}

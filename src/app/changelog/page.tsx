import type { Metadata } from "next";
import { DevelopmentRecords } from "@/components/development-records";
import { FeedbackWidget } from "@/components/feedback-widget";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What you can now do with Skif, newest first.",
};

export default function ChangelogPage() {
  return (
    <main>
      <DevelopmentRecords section="changelog" />
      <FeedbackWidget />
    </main>
  );
}

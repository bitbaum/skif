import type { Metadata } from "next";
import { DevelopmentRecords } from "@/components/development-records";
import { FeedbackWidget } from "@/components/feedback-widget";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "What Skif is working towards next. Planned work is a direction, not a delivery promise.",
};

export default function RoadmapPage() {
  return (
    <main>
      <DevelopmentRecords section="roadmap" />
      <FeedbackWidget />
    </main>
  );
}

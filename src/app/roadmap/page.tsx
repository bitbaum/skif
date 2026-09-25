import type { Metadata } from "next";
import { connection } from "next/server";
import { DevelopmentRecords } from "@/components/development-records";
import { FeedbackWidget } from "@/components/feedback-widget";
import { loadDevelopment } from "@/server/development";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "What Skif is working towards, read from its project profile. Planned work is not a delivery promise.",
};

export default async function RoadmapPage() {
  // Rendered per request (the map fetch itself is cached), so `next build`
  // never depends on Loki being reachable.
  await connection();
  const profile = await loadDevelopment();
  return (
    <main>
      <DevelopmentRecords profile={profile} section="roadmap" />
      <FeedbackWidget />
    </main>
  );
}

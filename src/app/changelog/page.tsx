import type { Metadata } from "next";
import { connection } from "next/server";
import { DevelopmentRecords } from "@/components/development-records";
import { FeedbackWidget } from "@/components/feedback-widget";
import { loadDevelopment } from "@/server/development";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What has changed in Skif, read from its project profile.",
};

export default async function ChangelogPage() {
  // Rendered per request (the map fetch itself is cached), so `next build`
  // never depends on Loki being reachable.
  await connection();
  const profile = await loadDevelopment();
  return (
    <main>
      <DevelopmentRecords profile={profile} section="changelog" />
      <FeedbackWidget />
    </main>
  );
}

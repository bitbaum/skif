import type { Metadata } from "next";
import { DevelopmentRecords } from "@/components/development-records";
import { pageLocale, type LocaleParams } from "@/i18n/page";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "What Skif is working towards next. Planned work is a direction, not a delivery promise.",
};

export default async function RoadmapPage({ params }: { params: LocaleParams }) {
  await pageLocale(params);
  return (
    <>
      <DevelopmentRecords section="roadmap" />
    </>
  );
}

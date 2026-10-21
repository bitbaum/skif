import type { Metadata } from "next";
import { DevelopmentRecords } from "@/components/development-records";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What you can now do with Skif, newest first.",
};

export default function ChangelogPage() {
  return (
    <>
      <DevelopmentRecords section="changelog" />
    </>
  );
}

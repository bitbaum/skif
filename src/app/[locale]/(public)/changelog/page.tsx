import type { Metadata } from "next";
import { DevelopmentRecords } from "@/components/development-records";
import { pageLocale, type LocaleParams } from "@/i18n/page";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What you can now do with Skif, newest first.",
};

export default async function ChangelogPage({ params }: { params: LocaleParams }) {
  await pageLocale(params);
  return (
    <>
      <DevelopmentRecords section="changelog" />
    </>
  );
}

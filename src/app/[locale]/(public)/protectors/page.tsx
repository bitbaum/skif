import type { Metadata } from "next";
import { shareMetadata } from "@/site/share";
import { SiteSectionsView } from "@/components/site/site-sections";
import { PHOTOS } from "@/config/photos";
import { protectorsPage } from "@/site/protectors";
import { pageLocale, type LocaleParams } from "@/i18n/page";

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  return shareMetadata("/protectors", await pageLocale(params));
}

export default async function ProtectorsPage({ params }: { params: LocaleParams }) {
  await pageLocale(params);
  return <SiteSectionsView sections={protectorsPage().sections} photo={PHOTOS.doorway} />;
}

import type { Metadata } from "next";
import { shareMetadata } from "@/site/share";
import { SiteSectionsView } from "@/components/site/site-sections";
import { PHOTOS } from "@/config/photos";
import { businessPage } from "@/site/business";
import { pageLocale, type LocaleParams } from "@/i18n/page";

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  return shareMetadata("/business", await pageLocale(params));
}

export default async function BusinessPage({ params }: { params: LocaleParams }) {
  await pageLocale(params);
  return <SiteSectionsView sections={businessPage().sections} photo={PHOTOS.tramStop} />;
}

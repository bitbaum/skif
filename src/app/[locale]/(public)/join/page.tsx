import type { Metadata } from "next";
import { shareMetadata } from "@/site/share";
import { SiteSectionsView } from "@/components/site/site-sections";
import { PHOTOS } from "@/config/photos";
import { joinPage } from "@/site/join";
import { pageLocale, type LocaleParams } from "@/i18n/page";

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  return shareMetadata("/join", await pageLocale(params));
}

export default async function JoinPage({ params }: { params: LocaleParams }) {
  await pageLocale(params);
  return <SiteSectionsView sections={joinPage().sections} photo={PHOTOS.parkour} />;
}

import type { Metadata } from "next";
import { shareMetadata } from "@/site/share";
import { SiteSectionsView } from "@/components/site/site-sections";
import { PHOTOS } from "@/config/photos";
import { pageIn } from "@/site/pages";
import { pageLocale, type LocaleParams } from "@/i18n/page";

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  return shareMetadata("/join", await pageLocale(params));
}

export default async function JoinPage({ params }: { params: LocaleParams }) {
  const locale = await pageLocale(params);
  return <SiteSectionsView sections={pageIn("join", locale).sections} photo={PHOTOS.parkour} />;
}

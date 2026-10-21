import type { Metadata } from "next";
import { GuideList } from "@/components/site/guide-list";
import { SectionIntro } from "@/components/site/section-intro";
import { SHELL } from "@/components/site/shell";
import { GUIDES_SECTION } from "@/config/site";
import { GUIDES } from "@/config/guides";

export const metadata: Metadata = {
  title: "Guides",
  description: "Deep, practical guides on self-defence, weapons, combat sports, devices, money, children, travel and more.",
};

export default function GuidesIndex() {
  return (
    <div className={`${SHELL} pt-14 sm:pt-20`}>
      <SectionIntro id="guides-title" eyebrow={GUIDES_SECTION.eyebrow} title={GUIDES_SECTION.title} lede={GUIDES_SECTION.lede} />
      <GuideList guides={GUIDES} />
    </div>
  );
}

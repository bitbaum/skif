import type { Metadata } from "next";
import { FieldIndex } from "@/components/site/field-index";
import { SafetyMap } from "@/components/site/safety-map";
import { SectionIntro } from "@/components/site/section-intro";
import { SHELL } from "@/components/site/shell";
import { FIELDS_SECTION, HOME } from "@/config/site";

export const metadata: Metadata = {
  title: "The ten fields of safety",
  description: "Physical, digital, privacy, reputation, family, health, money, places, rights and resilience: what can go wrong in each, and what helps.",
};

export default function SafetyIndex() {
  return (
    <div className={`${SHELL} pt-14 sm:pt-20`}>
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionIntro id="safety-title" eyebrow="Safety" title={FIELDS_SECTION.title} lede={FIELDS_SECTION.lede} />
        </div>
        <div className="mx-auto w-full max-w-md lg:col-span-5">
          <SafetyMap caption={HOME.mapCaption} />
        </div>
      </div>
      <div className="mt-12">
        <FieldIndex />
      </div>
    </div>
  );
}

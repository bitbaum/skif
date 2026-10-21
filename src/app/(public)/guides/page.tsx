import type { Metadata } from "next";
import { shareMetadata } from "@/site/share";
import { GuideBrowser } from "@/components/site/guide-browser";
import { PageHero } from "@/components/site/page-hero";
import { SHELL } from "@/components/site/shell";
import { GUIDES } from "@/config/guides";
import { familyLabel, HARM_FAMILIES } from "@/config/harm-families";

export const metadata: Metadata = shareMetadata("/guides");

export default function GuidesIndex() {
  const cards = GUIDES.map((g) => ({ slug: g.slug, title: g.title, summary: g.summary, fields: g.fields, fieldLabels: g.fields.map(familyLabel).join(" · ") }));
  const filters = HARM_FAMILIES.filter((f) => GUIDES.some((g) => g.fields.includes(f.key))).map((f) => ({ key: f.key, label: f.short }));
  return (
    <>
      <PageHero
        eyebrow="Library · Guides"
        statement="Read deeper. Act today."
        lead={["Each guide covers one subject in depth and ends in steps you can take this week. Filter by the field of safety you care about."]}
      />
      <div className={SHELL}>
        <GuideBrowser guides={cards} filters={filters} />
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { GuideList } from "@/components/site/guide-list";
import { PageHero } from "@/components/site/page-hero";
import { SHELL } from "@/components/site/shell";
import { GUIDES } from "@/config/guides";

export const metadata: Metadata = {
  title: "Guides",
  description: "Practical guides on self-defence, weapons, combat sports, devices, money, children, travel and more.",
};

export default function GuidesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Library · Guides"
        statement="Read deeper. Act today."
        lead={["Each guide covers one subject in depth and ends in steps you can take this week."]}
      />
      <div className={SHELL}>
        <GuideList guides={GUIDES} />
      </div>
    </>
  );
}

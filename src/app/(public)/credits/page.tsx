import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { SHELL } from "@/components/site/shell";
import { PHOTOS } from "@/config/photos";

export const metadata: Metadata = { title: "Photo credits", description: "Every photograph on Skif's site, its photographer and its licence." };

export default function CreditsPage() {
  return (
    <>
      <PageHero eyebrow="Credits" statement="Photographs" lead={["Every photograph on this site, who took it, and the licence it is used under."]} />
      <div className={SHELL}>
        <ul className="divide-y divide-subtle border-y border-subtle">
          {Object.values(PHOTOS).map((p) => (
            <li key={p.src} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <span className="text-fg-primary">{p.alt}</span>
              <span className="shrink-0 text-sm text-fg-secondary">
                <a href={p.credit.page} rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                  {p.credit.photographer}
                </a>{" "}
                · {p.credit.licence}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

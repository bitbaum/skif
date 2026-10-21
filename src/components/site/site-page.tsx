import type { SitePage } from "@bitbaum/sitekit";
import { SiteSections } from "@bitbaum/sitekit/react";
import type { ReactNode } from "react";
import { SHELL } from "./shell";

/** A public page made of sitekit sections, with room for what comes after
 * them (links onward). */
export function SitePageView({ page, children }: { page: SitePage; children?: ReactNode }) {
  return (
    <div className={`${SHELL} pt-12 sm:pt-16`}>
      <SiteSections sections={page.sections} />
      {children}
    </div>
  );
}

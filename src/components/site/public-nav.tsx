"use client";

import { SiteNav } from "@bitbaum/sitekit/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/config/site";

const ITEMS = NAV.map((n) => ({ path: n.href.slice(1), label: n.label }));

/** sitekit's nav (44px targets, focus ring, one scrolling row on a phone),
 * marking the section a page belongs to: /safety/privacy is under Safety. */
export function PublicNav() {
  const section = usePathname().split("/")[1] ?? "";
  return <SiteNav items={ITEMS} currentPath={section} Link={Link} />;
}

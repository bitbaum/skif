"use client";

import { SiteNav } from "@bitbaum/sitekit/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/config/site";

const ITEMS = NAV.map((n) => ({ path: n.href.slice(1), label: n.label }));

/** sitekit's nav (44px targets, focus ring, one scrolling row on a phone),
 * marking the place a page belongs to: a field page or a guide is Library. */
export function PublicNav() {
  const first = usePathname().split("/")[1] ?? "";
  const owner = NAV.find((n) => (n.covers as readonly string[]).includes(first));
  return <SiteNav items={ITEMS} currentPath={owner ? owner.href.slice(1) : first} Link={Link} />;
}

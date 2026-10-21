"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type AppNavLink = { href: string; label: string; fullLoad?: boolean };

const linkClass =
  "inline-flex min-h-11 items-center whitespace-nowrap border-b-2 border-transparent text-fg-secondary hover:text-fg-primary aria-[current=page]:border-fg-primary aria-[current=page]:text-fg-primary";

/** My Skif's sections: one row under the header, every link a 44px target,
 * the section you are in marked. Labels are short enough to fit a phone; with
 * Operations added the row scrolls sideways rather than wrapping. */
export function AppNav({ links, className = "" }: { links: AppNavLink[]; className?: string }) {
  const pathname = usePathname();
  return (
    <nav aria-label="My Skif" className={className}>
      <ul className="-mx-1 flex gap-x-6 overflow-x-auto px-1 text-sm">
        {links.map((l) => {
          const current = pathname === l.href || pathname.startsWith(`${l.href}/`) ? "page" : undefined;
          return (
            <li key={l.href}>
              {l.fullLoad ? (
                // A full load into /ops leaves the Loki widget behind (ops/layout.tsx).
                <a href={l.href} aria-current={current} className={linkClass}>
                  {l.label}
                </a>
              ) : (
                <Link href={l.href} aria-current={current} className={linkClass}>
                  {l.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

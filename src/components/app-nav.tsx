"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type AppNavLink = { href: string; label: string; fullLoad?: boolean };

const linkClass =
  "inline-flex min-h-11 items-center whitespace-nowrap border-b-2 border-transparent text-muted hover:text-ink aria-[current=page]:border-accent aria-[current=page]:text-ink";

/** The app's sections: one row that scrolls sideways on a phone, every link a
 * 44px target, the section you are in marked. */
export function AppNav({ links, className = "" }: { links: AppNavLink[]; className?: string }) {
  const pathname = usePathname();
  return (
    <ul className={`-mx-1 flex gap-x-5 overflow-x-auto px-1 text-sm ${className}`}>
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
  );
}

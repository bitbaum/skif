import Link from "next/link";
import { SIGN_IN, STAGE } from "@/config/site";
import { PublicNav } from "./public-nav";
import { ACTION, LABEL, SHELL } from "./shell";

/** Skif's own masthead: sitekit's nav, plus what a flat sitekit masthead
 * cannot carry — the stage and a sign-in action. A hairline, no fill. */
export function PublicHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-subtle bg-surface-page/85 backdrop-blur">
      <div className={`${SHELL} flex flex-wrap items-center gap-x-6 py-2`}>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-3 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span className="font-heading text-lg font-semibold tracking-display text-fg-primary">Skif</span>
          <span className={`${LABEL} rounded-full border border-subtle px-2 py-0.5`}>{STAGE}</span>
        </Link>
        <div className="order-last w-full md:order-none md:w-auto md:flex-1">
          <PublicNav />
        </div>
        <Link href={SIGN_IN.href} className={`${ACTION.secondary} ml-auto md:ml-0`}>
          {SIGN_IN.label}
        </Link>
      </div>
    </header>
  );
}

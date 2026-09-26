import Link from "next/link";
import { buttonClass } from "@/components/ui";
import { HEADER_LINKS, SIGN_IN, STAGE } from "@/config/landing";

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-surface">
      <nav aria-label="Main" className="section-shell flex items-center gap-4 py-3">
        <Link href="/" className="wordmark inline-flex min-h-11 min-w-11 items-center text-lg text-ink">
          Skif
        </Link>
        <span className="rounded-full border border-line px-2 py-0.5 text-sm font-medium text-muted">{STAGE}</span>
        <div className="ml-auto flex items-center gap-5 text-sm">
          {HEADER_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hidden min-h-11 items-center text-muted hover:text-ink sm:inline-flex">
              {l.label}
            </Link>
          ))}
          <Link href={SIGN_IN.href} className={buttonClass.secondary}>
            {SIGN_IN.label}
          </Link>
        </div>
      </nav>
    </header>
  );
}

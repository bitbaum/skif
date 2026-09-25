import Link from "next/link";
import { buttonClass } from "@/components/ui";
import { HEADER_LINKS, SIGN_IN, STAGE } from "@/config/landing";

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-surface">
      <nav aria-label="Main" className="section-shell flex items-center gap-4 py-3">
        <Link href="/" className="wordmark text-lg text-ink">
          Skif
        </Link>
        <span className="rounded-full border border-line px-2 py-0.5 text-xs font-medium text-muted">{STAGE}</span>
        <div className="ml-auto flex items-center gap-5 text-sm">
          {HEADER_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hidden text-muted hover:text-ink sm:inline">
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

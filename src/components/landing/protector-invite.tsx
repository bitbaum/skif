import Link from "next/link";
import { buttonClass } from "@/components/ui";
import { PROTECTOR_INVITE } from "@/config/landing";

export function ProtectorInvite() {
  return (
    <section aria-labelledby="protector-title" className="section-y-tight border-t border-line">
      <div className="section-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-copy space-y-3">
          <h2 id="protector-title" className="font-display text-subsection text-ink">
            {PROTECTOR_INVITE.title}
          </h2>
          <p className="text-muted">{PROTECTOR_INVITE.body}</p>
        </div>
        <Link href={PROTECTOR_INVITE.cta.href} className={`${buttonClass.secondary} self-start md:self-center`}>
          {PROTECTOR_INVITE.cta.label}
        </Link>
      </div>
    </section>
  );
}

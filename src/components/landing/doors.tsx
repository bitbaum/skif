import Link from "next/link";
import { buttonClass } from "@/components/ui";
import { DOORS, DOORS_SECTION, type Door } from "@/config/landing";
import { Illustration } from "./illustration";

function DoorCard({ door }: { door: Door }) {
  return (
    <li className="flex flex-col overflow-hidden rounded-card border border-line bg-surface">
      <Illustration art={door.art} sizes="(min-width: 768px) 33vw, 100vw" />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="mb-3 text-xl font-semibold text-ink">{door.title}</h3>
        <p className="mb-6 text-muted">{door.body}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link href={door.cta.href} className={buttonClass.primary}>
            {door.cta.label}
          </Link>
          {door.secondary && (
            <Link href={door.secondary.href} className={buttonClass.link}>
              {door.secondary.label}
            </Link>
          )}
        </div>
      </div>
    </li>
  );
}

export function Doors() {
  return (
    <section aria-labelledby="doors-title" className="pb-16 sm:pb-20">
      <div className="section-shell">
        <h2 id="doors-title" className="mb-6 text-lg font-semibold text-ink">
          {DOORS_SECTION.title}
        </h2>
        <ul className="grid gap-4 md:grid-cols-3 md:gap-5">
          {DOORS.map((door) => (
            <DoorCard key={door.key} door={door} />
          ))}
        </ul>
        <p className="mt-5 text-sm text-muted">{DOORS_SECTION.note}</p>
      </div>
    </section>
  );
}

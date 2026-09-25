import Link from "next/link";
import { buttonClass } from "@/components/ui";
import { DOORS, DOORS_SECTION, type Door } from "@/config/landing";
import { LandingIcon } from "./icons";

function DoorCard({ door }: { door: Door }) {
  return (
    <li className="flex flex-col rounded-card border border-line bg-surface p-6 sm:p-7">
      <span className="mb-5 inline-flex size-11 items-center justify-center rounded-full bg-accent-soft text-accent">
        <LandingIcon name={door.icon} />
      </span>
      <h3 className="mb-3 text-xl font-semibold text-ink">{door.title}</h3>
      <p className="mb-6 text-muted">{door.body}</p>
      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3">
        <Link href={door.cta.href} className={buttonClass.primary}>
          {door.cta.label}
        </Link>
        {door.secondary && (
          <Link href={door.secondary.href} className="text-sm font-medium text-accent underline-offset-4 hover:underline">
            {door.secondary.label}
          </Link>
        )}
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

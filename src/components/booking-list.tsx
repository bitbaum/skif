import Link from "next/link";
import { serviceLabel, type ServiceKey } from "@/config/services";
import { comingAndPast, type BookingStatus } from "@/domain/lifecycle";
import { StatusBadge } from "./booking";
import { formatWhen } from "./ui";

type Listed = { id: string; service: ServiceKey; status: BookingStatus; startsAt: Date; area: string };
type Href = (id: string) => string;
type Heading = "h2" | "h3";

function Section({ title, bookings, href, heading: H }: { title: string; bookings: Listed[]; href: Href; heading: Heading }) {
  return (
    <section className="space-y-2">
      <H className="text-sm font-semibold uppercase tracking-wide text-muted">{title}</H>
      <ul className="divide-y divide-line rounded-card border border-line bg-surface">
        {bookings.map((b) => (
          <li key={b.id}>
            <Link href={href(b.id)} className="block space-y-1 p-4 hover:bg-bg">
              <span className="flex items-center justify-between gap-3">
                <span className="font-medium">{serviceLabel(b.service)}</span>
                <StatusBadge status={b.status} />
              </span>
              <span className="block text-sm text-muted">
                {formatWhen(b.startsAt)} · {b.area}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Bookings or jobs as a person thinks of them: Coming up (still to happen
 * or happening now, soonest first) and Past (latest first). */
export function BookingSections({
  bookings,
  href,
  heading = "h2",
}: {
  bookings: readonly Listed[];
  href: Href;
  /** h3 when the sections sit inside a titled card. */
  heading?: Heading;
}) {
  const { coming, past } = comingAndPast(bookings);
  return (
    <div className="space-y-8">
      {coming.length > 0 && <Section title="Coming up" bookings={coming} href={href} heading={heading} />}
      {past.length > 0 && <Section title="Past" bookings={past} href={href} heading={heading} />}
    </div>
  );
}

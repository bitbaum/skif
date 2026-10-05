import type { Metadata } from "next";
import Link from "next/link";
import { StatusBadge } from "@/components/booking";
import { ButtonLink, Empty, formatWhen, PageHeader } from "@/components/ui";
import { serviceLabel } from "@/config/services";
import { getDb } from "@/db/client";
import { comingAndPast } from "@/domain/lifecycle";
import { listCustomerBookings, type Booking } from "@/server/bookings";
import { requireViewer } from "@/server/viewer";

export const metadata: Metadata = { title: "Bookings" };

function BookingList({ title, bookings }: { title: string; bookings: Booking[] }) {
  return (
    <section className="space-y-2">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">{title}</h2>
      <ul className="divide-y divide-line rounded-card border border-line bg-surface">
        {bookings.map((b) => (
          <li key={b.id}>
            <Link href={`/bookings/${b.id}`} className="block space-y-1 p-4 hover:bg-bg">
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

export default async function BookingsPage() {
  const viewer = await requireViewer();
  const bookings = await listCustomerBookings(getDb(), viewer.sub);
  const { coming, past } = comingAndPast(bookings);

  return (
    <>
      <PageHeader title="Your bookings" lead="Someone calm and qualified with you, when you want it.">
        <ButtonLink href="/bookings/new">Request a Protector</ButtonLink>
      </PageHeader>
      {bookings.length === 0 ? (
        <Empty>No bookings yet.</Empty>
      ) : (
        <div className="space-y-8">
          {coming.length > 0 && <BookingList title="Coming up" bookings={coming} />}
          {past.length > 0 && <BookingList title="Past" bookings={past} />}
        </div>
      )}
    </>
  );
}

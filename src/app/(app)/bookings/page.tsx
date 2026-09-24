import type { Metadata } from "next";
import Link from "next/link";
import { StatusBadge } from "@/components/booking";
import { ButtonLink, Empty, formatWhen, PageHeader } from "@/components/ui";
import { serviceLabel } from "@/config/services";
import { getDb } from "@/db/client";
import { listCustomerBookings } from "@/server/bookings";
import { requireViewer } from "@/server/viewer";

export const metadata: Metadata = { title: "Bookings" };

export default async function BookingsPage() {
  const viewer = await requireViewer();
  const bookings = await listCustomerBookings(getDb(), viewer.sub);

  return (
    <>
      <PageHeader title="Your bookings" lead="Someone calm and qualified with you, when you want it.">
        <ButtonLink href="/bookings/new">Request a Protector</ButtonLink>
      </PageHeader>
      {bookings.length === 0 ? (
        <Empty>No bookings yet.</Empty>
      ) : (
        <ul className="divide-y divide-line rounded-card border border-line bg-surface">
          {bookings.map((b) => (
            <li key={b.id}>
              <Link href={`/bookings/${b.id}`} className="flex flex-wrap items-center gap-3 p-4 hover:bg-bg">
                <span className="font-medium">{serviceLabel(b.service)}</span>
                <span className="text-sm text-muted">
                  {formatWhen(b.startsAt)} · {b.area}
                </span>
                <span className="ml-auto">
                  <StatusBadge status={b.status} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

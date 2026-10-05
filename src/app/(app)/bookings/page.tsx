import type { Metadata } from "next";
import { BookingSections } from "@/components/booking-list";
import { ButtonLink, Empty, PageHeader } from "@/components/ui";
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
        <BookingSections bookings={bookings} href={(id) => `/bookings/${id}`} />
      )}
    </>
  );
}

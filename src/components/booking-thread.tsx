import type { ThreadSeat } from "@/config/thread";
import { DISPLAY_LOCALE, TIME_ZONE } from "@/config/locale";
import type { ThreadClosed, ThreadView } from "@/domain/booking-thread";
import { ThreadChat } from "./thread-chat";
import { Badge } from "./ui";

const CLOSED_NOTES: Record<Exclude<ThreadClosed, null>, string> = {
  ENDED: "This booking has ended. The conversation stays here, read-only.",
  LEFT: "You're no longer on this job. You keep what you saw here; nothing new reaches you.",
};

const INTRO: Record<ThreadSeat, string> = {
  CUSTOMER: "You, Operations and — once they accept — your Protector. Your Protector sees messages from when they accepted.",
  PROTECTOR: "You, the customer and Operations. You see messages from when you accepted the job.",
  OPS: "The customer, Operations and the accepted Protector. Protectors see messages from when they accepted.",
};

const clock = new Intl.DateTimeFormat(DISPLAY_LOCALE, {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: TIME_ZONE,
});

/** A booking's thread, as this viewer may see it, with their unread count. */
export function BookingThread({
  bookingId,
  seat,
  view,
  className = "",
}: {
  bookingId: string;
  seat: ThreadSeat;
  view: ThreadView;
  className?: string;
}) {
  return (
    <section
      aria-labelledby="thread-title"
      className={`rounded-card border border-line bg-surface p-5 ${className}`}
    >
      <div className="mb-1 flex flex-wrap items-center gap-3">
        <h2 id="thread-title" className="text-lg font-semibold">
          Messages
        </h2>
        {view.unread > 0 && <Badge tone="accent">{view.unread} new</Badge>}
      </div>
      <p className="mb-4 text-sm text-muted">{view.closed ? CLOSED_NOTES[view.closed] : INTRO[seat]}</p>
      <ThreadChat
        bookingId={bookingId}
        seat={seat}
        canWrite={view.canWrite}
        messages={view.messages.map((m) => ({
          id: m.id,
          body: m.body,
          mine: m.mine,
          speaker: m.speaker,
          time: clock.format(m.createdAt),
        }))}
      />
    </section>
  );
}

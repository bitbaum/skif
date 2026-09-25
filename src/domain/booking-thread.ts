/**
 * The booking thread's rules, as pure functions over data already loaded.
 *
 * Permission is participation (threadkit): who may read or write is never a
 * role check in a query. The participant list is DERIVED from the booking's
 * lifecycle — the same events that decide what a Protector may see today —
 * so the thread cannot drift from the booking:
 *
 *  - the customer and Operations take part from the start, with full history;
 *  - a Protector joins the moment they ACCEPT (when the meeting point opens
 *    to them), and never while merely offered the job;
 *  - a Protector taken off the job leaves at that moment: they keep what they
 *    saw and receive nothing after;
 *  - writing closes for everyone once the booking has ended.
 */
import {
  canRead,
  canWrite,
  findParticipant,
  unreadCount,
  visibleMessages,
  type Message,
  type Participant,
  type Thread,
} from "threadkit";
import { isTerminal, releasesProtector, type BookingStatus } from "./lifecycle";

/** Operations is ONE participant, whoever on the team is typing: the
 * customer talks to Operations, not to a rota of names. */
export const OPS_ACTOR = "operations";
export const CUSTOMER_ACTOR = "customer";
const PROTECTOR_PREFIX = "protector:";

export function protectorActor(protectorId: string): string {
  return `${PROTECTOR_PREFIX}${protectorId}`;
}

export type ThreadBooking = { id: string; status: BookingStatus; createdAt: Date };
export type ThreadEvent = { action: string; protectorId: string | null; at: Date };
export type ReadMark = { actorId: string; lastReadAt: Date };

type Stint = { joinedAt: Date; leftAt: Date | null };

/** Each Protector's time on the job, read back from the lifecycle events.
 * Re-accepting after being taken off starts a fresh stint: threadkit keeps
 * one window per participant, and dropping the older history is the safe
 * direction — granting them the gap in between would not be. */
function protectorStints(events: readonly ThreadEvent[]): Map<string, Stint> {
  const stints = new Map<string, Stint>();
  const ordered = [...events].sort((a, b) => a.at.getTime() - b.at.getTime());
  for (const e of ordered) {
    if (!e.protectorId) continue;
    const current = stints.get(e.protectorId);
    if (e.action === "ACCEPT") stints.set(e.protectorId, { joinedAt: e.at, leftAt: null });
    else if (releasesProtector(e.action) && current && !current.leftAt) current.leftAt = e.at;
  }
  return stints;
}

export function bookingThread(
  booking: ThreadBooking,
  events: readonly ThreadEvent[],
  reads: readonly ReadMark[] = [],
): Thread {
  const open = !isTerminal(booking.status);
  const lastRead = new Map(reads.map((r) => [r.actorId, r.lastReadAt]));
  const seat = (actorId: string, role: string, joinedAt: Date): Participant => ({
    actorId,
    kind: "human",
    role,
    joinedAt,
    canWrite: open,
    lastReadAt: lastRead.get(actorId) ?? null,
  });

  const protectors = [...protectorStints(events)].map(
    ([id, stint]): Participant => ({
      ...seat(protectorActor(id), "protector", stint.joinedAt),
      leftAt: stint.leftAt,
      // Deliberately NOT 'thread-start': a Protector sees from the moment
      // they accepted. What the job needs (meeting point, notes, the name to
      // use) is already on their job page from that same moment. What came
      // before was said between the customer and Operations — possibly while
      // choosing who to send, or with a previous Protector — to an audience
      // that did not include them. Everyone sees only what the job needs.
      visibleFrom: stint.joinedAt,
    }),
  );

  return {
    id: booking.id,
    createdAt: booking.createdAt,
    participants: [
      { ...seat(CUSTOMER_ACTOR, "customer", booking.createdAt), visibleFrom: "thread-start" },
      { ...seat(OPS_ACTOR, "operations", booking.createdAt), visibleFrom: "thread-start" },
      ...protectors,
    ],
  };
}

/** Speakers are named by role, never by name: a Protector never learns who
 * the customer is from the thread, and nobody sees another person's id. */
export function speakerLabel(thread: Thread, viewerId: string, authorId: string): string {
  if (authorId === viewerId) return "You";
  if (authorId === OPS_ACTOR) return "Operations";
  if (authorId === CUSTOMER_ACTOR) return "Customer";
  const current = !findParticipant(thread, authorId)?.leftAt;
  if (viewerId === CUSTOMER_ACTOR) return current ? "Your Protector" : "Previous Protector";
  return current ? "Protector" : "Previous Protector";
}

export type ThreadMessageView = { id: string; body: string; createdAt: Date; mine: boolean; speaker: string };

/** Why the composer is closed, when it is. */
export type ThreadClosed = "ENDED" | "LEFT" | null;

export type ThreadView = {
  messages: ThreadMessageView[];
  canWrite: boolean;
  closed: ThreadClosed;
  /** Unread for this viewer, before this view marks the thread read. */
  unread: number;
};

/** What one participant may see of the thread — or null for anyone who is
 * not (or never was) a participant. Author ids never leave this function. */
export function viewThread(
  thread: Thread,
  viewerId: string,
  messages: readonly Message[],
  now: Date = new Date(),
): ThreadView | null {
  if (!canRead(thread, viewerId)) return null;
  const me = findParticipant(thread, viewerId);
  const writable = canWrite(thread, viewerId, now);
  const left = Boolean(me?.leftAt && me.leftAt.getTime() <= now.getTime());
  return {
    messages: visibleMessages(thread, viewerId, messages).map((m) => ({
      id: m.id,
      body: m.body,
      createdAt: m.createdAt,
      mine: m.authorId === viewerId,
      speaker: speakerLabel(thread, viewerId, m.authorId),
    })),
    canWrite: writable,
    closed: writable ? null : left ? "LEFT" : "ENDED",
    unread: unreadCount(thread, viewerId, messages),
  };
}

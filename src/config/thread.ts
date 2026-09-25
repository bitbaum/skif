/** The booking thread: limits, the poll, and the words that start it. */

export const THREAD_LIMITS = {
  /** A message is a line or two of coordination, not a report. */
  messageMax: 1000,
} as const;

/** No live stream: an open thread asks for news this often (ms). */
export const THREAD_POLL_MS = 15_000;

/** Where someone sits in a booking's thread. Which seat a person holds is
 * identity; whether that seat may read or write is the thread's to decide. */
export const THREAD_SEATS = ["CUSTOMER", "PROTECTOR", "OPS"] as const;
export type ThreadSeat = (typeof THREAD_SEATS)[number];

/** Starters shown in an empty thread, by who is looking. */
export const THREAD_STARTERS: Record<ThreadSeat, readonly string[]> = {
  CUSTOMER: ["I'm running a few minutes late", "I'm at the meeting point", "Can we meet somewhere else?"],
  PROTECTOR: ["I'm at the meeting point", "I'm running a few minutes late", "What are you wearing, so I can find you?"],
  OPS: ["We're finding you a Protector", "Your Protector is on the way", "Please check in when you arrive"],
};

export const THREAD_PLACEHOLDER: Record<ThreadSeat, string> = {
  CUSTOMER: "Message your Protector and Operations…",
  PROTECTOR: "Message the customer and Operations…",
  OPS: "Message everyone on this booking…",
};

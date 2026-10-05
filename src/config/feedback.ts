/**
 * The Loki feedback widget: the owner points at something on the live site and
 * an agent changes it. The project token is public by design (it ships in the
 * page) and identifies Skif to Loki.
 *
 * It is a third-party script, so for everyone else it runs on PUBLIC pages
 * only. Inside the signed-in app it loads for the people in
 * SKIF_LOKI_WATCH_SUBS alone (the owner, so Loki's watch mode can see the app
 * being used), on their own pages (preferences, bookings, assessments,
 * Protector), never under /ops, where other people's bookings, incidents and
 * complaints are: a report carries the page's text to Loki.
 */
export const FEEDBACK_WIDGET = {
  src: "https://loki.orangecat.ch/widget.js",
  project: "fcw_53c446f089ca3ec49f01217557ee0a52",
} as const;

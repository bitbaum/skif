/**
 * The Loki feedback widget: the owner points at something on the live site and
 * an agent changes it. The project token is public by design (it ships in the
 * page) and identifies Skif to Loki.
 *
 * It is a third-party script, so it runs on PUBLIC pages only — never inside
 * the signed-in app, whose pages hold preferences, bookings and incidents.
 */
export const FEEDBACK_WIDGET = {
  src: "https://loki.orangecat.ch/widget.js",
  project: "fcw_53c446f089ca3ec49f01217557ee0a52",
} as const;

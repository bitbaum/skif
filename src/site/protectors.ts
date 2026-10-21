/**
 * The Protectors page: what a Protector is, what people book one for (read
 * from the service catalogue), how a booking runs and the rules it keeps.
 * Every step described here is what the booking flow actually does.
 */
import type { SitePage } from "@bitbaum/sitekit";
import { SERVICES } from "@/config/services";

export const WEAPONS_POLICY =
  "Most Skif work involves no weapon at all: a Protector's tools are judgment, distance, de-escalation and first aid. A Protector carries a weapon only where they hold the legal licence to carry it and the job calls for it.";

export function protectorsPage(): SitePage {
  return {
    path: "protectors",
    title: "Protectors",
    intro: "Someone calm beside you.",
    sections: [
      {
        kind: "hero",
        eyebrow: "Protectors",
        statement: "Someone calm beside you.",
        lead: [
          "A Skif Protector is a vetted professional you would want next to you: observant, steady, trained in de-escalation and first aid. Chosen for judgment rather than size, matched to what you asked for, and the match is explained.",
        ],
        actions: [
          { label: "Book a Protector", href: "/bookings/new" },
          { label: "Become a Protector", href: "/join" },
        ],
      },
      {
        kind: "cards",
        heading: "What people book a Protector for",
        anchor: "services",
        columns: 2,
        cards: SERVICES.map((s) => ({ title: s.label, body: s.description })),
      },
      {
        kind: "definitions",
        heading: "How a booking works",
        anchor: "booking",
        items: [
          { term: "1 · You ask", detail: "Say what you need, when, for how long and roughly where. The exact meeting point is shared only with the Protector who accepts." },
          { term: "2 · Operations matches", detail: "Only Protectors who hold every capability the job needs, verified and valid on the day, and who are available. Each one ranked with a reason for every point." },
          { term: "3 · A Protector accepts", detail: "They see where to meet, never who you are beyond what the job needs." },
          { term: "4 · On the day", detail: "They check in, stay with you, and file a report afterwards. In an emergency they call 117 or 144; Skif is not an emergency service." },
          { term: "5 · You rate it", detail: "Respect, discretion and how safe you felt, each on its own scale, not stars. A complaint is heard in confidence and decided by a person." },
        ],
      },
      {
        kind: "prose",
        heading: "Weapons",
        anchor: "weapons",
        paragraphs: [WEAPONS_POLICY],
      },
      {
        kind: "faq",
        heading: "Questions people ask",
        anchor: "questions",
        items: [
          { question: "What does it cost?", answer: "Operations quotes each booking; there is no fixed price yet. Payment is settled with you directly by Operations." },
          { question: "How fast can someone come?", answer: "Skif does not promise instant availability. Book as early as you can; an unassigned request expires at its start time rather than leaving you waiting." },
          { question: "Can I choose the person?", answer: "You set what matters, such as languages, first aid or a driver, and whether the presence should be discreet or visible. Operations matches within that." },
        ],
      },
    ],
  };
}

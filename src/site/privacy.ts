/**
 * "What Skif keeps": every kind of record, read from the database schema
 * (src/db/schema), and what Skif does not collect. A change to the schema that
 * stores something new about a person must change this page in the same PR.
 */
import type { SitePage } from "@bitbaum/sitekit";
import { CONTACT_EMAIL } from "@/config/site";

export function privacyPage(): SitePage {
  return {
    path: "privacy",
    title: "What Skif keeps",
    intro: "Every record Skif stores about you, and what it never collects.",
    sections: [
      {
        kind: "hero",
        eyebrow: "Privacy",
        statement: "What Skif keeps, and what it never collects.",
        lead: [
          "Safety that costs your privacy is a trade, so here is ours in full: every kind of record Skif stores, why, and who can see it. It is written from the database itself, not from a policy template.",
        ],
      },
      {
        kind: "table",
        heading: "What is stored when you use Skif",
        anchor: "stored",
        columns: ["Record", "What is in it", "Who sees it"],
        rows: [
          ["Your account", "An anonymous id from your account. No email address, no password.", "Skif's systems"],
          ["Your profile", "The name a Protector should call you, if you give one.", "The Protector on your booking, once they accept"],
          ["Your preferences", "Your hard limits, trade-off leanings, presence style and languages.", "You; used to rank steps and match Protectors"],
          ["Assessments", "The places you describe (a name you choose and a district), what worries you, an occasion in your words, your budget, and the plan.", "You"],
          ["Bookings", "The service, time, district and meeting point, your notes, the booking's messages, the report and your rating.", "You, Operations, and the Protector — the meeting point only after they accept"],
          ["Complaints", "What you raise, the answer, and the decision.", "You, Operations, and the Protector concerned"],
          ["Access log", "Which Operations person opened a sensitive record, and when.", "Operations"],
        ],
      },
      {
        kind: "definitions",
        heading: "What Skif does not collect",
        anchor: "not",
        items: [
          { term: "Your location", detail: "No tracking, ever. A booking holds the meeting point you type." },
          { term: "Camera and microphone", detail: "Never requested." },
          { term: "Your quick check and checklists", detail: "Worked out and remembered in your browser only. Nothing you tick there reaches Skif." },
          { term: "Analytics and advertising", detail: "None. Public pages load one feedback button so you can report a problem if you choose to; pages behind sign-in load no third-party script." },
        ],
      },
      {
        kind: "prose",
        heading: "Where it lives, and deleting it",
        anchor: "where",
        paragraphs: [
          "Everything is in Skif's own database on a server it runs in Germany, never with a camera, alarm or advertising company.",
          `Deleting your records yourself is not built yet. Until it is, write to ${CONTACT_EMAIL} and a person deletes them.`,
        ],
      },
    ],
  };
}

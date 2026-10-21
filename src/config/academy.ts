import type { CapabilityKey } from "./capabilities";

/**
 * SSOT for the Skif Academy (docs/DOCTRINE.md "The Academy + Capability
 * Graph", SPEC §17): what anyone can learn, grouped by area, each course tied
 * to the Protector capability it builds. A course passed with Skif will be
 * how a capability becomes verified rather than self-declared.
 *
 * Honest about the stage: no course runs yet. `delivery` says who will teach
 * it — Skif's own course and exam, or a partner school we send people to.
 * There are no partners yet, so no partner is named anywhere.
 */

export const COURSE_STATUS = { key: "PLANNED", label: "Planned" } as const;

export const DELIVERY = [
  { key: "SKIF", label: "Skif course and exam" },
  { key: "PARTNER", label: "With a partner school" },
] as const;
export type Delivery = (typeof DELIVERY)[number]["key"];

export function deliveryLabel(key: Delivery): string {
  return DELIVERY.find((d) => d.key === key)?.label ?? key;
}

type AreaDef = { key: string; title: string; slug: string; intro: string };

export const ACADEMY_AREAS = [
  {
    key: "PEOPLE",
    slug: "people",
    title: "Judgment and people",
    intro: "The core of the work. Most situations are won or lost in how someone reads a room and speaks to the person in front of them.",
  },
  {
    key: "MEDICAL",
    slug: "medical",
    title: "First aid and emergencies",
    intro: "What to do in the minutes before professionals arrive. Useful to everyone; essential for anyone who looks after someone else.",
  },
  {
    key: "PHYSICAL",
    slug: "physical",
    title: "Physical skills",
    intro: "Control rather than damage. Physical skill is a real capability, and it counts for less in matching than judgment does.",
  },
  {
    key: "FIREARMS",
    slug: "firearms",
    title: "Firearms",
    intro: "Safe handling and the law, taught only by licensed instructors at licensed ranges under Swiss weapons law. For people who own or handle firearms. Skif bookings do not involve firearms.",
  },
  {
    key: "MOBILITY",
    slug: "mobility",
    title: "Driving",
    intro: "Getting someone somewhere safely, including when the road is not.",
  },
  {
    key: "DIGITAL",
    slug: "digital",
    title: "Digital and privacy",
    intro: "The half of safety that happens on a screen: accounts, devices, what is findable about you, and the keys to what you own.",
  },
] as const satisfies readonly AreaDef[];

export type AcademyArea = (typeof ACADEMY_AREAS)[number]["key"];

type CourseDef = {
  key: string;
  area: AcademyArea;
  title: string;
  /** What someone can do after it, in one or two sentences. */
  outcome: string;
  /** Protector capabilities this course evidences; empty for courses that
   * are for anyone and verify nothing in Skif's capability graph. */
  builds: readonly CapabilityKey[];
  delivery: Delivery;
};

export const COURSES = [
  {
    key: "DEESCALATION",
    area: "PEOPLE",
    title: "De-escalation",
    outcome: "Calm a person who is angry, frightened or intoxicated, with words, distance and posture, and know when to leave.",
    builds: ["DE_ESCALATION", "CONFLICT_MANAGEMENT"],
    delivery: "SKIF",
  },
  {
    key: "CONFLICT_PSYCHOLOGY",
    area: "PEOPLE",
    title: "The psychology of conflict and fear",
    outcome: "Recognise what stress, adrenaline and fear do to you and to others, and how that changes what people hear and do.",
    builds: ["CONFLICT_MANAGEMENT", "COMMUNICATION"],
    delivery: "SKIF",
  },
  {
    key: "SITUATIONAL_AWARENESS",
    area: "PEOPLE",
    title: "Situational awareness",
    outcome: "Notice what is out of place early, without becoming the anxious person who watches everything.",
    builds: ["SITUATIONAL_AWARENESS"],
    delivery: "SKIF",
  },
  {
    key: "TRAUMA_INFORMED",
    area: "PEOPLE",
    title: "Working with people after trauma",
    outcome: "Be a steady presence for someone who has been harassed, assaulted or threatened, without making it worse.",
    builds: ["TRAUMA_INFORMED", "VULNERABLE_PERSON_SUPPORT"],
    delivery: "PARTNER",
  },
  {
    key: "FIRST_AID",
    area: "MEDICAL",
    title: "First aid",
    outcome: "Recognise an emergency, call for help, resuscitate, use a defibrillator and stop serious bleeding.",
    builds: ["FIRST_AID"],
    delivery: "PARTNER",
  },
  {
    key: "EMERGENCY_RESPONSE",
    area: "MEDICAL",
    title: "Emergency response",
    outcome: "Take charge of the first minutes of an incident: the scene, the casualties, the people around them and the hand-over.",
    builds: ["EMERGENCY_RESPONSE"],
    delivery: "PARTNER",
  },
  {
    key: "SELF_DEFENCE",
    area: "PHYSICAL",
    title: "Self-defence fundamentals",
    outcome: "Avoid, escape and, only when nothing else works, defend yourself, within what Swiss law calls proportionate.",
    builds: [],
    delivery: "PARTNER",
  },
  {
    key: "BJJ",
    area: "PHYSICAL",
    title: "Brazilian Jiu-Jitsu",
    outcome: "Control a person on the ground without striking them. The grappling art that best suits restraint without injury.",
    builds: ["GRAPPLING"],
    delivery: "PARTNER",
  },
  {
    key: "MUAY_THAI",
    area: "PHYSICAL",
    title: "Muay Thai",
    outcome: "Stand-up distance, balance and conditioning, and an honest sense of what a real exchange feels like.",
    builds: ["ENDURANCE"],
    delivery: "PARTNER",
  },
  {
    key: "KRAV_MAGA",
    area: "PHYSICAL",
    title: "Krav Maga",
    outcome: "Practical defence against common attacks, trained under stress, with the emphasis on getting away.",
    builds: [],
    delivery: "PARTNER",
  },
  {
    key: "RESTRAINT",
    area: "PHYSICAL",
    title: "Restraint and control",
    outcome: "Hold someone safely until help arrives, with the positions that keep them breathing and the law that limits you.",
    builds: ["RESTRAINT_CONTROL"],
    delivery: "PARTNER",
  },
  {
    key: "PROTECTING_OTHERS",
    area: "PHYSICAL",
    title: "Protecting someone else",
    outcome: "Accompany a person: where to stand, how to move through a crowd, how to get them out, and how to stay invisible while doing it.",
    builds: ["CLOSE_PROTECTION"],
    delivery: "SKIF",
  },
  {
    key: "FIREARMS_SAFETY",
    area: "FIREARMS",
    title: "Safe handling and Swiss weapons law",
    outcome: "Handle, store and transport a firearm safely, and know exactly what the law allows and forbids.",
    builds: [],
    delivery: "PARTNER",
  },
  {
    key: "DEFENSIVE_DRIVING",
    area: "MOBILITY",
    title: "Defensive driving",
    outcome: "Read traffic ahead, keep options open, and drive a passenger calmly through situations that are not.",
    builds: ["DEFENSIVE_DRIVING"],
    delivery: "PARTNER",
  },
  {
    key: "CYBER_HYGIENE",
    area: "DIGITAL",
    title: "Accounts and devices",
    outcome: "Lock down email, phone and the accounts that reset everything else, and recognise phishing before you click.",
    builds: ["CYBERSECURITY_LITERACY"],
    delivery: "SKIF",
  },
  {
    key: "PRIVACY_SELF_AUDIT",
    area: "DIGITAL",
    title: "What is findable about you",
    outcome: "Search for yourself the way someone hostile would, then remove or reduce what you find.",
    builds: ["PRIVACY_TECH"],
    delivery: "SKIF",
  },
  {
    key: "DIGITAL_ASSETS",
    area: "DIGITAL",
    title: "Holding keys safely",
    outcome: "Keep Bitcoin and other keys where you can recover them and nobody can force them from you.",
    builds: ["DIGITAL_ASSET_LITERACY"],
    delivery: "SKIF",
  },
] as const satisfies readonly CourseDef[];

export type Course = (typeof COURSES)[number];

export function coursesIn(area: AcademyArea): Course[] {
  return COURSES.filter((c) => c.area === area);
}

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
    intro:
      "The core of the work. Most situations are won or lost in how someone reads a room and speaks to the person in front of them.",
  },
  {
    key: "MEDICAL",
    slug: "medical",
    title: "First aid and emergencies",
    intro:
      "What to do in the minutes before professionals arrive. Useful to everyone; essential for anyone who looks after someone else.",
  },
  {
    key: "ESCAPE",
    slug: "escape",
    title: "Escape and movement",
    intro:
      "The best self-defence is not being there. Moving well, seeing routes and being fit enough to use them comes before any fighting skill.",
  },
  {
    key: "STRIKING",
    slug: "striking",
    title: "Striking arts",
    intro: "Distance, timing and staying calm while someone tries to hit you, learned against partners who really try.",
  },
  {
    key: "GRAPPLING",
    slug: "grappling",
    title: "Grappling arts",
    intro:
      "Control without damage: staying on your feet, getting back up, and holding someone still. Where a smaller person's technique beats a larger person's strength.",
  },
  {
    key: "SELF_DEFENCE",
    slug: "self-defence",
    title: "Self-defence systems",
    intro:
      "Scenario-based training for the street: several attackers, weapons, surprise, and getting away. Quality varies between schools more than between systems.",
  },
  {
    key: "WEAPONS",
    slug: "weapons",
    title: "Weapons",
    intro:
      "What weapons are, how they move and what the law allows: firearms at licensed ranges, sticks and blades, defence against weapons, and seeing the everyday objects that can protect you. Skif bookings do not involve weapons.",
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
    title: "Digital, privacy and money",
    intro:
      "The half of safety that happens on a screen: accounts, devices, what is findable about you, scams, and the keys to what you own.",
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
    outcome:
      "Calm a person who is angry, frightened or intoxicated, with words, distance and posture, and know when to leave.",
    builds: ["DE_ESCALATION", "CONFLICT_MANAGEMENT"],
    delivery: "SKIF",
  },
  {
    key: "CONFLICT_PSYCHOLOGY",
    area: "PEOPLE",
    title: "The psychology of conflict and fear",
    outcome:
      "Recognise what stress, adrenaline and fear do to you and to others, and how that changes what people hear and do.",
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
    outcome:
      "Be a steady presence for someone who has been harassed, assaulted or threatened, without making it worse.",
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
    key: "STOP_THE_BLEED",
    area: "MEDICAL",
    title: "Stopping severe bleeding",
    outcome: "Direct pressure, wound packing and a tourniquet, practised until your hands know them.",
    builds: ["FIRST_AID"],
    delivery: "PARTNER",
  },
  {
    key: "EMERGENCY_RESPONSE",
    area: "MEDICAL",
    title: "Emergency response",
    outcome:
      "Take charge of the first minutes of an incident: the scene, the casualties, the people around them and the hand-over.",
    builds: ["EMERGENCY_RESPONSE"],
    delivery: "PARTNER",
  },
  {
    key: "PARKOUR",
    area: "ESCAPE",
    title: "Parkour and escape",
    outcome:
      "See a street as routes, move over and around obstacles safely, and sprint, climb and vault when it counts.",
    builds: ["ENDURANCE"],
    delivery: "PARTNER",
  },
  {
    key: "RUNNING",
    area: "ESCAPE",
    title: "Escape fitness",
    outcome: "Sprint 200 metres and keep going: interval running built for getting away, not for races.",
    builds: ["ENDURANCE"],
    delivery: "SKIF",
  },
  {
    key: "BOXING",
    area: "STRIKING",
    title: "Boxing",
    outcome: "Distance, head movement and hands, sparred against a resisting partner.",
    builds: [],
    delivery: "PARTNER",
  },
  {
    key: "KICKBOXING",
    area: "STRIKING",
    title: "Kickboxing",
    outcome: "Boxing's footwork and hands, with kicks and the range they add.",
    builds: [],
    delivery: "PARTNER",
  },
  {
    key: "MUAY_THAI",
    area: "STRIKING",
    title: "Muay Thai",
    outcome: "Punches, kicks, knees and elbows, and the clinch: an honest sense of what a real exchange feels like.",
    builds: ["ENDURANCE"],
    delivery: "PARTNER",
  },
  {
    key: "WRESTLING",
    area: "GRAPPLING",
    title: "Wrestling",
    outcome: "Stay on your feet, stop a takedown and get back up: the skills that keep a fight off the ground.",
    builds: ["GRAPPLING"],
    delivery: "PARTNER",
  },
  {
    key: "JUDO",
    area: "GRAPPLING",
    title: "Judo",
    outcome: "Throws, balance and breakfalls. Falling safely is a life skill in its own right.",
    builds: ["GRAPPLING"],
    delivery: "PARTNER",
  },
  {
    key: "BJJ",
    area: "GRAPPLING",
    title: "Brazilian Jiu-Jitsu",
    outcome:
      "Control a person on the ground without striking them. The grappling art that best suits restraint without injury.",
    builds: ["GRAPPLING"],
    delivery: "PARTNER",
  },
  {
    key: "RESTRAINT",
    area: "GRAPPLING",
    title: "Restraint and control",
    outcome:
      "Hold someone safely until help arrives, with the positions that keep them breathing and the law that limits you.",
    builds: ["RESTRAINT_CONTROL"],
    delivery: "PARTNER",
  },
  {
    key: "SELF_DEFENCE",
    area: "SELF_DEFENCE",
    title: "Self-defence fundamentals",
    outcome: "The whole ladder: avoid, escape, de-escalate, defend, recover, within what Swiss law calls appropriate.",
    builds: [],
    delivery: "SKIF",
  },
  {
    key: "WOMENS_SELF_DEFENCE",
    area: "SELF_DEFENCE",
    title: "Women's self-defence",
    outcome: "The street, people you know and your phone: leverage over strength, exit plans and digital stalking.",
    builds: [],
    delivery: "PARTNER",
  },
  {
    key: "CHILDRENS_SAFETY",
    area: "SELF_DEFENCE",
    title: "Safety for children",
    outcome: "Age-appropriate skills, from knowing a phone number by heart to falling safely and saying no.",
    builds: ["CHILDREN"],
    delivery: "PARTNER",
  },
  {
    key: "KRAV_MAGA",
    area: "SELF_DEFENCE",
    title: "Krav Maga",
    outcome: "Defence against common attacks and weapons, trained under stress, with the emphasis on getting away.",
    builds: [],
    delivery: "PARTNER",
  },
  {
    key: "SYSTEMA",
    area: "SELF_DEFENCE",
    title: "Systema",
    outcome: "Breathing, relaxation and movement under pressure; useful far beyond fighting.",
    builds: [],
    delivery: "PARTNER",
  },
  {
    key: "PROTECTING_OTHERS",
    area: "SELF_DEFENCE",
    title: "Protecting someone else",
    outcome:
      "Accompany a person: where to stand, how to move through a crowd, how to get them out, and how to stay unobtrusive while doing it.",
    builds: ["CLOSE_PROTECTION"],
    delivery: "SKIF",
  },
  {
    key: "WEAPONS_LITERACY",
    area: "WEAPONS",
    title: "Weapons literacy and the law",
    outcome:
      "What counts as a weapon, what you may own and carry, how force is judged, and the everyday objects that keep distance.",
    builds: [],
    delivery: "SKIF",
  },
  {
    key: "FIREARMS_SAFETY",
    area: "WEAPONS",
    title: "Firearms: safe handling and Swiss weapons law",
    outcome:
      "Handle, store and transport a firearm safely and shoot accurately, taught by licensed instructors at licensed ranges.",
    builds: [],
    delivery: "PARTNER",
  },
  {
    key: "STICK_AND_BLADE",
    area: "WEAPONS",
    title: "Sticks and blades: Kali and Escrima",
    outcome: "How sticks and blades move, how fast, and how little time a defender has.",
    builds: [],
    delivery: "PARTNER",
  },
  {
    key: "DEFENCE_AGAINST_WEAPONS",
    area: "WEAPONS",
    title: "Defence against weapons",
    outcome: "Recognise a weapon early, keep distance and barriers, and escape; scenario training with resistance.",
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
    outcome: "Lock down email and phone, encrypt every disk, and recognise phishing before you click.",
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
    key: "SCAMS",
    area: "DIGITAL",
    title: "Scams and coercion",
    outcome: "Know the levers every scam pulls, and set up the few rules that beat them.",
    builds: [],
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

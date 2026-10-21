import type { Guide } from "./types";

export const WOMEN: Guide = {
  slug: "womens-safety",
  title: "Women's safety, as it actually is",
  fields: ["PHYSICAL", "PRIVACY", "FAMILY"],
  summary: "Stranger danger is half the story. Known people, digital stalking, and the skills that work for a smaller person.",
  photo: "tramStop",
  statement: "Self-defence for women starts closer to home.",
  lead: [
    "The World Health Organization reports that the most common form of violence against women worldwide is violence by an intimate partner. Advice that only covers dark streets and strangers leaves most of the danger out.",
    "So this guide covers three things: the street, the people you know, and the phone in your pocket. None of it asks you to live smaller. It is about going where you want, with a plan.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "On the street",
      anchor: "street",
      items: [
        { term: "Share the journey", detail: "Send your route and arrival time to someone, or share live location for the trip only, and switch it off afterwards." },
        { term: "Choose the carriage", detail: "On trams and trains, sit near the driver or near other people, close to a door." },
        { term: "Unwanted attention", detail: "Name it out loud and clearly — “Stop following me” — so others around notice. Then move towards people and light." },
        { term: "Train leverage, not muscle", detail: "Grappling arts such as BJJ and judo teach a smaller person to control a larger one. See the combat sports guide." },
      ],
    },
    {
      kind: "definitions",
      heading: "With people you know",
      anchor: "known",
      items: [
        { term: "Notice control", detail: "Checking your phone, controlling money, isolating you from friends, monitoring where you are: these are warning signs, whether or not anyone has been hit." },
        { term: "A quiet exit plan", detail: "Copies of documents, a little money, a charged spare phone and a place to go, kept somewhere only you know." },
        { term: "Help exists", detail: "In Switzerland, victim support centres (Opferhilfe) give free, confidential advice. In danger, call 117." },
      ],
    },
    {
      kind: "definitions",
      heading: "In your phone",
      anchor: "phone",
      items: [
        { term: "Unknown trackers", detail: "Current iPhones and Android phones warn when an unknown tracker moves with you. Keep those alerts on, and check bags and car if one appears." },
        { term: "Stalkerware", detail: "A battery that drains fast, settings changed that you did not change, someone knowing what you said in private messages. A specialist check, or a factory reset, removes it." },
        { term: "Shared accounts", detail: "Family sharing, shared cloud photos and saved passwords on a device someone else used can all show where you are. Review them." },
      ],
    },
  ],
};

export const CHILDREN: Guide = {
  slug: "childrens-safety",
  title: "Children's safety, by age",
  fields: ["FAMILY", "HEALTH", "CYBER"],
  summary: "What a child can learn at each age, from their own phone number to online grooming, without raising them afraid.",
  photo: "familyPath",
  statement: "A capable child is a safer child.",
  lead: [
    "Children are not protected by fear of the world but by knowing what to do in it. Each skill below fits an age and grows with the child.",
    "The aim is freedom: a child who knows the rules can walk to school, go to a friend's house and use a phone with more independence, sooner.",
  ],
  sections: [
    {
      kind: "table",
      heading: "What to teach, and when",
      anchor: "by-age",
      columns: ["Age", "Skills"],
      rows: [
        ["3 to 5", "Their full name and a parent's name; what to do if lost (stay, find a parent with children or a shop assistant); names for body parts; no adult asks them to keep a secret from parents."],
        ["6 to 9", "A parent's phone number by heart; the emergency numbers; road crossing; safe adults and a family meeting point; swimming."],
        ["10 to 12", "Walking routes alone with check-ins; saying no and leaving; first steps online: private profiles, no location sharing with strangers."],
        ["13 and up", "Grooming signs online; image-sharing and its permanence; parties and getting home; basic first aid."],
      ],
    },
    {
      kind: "definitions",
      heading: "Rules that hold at every age",
      anchor: "rules",
      items: [
        { term: "Surprises, not secrets", detail: "A surprise is fun and ends; a secret from parents is a warning sign. Children understand the difference early." },
        { term: "Their body is theirs", detail: "They may refuse a hug, including from relatives. It teaches them that their no counts." },
        { term: "Always call home", detail: "They can call for a lift from anywhere, at any hour, and there will be no lecture that night." },
        { term: "Water", detail: "The World Health Organization counts drowning among the leading causes of death for young children. Swimming lessons and supervision near water are among the most effective safety steps a family can take." },
      ],
    },
    {
      kind: "prose",
      heading: "Online grooming",
      anchor: "grooming",
      paragraphs: [
        "Grooming follows a pattern: attention and flattery, a move to a private channel, gifts or game credits, secrecy, then pressure. Teach the pattern, not a list of apps: apps change; the pattern does not.",
        "If it happens, keep the messages, do not confront the person, and report to the police. Make sure the child knows they are not in trouble for telling you.",
      ],
    },
  ],
};

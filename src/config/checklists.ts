import type { HarmFamily } from "./harm-families";
import type { PhotoKey } from "./photos";

/**
 * SSOT for the Act checklists: short, concrete lists for one situation, each
 * done in one sitting. A checklist is the action end of a guide — it links to
 * the guide for the why. Progress is remembered on the reader's own device
 * only (src/components/site/checklist.tsx); nothing is sent anywhere.
 */
export type ChecklistStep = { text: string; detail?: string };

export type Checklist = {
  slug: string;
  title: string;
  /** When to reach for it, in the reader's words. */
  when: string;
  minutes: number;
  fields: readonly [HarmFamily, ...HarmFamily[]];
  photo?: PhotoKey;
  /** The guide that explains the why, by slug. */
  guide?: string;
  /** For what has already happened: the page offers a case file
   * (src/config/cases.ts) to record it for the bank and the police. */
  caseFile?: true;
  steps: readonly ChecklistStep[];
};

export const CHECKLISTS = [
  {
    slug: "phone-and-accounts",
    title: "Lock down your phone and accounts",
    when: "You have never done it properly, or you just got a new phone.",
    minutes: 30,
    fields: ["CYBER", "PRIVACY"],
    photo: "phoneDark",
    guide: "devices-and-accounts",
    steps: [
      { text: "Install a password manager and save your email password in it.", detail: "Bitwarden, 1Password, or the one built into your phone. Then change the email password to a long random one." },
      { text: "Add a passkey or security key to your main email account.", detail: "Settings → Security in your email provider. This is the account that can reset all the others." },
      { text: "Remove recovery phone numbers and addresses you no longer control." },
      { text: "Turn on two-step sign-in for your bank, cloud storage and social accounts.", detail: "An authenticator app or passkey where offered; SMS only where nothing else is." },
      { text: "Ask your mobile carrier for a PIN on moving your number to a new SIM." },
      { text: "Set a phone passcode longer than six digits.", detail: "And hide message previews on the lock screen." },
      { text: "Check that the laptop's disk is encrypted.", detail: "Mac: FileVault. Windows: Device encryption or BitLocker. Linux: LUKS." },
      { text: "Turn on automatic updates for phone, laptop and browser." },
      { text: "Write down recovery codes and keep them with your passport." },
    ],
  },
  {
    slug: "night-out",
    title: "Before a night out",
    when: "Going out tonight, especially somewhere new.",
    minutes: 5,
    fields: ["PHYSICAL", "PRIVACY"],
    photo: "tramStop",
    guide: "self-defence-ladder",
    steps: [
      { text: "Charge your phone, and take a small battery if it will be late." },
      { text: "Know your way home and the last tram or train.", detail: "And have a taxi app ready as a fallback." },
      { text: "Tell one person where you will be and roughly when you will be home." },
      { text: "Wear shoes you could run in." },
      { text: "On arrival, notice two ways out." },
      { text: "Keep your drink with you; if it tastes wrong, stop and tell someone." },
      { text: "Agree with friends that nobody leaves alone without saying so." },
    ],
  },
  {
    slug: "party-or-festival",
    title: "Before a party or festival",
    when: "A long night with alcohol or other drugs around, yours or your friends'.",
    minutes: 10,
    fields: ["HEALTH", "PHYSICAL"],
    photo: "festival",
    guide: "alcohol-and-drugs",
    steps: [
      { text: "If you will take something, get it checked first.", detail: "Saferparty's drug checking in Zürich is free and anonymous, by appointment." },
      { text: "Decide your limit and your stopping time now, while sober." },
      { text: "Eat a proper meal before you go." },
      { text: "Agree with friends to stay together and to tell each other what you have taken." },
      { text: "Plan the way home, and who is not driving." },
      { text: "Save 144 (ambulance) and 145 (poison information) in your phone." },
      { text: "Learn the recovery position before you need it." },
    ],
  },
  {
    slug: "long-drive",
    title: "Before a long drive",
    when: "A few hours on the road, a mountain pass, or a drive at night.",
    minutes: 10,
    fields: ["PHYSICAL"],
    photo: "nightRoad",
    guide: "driving",
    steps: [
      { text: "Set the route and the music before you move." },
      { text: "Put the phone out of reach, or on do-not-disturb while driving." },
      { text: "No alcohol before you drive.", detail: "New and professional drivers may not drive under its influence at all." },
      { text: "Plan a break every couple of hours, and stop sooner if you are tired." },
      { text: "Check the warning triangle, a high-visibility vest and the first-aid kit are in the car." },
      { text: "Check the weather and pass conditions on the route." },
      { text: "Tell someone when you expect to arrive." },
    ],
  },
  {
    slug: "before-a-swim",
    title: "Before swimming in a lake or river",
    when: "A swim, a float down the river or an afternoon at the lake.",
    minutes: 3,
    fields: ["ENVIRONMENTAL", "HEALTH"],
    photo: "cityRiver",
    guide: "lakes-and-rivers",
    steps: [
      { text: "No alcohol or drugs before you get in." },
      { text: "Cool down slowly; never jump in overheated." },
      { text: "On a river, know where you will get out, and the next exit after it." },
      { text: "Don't jump into water you cannot see the bottom of." },
      { text: "Go with someone, or tell someone on the bank." },
      { text: "Children within arm's reach, always." },
      { text: "The colder the water, the shorter the swim." },
    ],
  },
  {
    slug: "protest-near-my-shop",
    title: "A protest is coming past my shop",
    when: "A demonstration is announced on your street or nearby.",
    minutes: 60,
    fields: ["ENVIRONMENTAL", "FINANCIAL"],
    photo: "zurichTram",
    steps: [
      { text: "Read the city police's announcement: the route, the time, closed streets." },
      { text: "Decide your closing time now, before the day, and tell your staff." },
      { text: "Take cash, valuables and the most expensive stock out of the window and off the floor." },
      { text: "Photograph the shop and stock for insurance." },
      { text: "Check that your insurance covers damage from unrest (Unruhen), and what it needs from you." },
      { text: "Agree with neighbouring shops who calls 117 and how you reach each other." },
      { text: "Arrange shutters, safety film or boards if your glass is exposed.", detail: "An installer needs notice; this is the step to start first." },
      { text: "If you want people with you while you close, request Protectors early.", detail: "They keep you and your staff safe and call 117; they do not confront a crowd." },
      { text: "On the day: close on time, leave together, and do not go back to defend stock." },
    ],
  },
  {
    slug: "before-you-travel",
    title: "Before you travel",
    when: "A trip abroad, especially somewhere unfamiliar.",
    minutes: 20,
    fields: ["ENVIRONMENTAL", "RESILIENCE", "HEALTH"],
    photo: "platform",
    guide: "travel",
    steps: [
      { text: "Read the Swiss foreign ministry's travel advice for the country." },
      { text: "Register the trip in the Travel Admin app." },
      { text: "Check vaccinations and health advice for the destination." },
      { text: "Save the local emergency number and your embassy's number in your phone." },
      { text: "Photograph your passport and keep a copy offline." },
      { text: "Ask your host or hotel which areas locals avoid, and when." },
      { text: "Read up on the common tourist scams there." },
      { text: "Leave your itinerary with someone at home." },
    ],
  },
  {
    slug: "family-emergency-plan",
    title: "Your family emergency plan",
    when: "Once a year, or whenever the household changes.",
    minutes: 45,
    fields: ["FAMILY", "RESILIENCE"],
    photo: "familyPath",
    guide: "childrens-safety",
    steps: [
      { text: "Agree a meeting point near home and one further away." },
      { text: "Make sure every child knows a parent's number by heart." },
      { text: "Choose one contact outside the household that everyone reports to." },
      { text: "Install the Alertswiss app and learn what the sirens mean." },
      { text: "Know where the gas and water shut-offs are, and the first-aid kit." },
      { text: "Keep copies of documents, some cash and spare medication together." },
      { text: "Practise once: who does what, who picks up whom." },
    ],
  },
  {
    slug: "is-this-a-scam",
    title: "Is this a scam? Right now",
    when: "Someone is asking for money, codes or access, and it feels urgent.",
    minutes: 5,
    fields: ["FINANCIAL", "CYBER"],
    guide: "scams-coercion-keys",
    caseFile: true,
    steps: [
      { text: "Stop. Do not pay, transfer, click or read out any code yet." },
      { text: "Hang up or close the message." },
      { text: "Look the organisation's number up yourself and call it.", detail: "Never use the number, link or app the contact gave you." },
      { text: "Tell one person you trust what is happening." },
      { text: "If you already paid, call your bank now on the number on your card." },
      { text: "Keep everything: messages, numbers, transaction ids, and report it to the police." },
    ],
  },
  {
    slug: "right-after-an-incident",
    title: "Right after something happened",
    when: "You were attacked, threatened, robbed or followed.",
    minutes: 10,
    fields: ["RESILIENCE", "PHYSICAL", "HEALTH"],
    photo: "doorway",
    guide: "self-defence-ladder",
    steps: [
      { text: "Get somewhere safe, with people and light." },
      { text: "If anyone is hurt or in danger, call 144 or 117." },
      { text: "Write down what you remember while it is fresh: time, place, faces, words, vehicles." },
      { text: "Seek care even if you feel fine.", detail: "Shock hides injuries." },
      { text: "Report it to the police, and keep the case number." },
      { text: "Tell someone close what happened." },
      { text: "In Switzerland, victim support centres (Opferhilfe) help for free and in confidence." },
    ],
  },
  {
    slug: "someone-got-into-my-computer",
    title: "Someone got into my computer",
    when: "You let a caller install AnyDesk, TeamViewer or similar, or you saw the mouse move by itself.",
    minutes: 30,
    fields: ["CYBER", "FINANCIAL"],
    guide: "scams-coercion-keys",
    caseFile: true,
    steps: [
      { text: "Turn off Wi-Fi or unplug the cable.", detail: "A remote-access program only reaches the computer while it is online." },
      { text: "Call your bank on the number on your card.", detail: "Ask them to block e-banking and cards, check every payment since the call began and recall any transfer." },
      { text: "Change your passwords from your phone or another computer.", detail: "E-banking first, then email, then your Apple, Google or Microsoft account. Never on the computer they controlled." },
      { text: "Keep the evidence before you delete anything.", detail: "Screenshots of the call log and chats, and the documents they sent. AnyDesk on a Mac logs every connection in the hidden .anydesk folder in your home folder." },
      { text: "Delete the remote-access programs.", detail: "On a Mac: the app in Applications, the files with its name in /Library/LaunchAgents and /Library/LaunchDaemons, and its entry under System Settings → General → Login Items." },
      { text: "Report it to the police and keep the case number." },
      { text: "Report it to BACS, the federal office for cyber security, at bacs.admin.ch." },
      { text: "Tell the people close to you.", detail: "If someone calls offering to get your money back, it is the same scam. Hang up." },
    ],
  },
] as const satisfies readonly Checklist[];

export function checklistBySlug(slug: string): Checklist | undefined {
  return (CHECKLISTS as readonly Checklist[]).find((c) => c.slug === slug);
}

export function checklistsFor(field: HarmFamily): Checklist[] {
  return (CHECKLISTS as readonly Checklist[]).filter((c) => (c.fields as readonly HarmFamily[]).includes(field));
}

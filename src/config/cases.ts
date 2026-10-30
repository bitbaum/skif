/**
 * SSOT for case files: what a person keeps after a scam has already happened,
 * so the bank, the police and BACS get one clear account instead of a memory
 * of a three-hour call. The case file is the owner's alone — Operations,
 * Protectors and the AI never read it.
 *
 * Sources for the facts in the recovery steps (opened 2026-10-30):
 * - AnyDesk's log files on macOS: https://support.anydesk.com/docs/what-are-trace-files
 * - Removing AnyDesk on macOS: https://support.anydesk.com/docs/uninstall-anydesk
 * - The federal office for cyber security: https://www.bacs.admin.ch/
 * - Online police reports in most cantons: https://www.suisse-epolice.ch/
 */

export const CASE_KINDS = [
  {
    key: "REMOTE_ACCESS",
    label: "Fake bank, police or support who got into my computer",
    hint: "They called or wrote, sounded official, and had you install AnyDesk, TeamViewer, ScreenConnect or similar.",
  },
  {
    key: "CALL_OR_MESSAGE",
    label: "A scam call or message, without access to my computer",
    hint: "Money, codes or card details went out because of a call, an SMS, an email or a messenger chat.",
  },
  {
    key: "PURCHASE",
    label: "A purchase, rental or investment that was a scam",
    hint: "You paid for something that does not exist: goods, a flat, a return.",
  },
  {
    key: "OTHER",
    label: "Something else",
    hint: "Write down what happened; the steps that fit every scam still apply.",
  },
] as const;

export type CaseKind = (typeof CASE_KINDS)[number]["key"];
export const CASE_KIND_KEYS = CASE_KINDS.map((k) => k.key) as [
  CaseKind,
  ...CaseKind[],
];

export function caseKindLabel(key: string): string {
  return CASE_KINDS.find((k) => k.key === key)?.label ?? key;
}

/** What the scammers left behind that the police can trace. Order is the
 * order of the report: who they were first, then where the money went. */
export const INDICATOR_KINDS = [
  { key: "PHONE", label: "Phone number", placeholder: "+41 77 000 00 00" },
  { key: "NAME", label: "Name they used", placeholder: "Mario Lutz" },
  {
    key: "CLAIMED",
    label: "Who they said they were",
    placeholder: "PostFinance security, fedpol",
  },
  {
    key: "EMAIL",
    label: "Email or messenger account",
    placeholder: "WhatsApp, Telegram, an address",
  },
  {
    key: "WEBSITE",
    label: "Website or link",
    placeholder: "The link or site they sent you to",
  },
  {
    key: "DOCUMENT",
    label: "Document they sent",
    placeholder: "A PDF with a logo, a reference number",
  },
  {
    key: "REMOTE_TOOL",
    label: "Remote-access program and its ID",
    placeholder: "AnyDesk, connection ID 123 456 789",
  },
  {
    key: "ACCOUNT",
    label: "Account the money went to",
    placeholder: "IBAN, card, wallet address",
  },
  {
    key: "PAYMENT",
    label: "Payment",
    placeholder: "CHF 2 000 on 30.10.2026, e-banking",
  },
  {
    key: "OTHER",
    label: "Something else",
    placeholder: "Anything the police could follow up",
  },
] as const;

export type IndicatorKind = (typeof INDICATOR_KINDS)[number]["key"];
export const INDICATOR_KIND_KEYS = INDICATOR_KINDS.map((k) => k.key) as [
  IndicatorKind,
  ...IndicatorKind[],
];

export function indicatorKindLabel(key: string): string {
  return INDICATOR_KINDS.find((k) => k.key === key)?.label ?? key;
}

export const STEP_WHEN = [
  { key: "NOW", label: "Now" },
  { key: "TODAY", label: "Today" },
  { key: "THIS_WEEK", label: "This week" },
] as const;

export type StepWhen = (typeof STEP_WHEN)[number]["key"];

export type RecoveryStep = {
  key: string;
  when: StepWhen;
  text: string;
  detail: string;
  /** Kinds it applies to; omitted means every kind. */
  kinds?: readonly CaseKind[];
  link?: { href: string; label: string };
};

/** The recovery steps, most urgent first. A case file ticks them off; the
 * report lists what is done and what is still open. */
export const RECOVERY_STEPS = [
  {
    key: "BANK",
    when: "NOW",
    text: "Call your bank on the number on your card",
    detail:
      "Ask them to block e-banking and cards, to check every payment since the contact began, to recall any transfer, and to remove devices you did not add. The sooner they know, the better the chance of stopping a payment.",
  },
  {
    key: "OFFLINE",
    when: "NOW",
    kinds: ["REMOTE_ACCESS"],
    text: "Take the computer off the internet",
    detail:
      "Turn off Wi-Fi or unplug the cable. A remote-access program only reaches the computer while it is online. Do not use it for banking or passwords until it is cleaned.",
  },
  {
    key: "PASSWORDS",
    when: "NOW",
    text: "Change your passwords from another device",
    detail:
      "Your phone or someone else's computer — never the one they controlled. E-banking first, then email, then your Apple, Google or Microsoft account. Turn on two-step sign-in wherever it is offered.",
  },
  {
    key: "EVIDENCE",
    when: "TODAY",
    text: "Keep the evidence before you delete anything",
    detail:
      "Screenshots of the call log and chats, the documents they sent, payment confirmations. If they used AnyDesk on a Mac, its log is in the hidden .anydesk folder in your home folder (connection_trace.txt and anydesk.trace): it lists every incoming connection and its ID. Write it all into this case file.",
  },
  {
    key: "REMOVE_TOOLS",
    when: "TODAY",
    kinds: ["REMOTE_ACCESS"],
    text: "Remove every remote-access program",
    detail:
      "Mac: delete the app from Applications (Programme on a German Mac): AnyDesk, TeamViewer, a ScreenConnect client called connectwisecontrol-…. Then delete the files with the same name in /Library/LaunchAgents, /Library/LaunchDaemons and Library/LaunchAgents in your home folder. AnyDesk also leaves ~/.anydesk and /etc/anydesk — keep a copy of ~/.anydesk as evidence first. In System Settings, remove them under Privacy & Security (Accessibility, Screen Recording) and under General → Login Items. Windows: Settings → Apps.",
  },
  {
    key: "POLICE",
    when: "TODAY",
    text: "Report it to the police",
    detail:
      "At any police station, or online in most cantons. Keep the case number and add it to this file. Print this case file and take it with you: it is the account they will ask for.",
    link: { href: "https://www.suisse-epolice.ch/", label: "Suisse ePolice" },
  },
  {
    key: "BACS",
    when: "TODAY",
    text: "Report it to the federal office for cyber security (BACS)",
    detail:
      "BACS collects reports of fraud and cyber attacks and warns others about the same scam. Copy the text version of this file into the report.",
    link: { href: "https://www.bacs.admin.ch/", label: "bacs.admin.ch" },
  },
  {
    key: "TELL",
    when: "TODAY",
    text: "Tell the people close to you",
    detail:
      "Scams depend on secrecy, and scammers often call again — as “the real police”, a lawyer or a “recovery service” that promises your money back for a fee. That is the same scam. Hang up.",
  },
  {
    key: "STATEMENTS",
    when: "THIS_WEEK",
    text: "Watch your accounts for a few weeks",
    detail:
      "Bank and card statements, and any new account, loan or contract in your name. Report anything you did not do at once.",
  },
  {
    key: "DEVICE_CHECK",
    when: "THIS_WEEK",
    kinds: ["REMOTE_ACCESS"],
    text: "Check the computer for anything else they left",
    detail:
      "Look through Login Items for names you do not recognise and run a reputable malware scanner. If you are not sure it is clean, have it checked or reset by someone you trust.",
  },
] as const satisfies readonly RecoveryStep[];

export type RecoveryStepKey = (typeof RECOVERY_STEPS)[number]["key"];
export const RECOVERY_STEP_KEYS = RECOVERY_STEPS.map((s) => s.key) as [
  RecoveryStepKey,
  ...RecoveryStepKey[],
];

export function stepsForKind(kind: CaseKind): RecoveryStep[] {
  return (RECOVERY_STEPS as readonly RecoveryStep[]).filter(
    (s) => !s.kinds || s.kinds.includes(kind),
  );
}

export const CASE_LIMITS = {
  titleMax: 120,
  summaryMax: 4000,
  whatMax: 1000,
  valueMax: 300,
  noteMax: 500,
  referenceMax: 120,
  entriesMax: 200,
} as const;

import type { Guide } from "./types";

export const DEVICES: Guide = {
  slug: "devices-and-accounts",
  title: "Lock down your devices and accounts",
  fields: ["CYBER", "PRIVACY"],
  summary: "Encrypt the disk, protect the email account that resets everything, and back up — a checklist in order of what matters.",
  statement: "An hour today closes most of the doors.",
  lead: [
    "Most digital break-ins are not clever. They use a reused password, a code sent by SMS, a phone without a passcode or a laptop left unencrypted. Closing those takes an afternoon and costs little or nothing.",
    "Do it in this order: the account that can reset all the others comes first, then the devices that hold everything, then what happens when something is lost.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "The checklist, in order",
      anchor: "checklist",
      items: [
        { term: "1 · A password manager", detail: "One long master password, a different random password everywhere else. It ends reuse, the most common way in." },
        { term: "2 · Protect your email first", detail: "Whoever holds your email can reset everything else. Give it a passkey or a hardware security key, and remove old recovery numbers and addresses you no longer control." },
        { term: "3 · Second factor everywhere else", detail: "Prefer passkeys, security keys or an authenticator app over SMS. SMS is far better than nothing, and the weakest of these." },
        { term: "4 · Lock your number", detail: "Ask your mobile carrier for a PIN or lock on moving your number to a new SIM, so nobody can take over your codes by porting it." },
        { term: "5 · Encrypt every disk", detail: "See the table below. A stolen laptop that is encrypted is a lost laptop, not a lost life." },
        { term: "6 · Updates on, automatically", detail: "On phone, laptop, browser and router. Most attacks use holes that were already fixed." },
        { term: "7 · A real passcode", detail: "Longer than six digits on a phone, and a short screen-lock delay. Hide message previews on the lock screen." },
        { term: "8 · Backups: 3-2-1", detail: "Three copies of what matters, on two kinds of storage, one of them somewhere else. Test a restore once." },
        { term: "9 · Recovery codes, offline", detail: "Print them or write them down, and keep them where you keep your passport." },
        { term: "10 · Review once a season", detail: "Signed-in sessions, apps with access to your accounts, who can see your location." },
      ],
    },
    {
      kind: "table",
      heading: "Encrypt the disk",
      anchor: "encryption",
      columns: ["Device", "How", "Note"],
      rows: [
        ["Mac", "System Settings → Privacy & Security → FileVault", "Keep the recovery key somewhere other than the Mac."],
        ["Windows", "Settings → Privacy & security → Device encryption; BitLocker on Pro editions", "Check where the recovery key is stored, often your Microsoft account."],
        ["Linux", "Full-disk encryption (LUKS), chosen when installing", "Adding it later usually means reinstalling."],
        ["iPhone and iPad", "Encrypted once a passcode is set", "A longer alphanumeric passcode is stronger."],
        ["Android", "Encrypted by default on current devices", "Set a strong screen lock; encryption depends on it."],
      ],
    },
    {
      kind: "faq",
      heading: "Questions people ask",
      anchor: "questions",
      items: [
        { question: "Does a VPN make me safe?", answer: "It protects your traffic from the network you are on, such as hotel Wi-Fi. It does not make you anonymous, and it does nothing about a reused password." },
        { question: "Is antivirus still needed?", answer: "The protection built into current operating systems is enough for most people. Updates and not installing things you were not looking for matter more." },
        { question: "What if I am a target, not just anyone?", answer: "Then a specialist check is proportionate: devices for compromise, accounts for access, and what is findable about you. A Safety Plan recommends it when what you tell it warrants it." },
      ],
    },
  ],
};

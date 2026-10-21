import type { Guide } from "./types";

export const MONEY: Guide = {
  slug: "scams-coercion-keys",
  title: "Scams, coercion and keys",
  fields: ["FINANCIAL", "CYBER"],
  summary: "How scams work, the few rules that beat nearly all of them, and how to hold Bitcoin so that no moment of pressure can move it.",
  statement: "Every scam needs you to hurry.",
  lead: [
    "Fraud is built on the same handful of levers whatever the story: urgency, authority, secrecy and isolation. Learn the levers and the stories stop working, however convincing the voice on the phone.",
    "Coercion uses the same levers with a threat behind them. The defence against both is the same: arrangements made in advance, so that no single moment, call or person can move what you own.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "The levers",
      anchor: "levers",
      items: [
        { term: "Urgency", detail: "“It has to be today”, “your account will be closed”, “the offer ends in an hour”. Hurry stops you checking." },
        { term: "Authority", detail: "Someone who sounds like the bank, the police, a delivery company or your boss. Caller ID and email addresses are easy to fake." },
        { term: "Secrecy", detail: "“Don't tell anyone, it's part of the investigation.” Real institutions never need you to hide something from your family." },
        { term: "Isolation", detail: "Keeping you on the line, moving you to a messaging app, asking you to install remote-access software." },
        { term: "Too good", detail: "Returns no one else gets, a lottery you did not enter, a romance that needs money to visit." },
      ],
    },
    {
      kind: "definitions",
      heading: "Rules that beat nearly all of them",
      anchor: "rules",
      items: [
        { term: "The pause rule", detail: "No unexpected payment, transfer or code goes out the same day. A real request survives a 24-hour wait; a scam rarely does." },
        { term: "Call back yourself", detail: "Hang up, look the number up yourself, and call. Never use the number, link or app the caller gave you." },
        { term: "Codes never leave", detail: "Banks and the police do not ask for login codes, card PINs or for you to move money “to safety”." },
        { term: "Two people for large amounts", detail: "Agree with someone you trust that anything above a set amount is discussed first. It protects both of you." },
        { term: "Nobody drives your screen", detail: "No remote-access software for anyone who contacted you first." },
      ],
    },
    {
      kind: "prose",
      heading: "Holding Bitcoin so pressure cannot move it",
      anchor: "keys",
      paragraphs: [
        "Self-custody means you hold the keys, and nobody can freeze them. It also means nobody can recover them, and that a person who forces you can move them. Both risks are managed in advance.",
        "Keep the recovery phrase offline, ideally stamped in metal, never photographed, typed or stored in the cloud. For significant amounts, a multisignature setup (for example two keys of three, kept in different places) removes any single point that can be stolen or forced.",
        "The cheapest protection is silence. Holdings that nobody knows about are holdings nobody tries to take. Keep a small everyday wallet separate from savings, and do not tie addresses or amounts to your name in public.",
      ],
    },
    {
      kind: "prose",
      heading: "If you are being pressured",
      anchor: "pressured",
      paragraphs: [
        "If someone threatens you, your safety comes before any amount. Comply if you must, get somewhere safe, and call the police on 117. Keep everything: messages, numbers, transaction ids.",
        "If you have already sent money to a scam, call your bank at once on the number on your card. The sooner they know, the better the chance of stopping or recalling a payment.",
      ],
    },
  ],
};

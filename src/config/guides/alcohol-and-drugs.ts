import type { Guide } from "./types";

export const ALCOHOL_AND_DRUGS: Guide = {
  slug: "alcohol-and-drugs",
  title: "Alcohol and drugs: reducing the harm",
  fields: ["HEALTH", "PHYSICAL"],
  summary: "What to do before, during and after a night with alcohol or other drugs: drug checking in Zürich, the few rules that prevent most emergencies, and how to look after someone who has had too much.",
  photo: "festival",
  statement: "Nobody should die of a night out.",
  lead: [
    "Skif does not tell adults what to put in their bodies. It cares that they wake up the next day. Switzerland's own drug policy is built the same way: prevention, therapy and enforcement, and beside them harm reduction, a pillar of its own [1].",
    "Most deaths and injuries on a night out come from a short list: not knowing what is in a pill or powder, mixing substances, taking more too soon, being alone when it goes wrong, and the people nearby not knowing what to do. Every one of those has a plain answer.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Before: know what you have",
      anchor: "before",
      items: [
        {
          term: "Drug checking in Zürich",
          detail:
            "The city's Drogeninformationszentrum, under the Saferparty name, analyses substances chemically and talks the result through with you. It is free and anonymous, needs an appointment, and runs at Wasserwerkstrasse 17 and Langstrasse 14, and at some parties and festivals [2]. Opening times change; check the page before you go.",
        },
        { term: "Decide your limit while sober", detail: "How much, and when you stop. A decision made at 22:00 is better than one made at 02:00." },
        { term: "Eat, and plan water", detail: "A meal before, and water between drinks. It slows the night down without ending it." },
        { term: "Plan the way home first", detail: "Never drive. In Switzerland 0.5‰ is the general limit and new and professional drivers may not drive under the influence at all; the driving guide has the details [6]." },
      ],
    },
    {
      kind: "cards",
      heading: "During: four rules that prevent most emergencies",
      anchor: "during",
      columns: 2,
      cards: [
        { title: "Don't mix", body: "Saferparty's first advice for nearly every substance: avoid mixing it with other psychoactive substances, or know what the combination does [3]. That includes alcohol." },
        { title: "A small amount, and wait", body: "Use a small amount and do not take more too soon; re-dosing raises the risk of overdose [3]. Effects can take longer than you expect." },
        { title: "Not alone", body: "Don't use alone, and tell the people around you what you have taken [3], so that if something happens they can tell the ambulance." },
        { title: "Call early", body: "If someone is in trouble, stay with them and call 144 [3]. Calling too early costs nothing; calling too late is how people die." },
      ],
    },
    {
      kind: "table",
      heading: "Signs of alcohol poisoning",
      blurb: "Any one of these in someone who has been drinking is a reason to call 144 [4].",
      anchor: "signs",
      columns: ["Sign", "What you see"],
      rows: [
        ["Confusion", "Does not know where they are, cannot follow a simple question"],
        ["Speech and movement", "Slurring words, unable to coordinate movement"],
        ["Vomiting", "Being sick, especially while drowsy"],
        ["Skin", "Pale or blue-tinged"],
        ["Breathing", "Slow or irregular"],
        ["Seizure", "A fit of any kind"],
        ["Unconscious", "Cannot be woken"],
      ],
    },
    {
      kind: "definitions",
      heading: "After: looking after someone",
      anchor: "after",
      items: [
        { term: "Stay with them", detail: "Never leave someone who is very drunk or high alone to sleep it off [4]." },
        { term: "Recovery position", detail: "If they have passed out, lay them on their side so they cannot choke on vomit, and keep checking that they are breathing [4]." },
        { term: "Keep them warm", detail: "A jacket or blanket. Cold makes it worse [4]." },
        { term: "What not to do", detail: "No more alcohol, no coffee, no cold shower, and do not try to make them sick [4]. None of these sober anyone up; some make it worse." },
        { term: "Who to call", detail: "144 for an ambulance. 145 is Tox Info Suisse, the poison information line, answered day and night [5]: call it when you are unsure whether something swallowed is dangerous and the person is not in immediate trouble." },
      ],
    },
    {
      kind: "faq",
      heading: "Questions people ask",
      anchor: "questions",
      items: [
        { question: "Will calling 144 get my friend in trouble?", answer: "Paramedics are there to treat. Whatever the legal question, a person who is not breathing properly needs an ambulance, and that comes first." },
        { question: "Does Skif encourage drug use?", answer: "No. Skif takes the position Swiss drug policy states: reduce drug use and reduce its harm to the people who use and to everyone else, both at once [1]." },
        { question: "Where can I talk to someone about my own use?", answer: "Saferparty offers personal consultations with every drug check, and talking it through is part of the service, not a lecture [2]." },
      ],
    },
  ],
  sources: [
    { title: "Vier-Säulen-Politik", publisher: "Bundesamt für Gesundheit BAG", year: 2026, url: "https://www.bag.admin.ch/de/vier-saeulen-politik" },
    { title: "Drug checking", publisher: "Saferparty, Drogeninformationszentrum Stadt Zürich", year: 2026, url: "https://en.saferparty.ch/angebote/drug-checking" },
    { title: "Safer use", publisher: "Saferparty, Drogeninformationszentrum Stadt Zürich", year: 2026, url: "https://en.saferparty.ch/angebote/saferuse" },
    { title: "Alcohol poisoning", publisher: "NHS", year: 2026, url: "https://www.nhs.uk/conditions/alcohol-poisoning/" },
    { title: "Tox Info Suisse: Notfall Telefon 145", publisher: "Tox Info Suisse", year: 2026, url: "https://www.toxinfo.ch/" },
    { title: "Fahren unter Alkoholeinfluss: rechtliche Konsequenzen", publisher: "BFU, Beratungsstelle für Unfallverhütung", year: 2026, url: "https://www.bfu.ch/de/services/rechtsfragen/alkoholgrenzwerte-schweizer-verkehr" },
  ],
  checked: "21 October 2026",
};

import type { SitePage } from "@bitbaum/sitekit";

export const BUSINESS_DE: SitePage = {
  path: "business",
  title: "Für Geschäfte und Lokale",
  intro: "Läden, Bars, Clubs, Büros und Anlässe.",
  sections: [
    {
      kind: "hero",
      eyebrow: "Für Geschäfte und Lokale",
      statement: "Ein sicherer Ort ist gut fürs Geschäft.",
      lead: [
        "Gäste, die sich sicher fühlen, bleiben länger und kommen wieder; Personal, das weiss, was zu tun ist, bleibt ruhiger. Skif schaut sich den Ort an, den du führst — die Tür, den Raum, die Strasse vor dem Haus, den Abend, an dem eine Demonstration vorbeizieht — und hilft dir beim verhältnismässigsten Schritt, nicht beim teuersten.",
      ],
      actions: [
        { label: "Deinen Ort einschätzen", href: "/signin?mode=create&from=%2Fassessments" },
        { label: "Mit Skif reden", href: "mailto:cato@orangecat.ch?subject=Skif%20%E2%80%94%20a%20business%20or%20venue" },
      ],
    },
    {
      kind: "cards",
      heading: "Was Skif für einen Ort tut",
      anchor: "what",
      columns: 2,
      cards: [
        {
          title: "Eine Einschätzung des Orts",
          body: "Gäste, Personal, Eingänge, die Strasse, was an einem bekannten Datum passiert. Ein Plan, in dem jeder Schritt zeigt, was er bringt und kostet, und der sagt, wo nichts nötig ist.",
        },
        {
          title: "Personal, das entschärft",
          body: "Skif-Personal für deine vollsten Abende, ausgewählt nach Deeskalation, Erster Hilfe und Ruhe, nicht nach Grösse. Es hält die Gäste sicher und ruft 117 an, wenn es nötig ist.",
        },
        {
          title: "Dein eigenes Team schulen",
          body: "Deeskalation, Erste Hilfe und Blutungen stoppen, damit die Leute, die schon bei dir arbeiten, die ersten Minuten kennen.",
        },
        {
          title: "Eine Demonstration in deiner Strasse",
          body: "Eine Checkliste für den Tag, an dem in der Nähe eine Demonstration angekündigt ist: pünktlich schliessen, das Schaufenster räumen, dich mit den Nachbarn absprechen, und Leute an deiner Seite, während du gehst.",
        },
      ],
    },
    {
      kind: "definitions",
      heading: "Wie Skif mit einem Geschäft arbeitet",
      anchor: "how",
      items: [
        {
          term: "Verhältnismässigkeit zuerst",
          detail: "Gratis-Schritte kommen zuerst: Hausregeln an der Tür, eine Besprechung vor jedem Abend, Beleuchtung, Nachbarn. Menschen und Produkte nur dort, wo sie die verhältnismässige Antwort sind.",
        },
        {
          term: "Privatsphäre für deine Gäste",
          detail: "Jeder Schritt zeigt, was er an Privatsphäre kostet. Kameras, die Gäste filmen, sind eine Option mit echtem Preis, nie die Voreinstellung.",
        },
        {
          term: "Ruhig, nicht einschüchternd",
          detail: "Keine Muskelprotze an der Tür. Ein Gast soll sich umsorgt fühlen, nicht beobachtet.",
        },
      ],
    },
  ],
};

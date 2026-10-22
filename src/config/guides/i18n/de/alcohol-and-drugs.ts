import { ALCOHOL_AND_DRUGS } from "../../alcohol-and-drugs";
import type { Guide } from "../../types";

export const ALCOHOL_AND_DRUGS_DE: Guide = {
  slug: "alcohol-and-drugs",
  title: "Alkohol und Drogen: den Schaden verringern",
  fields: ["HEALTH", "PHYSICAL"],
  summary: "Was du vor, während und nach einer Nacht mit Alkohol oder anderen Drogen tun kannst: Drug Checking in Zürich, die paar Regeln, die die meisten Notfälle verhindern, und wie du dich um jemanden kümmerst, der zu viel hatte.",
  photo: "festival",
  statement: "Niemand sollte an einem Ausgang sterben.",
  lead: [
    "Skif sagt Erwachsenen nicht, was sie in ihren Körper tun sollen. Skif liegt daran, dass sie am nächsten Tag aufwachen. Die Schweizer Drogenpolitik selbst ist genauso aufgebaut: Prävention, Therapie und Repression, und daneben Schadensminderung als eigene Säule [1].",
    "Die meisten Todesfälle und Verletzungen an einem Ausgang kommen von einer kurzen Liste: nicht wissen, was in einer Pille oder einem Pulver ist, Substanzen mischen, zu früh nachlegen, allein sein, wenn es schiefgeht, und Leute in der Nähe, die nicht wissen, was zu tun ist. Für jedes davon gibt es eine einfache Antwort.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Vorher: wissen, was du hast",
      anchor: "before",
      items: [
        {
          term: "Drug Checking in Zürich",
          detail:
            "Das Drogeninformationszentrum der Stadt analysiert unter dem Namen Saferparty Substanzen chemisch und bespricht das Resultat mit dir. Es ist gratis und anonym, braucht einen Termin und findet an der Wasserwerkstrasse 17 und an der Langstrasse 14 statt, und an manchen Partys und Festivals [2]. Die Öffnungszeiten ändern sich; schau auf die Seite, bevor du hingehst.",
        },
        { term: "Leg deine Grenze nüchtern fest", detail: "Wie viel, und wann du aufhörst. Eine Entscheidung um 22:00 ist besser als eine um 02:00." },
        { term: "Iss, und plan Wasser ein", detail: "Eine Mahlzeit vorher, und Wasser zwischen den Getränken. Das verlangsamt die Nacht, ohne sie zu beenden." },
        { term: "Plan zuerst den Heimweg", detail: "Fahr nie selbst. In der Schweiz gilt allgemein 0,5 ‰, und Neulenkende sowie Berufsfahrerinnen und -fahrer dürfen überhaupt nicht unter Alkoholeinfluss fahren; der Leitfaden zum Fahren hat die Einzelheiten [6]." },
      ],
    },
    {
      kind: "cards",
      heading: "Währenddessen: vier Regeln, die die meisten Notfälle verhindern",
      anchor: "during",
      columns: 2,
      cards: [
        { title: "Nicht mischen", body: "Der erste Rat von Saferparty für fast jede Substanz: Misch sie nicht mit anderen psychoaktiven Substanzen, oder wisse, was die Kombination bewirkt [3]. Das gilt auch für Alkohol." },
        { title: "Eine kleine Menge, und warten", body: "Nimm eine kleine Menge und leg nicht zu früh nach; Nachdosieren erhöht das Risiko einer Überdosis [3]. Die Wirkung kann länger auf sich warten lassen, als du erwartest." },
        { title: "Nicht allein", body: "Konsumier nicht allein, und sag den Leuten um dich herum, was du genommen hast [3], damit sie es der Ambulanz sagen können, falls etwas passiert." },
        { title: "Früh anrufen", body: "Wenn jemand in Schwierigkeiten ist, bleib bei der Person und ruf 144 an [3]. Zu früh anrufen kostet nichts; zu spät anrufen ist, wie Menschen sterben." },
      ],
    },
    {
      kind: "table",
      heading: "Anzeichen einer Alkoholvergiftung",
      blurb: "Jedes einzelne davon bei jemandem, der getrunken hat, ist ein Grund, 144 anzurufen [4].",
      anchor: "signs",
      columns: ["Anzeichen", "Was du siehst"],
      rows: [
        ["Verwirrung", "Weiss nicht, wo er oder sie ist, kann einer einfachen Frage nicht folgen"],
        ["Sprache und Bewegung", "Lallt, kann Bewegungen nicht koordinieren"],
        ["Erbrechen", "Muss sich übergeben, besonders im Halbschlaf"],
        ["Haut", "Blass oder bläulich"],
        ["Atmung", "Langsam oder unregelmässig"],
        ["Krampfanfall", "Ein Anfall jeder Art"],
        ["Bewusstlos", "Lässt sich nicht wecken"],
      ],
    },
    {
      kind: "definitions",
      heading: "Danach: sich um jemanden kümmern",
      anchor: "after",
      items: [
        { term: "Bleib bei der Person", detail: "Lass nie jemanden, der sehr betrunken oder high ist, allein ausschlafen [4]." },
        { term: "Seitenlage", detail: "Wenn die Person bewusstlos ist, leg sie auf die Seite, damit sie nicht an Erbrochenem erstickt, und prüf immer wieder, ob sie atmet [4]." },
        { term: "Halt sie warm", detail: "Eine Jacke oder eine Decke. Kälte macht es schlimmer [4]." },
        { term: "Was du nicht tun sollst", detail: "Kein Alkohol mehr, kein Kaffee, keine kalte Dusche, und versuch nicht, sie zum Erbrechen zu bringen [4]. Nichts davon macht jemanden nüchtern; manches macht es schlimmer." },
        { term: "Wen du anrufst", detail: "144 für die Ambulanz. 145 ist Tox Info Suisse, die Giftnotrufnummer, Tag und Nacht erreichbar [5]: Ruf dort an, wenn du unsicher bist, ob etwas Verschlucktes gefährlich ist, und die Person nicht in unmittelbarer Gefahr ist." },
      ],
    },
    {
      kind: "faq",
      heading: "Fragen, die Leute stellen",
      anchor: "questions",
      items: [
        { question: "Bringt ein Anruf bei 144 meine Freundin oder meinen Freund in Schwierigkeiten?", answer: "Die Rettungssanitäterinnen und -sanitäter sind da, um zu behandeln. Wie auch immer die rechtliche Frage lautet: Wer nicht richtig atmet, braucht eine Ambulanz, und das geht vor." },
        { question: "Ermutigt Skif zum Drogenkonsum?", answer: "Nein. Skif vertritt die Haltung, die die Schweizer Drogenpolitik festhält: den Drogenkonsum verringern und seinen Schaden verringern, für die Konsumierenden und für alle anderen, beides zugleich [1]." },
        { question: "Wo kann ich mit jemandem über meinen eigenen Konsum reden?", answer: "Saferparty bietet bei jedem Drug Checking eine persönliche Beratung an, und das Gespräch gehört zum Angebot, es ist keine Standpauke [2]." },
      ],
    },
  ],
  sources: ALCOHOL_AND_DRUGS.sources,
  checked: "21 October 2026",
};

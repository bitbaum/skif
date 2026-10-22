import { TRAVEL } from "../../travel";
import type { Guide } from "../../types";

export const TRAVEL_DE: Guide = {
  slug: "travel",
  title: "Reisen: andere Länder, andere Regeln",
  fields: ["ENVIRONMENTAL", "HEALTH", "FINANCIAL"],
  summary: "Wie du fast überallhin gehst und gut zurückkommst: Vorbereitung vor der Abreise, Essen und Wasser, Geld und Dokumente und was zu tun ist, wenn eine Reise schiefgeht.",
  photo: "platform",
  statement: "Geh weiter. Bereite dich einmal vor.",
  lead: [
    "Reisen gehört zum Freiesten, was ein Mensch tun kann, und seine Risiken sind meist langweilige: ein verdorbener Magen, ein verlorener Pass, ein Betrug, eine Strasse. Die dramatischen Risiken gibt es an ein paar Orten wirklich, und sie sind gut dokumentiert, also kannst du sie kennen, bevor du buchst.",
    "Die Vorbereitung braucht einen Abend. Danach gehört die Reise dir.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Bevor du abreist",
      anchor: "before",
      items: [
        {
          term: "Erfass die Reise in Travel Admin",
          detail: "Die Reise-App des Schweizer Aussendepartements. Das Departement empfiehlt, sie vor der Abreise herunterzuladen, dich zu registrieren und deine Auslandreisen einzutragen [1], damit es weiss, dass du dort bist, wenn dort, wo du bist, eine Krise ausbricht.",
        },
        { term: "Lies die Reisehinweise", detail: "Das Aussendepartement veröffentlicht Hinweise für jedes Land. Lies die aktuelle Fassung für dein Land, nicht die vom letzten Jahr." },
        { term: "Gesundheit und Impfungen", detail: "Eine Reisemedizin-Sprechstunde oder deine Ärztin, ein paar Wochen im Voraus für alle Orte mit anderen Krankheiten." },
        { term: "Eine Versicherung, die die Reise deckt", detail: "Prüf die medizinische Deckung im Ausland und die Rückführung, und ob die Sportarten, die du planst, eingeschlossen sind." },
        { term: "Kopien der Dokumente", detail: "Pass und Karten fotografiert und offline gespeichert, und eine Papierkopie getrennt von den Originalen." },
        { term: "Jemand zu Hause", detail: "Hinterlass deine Pläne bei einer Person, und macht ab, wann du dich meldest." },
      ],
    },
    {
      kind: "cards",
      heading: "Essen und Wasser",
      blurb: "Wo das Leitungswasser verunreinigt sein kann, der Rat der CDC [2].",
      anchor: "food",
      columns: 2,
      cards: [
        { title: "Trink kein Leitungswasser", body: "Wo das Leitungswasser verunreinigt sein könnte, trink verschlossene Getränke aus der Flasche, und verzichte aufs Eis [2]." },
        { title: "Mach Wasser sicher", body: "Leitungswasser lässt sich durch Abkochen, Filtern oder chemische Behandlung sicher machen [2]." },
        { title: "Schälen oder waschen", body: "Früchte und Gemüse sind sicherer, wenn du sie selbst schälst oder in Flaschenwasser oder desinfiziertem Wasser wäschst [2]." },
        { title: "Heiss und frisch gekocht", body: "Essen, das heiss serviert und vor deinen Augen gekocht wird, ist meist die sicherere Wahl als ein Buffet, das schon länger steht." },
      ],
    },
    {
      kind: "definitions",
      heading: "Geld und Dokumente unterwegs",
      anchor: "money",
      items: [
        { term: "Teil es auf", detail: "Zwei Karten an zwei Orten, und etwas Bargeld an einem dritten. Ein verlorenes Portemonnaie sollte ein Ärgernis sein, nicht das Ende der Reise." },
        { term: "Die Tagestasche trägt den Tag", detail: "Den Pass im Hotelsafe, ausser du brauchst ihn; eine Kopie bei dir." },
        { term: "Betrug folgt Drehbüchern", detail: "Taxis ohne Taxameter, «geschlossene» Sehenswürdigkeiten mit einem Freund gleich in der Nähe, ein Fleck auf deiner Jacke. Der Leitfaden zu Betrug erklärt die Hebel, die sie alle gemeinsam haben." },
        { term: "Bancomaten in Banken", detail: "Bei Tageslicht, und deck das Tastenfeld ab." },
      ],
    },
    {
      kind: "prose",
      heading: "Wenn es schiefgeht",
      anchor: "wrong",
      paragraphs: [
        "Speicher die lokale Notrufnummer, bevor du landest; es ist nicht immer die 112. Für alles, was eine Schweizerin oder ein Schweizer im Ausland nicht allein lösen kann, etwa einen verlorenen Pass, eine Verhaftung oder ein Spital, sind die nächste Schweizer Botschaft oder das nächste Konsulat und die Helpline des Aussendepartements die richtigen Stellen.",
        "Bei einer Krise dort, wo du bist, gilt dieselbe Regel wie zu Hause: Entfern dich zuerst davon, dann sag jemandem, wo du bist. Über Travel Admin findet dich das Departement [1].",
      ],
    },
  ],
  sources: TRAVEL.sources,
  checked: "21 October 2026",
};

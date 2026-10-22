import { DRIVING } from "../../driving";
import type { Guide } from "../../types";

export const DRIVING_DE: Guide = {
  slug: "driving",
  title: "Autofahren, Töff, Velo und die Strasse",
  fields: ["PHYSICAL", "HEALTH"],
  summary: "Auf der Strasse gehen die meisten Menschen ihr grösstes alltägliches Risiko ein. Was die Schweizer Zahlen über die Ursachen schwerer Unfälle sagen, die Alkoholgrenzen und die Gewohnheiten, die die Chancen verändern.",
  photo: "nightRoad",
  statement: "Das Handy kann warten. Die Strasse nicht.",
  lead: [
    "2025 starben auf Schweizer Strassen 214 Menschen, und 3935 wurden schwer verletzt [1]. Für die meisten Menschen ist der Weg zur Arbeit ein grösseres Risiko als alles, was ihnen nachts auf einer Strasse begegnen wird, und er bekommt nur einen Bruchteil der Aufmerksamkeit.",
    "Die Ursachen sind kein Rätsel. Das Bundesamt für Strassen nennt sie jedes Jahr, und fast alle sind Entscheidungen in den Sekunden vor einem Unfall.",
  ],
  sections: [
    {
      kind: "table",
      heading: "Was schwere Unfälle verursacht",
      blurb: "So, wie das Bundesamt für Strassen sie für 2025 nennt, nach Beteiligten [1].",
      anchor: "causes",
      columns: ["Wer", "Hauptursachen"],
      rows: [
        ["Autos", "Vortritt missachtet, Unaufmerksamkeit, Ablenkung"],
        ["Motorräder", "Vor allem Geschwindigkeit und Unaufmerksamkeit"],
        ["Fussgängerinnen und Fussgänger", "Vor allem ihr eigenes Verhalten"],
      ],
    },
    {
      kind: "cards",
      heading: "Ablenkung, in Zahlen",
      anchor: "distraction",
      columns: 3,
      cards: [
        { title: "3,6×", body: "Wer beim Fahren das Handy benutzt, hat laut der Beratungsstelle für Unfallverhütung ein 3,6-mal höheres Unfallrisiko [2]." },
        { title: "31 %", body: "Der schweren Strassenunfälle in der Schweiz haben Unaufmerksamkeit oder Ablenkung als Haupt- oder Mitursache: 1201 Menschen schwer verletzt oder getötet im Jahr 2025 [3]." },
        { title: "+⅓", body: "Ablenkung verlängert deine Reaktionszeit um etwa ein Drittel [3]. Bei 50 km/h sind das Meter Strasse, die du zurücklegst, bevor sich dein Fuss bewegt." },
      ],
    },
    {
      kind: "table",
      heading: "Alkoholgrenzen in der Schweiz",
      blurb: "Blutalkohol (‰) und der Atemalkoholwert, den die Polizei misst [4]. Bei einem von acht schweren Unfällen ist Alkohol im Spiel [5].",
      anchor: "alcohol",
      columns: ["Wer", "Grenze", "Was sie bedeutet"],
      rows: [
        ["Die meisten Lenkenden", "0,5 ‰ (0,25 mg/l Atemalkohol)", "Ab hier giltst du rechtlich als fahrunfähig"],
        ["Die meisten Lenkenden", "0,8 ‰ (0,4 mg/l Atemalkohol)", "Qualifiziertes Fahren in angetrunkenem Zustand"],
        ["Lernfahrende und Neulenkende mit Führerausweis auf Probe", "0,1 ‰ (0,05 mg/l Atemalkohol)", "Praktisch null, bei jeder Fahrt"],
        ["Bus- und Lastwagenfahrende, Fahrlehrerinnen und Fahrlehrer", "0,1 ‰ (0,05 mg/l Atemalkohol)", "Praktisch null, während der Arbeit"],
      ],
    },
    {
      kind: "definitions",
      heading: "Gewohnheiten, die die Chancen verändern",
      anchor: "habits",
      items: [
        { term: "Handy ausser Reichweite", detail: "Im Handschuhfach oder auf dem Rücksitz, oder beim Fahren auf «Nicht stören». Stell die Route ein, bevor du losfährst." },
        { term: "Im Zweifel Vortritt lassen", detail: "Das Missachten des Vortritts ist die erste Ursache, die das Bundesamt für Strassen bei Autounfällen nennt [1]. Im Zweifel fährt das andere Auto zuerst." },
        { term: "Plan das Getränk, oder die Fahrerin", detail: "Wenn du trinken wirst, entscheide vor dem Losgehen, wie du nach Hause kommst. Ein Taxi kostet weniger als jede der Alternativen." },
        { term: "Müde ist fahrunfähig", detail: "Halt auf einer langen Fahrt an, bevor du es nötig hast. Eine kurze Pause alle paar Stunden kostet Minuten." },
        { term: "Auf zwei Rädern", detail: "Geschwindigkeit und Unaufmerksamkeit sind die genannten Ursachen bei Motorrädern [1]. Volle Schutzausrüstung, und fahr so, als hätte dich niemand gesehen." },
        { term: "Zu Fuss", detail: "Kopf hoch und Handy runter an Übergängen und beim Aussteigen aus dem Tram. Unfälle von Fussgängerinnen und Fussgängern kommen vor allem von ihrem eigenen Verhalten [1]." },
      ],
    },
    {
      kind: "prose",
      heading: "Wenn du als Erste oder Erster bei einem Unfall bist",
      anchor: "crash",
      paragraphs: [
        "Sichere zuerst die Unfallstelle: Warnblinker an, Leuchtweste an und das Pannendreieck hinter der Unfallstelle aufstellen. Dann ruf 144 an bei Verletzten, oder 117 für die Polizei, und sag so genau wie möglich, wo du bist.",
        "Beweg keine verletzte Person, ausser sie ist dort, wo sie liegt, in unmittelbarer Gefahr. Sprich mit ihr, halt sie warm und warte bei ihr. Erste Hilfe, die du geübt hast, ist weit mehr wert als Erste Hilfe, über die du gelesen hast; die Erste-Hilfe-Kurse der Akademie sind der Ort, um anzufangen.",
      ],
    },
  ],
  sources: DRIVING.sources,
  checked: "21 October 2026",
};

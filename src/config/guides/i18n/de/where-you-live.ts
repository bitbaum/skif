import { WHERE_YOU_LIVE } from "../../where-you-live";
import type { Guide } from "../../types";

export const WHERE_YOU_LIVE_DE: Guide = {
  slug: "where-you-live",
  title: "Wo du wohnst: Kriminalitätszahlen ehrlich lesen",
  fields: ["ENVIRONMENTAL", "PHYSICAL"],
  summary: "Was die Schweizer Kriminalstatistik über Städte und Kantone sagt, warum die Rate einer Stadt schlimmer aussieht als das Risiko für die Menschen, die dort wohnen, und was ein Zuhause und eine Strasse wirklich sicherer macht.",
  photo: "eveningFlats",
  statement: "Eine Zahl ist eine Frage, kein Urteil.",
  lead: [
    "Menschen wählen, wo sie wohnen, arbeiten und ausgehen, zum Teil nach einem Gefühl von Sicherheit, und dieses Gefühl wird meist von einer Schlagzeile geprägt. Die offiziellen Zahlen sind öffentlich, und sie sagen etwas Ruhigeres und Nützlicheres.",
    "Die Schweiz verzeichnete 2025 61 Straftaten nach Strafgesetzbuch pro 1000 Einwohnerinnen und Einwohner, gegenüber etwa 72 im Jahr 2009 [1].",
  ],
  sections: [
    {
      kind: "table",
      heading: "Straftaten pro 1000 Einwohnerinnen und Einwohner, 2025",
      blurb: "Straftaten nach Strafgesetzbuch, aus der Polizeilichen Kriminalstatistik des Bundes und des Kantons Zürich [1] [2].",
      anchor: "numbers",
      columns: ["Wo", "Pro 1000"],
      rows: [
        ["Schweiz", "61"],
        ["Kanton Zürich", "64,6 (68,7 im Jahr 2024)"],
        ["Stadt Zürich", "101,8 (111,3 im Jahr 2024)"],
      ],
    },
    {
      kind: "prose",
      heading: "Warum die Stadt schlimmer aussieht, als sie ist",
      anchor: "commuters",
      paragraphs: [
        "Eine Rate pro Einwohnerin und Einwohner zählt jede Straftat in der Stadt und teilt durch die Menschen, die dort schlafen. Sie lässt die Hunderttausenden weg, die jeden Tag hereinkommen, um zu arbeiten, einzukaufen und auszugehen, und die Kantonspolizei sagt klar, dass dies in grossen Städten einen Effekt hat, den man nicht ausser Acht lassen kann [2]. Die Rate der Stadt Zürich ist auch deshalb hoch, weil sich so viel vom Leben des Kantons in ihr abspielt.",
        "Derselbe Bericht schlüsselt die Zahlen nach Bezirk und nach Kreis auf [2]. Das ist die Ebene, die sich zu lesen lohnt, wenn du eine Wohnung suchst: Eine Zahl für die ganze Stadt beschreibt niemandes Strasse.",
        "Ein Trend verdient Aufmerksamkeit statt Beruhigung: Landesweit nahmen die schweren Gewaltstraftaten 2025 um 8,1 % zu, während die Straftaten insgesamt zurückgingen [1]. Beides stimmt zugleich.",
      ],
    },
    {
      kind: "definitions",
      heading: "Was ein Zuhause wirklich sicherer macht",
      anchor: "home",
      items: [
        { term: "Die Tür und das Fenster, die du vergisst", detail: "Die meisten Einbrüche nehmen den einfachsten Weg hinein. Ein gutes Schloss an der Haupttür zählt weniger, wenn die Balkontür oder ein Fenster im Erdgeschoss offen bleibt." },
        { term: "Bewohnt aussehen", detail: "Licht mit Zeitschaltuhr und geleerter Briefkasten, wenn du weg bist. Eine Nachbarin, die Bescheid weiss, ist mehr wert als eine Kamera." },
        { term: "Kenn deine Nachbarn", detail: "Menschen, die einander kennen, bemerken, wer nicht dazugehört. Das ist der älteste Schutz, den es gibt, und er ist gratis." },
        { term: "Licht und Sichtlinien", detail: "Ein Eingang, den man von der Strasse aus sieht und der nachts beleuchtet ist, wird seltener gewählt." },
        { term: "Kameras zuletzt, nicht zuerst", detail: "Nützlich als Beweis, weniger sicher als Vorbeugung, und sie kosten Privatsphäre: deine und die deiner Nachbarn. Der Sicherheitsplan von Skif wägt diese Kosten ab, bevor er eine empfiehlt." },
      ],
    },
    {
      kind: "prose",
      heading: "Einen Ort wählen",
      anchor: "choosing",
      paragraphs: [
        "Geh ihn zu den Stunden ab, zu denen du dort leben wirst: am späten Abend, in einer Wochenendnacht, am frühen Morgen. Sprich mit den Leuten, die schon dort sind. Schau dir die Zahlen des Kreises an, nicht die der Stadt.",
        "Und wäg alles andere ab, was einen Ort sicher macht oder nicht: den Verkehr auf der Strasse vor dem Haus, den Weg zum Tram, die Fluchtwege im Gebäude, die Hochwasserkarte. Kriminalität ist ein Risiko unter mehreren, und selten das grösste.",
      ],
    },
  ],
  sources: WHERE_YOU_LIVE.sources,
  checked: "21 October 2026",
};

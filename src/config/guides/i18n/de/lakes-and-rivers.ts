import { WATER } from "../../water";
import type { Guide } from "../../types";

export const WATER_DE: Guide = {
  slug: "lakes-and-rivers",
  title: "Seen und Flüsse",
  fields: ["ENVIRONMENTAL", "HEALTH"],
  summary: "Schwimmen in der Limmat, sich die Aare hinuntertreiben lassen, ein See an einem heissen Tag: die zwölf Regeln, die die Schweizerische Lebensrettungs-Gesellschaft lehrt, und warum kaltes Wasser das Risiko ist, das Leute unterschätzen.",
  photo: "cityRiver",
  statement: "Das Wasser ist frei. Respektier es.",
  lead: [
    "Die Schweizer Seen und Flüsse gehören zum Besten am Leben hier, und Skif will dich darin sehen. Sie sind auch der Ort, an dem jeden Sommer Menschen sterben: 2025 ertranken in der Schweiz 43 Menschen, bei einem langjährigen Durchschnitt von etwa 50 pro Jahr [1].",
    "Die Schweizerische Lebensrettungs-Gesellschaft (SLRG) fasst ihr Wissen in zwei Sätzen von je sechs Regeln zusammen, einem fürs Baden und einem für Flüsse [2] [3]. Sie sind kurz, weil es die sind, die zählen.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Die sechs Baderegeln",
      blurb: "Die Baderegeln der SLRG [2].",
      anchor: "bathing",
      items: [
        { term: "Kinder nur mit einer erwachsenen Person", detail: "Kleine Kinder in Griffnähe. Ertrinken geht schnell und leise; es sieht nicht aus wie im Film." },
        { term: "Nie betrunken oder unter Drogen", detail: "Und nie mit vollem oder ganz leerem Magen." },
        { term: "Nie überhitzt ins Wasser springen", detail: "Der Körper braucht Zeit, um sich anzupassen. Mach nach Stunden an der Sonne die Haut nass und geh langsam hinein." },
        { term: "Nicht in trübes oder unbekanntes Wasser springen", detail: "Was du nicht siehst, kann dich verletzen: Steine, Äste, seichter Grund." },
        { term: "Luftmatratzen und Schwimmhilfen gehören nicht ins tiefe Wasser", detail: "Dort geben sie keine Sicherheit. Sie treiben ab, verlieren Luft und kippen." },
        { term: "Nie allein lange Strecken schwimmen", detail: "Auch der fitteste Körper kann einen schwachen Moment haben." },
      ],
    },
    {
      kind: "definitions",
      heading: "Die sechs Flussregeln",
      blurb: "Die Flussregeln der SLRG [3]. Sie zählen an der Aare, am Rhein, an der Reuss und an der Limmat.",
      anchor: "rivers",
      items: [
        { term: "Rettungsweste im Schlauchboot", detail: "Alle in einem Schlauchboot tragen eine." },
        { term: "Die angegebene Belastung respektieren", detail: "Lade nie mehr auf ein Boot, als sein Schild erlaubt." },
        { term: "Boote nie zusammenbinden", detail: "Zusammengebundene Boote lassen sich nicht mehr steuern." },
        { term: "Unbekannte Abschnitte zuerst erkunden", detail: "Wehre, Brückenpfeiler und umgestürzte Bäume sind die Stellen, an denen Menschen eingeklemmt werden. Wisse, wo sie sind und wo du aussteigst, bevor du einsteigst." },
        { term: "Offene Gewässer sind für gute Schwimmerinnen und Schwimmer", detail: "Flüsse, Weiher und Seen: nur für gute, geübte Schwimmerinnen und Schwimmer." },
        { term: "Je kälter das Wasser, desto kürzer das Schwimmen", detail: "Kälte führt zu Krämpfen. Flusswasser im Frühsommer ist viel kälter als die Luft darüber." },
      ],
    },
    {
      kind: "cards",
      heading: "Bevor du hineingehst",
      anchor: "before",
      columns: 3,
      cards: [
        { title: "Kenn deinen Ausstieg", body: "Such dir an einem Fluss die Treppe oder Leiter aus, wo du aussteigst, bevor du einsteigst, und die nächste danach, falls du sie verpasst." },
        { title: "Geh mit jemandem", body: "Jemand am Ufer, der weiss, wo du hineingegangen bist und wann du zurück sein solltest." },
        { title: "Wasserdichter Sack, auffällige Boje", body: "Eine Schwimmboje macht dich für Boote sichtbar und gibt dir etwas zum Festhalten. Sie ist keine Rettungsweste." },
      ],
    },
    {
      kind: "prose",
      heading: "Wenn jemand in Not ist",
      anchor: "rescue",
      paragraphs: [
        "Ruf sofort 144 an, oder lass jemand anderen anrufen, während du handelst. Reich oder wirf etwas, bevor du hineingehst: einen Ast, ein Seil, einen Rettungsring, alles, was schwimmt. Ungeübte Retterinnen und Retter ertrinken zusammen mit der Person, zu der sie hinausschwimmen.",
        "Die SLRG bietet in der ganzen Schweiz Schwimm- und Rettungsschwimmkurse an, und die Erste-Hilfe-Kurse der Akademie behandeln die Wiederbelebung. Beides dauert ein paar Stunden, und beides gehört zu den Dingen, die du hoffentlich nie brauchst und froh bist, sie zu haben.",
      ],
    },
  ],
  sources: WATER.sources,
  checked: "21 October 2026",
};

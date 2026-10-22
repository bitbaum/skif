import type { Guide } from "../../types";

export const PROFESSIONALS_DE: Guide = {
  slug: "what-professionals-teach",
  title: "Was Fachleute der Öffentlichkeit beibringen",
  fields: ["RESILIENCE", "HEALTH", "PHYSICAL"],
  summary: "Weglaufen, verstecken, melden; eine Blutung stoppen; Warnzeichen bemerken. Öffentliche Programme von Polizei und Medizin, keine Mythen über Geheimdienste.",
  photo: "cprTraining",
  statement: "Die besten Methoden sind veröffentlicht, geprüft und langweilig.",
  lead: [
    "Polizeikorps, medizinische Fachgesellschaften und Forschende zur Bedrohungseinschätzung veröffentlichen Anleitungen für die Öffentlichkeit, geprüft an echten Vorfällen. Das ist weniger aufregend als Geschichten über Spezialeinheiten und Nachrichtendienste, und weit nützlicher.",
    "Skif baut auf veröffentlichten, überprüfbaren Methoden auf und nennt sie beim Namen. Skif leiht sich nicht die Aura von Diensten, deren Methoden nicht öffentlich sind und sich nicht überprüfen lassen.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Programme, die du kennen solltest",
      anchor: "programmes",
      items: [
        {
          term: "Run, Hide, Tell (britische Antiterrorpolizei)",
          detail: "Bei einem Anschlag: Lauf weg, wenn es einen sicheren Weg gibt; wenn nicht, versteck dich ausser Sicht, schalt dein Handy stumm und verbarrikadier dich; melde es der Polizei, sobald es sicher ist. Einfach genug, um es dir unter Stress zu merken, und genau darum geht es.",
        },
        {
          term: "Run, Hide, Fight (US-Heimatschutzministerium)",
          detail: "Dieselbe Reihenfolge bei einem aktiven Angreifer, mit Kämpfen als letztem Mittel, wenn das Verstecken scheitert. Wieder die Leiter: zuerst weg.",
        },
        {
          term: "Stop the Bleed (American College of Surgeons)",
          detail: "Eine schwere Blutung kann töten, bevor die Ambulanz da ist. Der Kurs lehrt in ein paar Stunden direkten Druck, das Austamponieren von Wunden und Tourniquets. Er gehört zu den wertvollsten Trainings, die jemand machen kann.",
        },
        {
          term: "Verhaltensbasierte Bedrohungseinschätzung (US Secret Service, National Threat Assessment Center)",
          detail: "Seine Forschung zu gezielten Angriffen fand, dass die Täter meist vorher ein Verhalten gezeigt hatten, das Menschen in ihrem Umfeld beunruhigte. Bedenken früh zu melden, bei jemandem, der handeln kann, verhindert Schaden.",
        },
      ],
    },
    {
      kind: "cards",
      heading: "Gewohnheiten, die sich zu übernehmen lohnen",
      blurb: "Was jeder ernsthafte Sicherheitsberuf tut, heruntergebrochen auf eine Person und einen Haushalt.",
      anchor: "habits",
      columns: 2,
      cards: [
        { title: "Entscheide, bevor es passiert", body: "Unter Stress tun Menschen, was sie vorher entschieden haben. Macht jetzt ab: wo sich die Familie trifft, wer wen anruft, was du tust, wenn das Auto nachts eine Panne hat." },
        { title: "Üb die erste Minute", body: "Geh deine Ausgänge einmal ab, such den Feuerlöscher, sag die Notrufnummern laut. Einen Plan, den du geübt hast, kannst du auch befolgen." },
        { title: "Halt es einfach", body: "Run, Hide, Tell passt in drei Wörter, weil komplizierte Pläne unter Adrenalin scheitern. Wenn dein Plan eine Seite braucht, kürz ihn." },
        { title: "Schau danach zurück", body: "Frag dich nach einem Schreck oder einem Beinahe-Unfall, was passiert ist, was funktioniert hat und was du ändern würdest. Ohne Schuldzuweisung, und dann ändere es." },
      ],
    },
    {
      kind: "prose",
      heading: "Warum nicht Spezialeinheiten und Geheimdienste?",
      anchor: "agencies",
      paragraphs: [
        "Einheiten wie die französische GIGN oder der britische SAS, und Dienste wie die CIA, der MI6 oder der Mossad, lösen Probleme, die eine Privatperson nicht hat, mit Training, rechtlichen Befugnissen und Unterstützung, die niemand ausserhalb hat. Ihre echten Methoden sind grösstenteils nicht öffentlich, und was in ihrem Namen verkauft wird, lässt sich meist nicht überprüfen.",
        "Was sich übertragen lässt, ist die Gewohnheit darunter: vorausplanen, üben, es einfach halten und danach zurückschauen. Das ist gratis, und darauf ist diese Seite gebaut.",
      ],
    },
  ],
};

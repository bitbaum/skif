import type { SitePage } from "@bitbaum/sitekit";

export const METHOD_DE: SitePage = {
  path: "method",
  title: "Methode",
  intro: "Wie Skif entscheidet, was es empfiehlt.",
  sections: [
    {
      kind: "hero",
      eyebrow: "Methode",
      statement: "Wie Skif entscheidet.",
      lead: [
        "Jede Empfehlung von Skif lässt sich auf das zurückführen, was du erzählt hast, und auf eine Regel, die hier aufgeschrieben ist. Keine versteckte Punktzahl, kein Modell, das Gefahren errät, kein Verkaufsdruck.",
        "Das Ziel ist ein gutes Leben mit wenig ungewolltem Risiko, nicht maximale Sicherheit. Überwachung, Einschränkung und ständige Angst können jemanden technisch sicherer und sein Leben schlechter machen, und Skif rechnet diese Kosten mit.",
      ],
    },
    {
      kind: "index",
      heading: "Auf dieser Seite",
      entries: [
        { label: "Der Kreislauf", anchor: "loop" },
        { label: "Der verhältnismässigste Schritt", anchor: "proportionality" },
        { label: "Was jeder Schritt kostet", anchor: "costs" },
        { label: "Woher eine Bewertung kommt", anchor: "evidence" },
        { label: "Feste Grenzen, die du setzen kannst", anchor: "limits" },
        { label: "Wie ein Protector ausgewählt wird", anchor: "protectors" },
        { label: "Was Skif speichert", anchor: "data" },
      ],
    },
    {
      kind: "cards",
      heading: "Der Kreislauf",
      anchor: "loop",
      columns: 4,
      cards: [
        {
          title: "Einschätzen",
          body: "Was dir wichtig ist, was ihm schaden könnte, wie ausgesetzt es wirklich ist. Eine Karte, die du lesen kannst, keine Punktzahl.",
        },
        {
          title: "Verbessern",
          body: "Schritte, gereiht nach dem, was sie bringen, und dem, was sie an Geld, Privatsphäre, Freiheit und Bequemlichkeit kosten.",
        },
        {
          title: "Schützen",
          body: "Ein Mensch nur dort, wo ein Mensch die verhältnismässige Antwort ist, zugeteilt nach Fähigkeiten.",
        },
        {
          title: "Lernen",
          body: "Was gewirkt hat und wie es sich angefühlt hat, damit die nächste Empfehlung besser ist als die letzte.",
        },
      ],
    },
    {
      kind: "prose",
      heading: "Der verhältnismässigste Schritt",
      anchor: "proportionality",
      paragraphs: [
        "Eine Einschätzung macht aus dem, was du erzählst, Befunde: was Aufmerksamkeit braucht, wie dringend und weshalb. Sie schätzt nie die Wahrscheinlichkeit eines Schadens, denn das kann ehrlicherweise niemand.",
        "Für jeden Befund empfiehlt der Plan einen Schritt. Er wählt nie einen, der eine von dir gesetzte Grenze verletzt, und nie einen über deinem Budget; diese werden separat aufgeführt, damit du siehst, dass es sie gibt. Bei den meisten Befunden wählt er den am wenigsten einschneidenden Schritt, der wirkt: zuerst am wenigsten aufgegebene Privatsphäre, dann am wenigsten Geld, dann am wenigsten verlangte Freiheit.",
        "Wenn du Skif von einer bekannten Bedrohung erzählst, erhält der Befund hohe Priorität und die Reihenfolge kehrt sich um: Der wirksamste Schritt kommt zuerst. Verhältnismässigkeit gilt in beide Richtungen.",
        "Wo du schon genug tust, sagt der Plan das und empfiehlt nichts Neues. Deine Neigungen zwischen Privatsphäre und Beobachtbarkeit, selber machen und Automatisierung, menschlichem Schutz und Technik, lokaler Verarbeitung und dem Komfort der Cloud, individuellen und gemeinschaftlichen Lösungen, Bequemlichkeit und maximaler Absicherung ändern die Reihenfolge der Schritte, nie, welche Schritte zugelassen sind.",
      ],
    },
    {
      kind: "table",
      heading: "Was jeder Schritt kostet",
      blurb: "Jeder Schritt trägt neben seinem Preis einen Preis für die Privatsphäre und einen für die Freiheit, auf derselben Vierer-Skala. Du siehst alle drei, bevor du wählst.",
      anchor: "costs",
      columns: ["Stufe", "Privatsphäre", "Freiheit"],
      rows: [
        ["0", "Keine Daten, keine Geräte, die zuschauen", "Ändert nichts daran, wie du lebst"],
        ["1", "Teilt ein wenig mit Menschen, die du wählst", "Verlangt eine kleine Gewohnheit von dir"],
        ["2", "Zeichnet auf oder sendet über dein Zuhause hinaus", "Etwas anderes entscheidet oder handelt für dich"],
        ["3", "Beobachtet Menschen oder entzieht sich deiner Kontrolle", "Schränkt ein, was du tun kannst"],
      ],
      monoColumns: [0],
    },
    {
      kind: "table",
      heading: "Geld",
      columns: ["Stufe", "Bedeutet"],
      rows: [
        ["Gratis", "Nichts — nur Gratis-Schritte"],
        ["Unter CHF 100", "Bis CHF 100"],
        ["CHF 100–500", "Bis CHF 500"],
        ["Über CHF 500 oder ein Abo", "Mehr, wenn es sich klar lohnt"],
      ],
    },
    {
      kind: "prose",
      heading: "Woher eine Bewertung kommt",
      anchor: "evidence",
      paragraphs: [
        "Jede Nutzenbewertung nennt ihre Grundlage: veröffentlichte Forschung, was Skif in der eigenen Arbeit beobachtet hat, eine namentlich genannte Fachperson oder Skifs eigenes Urteil. Angaben von Herstellern werden nie verwendet.",
        "Heute ist jede Bewertung Skifs eigenes Urteil, und das steht auch dabei. Keine ist als sehr sicher markiert, bis Forschung dazu vorliegt. Diese Belege aufzubauen, gehört zur Arbeit.",
      ],
    },
    {
      kind: "definitions",
      heading: "Feste Grenzen, die du setzen kannst",
      blurb: "Eine Grenze wird nie gegen etwas eingetauscht. Ein Schritt, der eine verletzen würde, wird aus deinem Plan ausgeschlossen, und der Plan sagt dir, welche Grenze ihn ausgeschlossen hat.",
      anchor: "limits",
      items: [
        { term: "Keine Gesichtserkennung", detail: "Nichts, was Gesichter identifiziert, auf keinem Gerät, nirgends." },
        { term: "Keine Kameras in meiner Wohnung", detail: "Keine Kamera, die in einen privaten Raum gerichtet ist." },
        { term: "Kein Video in der Cloud", detail: "Video, wenn überhaupt, verlässt nie das Gelände." },
        { term: "Keine automatische Weitergabe an die Polizei", detail: "Nichts geht an die Polizei, ausser ich entscheide es, Fall für Fall." },
        { term: "Nur lokale Verarbeitung", detail: "Keine Daten über mein Zuhause oder mich verlassen es in Richtung der Server eines Anbieters oder einer Alarmzentrale." },
        { term: "Keine dauerhafte Aufzeichnung", detail: "Nichts zeichnet ununterbrochen auf, auch nicht lokal." },
        { term: "Auch draussen keine Kameras", detail: "Keine Kamera an meiner Tür oder an meinem Haus, egal wohin gerichtet." },
        { term: "Niemand, der mich begleitet", detail: "Empfiehl keinen Protector; ich will andere Möglichkeiten." },
      ],
    },
    {
      kind: "prose",
      heading: "Wie ein Protector ausgewählt wird",
      anchor: "protectors",
      paragraphs: [
        "Die Zuteilung ist regelbasiert und begründet. Ein Protector muss jede Fähigkeit haben, die die Buchung verlangt, vom Betrieb geprüft und am Tag gültig, und verfügbar sein. Unter diesen gewichtet die Rangfolge die Fähigkeiten, die jeder Dienst am meisten braucht (Deeskalation bei fast jedem Dienst, eine körperliche Fähigkeit bei keinem), dann gemeinsame Sprachen, Auftrittsart und frühere Bewertungen, und begründet jeden Punkt.",
        "Ein Protector sieht den Treffpunkt erst, nachdem er den Einsatz angenommen hat, und darüber hinaus nie, wer du bist. Danach bewertest du Respekt, Diskretion und wie sicher du dich gefühlt hast, jedes auf einer eigenen Skala, nicht mit Sternen.",
      ],
    },
    {
      kind: "prose",
      heading: "Was Skif speichert",
      anchor: "data",
      paragraphs: [
        "Dein Konto ist deine OrangeCat-Identität; Skif führt kein eigenes. Einschätzungen, Pläne und Buchungen liegen in Skifs eigener Datenbank auf einem Server, den Skif in Deutschland betreibt, nie bei einem Kamera- oder Alarmanbieter.",
      ],
    },
  ],
};

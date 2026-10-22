import type { Guide } from "../../types";

export const COMBAT_SPORTS_DE: Guide = {
  slug: "combat-sports",
  title: "Kampfsport, an der Strasse gemessen",
  fields: ["PHYSICAL", "HEALTH"],
  summary: "Boxen, Muay Thai, Ringen, Judo, BJJ, Krav Maga, Systema und mehr, verglichen nach dem, was ausserhalb des Gyms zählt.",
  photo: "grappling",
  statement: "Wogegen du trainierst, zählt mehr, als wie es heisst.",
  lead: [
    "Jede Kampfkunst behauptet, dass sie funktioniert. Der eine Test, der vorhersagt, ob sie es tut, ist echter Widerstand: regelmässiges Sparring gegen jemanden, der wirklich versucht, dich aufzuhalten. Kampfkünste mit Sparring bauen Fähigkeiten auf, die Adrenalin überstehen; Kampfkünste, die nur Abläufe üben, oft nicht.",
    "Der zweite Test ist die Distanz. Eine Auseinandersetzung kann auf Trittdistanz, im Clinch oder am Boden stattfinden, oft in dieser Reihenfolge. Keine einzelne Kampfkunst deckt alle drei ab, und darum zählt der Vergleich unten.",
  ],
  sections: [
    {
      kind: "table",
      heading: "Der Vergleich",
      blurb: "Skifs Einschätzung, danach, wie jede Kampfkunst trainiert und was sie weglässt. Die Qualität einer Schule, und ob dort gesparrt wird, zählt mehr als der Name der Kampfkunst.",
      anchor: "comparison",
      columns: ["Kampfkunst", "Distanz", "Echtes Sparring", "Stark ausserhalb des Gyms", "Schwach ausserhalb des Gyms", "Verletzungsrisiko im Training"],
      rows: [
        ["Boxen", "Schläge", "Ja", "Distanz, Kopfbewegung, Handschnelligkeit, Fitness", "Keine Tritte und kein Griffkampf; blosse Hände brechen an Schädeln", "Mittel — Treffer am Kopf"],
        ["Muay Thai", "Schläge, Tritte, Knie, Ellbogen, Clinch", "Ja", "Kontrolle im Clinch, Knie, Härte", "Wenig Bodenkampf", "Mittel bis hoch"],
        ["Kickboxen", "Schläge und Tritte", "Ja", "Die Stärken des Boxens, dazu Tritte", "Clinch und Boden", "Mittel"],
        ["Ringen", "Takedowns, Kontrolle", "Ja", "Auf den Beinen bleiben, wieder aufstehen, Kontrolle", "Keine Schläge; ein Takedown auf Beton kann schwer verletzen", "Mittel"],
        ["Judo", "Würfe, Haltegriffe", "Ja", "Würfe, Gleichgewicht und Fallschule: sicher fallen ist eine Fähigkeit für sich", "Keine Schläge; Würfe auf harten Boden sind gefährlich", "Mittel"],
        ["Brazilian Jiu-Jitsu", "Kontrolle am Boden, Aufgabegriffe", "Ja", "Kontrolle ohne Schläge; Ruhe unter Druck; Grösse zählt weniger", "Der Boden ist ein schlechter Ort bei mehreren Angreifern oder auf Beton", "Niedrig bis mittel — Gelenke"],
        ["MMA", "Alle Distanzen", "Ja", "Der breiteste echte Test aller Distanzen", "Sportregeln: keine Waffen, ein Gegner", "Hoch"],
        ["Krav Maga", "Gemischt, Waffen, mehrere Angreifer", "Je nach Schule", "Szenariotraining, Bewusstsein für Waffen, Entschlossenheit unter Stress", "Die Qualität schwankt stark; viele Schulen sparren selten", "Niedrig bis mittel"],
        ["Systema", "Bewegung, Atmung, Schläge", "Je nach Schule", "Atmung und Entspannung unter Stress", "Wenig offene Überprüfung; die Qualität schwankt", "Niedrig"],
        ["Kali / Escrima", "Stöcke, Klingen, leere Hand", "Teilweise", "Wie sich Waffen bewegen und wie schnell", "Abläufe können sich ohne Sparring von der Wirklichkeit entfernen", "Niedrig bis mittel"],
        ["Parkour", "Bewegung", "Keine Kampfkunst", "Weggehen: Tempo, Gelände, Hindernisse", "Hilft nichts mehr, sobald du gepackt wirst", "Mittel — Stürze"],
      ],
    },
    {
      kind: "prose",
      heading: "Eine vernünftige Kombination",
      anchor: "combination",
      paragraphs: [
        "Für die meisten Erwachsenen: eine Schlagkampfkunst mit Sparring (Boxen, Kickboxen oder Muay Thai), eine Griffkampfkunst mit Sparring (Ringen, Judo oder BJJ) und die Gewohnheit zu rennen. Das deckt die drei Distanzen und den Ausgang ab.",
        "Für eine kleinere Person zählen Griffkampfkünste mehr: Mit Hebelwirkung kann man eine grössere, untrainierte Person kontrollieren, ohne Schläge auszutauschen. Für Kinder lehren Judo, Ringen und BJJ Fallen, Gleichgewicht und Kontrolle ohne Schläge an den Kopf.",
        "Jede davon birgt ein Trainingsrisiko, und das gehört zur Rechnung, ist aber kein Grund, sie zu meiden. Sparring mit Treffern am Kopf hat Kosten, die sich über Jahre summieren; gute Gyms gehen damit um, schlechte nicht.",
      ],
    },
    {
      kind: "definitions",
      heading: "Wie du eine Schule wählst",
      anchor: "choosing",
      items: [
        { term: "Schau zuerst ein Training an", detail: "Jede gute Schule lässt dich. Achte darauf, ob gesparrt wird und wie Anfängerinnen und Anfänger behandelt werden." },
        { term: "Such nach Widerstand", detail: "Abläufe üben ist gut; nur Abläufe üben nicht. Frag, wie oft die Leute gegen jemanden trainieren, der Widerstand leistet." },
        { term: "Achte auf die Verletzungskultur", detail: "Hartes Training ist normal; verletzte Schülerinnen und Schüler und Sparring aus Ego nicht." },
        { term: "Misstrau Versprechen", detail: "«Garantierte Entwaffnung», «tödliche Techniken» und geheime Methoden sind Werbung. Echte Lehrerinnen und Lehrer reden von Wahrscheinlichkeiten." },
        { term: "Prüf die Lehrperson", detail: "Wer sie unterrichtet hat, wie sie an Wettkämpfen antreten oder ihre Schülerinnen und Schüler prüfen und ob sie Leute in andere Gyms schicken, wenn es hilft." },
      ],
    },
  ],
};

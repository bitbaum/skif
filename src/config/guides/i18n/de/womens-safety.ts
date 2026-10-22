import type { Guide } from "../../types";

export const WOMEN_DE: Guide = {
  slug: "womens-safety",
  title: "Die Sicherheit von Frauen, wie sie wirklich ist",
  fields: ["PHYSICAL", "PRIVACY", "FAMILY"],
  summary: "Die Gefahr durch Fremde ist nur die halbe Geschichte. Bekannte Menschen, digitales Stalking und die Fähigkeiten, die für eine kleinere Person funktionieren.",
  photo: "tramStop",
  statement: "Selbstverteidigung für Frauen beginnt näher bei dir zu Hause.",
  lead: [
    "Die Weltgesundheitsorganisation berichtet, dass die häufigste Form von Gewalt gegen Frauen weltweit Gewalt durch einen Intimpartner ist. Ratschläge, die nur dunkle Strassen und Fremde behandeln, lassen den Grossteil der Gefahr weg.",
    "Darum behandelt dieser Leitfaden drei Dinge: die Strasse, die Menschen, die du kennst, und das Handy in deiner Tasche. Nichts davon verlangt, dass du kleiner lebst. Es geht darum, hinzugehen, wohin du willst, mit einem Plan.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Auf der Strasse",
      anchor: "street",
      items: [
        { term: "Teil den Weg", detail: "Schick jemandem deinen Weg und deine Ankunftszeit, oder teil deinen Live-Standort nur für die Fahrt, und schalt ihn danach aus." },
        { term: "Wähl den Wagen", detail: "Setz dich im Tram und im Zug in die Nähe der Fahrerin oder des Fahrers oder anderer Leute, nahe bei einer Tür." },
        { term: "Unerwünschte Aufmerksamkeit", detail: "Sprich es laut und deutlich aus, «Hör auf, mir zu folgen», damit andere in der Nähe es bemerken. Dann geh Richtung Menschen und Licht." },
        { term: "Trainier Hebel, nicht Muskeln", detail: "Griffkampfkünste wie BJJ und Judo lehren eine kleinere Person, eine grössere zu kontrollieren. Siehe den Leitfaden zum Kampfsport." },
      ],
    },
    {
      kind: "definitions",
      heading: "Mit Menschen, die du kennst",
      anchor: "known",
      items: [
        { term: "Bemerk Kontrolle", detail: "Dein Handy kontrollieren, über das Geld bestimmen, dich von Freundinnen und Freunden abschneiden, überwachen, wo du bist: Das sind Warnzeichen, ob jemand geschlagen wurde oder nicht." },
        { term: "Ein stiller Ausstiegsplan", detail: "Kopien deiner Dokumente, etwas Geld, ein geladenes Ersatzhandy und ein Ort, wohin du gehen kannst, aufbewahrt an einem Ort, den nur du kennst." },
        { term: "Es gibt Hilfe", detail: "In der Schweiz beraten die Opferhilfe-Stellen kostenlos und vertraulich. In Gefahr ruf 117 an." },
      ],
    },
    {
      kind: "definitions",
      heading: "In deinem Handy",
      anchor: "phone",
      items: [
        { term: "Unbekannte Tracker", detail: "Aktuelle iPhones und Android-Handys warnen, wenn sich ein unbekannter Tracker mit dir bewegt. Lass diese Warnungen eingeschaltet, und durchsuch Taschen und Auto, wenn eine erscheint." },
        { term: "Stalkerware", detail: "Ein Akku, der schnell leer wird, Einstellungen, die geändert sind, ohne dass du sie geändert hast, jemand, der weiss, was du in privaten Nachrichten geschrieben hast. Eine Prüfung durch Fachleute oder ein Zurücksetzen auf die Werkseinstellungen entfernt sie." },
        { term: "Geteilte Konten", detail: "Familienfreigabe, geteilte Fotos in der Cloud und gespeicherte Passwörter auf einem Gerät, das jemand anders benutzt hat, können alle zeigen, wo du bist. Überprüf sie." },
      ],
    },
  ],
};

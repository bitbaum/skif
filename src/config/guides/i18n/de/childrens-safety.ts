import type { Guide } from "../../types";

export const CHILDREN_DE: Guide = {
  slug: "childrens-safety",
  title: "Die Sicherheit von Kindern, nach Alter",
  fields: ["FAMILY", "HEALTH", "CYBER"],
  summary: "Was ein Kind in jedem Alter lernen kann, von der eigenen Telefonnummer bis zu Grooming im Netz, ohne es in Angst grosszuziehen.",
  photo: "familyPath",
  statement: "Ein fähiges Kind ist ein sichereres Kind.",
  lead: [
    "Kinder werden nicht durch Angst vor der Welt geschützt, sondern dadurch, dass sie wissen, was sie in ihr tun sollen. Jede Fähigkeit unten passt zu einem Alter und wächst mit dem Kind.",
    "Das Ziel ist Freiheit: Ein Kind, das die Regeln kennt, kann früher und selbstständiger zur Schule gehen, zu einer Freundin oder einem Freund nach Hause gehen und ein Handy benutzen.",
  ],
  sections: [
    {
      kind: "table",
      heading: "Was du wann beibringst",
      anchor: "by-age",
      columns: ["Alter", "Fähigkeiten"],
      rows: [
        ["3 bis 5", "Den eigenen vollen Namen und den Namen eines Elternteils; was tun, wenn es verloren geht (stehen bleiben, eine Mutter oder einen Vater mit Kindern oder eine Verkäuferin suchen); Namen für die Körperteile; kein Erwachsener verlangt von ihm, etwas vor den Eltern geheim zu halten."],
        ["6 bis 9", "Die Telefonnummer eines Elternteils auswendig; die Notrufnummern; die Strasse überqueren; sichere Erwachsene und ein Treffpunkt der Familie; Schwimmen."],
        ["10 bis 12", "Wege allein gehen und sich unterwegs melden; Nein sagen und weggehen; erste Schritte im Netz: private Profile, keinen Standort mit Fremden teilen."],
        ["13 und älter", "Anzeichen von Grooming im Netz; Bilder teilen und dass sie bleiben; Partys und wie man nach Hause kommt; Grundlagen der Ersten Hilfe."],
      ],
    },
    {
      kind: "definitions",
      heading: "Regeln, die in jedem Alter gelten",
      anchor: "rules",
      items: [
        { term: "Überraschungen, keine Geheimnisse", detail: "Eine Überraschung macht Spass und hört auf; ein Geheimnis vor den Eltern ist ein Warnzeichen. Kinder verstehen den Unterschied früh." },
        { term: "Ihr Körper gehört ihnen", detail: "Sie dürfen eine Umarmung ablehnen, auch von Verwandten. Das lehrt sie, dass ihr Nein zählt." },
        { term: "Zu Hause anrufen geht immer", detail: "Sie können von überall und zu jeder Stunde anrufen, damit man sie abholt, und an diesem Abend gibt es keine Standpauke." },
        { term: "Wasser", detail: "Die Weltgesundheitsorganisation zählt Ertrinken zu den häufigsten Todesursachen bei kleinen Kindern. Schwimmunterricht und Aufsicht in der Nähe von Wasser gehören zu den wirksamsten Schritten für die Sicherheit, die eine Familie tun kann." },
      ],
    },
    {
      kind: "prose",
      heading: "Grooming im Netz",
      anchor: "grooming",
      paragraphs: [
        "Grooming folgt einem Muster: Aufmerksamkeit und Schmeicheleien, der Wechsel in einen privaten Kanal, Geschenke oder Guthaben für Spiele, Geheimhaltung, dann Druck. Bring das Muster bei, nicht eine Liste von Apps: Apps ändern sich, das Muster nicht.",
        "Wenn es passiert, behalte die Nachrichten, stell die Person nicht zur Rede und melde es der Polizei. Sorg dafür, dass das Kind weiss, dass es keinen Ärger bekommt, weil es dir davon erzählt hat.",
      ],
    },
  ],
};

import { SITUATIONAL_AWARENESS } from "../../situational-awareness";
import type { Guide } from "../../types";

export const SITUATIONAL_AWARENESS_DE: Guide = {
  slug: "situational-awareness",
  title: "Aufmerksam sein ohne Paranoia",
  fields: ["PHYSICAL", "ENVIRONMENTAL"],
  summary: "Früh und ruhig bemerken: wie das Normale an einem Ort aussieht, was es stört, und die paar Gewohnheiten, die dir Zeit verschaffen.",
  photo: "tramStop",
  statement: "Aufmerksam sein heisst wissen, wie das Normale aussieht.",
  lead: [
    "Situative Aufmerksamkeit heisst nicht, jedes Gesicht nach Gefahr abzusuchen. Das ist erschöpfend, und die Forschung zum Einschätzen von Fremden sagt, dass es kaum funktioniert. Es ist etwas Leiseres: ein Gespür dafür, was an einem Ort normal ist, damit das, was nicht passt, früh auffällt, solange noch Zeit für etwas Kleines bleibt.",
    "Gut gemacht macht es dich freier, nicht ängstlicher. Du bemerkst weniger vom Lärm und mehr von dem, was zählt.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Grundlinie und Abweichung",
      anchor: "baseline",
      items: [
        { term: "Die Grundlinie", detail: "Was hier und jetzt üblich ist: wie laut es ist, wie sich die Leute bewegen, wohin sie schauen, was sie tragen. Ein voller Bahnhof zur Stosszeit und eine ruhige Strasse um 2 Uhr nachts haben verschiedene Grundlinien." },
        { term: "Die Abweichung", detail: "Etwas, das nicht zur Grundlinie passt: jemand, der nicht tut, was alle anderen tun, das Fehlen von etwas, das da sein sollte (eine belebte Strasse, die plötzlich leer ist), eine Veränderung bei Geräuschen oder Bewegungen." },
        { term: "Die Reaktion", detail: "Eine einzelne Abweichung ist meistens nichts. Sie ist ein Zeichen, aufmerksam zu werden und deinen nächsten kleinen Schritt zu kennen, nicht zu reagieren." },
      ],
    },
    {
      kind: "cards",
      heading: "Gewohnheiten, die Zeit verschaffen",
      anchor: "habits",
      columns: 3,
      cards: [
        { title: "Ausgänge beim Ankommen", body: "Zwei Wege hinaus aus jedem Raum, jedem Zugwagen und jeder Bar. Dauert eine Sekunde und wird in ein paar Wochen zur Gewohnheit." },
        { title: "Kopf hoch bei Übergängen", body: "Türen, Treppenhäuser, Parkhäuser, Übergänge, der Moment, in dem du bei deiner Haustür ankommst. Steck dort das Handy weg: In den USA behandelten Notfallstationen 2010 schätzungsweise mehr als 1500 Fussgängerinnen und Fussgänger wegen Verletzungen im Zusammenhang mit dem Handy, mehr als doppelt so viele wie 2005 [1]." },
        { title: "Ein Ohr frei", body: "Kopfhörer an ruhigen Orten in der Nacht nehmen dir den Sinn, der dich am frühesten warnt." },
        { title: "Mit Blick sitzen", body: "Mit dem Gesicht zum Raum und nahe bei einem Ausgang, ohne es zur Schau zu stellen." },
        { title: "Dem Unbehagen trauen", body: "Wenn sich etwas falsch anfühlt, handle im Kleinen: Wechsle die Strassenseite, warte aufs nächste Tram, geh wieder hinein. Du brauchst keinen Grund." },
        { title: "Einen Schritt einüben", body: "Entscheide auf einem Weg, den du oft gehst, einmal, wohin du gehen würdest, wenn etwas passiert. Unter Stress tun Menschen, was sie vorher entschieden haben." },
      ],
    },
    {
      kind: "prose",
      heading: "Was Aufmerksamkeit nicht ist",
      anchor: "not",
      paragraphs: [
        "Sie ist kein Profiling. Das Aussehen sagt dir sehr wenig; Verhalten im Zusammenhang sagt dir mehr. Menschen wegen ihres Aussehens als Bedrohung zu behandeln, ist falsch und bringt nichts.",
        "Sie ist keine ständige Wachsamkeit. Das meiste im Leben ist sicher. Spar dir die Aufmerksamkeit für Übergänge und für die Momente, in denen sich etwas ändert; den Rest der Zeit schau auf den See.",
      ],
    },
  ],
  sources: SITUATIONAL_AWARENESS.sources,
  checked: "21 October 2026",
};

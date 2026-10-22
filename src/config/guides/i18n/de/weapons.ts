import type { Guide } from "../../types";

export const WEAPONS_DE: Guide = {
  slug: "weapons",
  title: "Waffen: was sie sind und was das Gesetz erlaubt",
  fields: ["PHYSICAL", "INSTITUTIONAL"],
  summary: "Von Schusswaffen bis zum Autoschlüssel: was etwas zur Waffe macht, wie das Gesetz sie einteilt und warum die meisten Schilde sind.",
  statement: "Fast alles kann eine Waffe sein. Das gilt in beide Richtungen.",
  lead: [
    "Eine Waffe ist alles, womit man verletzt oder droht. Manche Gegenstände sind dafür gemacht; die meisten, die je zur Selbstverteidigung benutzt wurden, nicht. Wer sich mit einem Gegenstand verteidigt, greift ihn meist im Moment, ohne es geplant zu haben, weil er gerade da war.",
    "Waffen zu verstehen heisst deshalb weniger, sie zu besitzen, als sie zu sehen: was um dich herum dich schützen könnte, was gegen dich verwendet werden könnte und was das Gesetz zu beidem sagt.",
  ],
  sections: [
    {
      kind: "table",
      heading: "Arten von Waffen und wie das Schweizer Recht sie behandelt",
      blurb: "Kategorien, kein Katalog. Massgebend ist das Schweizer Waffengesetz (WG, SR 514.54); andere Länder unterscheiden sich, und Gesetze ändern sich. Das ist eine Beschreibung, keine Rechtsberatung.",
      anchor: "kinds",
      columns: ["Art", "Beispiele", "In der Schweiz"],
      rows: [
        ["Schusswaffen", "Pistolen, Gewehre, Flinten", "Für die meisten braucht es einen Waffenerwerbsschein. Eine in der Öffentlichkeit zu tragen, braucht zusätzlich eine Waffentragbewilligung, die Privatpersonen selten erteilt wird."],
        ["Klingen", "Küchen- und Taschenmesser; Schmetterlingsmesser, Wurfmesser, manche Springmesser und Dolche", "Alltägliche Messer sind legal. Schmetterlingsmesser, Wurfmesser und bestimmte Springmesser und Dolche sind Waffen im Sinne des Gesetzes."],
        ["Schlagwaffen", "Schlagstöcke, Teleskopschlagstöcke, Schlagringe, Nunchakus, Wurfsterne", "Das Gesetz nennt Geräte, die dazu bestimmt sind, Menschen zu verletzen, darunter Schlagringe, Schlagstöcke und Wurfsterne, als Waffen."],
        ["Chemische", "Pfefferspray (OC), CS-Gas", "Sprays vom Typ CS sind Waffen. Pfefferspray wird verbreitet verkauft; der Einsatz wird trotzdem als Gewalt beurteilt."],
        ["Elektrische", "Elektroschockgeräte und Taser", "Elektroschockgeräte sind Waffen und eingeschränkt."],
        ["Improvisierte", "Schlüssel, eine Tasche, ein Regenschirm, ein Stuhl, ein Velo, ein Feuerlöscher", "Legal zu besitzen und zu tragen. Der Einsatz wird wie jede Gewalt beurteilt: War er dem Angriff angemessen?"],
      ],
    },
    {
      kind: "prose",
      heading: "Warum Alltagsgegenstände meist Schilde sind",
      anchor: "shields",
      paragraphs: [
        "Das Nützlichste, was ein Alltagsgegenstand in einem schlechten Moment tut, ist Abstand halten. Ein Stuhl zwischen dir und jemand anderem, eine Tasche zum Abblocken hochgehalten, eine Jacke um einen Unterarm gewickelt, ein Velo nach vorn gestossen: Jedes davon verschafft Raum und Zeit, und genau das braucht das Weggehen.",
        "Diese Möglichkeiten zu sehen, ist eine Gewohnheit, wie sich Ausgänge zu merken. Im Tram sind es die Stange und die Türen; im Café der Tisch und die Stühle; auf der Strasse ein parkiertes Auto, das du zwischen euch hältst. Du suchst keinen Kampf; du suchst Raum.",
        "Für das Gesetz zählt die Absicht. Ein Regenschirm ist ein Regenschirm; derselbe Regenschirm, als Waffe mitgetragen, oder ein Messer, das man zum Kämpfen mitträgt, kann anders beurteilt werden. Was auch immer du benutzt, die Frage danach ist, ob es dem Angriff angemessen war.",
      ],
    },
    {
      kind: "prose",
      heading: "Eine Waffe in einem Kampf schneidet in beide Richtungen",
      anchor: "both-ways",
      paragraphs: [
        "Jede Waffe, die du mitbringst, kann dir abgenommen und gegen dich verwendet werden, und ihre Anwesenheit erhöht für alle den Einsatz. Gegen ein Messer ist Abstand die richtige Antwort: Messerangriffe werden oft erst bemerkt, wenn sie schon geschehen sind, und Techniken, die eine verlässliche Entwaffnung versprechen, verdienen Misstrauen.",
        "Das Training mit Waffen ist trotzdem viel wert, denn es lehrt, wie sie sich bewegen, wie schnell sie sind und wie wenig Zeit jemand hat, der sich verteidigt. Die meisten, die Waffenkünste trainieren, tragen gar nichts bei sich; sie tragen das Verständnis.",
      ],
    },
    {
      kind: "cards",
      heading: "Waffen richtig kennenlernen",
      anchor: "learning",
      columns: 2,
      cards: [
        { title: "Schusswaffen, auf einem bewilligten Schiessstand", body: "Sichere Handhabung, Aufbewahrung und Transport, und das Gesetz, unterrichtet von lizenzierten Instruktorinnen und Instruktoren. Die Schweiz hat eine lange Tradition von Schützenvereinen, in denen das gut gemacht wird." },
        { title: "Stock- und Klingenkünste", body: "Kali, Escrima und Arnis trainieren, wie sich Stöcke und Klingen bewegen; darum beginnen viele, die Verteidigung gegen Waffen lernen, dort." },
        { title: "Verteidigung gegen Waffen", body: "Szenariotraining in Schulen wie Krav Maga, idealerweise mit Druck und Widerstand, und immer mit dem Weggehen als Ziel." },
        { title: "Waffenkunde und das Gesetz", body: "Was als Waffe gilt, was du besitzen und tragen darfst und wie Gewalt beurteilt wird. Die Grundlage für alles oben." },
      ],
    },
    {
      kind: "faq",
      heading: "Fragen, die Leute stellen",
      anchor: "questions",
      items: [
        { question: "Soll ich etwas zur Selbstverteidigung bei mir tragen?", answer: "Schau zuerst ins Gesetz dort, wo du bist. Für die meisten Menschen bringen ein geladenes Handy, eine Lampe, Schuhe, in denen du rennen kannst, und die Gewohnheit, aufmerksam zu sein, mehr als jeder Gegenstand. Training verändert mehr als ein Werkzeug." },
        { question: "Ist Pfefferspray eine gute Idee?", answer: "Es kann dir den Moment verschaffen, den du zum Weggehen brauchst, und es kann bei Wind oder in einem geschlossenen Raum zurückschlagen. Wenn du es trägst, üb das Ziehen, und betrachte den Einsatz als Gewaltanwendung." },
        { question: "Tragen Skif-Protectors Waffen?", answer: "Die meiste Arbeit bei Skif kommt ganz ohne Waffe aus. Ein Protector trägt nur dann eine, wenn er die rechtliche Bewilligung hat, sie zu tragen, und der Auftrag es verlangt." },
      ],
    },
  ],
};

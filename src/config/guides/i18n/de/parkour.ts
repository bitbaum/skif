import { PARKOUR } from "../../parkour";
import type { Guide } from "../../types";

export const PARKOUR_DE: Guide = {
  slug: "parkour",
  title: "Parkour: sich bewegen, um wegzukommen",
  fields: ["PHYSICAL", "HEALTH"],
  summary: "Die nützlichste körperliche Fähigkeit für deine Sicherheit ist weggehen. Wie Parkour sie trainiert, wie du ohne Verletzung anfängst und wo du in Zürich trainieren kannst.",
  photo: "parkour",
  statement: "Der beste Kampf ist der, für den du nicht mehr da bist.",
  lead: [
    "Polizeiliche Ratschläge für die schlimmsten Momente im öffentlichen Raum sagen dasselbe mit anderen Worten: Wenn du sicher wegkommen kannst, tu es. Die britische Antiterrorpolizei sagt es klar: «Lauf an einen sicheren Ort. Das ist eine weit bessere Wahl, als dich zu ergeben oder zu verhandeln» [1]. Wegkommen hängt davon ab, einen Weg zu sehen, und einen Körper zu haben, der ihn gehen kann.",
    "Parkour trainiert genau das: dich über, unter und um alles herum zu bewegen, was im Weg steht, mit deinem eigenen Körper und sonst nichts. Es lehrt dich auch, gut zu fallen, und das betrifft weit mehr Menschen, als es je ein Angreifer tut.",
  ],
  sections: [
    {
      kind: "prose",
      heading: "Stark sein, um nützlich zu sein",
      anchor: "origins",
      paragraphs: [
        "Parkour ist aus Georges Héberts «méthode naturelle» gewachsen, einem Trainingssystem der französischen Marine und Armee aus Laufen, Klettern, Springen, Schwimmen und Heben, erprobt ab 1904 [2]. Sein Motto wird meist mit «être fort pour être utile» angegeben: stark sein, um nützlich zu sein [3]. 1902 half er, die Flucht von etwa 700 Menschen vor dem Ausbruch des Mont Pelée auf Martinique zu koordinieren [3].",
        "Die Methode ging über Raymond Belle, einen Pariser Militärfeuerwehrmann, an seinen Sohn David und eine Gruppe von Freunden im Pariser Vorort Lisses in den 1980er- und 90er-Jahren über. Sie nannten es Parkour, oder «l'art du déplacement»: die Kunst der Fortbewegung [2]. Heute gibt es Wettkämpfe, doch die meisten, die es betreiben, trainieren einfach.",
        "Dieser Ursprung ist der Grund, warum es zu Skif gehört. Parkour war nie eine Vorführung; es war ein Weg, fähig zu sein, sich selbst und andere aus Schwierigkeiten zu holen.",
      ],
    },
    {
      kind: "cards",
      heading: "Was es dir gibt",
      anchor: "why",
      columns: 3,
      cards: [
        { title: "Wege, die andere nicht sehen", body: "Eine Mauer, ein Geländer, eine Lücke zwischen parkierten Autos sind keine Sackgassen mehr. Mehr Wege heisst mehr Auswege aus einer schlechten Lage. Das ist Skifs Überlegung, kein gemessenes Ergebnis: Niemand hat Parkour an echten Fluchten untersucht." },
        { title: "Landen statt aufprallen", body: "Eine trainierte Parkour-Landung senkte die Spitzenkraft auf den Körper um 38 % und deren Anstiegsrate um 54 % gegenüber einer steifen Landung; eine Rolle um 43 % und 63 % [4]." },
        { title: "Gut fallen, in jedem Alter", body: "Stürze töteten 2023 weltweit etwa 842 000 Menschen, 71 % davon 60 Jahre oder älter, und die WHO zählt Übungen, die das Gleichgewicht fordern, zu dem, was sie verhindert [5]. Ältere Erwachsene, denen das Fallen beigebracht wurde, hatten 20 Monate später einen Teil der Fähigkeit noch [6]." },
        { title: "Ruhig unter Anstrengung", body: "Trainieren heisst, einem Sprung zu begegnen, bei dem du unsicher bist, ihn einzuschätzen und zu entscheiden. Die Entscheidung, nicht der Sprung, ist die Fähigkeit." },
        { title: "Fitness, die zu etwas dient", body: "Sprinten, klettern und dein eigenes Gewicht tragen, trainiert für den Gebrauch statt für den Spiegel." },
        { title: "Gratis, und draussen", body: "Fürs meiste Training brauchst du eine Stadt und ein Paar Schuhe. Zürich hat eine kostenlose öffentliche Parkour-Anlage (siehe unten)." },
      ],
    },
    {
      kind: "definitions",
      heading: "Anfangen, ohne dich zu verletzen",
      anchor: "start",
      blurb: "Parkour-Verletzungen sind meist leicht: In einer Umfrage unter 180 Praktizierenden waren es 1,7 pro 1000 Trainingsstunden, vor allem verstauchte Knöchel und Prellungen am Knie [7]. Diese Gewohnheiten bringt die Forschung mit weniger davon in Verbindung.",
      items: [
        { term: "Zuerst die Kondition", detail: "Fehlende körperliche Kondition hing mit Verletzungen zusammen, und ebenso die Trainingsbelastung: mehr Stunden, mehr Verletzungen [7]. Bau Kraft auf und steigere den Umfang langsam." },
        { term: "Die Höhe folgt der Kraft", detail: "Schwerere Athleten und solche mit weniger Beinkraft wechselten schon bei niedrigeren Sprüngen von der Landung auf beiden Füssen zur Rolle [8]. Deine sichere Höhe ist deine, nicht die der Person vor dir." },
        { term: "Lern die Landung und die Rolle", detail: "Vor jedem Sprung in die Tiefe: Lande weich auf den Fussballen, federe mit den Beinen ab und rolle, wenn der Sprung zu hoch ist, um stehen zu bleiben [4]." },
        { term: "Präzisionssprünge niedrig", detail: "Präzisionssprünge waren unter 161 Praktizierenden in Madrid die Bewegung, die am häufigsten an Verletzungen beteiligt war [9]. Üb sie lange auf Linien am Boden, dann niedrig." },
        { term: "Trainier mit einem Coach und mit anderen", detail: "Eine gute Gruppe korrigiert deine Landung, bevor sie zur Gewohnheit wird, und sagt dir, wann du aufhören sollst. In Zürich bieten geleitete Gruppen ein Probetraining an (siehe unten)." },
        { term: "Respektier die Orte", detail: "Trainier dort, wo es erlaubt ist, lass nichts liegen und hör auf, wenn dich jemand darum bittet. Die Gründer der Bewegung betonten Gesundheit, Bescheidenheit und gegenseitige Ermutigung [10]." },
      ],
    },
    {
      kind: "table",
      heading: "Was die Daten über Verletzungen sagen",
      anchor: "injuries",
      blurb: "Die meisten Verletzungen betreffen die Beine, und die meisten brauchen keine Behandlung ausser Ruhe. Schwere kommen von Landungen und vom Aufprall auf Gegenstände.",
      columns: ["Studie", "Wer", "Was sie fand"],
      rows: [
        ["Grosprêtre & El Khattabi, 2022 [7]", "180 Praktizierende, Frankreich", "1,7 Verletzungen pro 1000 Stunden; meist Knöchelverstauchungen und Knieprellungen; mehr Trainingsbelastung und weniger Kondition, mehr Verletzungen"],
        ["Giner-Gran, 2020 [9]", "161 Praktizierende, Madrid, ein Jahr oder mehr Training", "70 % waren schon einmal verletzt; 69 % der Verletzungen brauchten weder Untersuchungen noch Operation; Präzisionssprünge am häufigsten beteiligt"],
        ["Rossheim & Stephenson, 2017 [11]", "Notfallstationen in den USA, 2009–2015", "Die meisten Verletzungen durch Landungen oder Aufprall auf Gegenstände; 58 % an Armen und Beinen"],
        ["Puddle & Maulder, 2013 [4]", "10 trainierte Männer auf einer Kraftmessplatte", "Parkour-Landungen und -Rollen senkten die Spitzenkraft um 38–43 % gegenüber einer steifen Landung"],
      ],
    },
    {
      kind: "definitions",
      heading: "Wo du in Zürich trainieren kannst",
      anchor: "zurich",
      blurb: "Geprüft auf den eigenen Seiten der Anbieter; Preise ändern sich, also frag nach, bevor du hingehst.",
      items: [
        { term: "ParkourONE Zürich", detail: "Geleitete Kurse für Erwachsene (ab 18), Jugendliche (ab 12), Kinder (6–12) und Eltern mit Kindern ab 4, draussen bei jedem Wetter beim Dynamo, an der Universität Zürich, im Hardaupark, an der Kantonsschule Enge und in Küsnacht. Ein Probetraining kostet CHF 25; Erwachsene zahlen CHF 98 im Monat [12]. Sie unterrichten auch in Bern, Thun, Basel, Münsingen und Brig [13]." },
        { term: "Sportzentrum Heerenschürli, Schwamendingen", detail: "Zürichs erste Parkour-Anlage im Freien, seit August 2022 offen und kostenlos nutzbar [14]." },
        { term: "Ältere Anfängerinnen und Anfänger", detail: "Skif hat in der Schweiz keinen Parkour-Kurs für über 50-Jährige gefunden. Die Kurse für Erwachsene nennen kein Höchstalter, also frag nach einem Probetraining und sag, was du dir davon wünschst: Oft sind das Gleichgewicht und gut fallen, was Programme auf Parkour-Basis im Ausland bereits lehren [15]." },
      ],
    },
    {
      kind: "prose",
      heading: "Was Parkour nicht kann",
      anchor: "limits",
      paragraphs: [
        "Es hilft nichts mehr, sobald dich jemand festhält. Dafür gibt es Griffkampfkünste (siehe Kampfsport, an der Strasse gemessen). Und es ist kein Grund, Risiken einzugehen, die du sonst nicht eingehen würdest: Der Sinn davon, weggehen zu können, ist, dass du früh und ruhig gehst, bevor Rennen nötig wird.",
        "Die Daten zu älteren Erwachsenen sind noch früh. Ein zehnwöchiges Parkour-Programm für 20 Erwachsene mit einem Durchschnittsalter von 67 verbesserte, wie weit sie reichen konnten, doch seine Wirkung auf Aufstehen und Gehen war klein und nicht signifikant [15]. Fallen lernen ist besser belegt [6].",
      ],
    },
  ],
  sources: PARKOUR.sources,
  checked: "22 October 2026",
};

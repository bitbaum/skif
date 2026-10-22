import type { Guide } from "../../types";

export const MONEY_DE: Guide = {
  slug: "scams-coercion-keys",
  title: "Betrug, Nötigung und Schlüssel",
  fields: ["FINANCIAL", "CYBER"],
  summary: "Wie Betrug funktioniert, die paar Regeln, die fast jeden schlagen, und wie du Bitcoin so hältst, dass kein Moment unter Druck es bewegen kann.",
  statement: "Jeder Betrug braucht, dass du dich beeilst.",
  lead: [
    "Betrug beruht auf denselben paar Hebeln, wie auch immer die Geschichte lautet: Dringlichkeit, Autorität, Geheimhaltung und Isolation. Lern die Hebel kennen, und die Geschichten wirken nicht mehr, wie überzeugend die Stimme am Telefon auch klingt.",
    "Nötigung benutzt dieselben Hebel, mit einer Drohung dahinter. Die Abwehr gegen beides ist dieselbe: Abmachungen, die du im Voraus triffst, damit kein einzelner Moment, kein Anruf und keine einzelne Person bewegen kann, was dir gehört.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Die Hebel",
      anchor: "levers",
      items: [
        { term: "Dringlichkeit", detail: "«Es muss heute sein», «Ihr Konto wird gesperrt», «Das Angebot endet in einer Stunde». Eile hält dich vom Prüfen ab." },
        { term: "Autorität", detail: "Jemand, der klingt wie die Bank, die Polizei, eine Lieferfirma oder deine Chefin. Anrufernummern und E-Mail-Adressen lassen sich leicht fälschen." },
        { term: "Geheimhaltung", detail: "«Sagen Sie es niemandem, das gehört zu den Ermittlungen.» Echte Institutionen brauchen nie, dass du etwas vor deiner Familie verbirgst." },
        { term: "Isolation", detail: "Dich in der Leitung halten, dich in eine Messaging-App holen, dich bitten, eine Fernzugriffssoftware zu installieren." },
        { term: "Zu gut", detail: "Renditen, die sonst niemand bekommt, eine Lotterie, bei der du nie mitgemacht hast, eine Liebe, die Geld braucht, um dich zu besuchen." },
      ],
    },
    {
      kind: "definitions",
      heading: "Regeln, die fast jeden schlagen",
      anchor: "rules",
      items: [
        { term: "Die Pausenregel", detail: "Keine unerwartete Zahlung, Überweisung und kein Code geht am selben Tag raus. Eine echte Anfrage übersteht 24 Stunden Warten; ein Betrug selten." },
        { term: "Ruf selbst zurück", detail: "Leg auf, such die Nummer selbst heraus und ruf an. Benutz nie die Nummer, den Link oder die App, die dir der Anrufer gegeben hat." },
        { term: "Codes gehen nie raus", detail: "Banken und Polizei fragen nicht nach Login-Codes oder Karten-PINs und nicht danach, dass du Geld «in Sicherheit» bringst." },
        { term: "Zwei Personen bei grossen Beträgen", detail: "Mach mit jemandem, dem du vertraust, ab, dass alles über einem festgelegten Betrag zuerst besprochen wird. Das schützt euch beide." },
        { term: "Niemand steuert deinen Bildschirm", detail: "Keine Fernzugriffssoftware für jemanden, der dich zuerst kontaktiert hat." },
      ],
    },
    {
      kind: "prose",
      heading: "Bitcoin so halten, dass Druck es nicht bewegen kann",
      anchor: "keys",
      paragraphs: [
        "Selbstverwahrung heisst, du hältst die Schlüssel, und niemand kann sie einfrieren. Es heisst auch, dass niemand sie wiederherstellen kann und dass jemand, der dich zwingt, sie bewegen kann. Beide Risiken regelst du im Voraus.",
        "Bewahr die Wiederherstellungsphrase offline auf, am besten in Metall gestanzt, nie fotografiert, abgetippt oder in der Cloud gespeichert. Für bedeutende Beträge beseitigt ein Multisignatur-Setup (zum Beispiel zwei von drei Schlüsseln, an verschiedenen Orten aufbewahrt) jeden einzelnen Punkt, der gestohlen oder erzwungen werden kann.",
        "Der günstigste Schutz ist Schweigen. Bestände, von denen niemand weiss, sind Bestände, die niemand zu nehmen versucht. Halte ein kleines Wallet für den Alltag getrennt vom Ersparten, und verknüpf Adressen oder Beträge nicht öffentlich mit deinem Namen.",
      ],
    },
    {
      kind: "prose",
      heading: "Wenn du unter Druck gesetzt wirst",
      anchor: "pressured",
      paragraphs: [
        "Wenn dich jemand bedroht, geht deine Sicherheit jedem Betrag vor. Gib nach, wenn du musst, bring dich in Sicherheit und ruf die Polizei unter 117 an. Bewahr alles auf: Nachrichten, Nummern, Transaktions-IDs.",
        "Wenn du schon Geld an einen Betrug geschickt hast, ruf sofort deine Bank an, unter der Nummer auf deiner Karte. Je früher sie es weiss, desto besser die Chance, eine Zahlung zu stoppen oder zurückzurufen.",
      ],
    },
  ],
};

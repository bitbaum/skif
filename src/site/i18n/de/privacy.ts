import type { SitePage } from "@bitbaum/sitekit";

export const PRIVACY_DE: SitePage = {
  path: "privacy",
  title: "Was Skif speichert",
  intro: "Jede Art von Eintrag, den Skif über dich speichert, und was es nie sammelt.",
  sections: [
    {
      kind: "hero",
      eyebrow: "Privatsphäre",
      statement: "Was Skif speichert, und was es nie sammelt.",
      lead: [
        "Sicherheit, die dich Privatsphäre kostet, ist ein Tausch, deshalb legen wir unseren vollständig offen: jede Art von Eintrag, den Skif speichert, warum, und wer ihn sehen kann. Geschrieben aus der Datenbank selbst, nicht aus einer Vorlage für Datenschutzerklärungen.",
      ],
    },
    {
      kind: "table",
      heading: "Was gespeichert wird, wenn du Skif nutzt",
      anchor: "stored",
      columns: ["Eintrag", "Was er enthält", "Wer ihn sieht"],
      rows: [
        ["Dein Konto", "Eine anonyme Kennung aus deinem Konto. Keine E-Mail-Adresse, kein Passwort.", "Skifs Systeme"],
        ["Dein Profil", "Der Name, mit dem dich ein Protector ansprechen soll, wenn du einen angibst.", "Der Protector deiner Buchung, sobald er annimmt"],
        ["Deine Einstellungen", "Deine festen Grenzen, deine Neigungen bei Abwägungen, deine bevorzugte Auftrittsart und deine Sprachen.", "Du; genutzt, um Schritte zu reihen und Protectors zuzuteilen"],
        [
          "Einschätzungen",
          "Die Orte, die du beschreibst (ein Name, den du wählst, und ein Quartier), was dir Sorgen macht, ein Anlass in deinen Worten, dein Budget und der Plan.",
          "Du",
        ],
        [
          "Buchungen",
          "Der Dienst, die Zeit, das Quartier und der Treffpunkt, deine Notizen, die Nachrichten zur Buchung, der Bericht und deine Bewertung.",
          "Du, der Betrieb und der Protector — den Treffpunkt erst, nachdem er angenommen hat",
        ],
        ["Beschwerden", "Was du vorbringst, die Antwort und der Entscheid.", "Du, der Betrieb und der betroffene Protector"],
        ["Zugriffsprotokoll", "Welche Person im Betrieb einen heiklen Eintrag geöffnet hat, und wann.", "Der Betrieb"],
      ],
    },
    {
      kind: "definitions",
      heading: "Was Skif nicht sammelt",
      anchor: "not",
      items: [
        { term: "Deinen Standort", detail: "Kein Tracking, niemals. Eine Buchung enthält den Treffpunkt, den du eintippst." },
        { term: "Kamera und Mikrofon", detail: "Werden nie angefragt." },
        {
          term: "Deinen Schnellcheck und deine Checklisten",
          detail: "Werden nur in deinem Browser ausgewertet und gespeichert. Nichts, was du dort ankreuzt, erreicht Skif.",
        },
        {
          term: "Analyse und Werbung",
          detail: "Keine. Öffentliche Seiten laden einen Feedback-Knopf, damit du ein Problem melden kannst, wenn du willst; Seiten hinter der Anmeldung laden kein Skript von Dritten.",
        },
      ],
    },
    {
      kind: "prose",
      heading: "Wo es liegt, und wie es gelöscht wird",
      anchor: "where",
      paragraphs: [
        "Alles liegt in Skifs eigener Datenbank auf einem Server, den Skif in Deutschland betreibt, nie bei einer Kamera-, Alarm- oder Werbefirma.",
        "Deine Einträge selbst zu löschen, ist noch nicht gebaut. Bis es so weit ist, schreib an cato@orangecat.ch, und ein Mensch löscht sie.",
      ],
    },
  ],
};

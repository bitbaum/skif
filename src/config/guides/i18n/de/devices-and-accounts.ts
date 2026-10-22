import type { Guide } from "../../types";

export const DEVICES_DE: Guide = {
  slug: "devices-and-accounts",
  title: "Sichere deine Geräte und Konten ab",
  fields: ["CYBER", "PRIVACY"],
  summary: "Verschlüssle die Festplatte, schütze das E-Mail-Konto, mit dem sich alles zurücksetzen lässt, und mach Backups: eine Checkliste, geordnet nach dem, was zählt.",
  photo: "phoneDark",
  statement: "Eine Stunde heute schliesst die meisten Türen.",
  lead: [
    "Die meisten digitalen Einbrüche sind nicht raffiniert. Sie nutzen ein wiederverwendetes Passwort, einen per SMS geschickten Code, ein Handy ohne Code oder einen unverschlüsselten Laptop. Diese Lücken zu schliessen, dauert einen Nachmittag und kostet wenig oder nichts.",
    "Mach es in dieser Reihenfolge: zuerst das Konto, mit dem sich alle anderen zurücksetzen lassen, dann die Geräte, auf denen alles liegt, dann das, was passiert, wenn etwas verloren geht.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Die Checkliste, der Reihe nach",
      anchor: "checklist",
      items: [
        { term: "1 · Ein Passwortmanager", detail: "Ein langes Master-Passwort, überall sonst ein anderes, zufälliges Passwort. Das beendet die Wiederverwendung, den häufigsten Weg hinein." },
        { term: "2 · Schütz zuerst deine E-Mail", detail: "Wer deine E-Mail hat, kann alles andere zurücksetzen. Gib ihr einen Passkey oder einen Hardware-Sicherheitsschlüssel und entferne alte Wiederherstellungsnummern und -adressen, über die du nicht mehr verfügst." },
        { term: "3 · Überall sonst ein zweiter Faktor", detail: "Zieh Passkeys, Sicherheitsschlüssel oder eine Authenticator-App der SMS vor. SMS ist viel besser als nichts, aber das Schwächste davon." },
        { term: "4 · Sperr deine Nummer", detail: "Bitte deinen Mobilfunkanbieter um eine PIN oder Sperre für die Übertragung deiner Nummer auf eine neue SIM, damit niemand deine Codes übernehmen kann, indem er sie portiert." },
        { term: "5 · Verschlüssle jede Festplatte", detail: "Siehe die Tabelle unten. Ein gestohlener Laptop, der verschlüsselt ist, ist ein verlorener Laptop, kein verlorenes Leben." },
        { term: "6 · Updates an, automatisch", detail: "Auf Handy, Laptop, Browser und Router. Die meisten Angriffe nutzen Lücken, die schon geschlossen waren." },
        { term: "7 · Ein richtiger Code", detail: "Auf dem Handy länger als sechs Ziffern, und eine kurze Frist bis zur Bildschirmsperre. Blende Nachrichtenvorschauen auf dem Sperrbildschirm aus." },
        { term: "8 · Backups: 3-2-1", detail: "Drei Kopien von dem, was zählt, auf zwei Arten von Speicher, eine davon an einem anderen Ort. Teste einmal eine Wiederherstellung." },
        { term: "9 · Wiederherstellungscodes, offline", detail: "Druck sie aus oder schreib sie auf, und bewahr sie dort auf, wo du deinen Pass aufbewahrst." },
        { term: "10 · Einmal pro Jahreszeit prüfen", detail: "Angemeldete Sitzungen, Apps mit Zugriff auf deine Konten, wer deinen Standort sehen kann." },
      ],
    },
    {
      kind: "table",
      heading: "Verschlüssle die Festplatte",
      anchor: "encryption",
      columns: ["Gerät", "Wie", "Hinweis"],
      rows: [
        ["Mac", "Systemeinstellungen → Datenschutz & Sicherheit → FileVault", "Bewahr den Wiederherstellungsschlüssel woanders auf als auf dem Mac."],
        ["Windows", "Einstellungen → Datenschutz und Sicherheit → Geräteverschlüsselung; BitLocker in den Pro-Editionen", "Prüf, wo der Wiederherstellungsschlüssel gespeichert ist, oft in deinem Microsoft-Konto."],
        ["Linux", "Vollverschlüsselung der Festplatte (LUKS), bei der Installation gewählt", "Sie später hinzuzufügen, heisst meist neu installieren."],
        ["iPhone und iPad", "Verschlüsselt, sobald ein Code gesetzt ist", "Ein längerer alphanumerischer Code ist stärker."],
        ["Android", "Auf aktuellen Geräten standardmässig verschlüsselt", "Setz eine starke Bildschirmsperre; die Verschlüsselung hängt von ihr ab."],
      ],
    },
    {
      kind: "faq",
      heading: "Fragen, die Leute stellen",
      anchor: "questions",
      items: [
        { question: "Macht mich ein VPN sicher?", answer: "Es schützt deinen Datenverkehr vor dem Netz, in dem du gerade bist, etwa dem WLAN im Hotel. Es macht dich nicht anonym, und gegen ein wiederverwendetes Passwort tut es nichts." },
        { question: "Braucht es noch einen Virenschutz?", answer: "Der Schutz, der in aktuelle Betriebssysteme eingebaut ist, reicht für die meisten Menschen. Updates und nichts zu installieren, wonach du nicht gesucht hast, zählen mehr." },
        { question: "Was, wenn ich ein Ziel bin und nicht irgendwer?", answer: "Dann ist eine Prüfung durch Fachleute verhältnismässig: die Geräte auf Kompromittierung, die Konten auf Zugriffe und was über dich auffindbar ist. Ein Sicherheitsplan empfiehlt sie, wenn das, was du ihm sagst, es rechtfertigt." },
      ],
    },
  ],
};

/** The Academy in DE: every area, course, capability and delivery label,
 * keyed exactly as in src/config/academy.ts and capabilities.ts. */
import type { AcademyWords } from "./academy";

export const ACADEMY_DE: AcademyWords = {
  areas: {
    PEOPLE: {
      title: "Urteilsvermögen und Menschen",
      intro:
        "Der Kern der Arbeit. Die meisten Situationen werden damit gewonnen oder verloren, wie jemand einen Raum liest und mit dem Menschen vor sich spricht.",
    },
    MEDICAL: {
      title: "Erste Hilfe und Notfälle",
      intro:
        "Was in den Minuten zu tun ist, bevor die Profis da sind. Nützlich für alle; unverzichtbar für alle, die sich um jemand anderen kümmern.",
    },
    ESCAPE: {
      title: "Flucht und Bewegung",
      intro:
        "Die beste Selbstverteidigung ist, nicht da zu sein. Sich gut bewegen, Wege sehen und fit genug sein, um sie zu nutzen, kommt vor jeder Kampftechnik.",
    },
    STRIKING: {
      title: "Schlagkampfkünste",
      intro: "Distanz, Timing und ruhig bleiben, während jemand versucht, dich zu treffen, gelernt mit Partnern, die es wirklich versuchen.",
    },
    GRAPPLING: {
      title: "Ringkampfkünste",
      intro:
        "Kontrolle ohne Schaden: auf den Beinen bleiben, wieder aufstehen und jemanden festhalten. Hier schlägt die Technik einer kleineren Person die Kraft einer grösseren.",
    },
    SELF_DEFENCE: {
      title: "Selbstverteidigungssysteme",
      intro:
        "Szenariotraining für die Strasse: mehrere Angreifer, Waffen, Überraschung und wegkommen. Die Qualität schwankt zwischen Schulen stärker als zwischen Systemen.",
    },
    WEAPONS: {
      title: "Waffen",
      intro:
        "Was Waffen sind, wie sie sich bewegen und was das Gesetz erlaubt: Schusswaffen auf bewilligten Schiessständen, Stöcke und Klingen, Abwehr gegen Waffen und ein Blick für Alltagsgegenstände, die dich schützen können.",
    },
    MOBILITY: {
      title: "Fahren",
      intro: "Jemanden sicher ans Ziel bringen, auch wenn die Strasse es nicht ist.",
    },
    DIGITAL: {
      title: "Digital, Privatsphäre und Geld",
      intro:
        "Die Hälfte der Sicherheit, die auf einem Bildschirm passiert: Konten, Geräte, was über dich auffindbar ist, Betrug und die Schlüssel zu dem, was dir gehört.",
    },
  },
  courses: {
    DEESCALATION: {
      title: "Deeskalation",
      outcome:
        "Eine Person beruhigen, die wütend, verängstigt oder berauscht ist, mit Worten, Abstand und Haltung, und wissen, wann du gehen solltest.",
    },
    CONFLICT_PSYCHOLOGY: {
      title: "Die Psychologie von Konflikt und Angst",
      outcome:
        "Erkennen, was Stress, Adrenalin und Angst mit dir und anderen machen, und wie das verändert, was Menschen hören und tun.",
    },
    SITUATIONAL_AWARENESS: {
      title: "Situationsbewusstsein",
      outcome: "Früh bemerken, was nicht stimmt, ohne zur ängstlichen Person zu werden, die alles beobachtet.",
    },
    TRAUMA_INFORMED: {
      title: "Mit Menschen nach einem Trauma arbeiten",
      outcome:
        "Eine ruhige Stütze sein für jemanden, der belästigt, angegriffen oder bedroht wurde, ohne es schlimmer zu machen.",
    },
    FIRST_AID: {
      title: "Erste Hilfe",
      outcome: "Einen Notfall erkennen, Hilfe rufen, wiederbeleben, einen Defibrillator einsetzen und starke Blutungen stoppen.",
    },
    STOP_THE_BLEED: {
      title: "Starke Blutungen stoppen",
      outcome: "Direkter Druck, Wundtamponade und ein Tourniquet, geübt, bis deine Hände es können.",
    },
    EMERGENCY_RESPONSE: {
      title: "Notfalleinsatz",
      outcome:
        "Die ersten Minuten eines Vorfalls in die Hand nehmen: den Ort, die Verletzten, die Menschen darum herum und die Übergabe.",
    },
    PARKOUR: {
      title: "Parkour und Flucht",
      outcome:
        "Eine Strasse als Wege sehen, sicher über und um Hindernisse kommen, und sprinten, klettern und springen, wenn es darauf ankommt.",
    },
    RUNNING: {
      title: "Fitness zum Wegkommen",
      outcome: "200 Meter sprinten und weiterlaufen: Intervalltraining, gebaut zum Wegkommen, nicht für Rennen.",
    },
    BOXING: {
      title: "Boxen",
      outcome: "Distanz, Kopfbewegung und Hände, im Sparring gegen einen Partner, der sich wehrt.",
    },
    KICKBOXING: {
      title: "Kickboxen",
      outcome: "Die Beinarbeit und Hände des Boxens, dazu Tritte und die Distanz, die sie hinzufügen.",
    },
    MUAY_THAI: {
      title: "Muay Thai",
      outcome: "Schläge, Tritte, Knie und Ellbogen und der Clinch: ein ehrliches Gefühl dafür, wie sich ein echter Schlagabtausch anfühlt.",
    },
    WRESTLING: {
      title: "Ringen",
      outcome: "Auf den Beinen bleiben, einen Takedown verhindern und wieder aufstehen: die Fähigkeiten, die einen Kampf vom Boden fernhalten.",
    },
    JUDO: {
      title: "Judo",
      outcome: "Würfe, Gleichgewicht und Fallschule. Sicher fallen ist eine eigene Lebenskompetenz.",
    },
    BJJ: {
      title: "Brazilian Jiu-Jitsu",
      outcome:
        "Eine Person am Boden kontrollieren, ohne sie zu schlagen. Die Ringkampfkunst, die am besten zu Festhalten ohne Verletzung passt.",
    },
    RESTRAINT: {
      title: "Festhalten und Kontrolle",
      outcome:
        "Jemanden sicher festhalten, bis Hilfe kommt, mit den Positionen, die die Person atmen lassen, und dem Gesetz, das dir Grenzen setzt.",
    },
    SELF_DEFENCE: {
      title: "Grundlagen der Selbstverteidigung",
      outcome: "Die ganze Leiter: meiden, weggehen, deeskalieren, verteidigen, erholen, innerhalb dessen, was das Schweizer Recht als angemessen bezeichnet.",
    },
    WOMENS_SELF_DEFENCE: {
      title: "Selbstverteidigung für Frauen",
      outcome: "Die Strasse, Menschen, die du kennst, und dein Handy: Hebel statt Kraft, Ausstiegspläne und digitales Stalking.",
    },
    CHILDRENS_SAFETY: {
      title: "Sicherheit für Kinder",
      outcome: "Altersgerechte Fähigkeiten, von einer Telefonnummer, die man auswendig kennt, bis zu sicher fallen und Nein sagen.",
    },
    KRAV_MAGA: {
      title: "Krav Maga",
      outcome: "Abwehr gegen häufige Angriffe und Waffen, trainiert unter Stress, mit dem Schwergewicht auf dem Wegkommen.",
    },
    SYSTEMA: {
      title: "Systema",
      outcome: "Atmung, Entspannung und Bewegung unter Druck; nützlich weit über das Kämpfen hinaus.",
    },
    PROTECTING_OTHERS: {
      title: "Jemand anderen schützen",
      outcome:
        "Eine Person begleiten: wo du stehst, wie du dich durch eine Menge bewegst, wie du sie hinausbringst, und wie du dabei unauffällig bleibst.",
    },
    WEAPONS_LITERACY: {
      title: "Waffenkunde und Recht",
      outcome:
        "Was als Waffe gilt, was du besitzen und tragen darfst, wie Gewalt beurteilt wird, und die Alltagsgegenstände, die Abstand schaffen.",
    },
    FIREARMS_SAFETY: {
      title: "Schusswaffen: sichere Handhabung und Schweizer Waffenrecht",
      outcome:
        "Eine Schusswaffe sicher handhaben, aufbewahren und transportieren und genau schiessen, unterrichtet von bewilligten Instruktoren auf bewilligten Schiessständen.",
    },
    STICK_AND_BLADE: {
      title: "Stöcke und Klingen: Kali und Escrima",
      outcome: "Wie sich Stöcke und Klingen bewegen, wie schnell, und wie wenig Zeit jemandem bleibt, der sich verteidigt.",
    },
    DEFENCE_AGAINST_WEAPONS: {
      title: "Abwehr gegen Waffen",
      outcome: "Eine Waffe früh erkennen, Abstand und Hindernisse nutzen und entkommen; Szenariotraining mit Widerstand.",
    },
    DEFENSIVE_DRIVING: {
      title: "Defensives Fahren",
      outcome: "Den Verkehr vorausschauend lesen, Optionen offenhalten und einen Fahrgast ruhig durch Situationen fahren, die es nicht sind.",
    },
    CYBER_HYGIENE: {
      title: "Konten und Geräte",
      outcome: "E-Mail und Handy absichern, jede Festplatte verschlüsseln und Phishing erkennen, bevor du klickst.",
    },
    PRIVACY_SELF_AUDIT: {
      title: "Was über dich auffindbar ist",
      outcome: "Nach dir selbst suchen, wie es jemand Feindseliges tun würde, und dann entfernen oder verringern, was du findest.",
    },
    SCAMS: {
      title: "Betrug und Nötigung",
      outcome: "Die Hebel kennen, an denen jeder Betrug zieht, und die wenigen Regeln einrichten, die sie aushebeln.",
    },
    DIGITAL_ASSETS: {
      title: "Schlüssel sicher aufbewahren",
      outcome: "Bitcoin und andere Schlüssel so aufbewahren, dass du sie wiederherstellen kannst und niemand sie dir abzwingen kann.",
    },
  },
  capabilities: {
    DE_ESCALATION: "Deeskalation",
    TRAUMA_INFORMED: "Traumasensible Betreuung",
    COMMUNICATION: "Kommunikation",
    SITUATIONAL_AWARENESS: "Situationsbewusstsein",
    CONFLICT_MANAGEMENT: "Konfliktmanagement",
    FIRST_AID: "Erste Hilfe",
    EMERGENCY_RESPONSE: "Notfalleinsatz",
    ADVANCED_MEDICAL: "Erweiterte medizinische Qualifikation",
    GRAPPLING: "Bodenkampf (BJJ, Judo, Ringen)",
    RESTRAINT_CONTROL: "Festhalten und Kontrolle",
    ENDURANCE: "Ausdauer und Beweglichkeit",
    CLOSE_PROTECTION: "Personenschutz",
    NIGHTLIFE: "Nachtleben",
    EVENT_SECURITY: "Sicherheit an Anlässen",
    EXECUTIVE_PROTECTION: "Schutz von Führungspersonen",
    CHILDREN: "Familien und Kinder",
    VULNERABLE_PERSON_SUPPORT: "Begleitung verletzlicher Personen",
    PROFESSIONAL_DRIVING: "Professionelles Fahren",
    DEFENSIVE_DRIVING: "Defensives Fahren",
    CYBERSECURITY_LITERACY: "Kenntnisse in Cybersicherheit",
    DIGITAL_ASSET_LITERACY: "Kenntnisse digitaler Vermögenswerte",
    PRIVACY_TECH: "Technik für Privatsphäre und Sicherheit",
  },
  delivery: {
    SKIF: "Skif-Kurs und -Prüfung",
    PARTNER: "Mit einer Partnerschule",
  },
};

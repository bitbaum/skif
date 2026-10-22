/** The Academy in IT: every area, course, capability and delivery label,
 * keyed exactly as in src/config/academy.ts and capabilities.ts. */
import type { AcademyWords } from "./academy";

export const ACADEMY_IT: AcademyWords = {
  areas: {
    PEOPLE: {
      title: "Giudizio e persone",
      intro:
        "Il cuore del lavoro. La maggior parte delle situazioni si vince o si perde nel modo in cui qualcuno legge un ambiente e parla alla persona che ha davanti.",
    },
    MEDICAL: {
      title: "Primo soccorso ed emergenze",
      intro:
        "Cosa fare nei minuti prima che arrivino i professionisti. Utile a tutti; indispensabile per chiunque si occupi di qualcun altro.",
    },
    ESCAPE: {
      title: "Fuga e movimento",
      intro:
        "La migliore autodifesa è non esserci. Muoversi bene, vedere le vie d'uscita ed essere abbastanza in forma per usarle viene prima di qualsiasi abilità di combattimento.",
    },
    STRIKING: {
      title: "Arti di percussione",
      intro: "Distanza, tempismo e restare calmi mentre qualcuno cerca di colpirti, imparati contro partner che ci provano davvero.",
    },
    GRAPPLING: {
      title: "Arti di lotta",
      intro:
        "Controllo senza danni: restare in piedi, rialzarsi e tenere fermo qualcuno. Dove la tecnica di una persona più piccola batte la forza di una più grande.",
    },
    SELF_DEFENCE: {
      title: "Sistemi di autodifesa",
      intro:
        "Allenamento a scenari per la strada: più aggressori, armi, sorpresa e fuga. La qualità varia più tra una scuola e l'altra che tra un sistema e l'altro.",
    },
    WEAPONS: {
      title: "Armi",
      intro:
        "Cosa sono le armi, come si muovono e cosa permette la legge: armi da fuoco in poligoni autorizzati, bastoni e lame, difesa dalle armi, e riconoscere gli oggetti di tutti i giorni che possono proteggerti.",
    },
    MOBILITY: {
      title: "Guida",
      intro: "Portare qualcuno a destinazione in sicurezza, anche quando la strada non lo è.",
    },
    DIGITAL: {
      title: "Digitale, privacy e denaro",
      intro:
        "La metà della sicurezza che si gioca su uno schermo: account, dispositivi, ciò che si può trovare su di te, truffe e le chiavi di ciò che possiedi.",
    },
  },
  courses: {
    DEESCALATION: {
      title: "De-escalation",
      outcome:
        "Calmare una persona arrabbiata, spaventata o ubriaca con le parole, la distanza e la postura, e sapere quando andarsene.",
    },
    CONFLICT_PSYCHOLOGY: {
      title: "La psicologia del conflitto e della paura",
      outcome:
        "Riconoscere cosa fanno lo stress, l'adrenalina e la paura a te e agli altri, e come cambiano ciò che le persone sentono e fanno.",
    },
    SITUATIONAL_AWARENESS: {
      title: "Consapevolezza situazionale",
      outcome: "Notare presto ciò che è fuori posto, senza diventare la persona ansiosa che osserva tutto.",
    },
    TRAUMA_INFORMED: {
      title: "Lavorare con persone dopo un trauma",
      outcome:
        "Essere una presenza salda per qualcuno che è stato molestato, aggredito o minacciato, senza peggiorare le cose.",
    },
    FIRST_AID: {
      title: "Primo soccorso",
      outcome: "Riconoscere un'emergenza, chiamare aiuto, rianimare, usare un defibrillatore e fermare un'emorragia grave.",
    },
    STOP_THE_BLEED: {
      title: "Fermare un'emorragia grave",
      outcome: "Compressione diretta, tamponamento della ferita e laccio emostatico, praticati finché le mani li sanno da sole.",
    },
    EMERGENCY_RESPONSE: {
      title: "Intervento d'urgenza",
      outcome:
        "Prendere in mano i primi minuti di un incidente: la scena, i feriti, le persone intorno e il passaggio di consegne.",
    },
    PARKOUR: {
      title: "Parkour e fuga",
      outcome:
        "Vedere una strada come un insieme di percorsi, superare e aggirare ostacoli in sicurezza, e scattare, arrampicarsi e scavalcare quando conta.",
    },
    RUNNING: {
      title: "Forma fisica per la fuga",
      outcome: "Scattare per 200 metri e continuare: corsa a intervalli pensata per mettersi in salvo, non per le gare.",
    },
    BOXING: {
      title: "Pugilato",
      outcome: "Distanza, movimento della testa e uso delle mani, provati nello sparring contro un partner che resiste.",
    },
    KICKBOXING: {
      title: "Kickboxing",
      outcome: "Il gioco di gambe e le mani del pugilato, con i calci e la distanza che aggiungono.",
    },
    MUAY_THAI: {
      title: "Muay thai",
      outcome: "Pugni, calci, ginocchiate e gomitate, e il clinch: un'idea onesta di come si sente un vero scambio.",
    },
    WRESTLING: {
      title: "Lotta",
      outcome: "Restare in piedi, fermare un atterramento e rialzarsi: le abilità che tengono un combattimento lontano dal suolo.",
    },
    JUDO: {
      title: "Judo",
      outcome: "Proiezioni, equilibrio e cadute. Saper cadere in sicurezza è un'abilità di vita a sé.",
    },
    BJJ: {
      title: "Jiu-jitsu brasiliano",
      outcome:
        "Controllare una persona a terra senza colpirla. L'arte di lotta più adatta a immobilizzare senza ferire.",
    },
    RESTRAINT: {
      title: "Immobilizzazione e controllo",
      outcome:
        "Tenere qualcuno in sicurezza finché arrivano i soccorsi, con le posizioni che lo lasciano respirare e la legge che ti pone dei limiti.",
    },
    SELF_DEFENCE: {
      title: "Basi dell'autodifesa",
      outcome:
        "Tutta la scala: evitare, fuggire, calmare, difendersi, riprendersi, entro ciò che il diritto svizzero chiama adeguato.",
    },
    WOMENS_SELF_DEFENCE: {
      title: "Autodifesa per donne",
      outcome:
        "La strada, le persone che conosci e il tuo telefono: la leva invece della forza, piani di uscita e stalking digitale.",
    },
    CHILDRENS_SAFETY: {
      title: "Sicurezza per bambini",
      outcome: "Abilità adatte all'età, dal sapere a memoria un numero di telefono al cadere in sicurezza e al dire di no.",
    },
    KRAV_MAGA: {
      title: "Krav maga",
      outcome: "Difesa dagli attacchi comuni e dalle armi, allenata sotto stress, con l'accento sul mettersi in salvo.",
    },
    SYSTEMA: {
      title: "Systema",
      outcome: "Respirazione, rilassamento e movimento sotto pressione; utile ben oltre il combattimento.",
    },
    PROTECTING_OTHERS: {
      title: "Proteggere qualcun altro",
      outcome:
        "Accompagnare una persona: dove stare, come muoversi tra la folla, come portarla via e come restare discreti mentre lo si fa.",
    },
    WEAPONS_LITERACY: {
      title: "Conoscere le armi e la legge",
      outcome:
        "Cosa conta come arma, cosa puoi possedere e portare con te, come viene giudicato l'uso della forza, e gli oggetti di tutti i giorni che tengono a distanza.",
    },
    FIREARMS_SAFETY: {
      title: "Armi da fuoco: maneggio sicuro e legge svizzera sulle armi",
      outcome:
        "Maneggiare, custodire e trasportare un'arma da fuoco in sicurezza e tirare con precisione, con istruttori autorizzati in poligoni autorizzati.",
    },
    STICK_AND_BLADE: {
      title: "Bastoni e lame: kali ed escrima",
      outcome: "Come si muovono bastoni e lame, a che velocità, e quanto poco tempo ha chi si difende.",
    },
    DEFENCE_AGAINST_WEAPONS: {
      title: "Difesa dalle armi",
      outcome:
        "Riconoscere presto un'arma, mantenere distanza e ostacoli, e fuggire; allenamento a scenari con resistenza.",
    },
    DEFENSIVE_DRIVING: {
      title: "Guida difensiva",
      outcome:
        "Leggere il traffico in anticipo, tenersi aperte delle alternative e guidare un passeggero con calma attraverso situazioni che calme non sono.",
    },
    CYBER_HYGIENE: {
      title: "Account e dispositivi",
      outcome: "Blindare e-mail e telefono, cifrare ogni disco e riconoscere il phishing prima di cliccare.",
    },
    PRIVACY_SELF_AUDIT: {
      title: "Cosa si può trovare su di te",
      outcome: "Cercarti come farebbe qualcuno di ostile, poi rimuovere o ridurre ciò che trovi.",
    },
    SCAMS: {
      title: "Truffe e coercizione",
      outcome: "Conoscere le leve che ogni truffa tira, e stabilire le poche regole che le battono.",
    },
    DIGITAL_ASSETS: {
      title: "Custodire le chiavi in sicurezza",
      outcome:
        "Tenere le chiavi dei Bitcoin e di altri beni dove puoi recuperarle e nessuno può estorcertele.",
    },
  },
  capabilities: {
    DE_ESCALATION: "De-escalation",
    TRAUMA_INFORMED: "Assistenza attenta ai traumi",
    COMMUNICATION: "Comunicazione",
    SITUATIONAL_AWARENESS: "Consapevolezza situazionale",
    CONFLICT_MANAGEMENT: "Gestione dei conflitti",
    FIRST_AID: "Primo soccorso",
    EMERGENCY_RESPONSE: "Intervento d'urgenza",
    ADVANCED_MEDICAL: "Qualifica medica avanzata",
    GRAPPLING: "Lotta (BJJ, judo, lotta libera)",
    RESTRAINT_CONTROL: "Immobilizzazione e controllo",
    ENDURANCE: "Resistenza e mobilità",
    CLOSE_PROTECTION: "Protezione ravvicinata",
    NIGHTLIFE: "Vita notturna",
    EVENT_SECURITY: "Sicurezza di eventi",
    EXECUTIVE_PROTECTION: "Protezione di dirigenti",
    CHILDREN: "Famiglie e bambini",
    VULNERABLE_PERSON_SUPPORT: "Sostegno a persone vulnerabili",
    PROFESSIONAL_DRIVING: "Guida professionale",
    DEFENSIVE_DRIVING: "Guida difensiva",
    CYBERSECURITY_LITERACY: "Competenze di cibersicurezza",
    DIGITAL_ASSET_LITERACY: "Competenze sui beni digitali",
    PRIVACY_TECH: "Tecnologie per privacy e sicurezza",
  },
  delivery: {
    SKIF: "Corso ed esame Skif",
    PARTNER: "Con una scuola partner",
  },
};

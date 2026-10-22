/**
 * The ten fields of safety in German, French and Italian. English is the
 * source (src/config/harm-families.ts); these are keyed by field, typed in
 * full, and read through `fieldWords(key, locale)`.
 */
import { HARM_FAMILIES, type HarmFamily } from "../harm-families";
import type { Locale } from "@/i18n/locales";

export type FieldWords = {
  label: string;
  short: string;
  description: string;
  headline: string;
  explainer: readonly [string, string];
};

type Translations = Record<HarmFamily, FieldWords>;

const DE: Translations = {
  PHYSICAL: {
    label: "Körperlich",
    short: "Körper",
    description: "Gewalt, Stalking, Einbrüche, verfolgt werden.",
    headline: "Dein Körper, dein Zuhause, der Weg dazwischen.",
    explainer: [
      "Körperliche Sicherheit ist, was die meisten mit Sicherheit meinen: nicht verletzt werden, nicht verfolgt werden, nicht vor einer aufgebrochenen Tür stehen. Hier verkauft die Sicherheitsbranche am lautesten, und hier lässt sich Angst am leichtesten herstellen.",
      "Skif beginnt bei dem, was die Wahrscheinlichkeit wirklich ändert: wie vorhersehbar du bist, wer weiss, wo du sein wirst, wie ein Ort beleuchtet und einsehbar ist, und was du in der ersten Minute tun würdest, wenn etwas passiert. Schlösser und Menschen kommen danach, bemessen an dem, was du uns erzählt hast.",
    ],
  },
  CYBER: {
    label: "Cyber und digital",
    short: "Digital",
    description: "Konten, Geräte, Phishing, Krypto-Schlüssel.",
    headline: "Die meisten Einbrüche beginnen heute mit einem Passwort.",
    explainer: [
      "Dein E-Mail-Konto ist der Schlüssel zu allen anderen Konten: Wer es hat, kann den Rest zurücksetzen. Dein Telefon trägt deine Bank, deine Nachrichten, deinen Standort und deine Schlüssel. Ein Bedrohungsmodell, das an der Haustür aufhört, verpasst all das.",
      "Die wichtigsten Schritte hier sind gratis und unspektakulär: ein Passwortmanager, ein zweiter Faktor, der sich nicht abfischen lässt, eingeschaltete Updates, Schlüssel, die du wiederherstellen kannst und sonst niemand. Spezialisten braucht es, wenn schon etwas passiert ist, oder wenn das, was du hast, dich zum Ziel macht.",
    ],
  },
  PRIVACY: {
    label: "Privatsphäre",
    short: "Privatsphäre",
    description: "Gefunden, verfolgt oder durchleuchtet werden; veröffentlichte Adressen.",
    headline: "Schwer zu finden sein ist eine Form von Sicherheit.",
    explainer: [
      "Viele körperliche Bedrohungen beginnen mit einer Adresse, die jemand nachschlagen kann. Datenhändler, öffentliche Register, alte Beiträge, ein Foto mit einem Strassenschild darauf, eine App, die den Standort von sich aus teilt: Jedes Stück ist klein, zusammen sind sie eine Karte.",
      "Privatsphäre ist auch ein Preis, den Skif bei jedem anderen Schritt mitrechnet. Eine Kamera, ein Tracker oder ein Überwachungsdienst kann dich vor einer Gefahr schützen und dich einer anderen aussetzen. Jede Empfehlung zeigt, was sie deine Privatsphäre kostet, neben dem, was sie bringt.",
    ],
  },
  REPUTATIONAL: {
    label: "Ruf",
    short: "Ruf",
    description: "Identitätsmissbrauch, koordinierte Angriffe, gefälschtes Material.",
    headline: "Dein Name kann angegriffen werden, ohne dass dich jemand berührt.",
    explainer: [
      "Ein falsches Profil unter deinem Namen, ein koordinierter Shitstorm, ein gefälschter Screenshot oder ein gefälschtes Video: Rufschaden geht schnell, überquert Grenzen und trifft deine Arbeit, deine Familie und dein Sicherheitsgefühl auf einmal.",
      "Vorbereitung ist meist leise: wissen, was über dich auffindbar ist, deinen Namen dort sichern, wo es zählt, Beweise sichern, sobald etwas beginnt, und wissen, wen du anrufst. Die Reaktion ist Spezialistenarbeit, und Skif verweist auf Leute, die sie machen, statt so zu tun.",
    ],
  },
  FAMILY: {
    label: "Familie und Nahestehende",
    short: "Familie",
    description: "Kinder, Partnerinnen und Partner, verletzliche Angehörige.",
    headline: "Die Menschen, die du liebst, gehören zu deinem Bedrohungsmodell.",
    explainer: [
      "Kinder, Partner, älter werdende Eltern: Oft ist der verletzlichste Teil eines Lebens das Leben von jemand anderem. Das öffentliche Profil eines Kindes, eine Angehörige, die jeden Anruf annimmt, ein Haushalt, in dem niemand den Plan kennt.",
      "Skif versteht Familiensicherheit als gemeinsame Arbeit: worauf sich alle im Haushalt einigen, was jede Person in ihrem Alter und mit ihren Fähigkeiten tun kann, und was für jemanden zu tun ist, der sich nicht selbst schützen kann.",
    ],
  },
  HEALTH: {
    label: "Gesundheit und Notfälle",
    short: "Gesundheit",
    description: "Erste Hilfe und Vorbereitung, nie anstelle medizinischer Versorgung.",
    headline: "Die ersten Minuten gehören dir.",
    explainer: [
      "Bei einem Zusammenbruch, einem schweren Sturz oder einem Brand entscheiden die Minuten, bevor die Profis da sind, sehr viel, und wer dann dort ist, bist meistens du. Erste Hilfe, eine Apotheke, die man findet, und ein Haushalt, der die Notrufnummern kennt, gehören zu den wirksamsten Sicherheitsschritten überhaupt.",
      "Skif deckt die Vorbereitung ab, nie die Behandlung. Es ergänzt die medizinische Versorgung und ersetzt sie nie, und es ist kein Notfalldienst: Die Nummern stehen unten.",
    ],
  },
  FINANCIAL: {
    label: "Geld und Vermögen",
    short: "Geld",
    description: "Betrug, Abzocke, Nötigung, Zugriff auf Wertsachen.",
    headline: "Betrug ist ein Sicherheitsproblem, nicht nur ein Geldproblem.",
    explainer: [
      "Betrügereien sind gebaut, um dich zu hetzen und dich von allen zu isolieren, die «warte» sagen würden. Nötigung benutzt dieselben Hebel mit einer Drohung dahinter. Wer grössere Vermögen hält, auch Bitcoin, wird für beides ins Visier genommen.",
      "Die Abwehr ist hier eine Frage des Vorgehens: eine Pausenregel für jede dringende Zahlung, eine zweite Person für grosse Überweisungen, Schlüssel und Wertsachen so geordnet, dass kein einzelner Moment unter Druck sie bewegen kann.",
    ],
  },
  ENVIRONMENTAL: {
    label: "Orte und Umgebung",
    short: "Orte",
    description: "Gefahren zu Hause oder bei der Arbeit, die Umgebung, Anlässe.",
    headline: "Jeder Ort hat seine eigenen Risiken.",
    explainer: [
      "Eine Wohnung, ein Laden, ein Club, ein Heimweg, ein Anlass: Jeder hat eigene Gefahren, vom verstellten Notausgang bis zur Demonstration, die die Strasse herunterkommt. Orte ändern sich mit der Stunde, der Jahreszeit und dem, was in der Nähe passiert.",
      "Skif schätzt einen Ort als Ort ein: wer kommt und geht, wie er einsehbar ist, was an einem bekannten Datum passiert, und was die Verantwortlichen vorher, währenddessen und danach tun können.",
    ],
  },
  INSTITUTIONAL: {
    label: "Behörden und Rechte",
    short: "Rechte",
    description: "Umgang mit Behörden, Arbeitgebern oder Firmen: Wir verweisen auf Fachleute und geben uns nie als solche aus.",
    headline: "Seine Rechte zu kennen, schützt.",
    explainer: [
      "Behörden, Arbeitgeber, Vermieter und Firmen haben Daten über dich und Macht über dich. Zu wissen, was sie fragen dürfen, was du beantworten musst und was du zurückverlangen kannst, ist eine eigene Form von Sicherheit.",
      "Skif hilft dir zu verstehen, wo du stehst, und verweist dich an unabhängige Fachleute. Es gibt nie Rechtsberatung und gibt sich nie als Anwalt aus.",
    ],
  },
  RESILIENCE: {
    label: "Wenn etwas schiefgeht",
    short: "Resilienz",
    description: "Ersatzzugänge, Vertrauenspersonen, die nächsten Schritte.",
    headline: "Vorbeugung versagt manchmal. Plan dafür.",
    explainer: [
      "Resilienz ist, was danach passiert: ein verlorenes Telefon, ein gesperrtes Konto, ein Vorfall, ein Notfall weit weg von zu Hause. Ob es ein schlechter Tag wird oder eine Katastrophe, hängt davon ab, was du vorher eingerichtet hast.",
      "Das heisst: Ersatzzugang zu dem, was zählt, Menschen, die wissen, was zu tun ist, ein schriftlicher Plan, dem jemand anderes folgen kann, und ein Weg, einander zu erreichen, wenn die üblichen Kanäle ausfallen.",
    ],
  },
};

const FR: Translations = {
  PHYSICAL: {
    label: "Physique",
    short: "Physique",
    description: "Violence, harcèlement, cambriolages, être suivi.",
    headline: "Votre corps, votre logement, le chemin entre les deux.",
    explainer: [
      "La sécurité physique, c'est ce que la plupart des gens entendent par sécurité : ne pas être blessé, ne pas être suivi, ne pas rentrer devant une porte forcée. C'est aussi là que l'industrie de la sécurité vend le plus fort, et là où la peur se fabrique le plus facilement.",
      "Skif part de ce qui change vraiment les probabilités : à quel point vous êtes prévisible, qui sait où vous serez, comment un lieu est éclairé et visible, et ce que vous feriez dans la première minute si quelque chose arrivait. Les serrures et les personnes viennent ensuite, à la mesure de ce que vous nous avez dit.",
    ],
  },
  CYBER: {
    label: "Cyber et numérique",
    short: "Numérique",
    description: "Comptes, appareils, hameçonnage, clés crypto.",
    headline: "La plupart des intrusions commencent aujourd'hui par un mot de passe.",
    explainer: [
      "Votre compte e-mail est la clé de tous les autres : qui le détient peut réinitialiser le reste. Votre téléphone porte votre banque, vos messages, votre position et vos clés. Un modèle de menace qui s'arrête à la porte d'entrée passe à côté de tout cela.",
      "Les mesures qui comptent le plus ici sont gratuites et sans éclat : un gestionnaire de mots de passe, un second facteur impossible à hameçonner, les mises à jour activées, des clés que vous pouvez récupérer et personne d'autre. Les spécialistes, c'est pour quand quelque chose est déjà arrivé, ou quand ce que vous détenez fait de vous une cible.",
    ],
  },
  PRIVACY: {
    label: "Vie privée",
    short: "Vie privée",
    description: "Être retrouvé, suivi ou profilé ; adresses divulguées.",
    headline: "Être difficile à trouver est une forme de sécurité.",
    explainer: [
      "Beaucoup de menaces physiques commencent par une adresse que quelqu'un peut trouver. Courtiers en données, registres publics, vieilles publications, une photo avec un panneau de rue, une application qui partage la position par défaut : chaque élément est petit, ensemble ils forment une carte.",
      "La vie privée est aussi un coût que Skif compte à chaque autre pas. Une caméra, un traceur ou un service de surveillance peut vous protéger d'un danger tout en vous exposant à un autre. Chaque recommandation montre ce qu'elle coûte à votre vie privée à côté de ce qu'elle apporte.",
    ],
  },
  REPUTATIONAL: {
    label: "Réputation",
    short: "Réputation",
    description: "Usurpation d'identité, attaques coordonnées, contenus fabriqués.",
    headline: "Votre nom peut être attaqué sans que personne ne vous touche.",
    explainer: [
      "Un faux profil à votre nom, un lynchage coordonné, une capture d'écran ou une vidéo fabriquée : l'atteinte à la réputation va vite, traverse les frontières et touche à la fois votre travail, votre famille et votre sentiment de sécurité.",
      "La préparation est surtout discrète : savoir ce qu'on trouve sur vous, réserver votre nom là où il compte, conserver les preuves dès que quelque chose commence, et savoir qui appeler. La réponse est un travail de spécialiste, et Skif oriente vers ceux qui le font plutôt que de faire semblant.",
    ],
  },
  FAMILY: {
    label: "Famille et proches",
    short: "Famille",
    description: "Enfants, partenaires, proches vulnérables.",
    headline: "Les personnes que vous aimez font partie de votre modèle de menace.",
    explainer: [
      "Enfants, partenaires, parents vieillissants : souvent, la partie la plus exposée d'une vie est celle de quelqu'un d'autre. Le profil public d'un enfant, un proche qui répond à chaque appel, un foyer où personne ne connaît le plan.",
      "Skif traite la sécurité familiale comme un travail commun : ce sur quoi tout le foyer s'accorde, ce que chacun peut faire à son âge et selon ses capacités, et ce qu'il faut faire pour quelqu'un qui ne peut pas se protéger lui-même.",
    ],
  },
  HEALTH: {
    label: "Santé et urgences",
    short: "Santé",
    description: "Premiers secours et préparation, jamais à la place des soins médicaux.",
    headline: "Les premières minutes vous appartiennent.",
    explainer: [
      "Lors d'un malaise, d'une mauvaise chute ou d'un incendie, les minutes avant l'arrivée des professionnels décident de beaucoup, et la personne présente, c'est généralement vous. Les premiers secours, une trousse qu'on trouve, et un foyer qui connaît les numéros d'urgence comptent parmi les mesures de sécurité les plus efficaces qui soient.",
      "Skif couvre la préparation, jamais le traitement. Il complète les soins médicaux et ne les remplace jamais, et ce n'est pas un service d'urgence : les numéros à appeler sont plus bas.",
    ],
  },
  FINANCIAL: {
    label: "Argent et biens",
    short: "Argent",
    description: "Fraude, arnaques, contrainte, accès aux objets de valeur.",
    headline: "La fraude est un problème de sécurité, pas seulement d'argent.",
    explainer: [
      "Les arnaques sont construites pour vous presser et vous isoler de quiconque dirait « attends ». La contrainte utilise les mêmes leviers avec une menace derrière. Les personnes qui détiennent des biens importants, Bitcoin compris, sont visées pour les deux.",
      "Ici, les défenses sont des procédures : une règle de pause pour tout paiement urgent, une deuxième personne pour les gros virements, des clés et des objets de valeur organisés pour qu'aucun moment de pression ne puisse les déplacer.",
    ],
  },
  ENVIRONMENTAL: {
    label: "Lieux et environnement",
    short: "Lieux",
    description: "Dangers à la maison ou au travail, le quartier, les événements.",
    headline: "Chaque lieu a ses propres risques.",
    explainer: [
      "Un appartement, un magasin, un club, un trajet de retour, un événement : chacun a ses dangers propres, de la sortie de secours bloquée à la manifestation qui descend la rue. Les lieux changent avec l'heure, la saison et ce qui se passe à proximité.",
      "Skif évalue un lieu en tant que lieu : qui va et vient, comment il est visible, ce qui se passe à une date connue, et ce que les responsables peuvent faire avant, pendant et après.",
    ],
  },
  INSTITUTIONAL: {
    label: "Institutions et droits",
    short: "Droits",
    description: "Face aux autorités, aux employeurs ou aux entreprises : nous orientons vers des professionnels, sans jamais nous faire passer pour l'un d'eux.",
    headline: "Connaître ses droits protège.",
    explainer: [
      "Les autorités, les employeurs, les bailleurs et les entreprises détiennent des données sur vous et un pouvoir sur vous. Savoir ce qu'ils peuvent demander, à quoi vous devez répondre et ce que vous pouvez exiger en retour est une forme de sécurité à part entière.",
      "Skif vous aide à comprendre où vous en êtes et vous oriente vers des professionnels indépendants. Il ne donne jamais de conseil juridique et ne se fait jamais passer pour un avocat.",
    ],
  },
  RESILIENCE: {
    label: "Quand ça tourne mal",
    short: "Résilience",
    description: "Accès de secours, personnes de confiance, la suite.",
    headline: "La prévention échoue parfois. Prévoyez-le.",
    explainer: [
      "La résilience, c'est ce qui se passe après : un téléphone perdu, un compte bloqué, un incident, une urgence loin de chez soi. Que ce soit une mauvaise journée ou un désastre dépend de ce que vous avez prévu avant.",
      "Cela veut dire un accès de secours à ce qui compte, des personnes qui savent quoi faire, un plan écrit que quelqu'un d'autre peut suivre, et un moyen de se joindre quand les canaux habituels sont coupés.",
    ],
  },
};

const IT: Translations = {
  PHYSICAL: {
    label: "Fisica",
    short: "Fisica",
    description: "Violenza, stalking, furti con scasso, essere seguiti.",
    headline: "Il tuo corpo, la tua casa, la strada in mezzo.",
    explainer: [
      "La sicurezza fisica è ciò che quasi tutti intendono per sicurezza: non essere feriti, non essere seguiti, non tornare a casa e trovare la porta forzata. È anche dove l'industria della sicurezza vende più forte, e dove la paura si fabbrica più facilmente.",
      "Skif parte da ciò che cambia davvero le probabilità: quanto sei prevedibile, chi sa dove sarai, come un luogo è illuminato e visibile, e cosa faresti nel primo minuto se succedesse qualcosa. Serrature e persone vengono dopo, commisurate a ciò che ci hai detto.",
    ],
  },
  CYBER: {
    label: "Cyber e digitale",
    short: "Digitale",
    description: "Account, dispositivi, phishing, chiavi crypto.",
    headline: "Oggi la maggior parte delle intrusioni inizia da una password.",
    explainer: [
      "Il tuo account e-mail è la chiave di tutti gli altri: chi lo controlla può reimpostare il resto. Il tuo telefono porta la tua banca, i tuoi messaggi, la tua posizione e le tue chiavi. Un modello di minaccia che si ferma alla porta di casa non vede nulla di tutto questo.",
      "I passi che contano di più qui sono gratuiti e poco appariscenti: un gestore di password, un secondo fattore che non si può rubare con il phishing, gli aggiornamenti attivati, chiavi che puoi recuperare tu e nessun altro. Gli specialisti servono quando qualcosa è già successo, o quando ciò che possiedi ti rende un bersaglio.",
    ],
  },
  PRIVACY: {
    label: "Privacy",
    short: "Privacy",
    description: "Essere trovati, tracciati o profilati; indirizzi divulgati.",
    headline: "Essere difficili da trovare è una forma di sicurezza.",
    explainer: [
      "Molte minacce fisiche iniziano da un indirizzo che qualcuno può cercare. Broker di dati, registri pubblici, vecchi post, una foto con un cartello stradale, un'app che condivide la posizione di default: ogni pezzo è piccolo, insieme sono una mappa.",
      "La privacy è anche un costo che Skif conta a ogni altro passo. Una telecamera, un localizzatore o un servizio di sorveglianza può proteggerti da un pericolo ed esporti a un altro. Ogni raccomandazione mostra quanto costa alla tua privacy accanto a ciò che ottiene.",
    ],
  },
  REPUTATIONAL: {
    label: "Reputazione",
    short: "Reputazione",
    description: "Furto d'identità, attacchi coordinati, materiale falsificato.",
    headline: "Il tuo nome può essere attaccato senza che nessuno ti tocchi.",
    explainer: [
      "Un falso profilo a tuo nome, una gogna coordinata, uno screenshot o un video falsificato: il danno alla reputazione è veloce, attraversa i confini e colpisce insieme il tuo lavoro, la tua famiglia e il tuo senso di sicurezza.",
      "La preparazione è per lo più silenziosa: sapere cosa si trova su di te, riservare il tuo nome dove conta, conservare le prove appena qualcosa comincia, e sapere chi chiamare. La risposta è un lavoro da specialisti, e Skif indica chi lo fa invece di fingere.",
    ],
  },
  FAMILY: {
    label: "Famiglia e persone care",
    short: "Famiglia",
    description: "Figli, partner, parenti vulnerabili.",
    headline: "Le persone che ami fanno parte del tuo modello di minaccia.",
    explainer: [
      "Figli, partner, genitori che invecchiano: spesso la parte più esposta di una vita è quella di qualcun altro. Il profilo pubblico di un figlio, un parente che risponde a ogni telefonata, una casa dove nessuno conosce il piano.",
      "Skif considera la sicurezza della famiglia un lavoro comune: su cosa si accordano tutti in casa, cosa può fare ciascuno alla sua età e con le sue capacità, e cosa fare per chi non può proteggersi da solo.",
    ],
  },
  HEALTH: {
    label: "Salute ed emergenze",
    short: "Salute",
    description: "Primo soccorso e preparazione, mai al posto delle cure mediche.",
    headline: "I primi minuti sono tuoi.",
    explainer: [
      "In un malore, una brutta caduta o un incendio, i minuti prima che arrivino i professionisti decidono molto, e la persona presente di solito sei tu. Il primo soccorso, una cassetta che si trova, e una casa che conosce i numeri di emergenza sono tra i passi di sicurezza più efficaci che esistano.",
      "Skif si occupa della preparazione, mai della cura. Integra le cure mediche e non le sostituisce mai, e non è un servizio di emergenza: i numeri da chiamare sono qui sotto.",
    ],
  },
  FINANCIAL: {
    label: "Denaro e beni",
    short: "Denaro",
    description: "Frodi, truffe, coercizione, accesso agli oggetti di valore.",
    headline: "La frode è un problema di sicurezza, non solo di soldi.",
    explainer: [
      "Le truffe sono costruite per metterti fretta e isolarti da chiunque direbbe «aspetta». La coercizione usa le stesse leve con una minaccia dietro. Chi possiede beni importanti, Bitcoin compresi, è preso di mira per entrambe.",
      "Qui le difese sono procedure: una regola di pausa per ogni pagamento urgente, una seconda persona per i bonifici importanti, chiavi e oggetti di valore organizzati in modo che nessun singolo momento di pressione possa spostarli.",
    ],
  },
  ENVIRONMENTAL: {
    label: "Luoghi e dintorni",
    short: "Luoghi",
    description: "Pericoli a casa o al lavoro, la zona intorno, gli eventi.",
    headline: "Ogni luogo ha i suoi rischi.",
    explainer: [
      "Un appartamento, un negozio, un club, la strada di casa, un evento: ognuno ha pericoli propri, dall'uscita di emergenza bloccata alla manifestazione che scende per la via. I luoghi cambiano con l'ora, la stagione e ciò che succede vicino.",
      "Skif valuta un luogo come luogo: chi va e viene, quanto è visibile, cosa succede in una data nota, e cosa possono fare i responsabili prima, durante e dopo.",
    ],
  },
  INSTITUTIONAL: {
    label: "Istituzioni e diritti",
    short: "Diritti",
    description: "Rapporti con autorità, datori di lavoro o aziende: indichiamo professionisti, senza mai fingere di esserlo.",
    headline: "Conoscere i propri diritti protegge.",
    explainer: [
      "Autorità, datori di lavoro, locatori e aziende hanno dati su di te e potere su di te. Sapere cosa possono chiedere, a cosa devi rispondere e cosa puoi pretendere in cambio è una forma di sicurezza a sé.",
      "Skif ti aiuta a capire dove ti trovi e ti indirizza a professionisti indipendenti. Non dà mai consulenza legale e non finge mai di essere un avvocato.",
    ],
  },
  RESILIENCE: {
    label: "Quando qualcosa va storto",
    short: "Resilienza",
    description: "Accessi di riserva, persone di fiducia, cosa fare dopo.",
    headline: "La prevenzione a volte fallisce. Preparati.",
    explainer: [
      "La resilienza è ciò che succede dopo: un telefono perso, un account bloccato, un incidente, un'emergenza lontano da casa. Che sia una brutta giornata o un disastro dipende da ciò che hai predisposto prima.",
      "Vuol dire un accesso di riserva a ciò che conta, persone che sanno cosa fare, un piano scritto che qualcun altro può seguire, e un modo per raggiungersi quando i canali soliti non funzionano.",
    ],
  },
};

const BY_LOCALE: Partial<Record<Locale, Translations>> = { de: DE, fr: FR, it: IT };

/** A field's words in `locale`; English straight from harm-families.ts. */
export function fieldWords(key: HarmFamily, locale: Locale): FieldWords {
  const translated = BY_LOCALE[locale]?.[key];
  if (translated) return translated;
  const f = HARM_FAMILIES.find((x) => x.key === key)!;
  return { label: f.label, short: f.short, description: f.description, headline: f.headline, explainer: [f.explainer[0], f.explainer[1]] };
}

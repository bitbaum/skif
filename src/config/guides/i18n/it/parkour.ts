import { PARKOUR as EN } from "../../parkour";
import type { Guide } from "../../types";

export const PARKOUR: Guide = {
  slug: "parkour",
  title: "Parkour: muoversi per andarsene",
  fields: ["PHYSICAL", "HEALTH"],
  summary: "La capacità fisica più utile per la sicurezza è andarsene. Come la allena il parkour, come iniziare senza farti male e dove allenarti a Zurigo.",
  photo: "parkour",
  statement: "Il miglior combattimento è quello da cui te ne sei già andato.",
  lead: [
    "I consigli della polizia per i momenti peggiori in pubblico dicono la stessa cosa con parole diverse: se puoi andartene in sicurezza, fallo. La polizia antiterrorismo britannica lo dice chiaramente: «Corri verso un luogo sicuro. È un'opzione di gran lunga migliore che arrendersi o negoziare» [1]. Andarsene dipende dal vedere un percorso, e dall'avere un corpo capace di percorrerlo.",
    "Il parkour allena proprio questo: muoverti sopra, sotto e intorno a ciò che ostacola il cammino, con il tuo corpo e nient'altro. Insegna anche a cadere bene, il che conta per molte più persone di qualsiasi aggressore.",
  ],
  sections: [
    {
      kind: "prose",
      heading: "Forti, per essere utili",
      anchor: "origins",
      paragraphs: [
        "Il parkour nasce dalla «méthode naturelle» di Georges Hébert, un sistema di addestramento della marina e dell'esercito francesi fatto di corsa, arrampicata, salti, nuoto e sollevamento, sperimentato dal 1904 [2]. Il suo motto viene di solito riportato come «être fort pour être utile»: essere forti per essere utili [3]. Nel 1902 contribuì a coordinare la fuga di circa 700 persone dall'eruzione del Monte Pelée, in Martinica [3].",
        "Il metodo passò da Raymond Belle, pompiere militare di Parigi, a suo figlio David e a un gruppo di amici a Lisses, nella periferia di Parigi, negli anni '80 e '90. Lo chiamarono parkour, o «l'art du déplacement»: l'arte dello spostamento [2]. Oggi ha le sue gare, ma la maggior parte di chi lo pratica semplicemente si allena.",
        "Quest'origine è il motivo per cui il parkour ha il suo posto su Skif. Non è mai stato uno spettacolo; era un modo per essere capaci di tirare fuori dai guai sé stessi, e gli altri.",
      ],
    },
    {
      kind: "cards",
      heading: "Cosa ti dà",
      anchor: "why",
      columns: 3,
      cards: [
        { title: "Percorsi che gli altri non vedono", body: "Un muro, una ringhiera, uno spazio tra le auto parcheggiate smettono di essere vicoli ciechi. Più percorsi vuol dire più vie d'uscita da un brutto posto. Questo è il ragionamento di Skif, non un risultato misurato: nessuno ha studiato il parkour nelle fughe reali." },
        { title: "Atterrare invece di schiantarsi", body: "Un atterraggio da parkour allenato ha ridotto la forza di picco sul corpo del 38% e la sua velocità di carico del 54% rispetto a un atterraggio rigido; una rotolata, del 43% e del 63% [4]." },
        { title: "Cadere bene, a ogni età", body: "Nel 2023 le cadute hanno ucciso circa 842'000 persone nel mondo, il 71% delle quali con 60 anni o più, e l'OMS cita gli esercizi che mettono alla prova l'equilibrio tra ciò che le previene [5]. Gli anziani a cui è stato insegnato a cadere conservavano parte della capacità 20 mesi dopo [6]." },
        { title: "Calma nello sforzo", body: "Allenarsi vuol dire trovarsi davanti a un salto di cui non sei sicuro, valutarlo e decidere. La capacità è la decisione, non il salto." },
        { title: "Una forma fisica che serve a qualcosa", body: "Scattare, arrampicarti e portare il tuo stesso peso, allenati per servirti e non per lo specchio." },
        { title: "Gratis, e all'aperto", body: "Per allenarsi basta quasi sempre una città e un paio di scarpe. Zurigo ha un impianto di parkour pubblico e gratuito (vedi sotto)." },
      ],
    },
    {
      kind: "definitions",
      heading: "Iniziare senza farti male",
      anchor: "start",
      blurb: "Gli infortuni nel parkour sono per lo più lievi: in un sondaggio su 180 praticanti, 1,7 ogni 1'000 ore di allenamento, soprattutto distorsioni alla caviglia e contusioni al ginocchio [7]. Queste abitudini sono quelle che la ricerca collega a un numero minore di infortuni.",
      items: [
        { term: "Prima la condizione fisica", detail: "Una scarsa preparazione fisica era legata agli infortuni, e così il carico di allenamento: più ore, più infortuni [7]. Costruisci la forza e aumenta il volume lentamente." },
        { term: "L'altezza segue la forza", detail: "Gli atleti più pesanti e quelli con meno potenza nelle gambe passavano dall'atterraggio su due piedi alla rotolata già a cadute più basse [8]. La tua altezza sicura è la tua, non quella di chi ti precede." },
        { term: "Impara l'atterraggio e la rotolata", detail: "Prima di qualsiasi salto verso il basso: atterra morbido sugli avampiedi, assorbi con le gambe e rotola quando il salto è troppo alto per fermarti in piedi [4]." },
        { term: "Salti di precisione, bassi", detail: "I salti di precisione erano il movimento più spesso coinvolto negli infortuni tra 161 praticanti di Madrid [9]. Esercitali su linee a terra, poi bassi, per molto tempo." },
        { term: "Allenati con un coach e con altri", detail: "Un buon gruppo corregge il tuo atterraggio prima che diventi un'abitudine, e ti dice quando fermarti. A Zurigo, i gruppi con coach offrono una lezione di prova (vedi sotto)." },
        { term: "Rispetta i luoghi", detail: "Allenati dove è permesso, non lasciare niente dietro di te e smetti quando qualcuno te lo chiede. I fondatori del movimento insistevano su salute, umiltà e incoraggiamento reciproco [10]." },
      ],
    },
    {
      kind: "table",
      heading: "Cosa dicono i dati sugli infortuni",
      anchor: "injuries",
      blurb: "La maggior parte degli infortuni riguarda le gambe e la maggior parte non richiede altro che riposo. Quelli gravi vengono dagli atterraggi e dagli urti contro oggetti.",
      columns: ["Studio", "Chi", "Cosa ha trovato"],
      rows: [
        ["Grosprêtre & El Khattabi, 2022 [7]", "180 praticanti, Francia", "1,7 infortuni ogni 1'000 ore; soprattutto distorsioni alla caviglia e contusioni al ginocchio; più carico di allenamento e meno preparazione fisica, più infortuni"],
        ["Giner-Gran, 2020 [9]", "161 praticanti, Madrid, con un anno o più di allenamento", "Il 70% si era già infortunato; il 69% degli infortuni non ha richiesto esami né interventi; i salti di precisione erano i più spesso coinvolti"],
        ["Rossheim & Stephenson, 2017 [11]", "Pronto soccorso negli Stati Uniti, 2009–2015", "La maggior parte degli infortuni da atterraggi o urti contro oggetti; il 58% a braccia e gambe"],
        ["Puddle & Maulder, 2013 [4]", "10 uomini allenati su una pedana di forza", "Atterraggi e rotolate da parkour hanno ridotto la forza di picco del 38–43% rispetto a un atterraggio rigido"],
      ],
    },
    {
      kind: "definitions",
      heading: "Dove allenarti a Zurigo",
      anchor: "zurich",
      blurb: "Verificato sulle pagine degli stessi offerenti; i prezzi cambiano, quindi controlla prima di andare.",
      items: [
        { term: "ParkourONE Zürich", detail: "Lezioni con coach per adulti (18+), ragazzi (dai 12 anni), bambini (6–12) e genitori con bambini dai 4 anni, all'aperto con ogni tempo a Dynamo, Universität Zürich, Hardaupark, Kantonsschule Enge e Küsnacht. Una lezione di prova costa CHF 25; gli adulti pagano CHF 98 al mese [12]. Insegnano anche a Berna, Thun, Basilea, Münsingen e Briga [13]." },
        { term: "Sportzentrum Heerenschürli, Schwamendingen", detail: "Il primo impianto di parkour all'aperto di Zurigo, aperto dall'agosto 2022 e gratuito [14]." },
        { term: "Principianti più anziani", detail: "Skif non ha trovato in Svizzera nessun corso di parkour per over 50. I corsi per adulti non indicano un'età massima, quindi chiedi una lezione di prova e di' cosa ne vuoi ricavare: spesso equilibrio e saper cadere bene, che i programmi basati sul parkour all'estero insegnano già [15]." },
      ],
    },
    {
      kind: "prose",
      heading: "Cosa il parkour non fa",
      anchor: "limits",
      paragraphs: [
        "Non serve a nulla quando qualcuno ti ha già afferrato. Per questo ci sono le arti di lotta (vedi Sport da combattimento, giudicati sulla strada). E non è un motivo per correre rischi che altrimenti non correresti: il senso di saper andartene è andartene presto, con calma, prima che serva correre.",
        "Le prove per gli anziani sono ancora iniziali. Un programma di parkour di 10 settimane per 20 adulti con un'età media di 67 anni ha migliorato la distanza a cui riuscivano ad allungarsi, ma il suo effetto sull'alzarsi e camminare è stato piccolo e non significativo [15]. Imparare a cadere ha un sostegno più solido [6].",
      ],
    },
  ],
  sources: EN.sources,
  checked: EN.checked,
};

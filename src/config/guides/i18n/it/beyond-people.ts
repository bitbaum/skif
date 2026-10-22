import type { Guide } from "../../types";

export const BEYOND_PEOPLE: Guide = {
  slug: "nature-travel-sport",
  title: "Rischi che non sono persone: natura, animali, viaggi e sport",
  fields: ["ENVIRONMENTAL", "HEALTH", "RESILIENCE"],
  summary: "Valanghe, alluvioni, zecche, mucche, città all'estero e gli sport che ami: misurati, non temuti.",
  photo: "skiTouring",
  statement: "La maggior parte dei rischi non ha un volto.",
  lead: [
    "Il tempo, il terreno, gli animali, una città che non conosci e lo sport che ami comportano tutti dei rischi, spesso più delle persone che ti circondano. Skif li tratta allo stesso modo: capire il rischio, ridurre ciò che costa poco ridurre, e poi andare a vivere.",
    "Misurare un rischio non è giudicarlo. Chi fa base jumping e chi combatte nella Muay Thai accettano entrambi un rischio reale per qualcosa a cui tengono. Il compito è conoscerne la misura e gestire ciò che si può gestire.",
  ],
  sections: [
    {
      kind: "table",
      heading: "I pericoli naturali in Svizzera, e dove tenerli d'occhio",
      anchor: "nature",
      columns: ["Pericolo", "Dove guardare", "Cosa fare"],
      rows: [
        ["Valanghe", "Il bollettino delle valanghe dell'SLF; l'app White Risk", "Leggi il bollettino prima di ogni gita fuori pista; porta ARTVA, sonda e pala, e allenati a usarli."],
        ["Temporali, forti piogge, caldo", "Le allerte e l'app di MeteoSvizzera", "Attiva le allerte per dove abiti e per dove stai andando."],
        ["Alluvioni e frane", "Le allerte federali e cantonali sui pericoli naturali", "Sappi se la tua casa è in una zona di pericolo; tieni gli oggetti di valore sopra la cantina."],
        ["Terremoti", "Servizio Sismico Svizzero", "Fissa i mobili alti alle pareti; sappi dove sono i rubinetti di chiusura di gas e acqua."],
        ["Qualsiasi allerta ufficiale", "App Alertswiss", "Una sola app per le allerte federali e cantonali, comprese le sirene e cosa significano."],
      ],
    },
    {
      kind: "definitions",
      heading: "Animali",
      anchor: "animals",
      items: [
        { term: "Zecche", detail: "L'Ufficio federale della sanità pubblica raccomanda la vaccinazione contro l'encefalite da zecche per la maggior parte delle persone nella maggior parte della Svizzera. Controllati dopo le passeggiate nell'erba e nei boschi." },
        { term: "Mucche con i vitelli", detail: "Sugli alpeggi le mucche madri proteggono i loro vitelli. Tieni le distanze, tieni i cani al guinzaglio e aggira una mandria invece di attraversarla." },
        { term: "Cani", detail: "Non scappare da un cane e non fissarlo; mettiti di fianco, fermo, con le mani vicine al corpo. Insegna lo stesso ai bambini." },
        { term: "All'estero", detail: "Rabbia, serpenti e insetti variano da Paese a Paese. Leggi i consigli sanitari per la tua destinazione prima di partire, non dopo." },
      ],
    },
    {
      kind: "prose",
      heading: "Città e Paesi",
      anchor: "travel",
      paragraphs: [
        "Il rischio varia secondo il Paese, la città, il quartiere e l'ora. Il Dipartimento federale degli affari esteri pubblica consigli di viaggio per ogni Paese, e la sua app Travel Admin ti permette di registrare un viaggio così che l'ambasciata possa raggiungerti in caso di crisi.",
        "Dentro una città la fonte migliore è locale: chiedi a un albergo, a chi ti ospita o a un collega quali zone evitano e quando. Informati sulle truffe più comuni ai turisti in quel posto prima di arrivare, e conosci il numero d'emergenza locale.",
      ],
    },
    {
      kind: "prose",
      heading: "Gli sport che scegli",
      anchor: "sport",
      paragraphs: [
        "Chi studia il rischio usa il micromort, una probabilità di morte su un milione, per confrontare le attività su un'unica scala. Un lancio col paracadute negli Stati Uniti vale circa 4,6; un salto BASE dal Kjerag in Norvegia circa 430; un'anestesia generale circa 10. Le fonti sono nella ricerca della Biblioteca sulla scienza della sicurezza.",
        "La morte non è l'unico costo. Gli sport da combattimento comportano il rischio più lento dei colpi ripetuti alla testa; gli sport di resistenza i rischi legati al caldo e al cuore; gli sport di montagna quelli del terreno e del tempo. Ognuno si riduce allo stesso modo: allenamento, l'attrezzatura giusta, saper leggere le condizioni e compagni capaci di dire di no.",
        "Skif non dice a nessuno quali rischi valga la pena correre. Ti aiuta a vederne la misura, così che la scelta sia tua, e informata.",
      ],
    },
  ],
};

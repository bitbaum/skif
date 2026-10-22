import type { Guide } from "../../types";

export const WOMEN: Guide = {
  slug: "womens-safety",
  title: "La sicurezza delle donne, com'è davvero",
  fields: ["PHYSICAL", "PRIVACY", "FAMILY"],
  summary: "Il pericolo degli sconosciuti è metà della storia. Le persone che conosci, lo stalking digitale e le capacità che funzionano per una persona più piccola.",
  photo: "tramStop",
  statement: "L'autodifesa per le donne comincia più vicino a casa.",
  lead: [
    "L'Organizzazione mondiale della sanità riferisce che la forma più comune di violenza contro le donne nel mondo è quella di un partner intimo. I consigli che parlano solo di strade buie e di sconosciuti lasciano fuori la maggior parte del pericolo.",
    "Questa guida tratta quindi tre cose: la strada, le persone che conosci e il telefono che hai in tasca. Niente di tutto ciò ti chiede di vivere più in piccolo. Si tratta di andare dove vuoi, con un piano.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Per strada",
      anchor: "street",
      items: [
        { term: "Condividi il tragitto", detail: "Manda a qualcuno il tuo percorso e l'ora di arrivo, oppure condividi la posizione in tempo reale solo per il tragitto, e poi disattivala." },
        { term: "Scegli il vagone", detail: "Su tram e treni siediti vicino al conducente o vicino ad altre persone, accanto a una porta." },
        { term: "Attenzioni indesiderate", detail: "Dillo ad alta voce e chiaramente, «Smettila di seguirmi», così che chi è intorno se ne accorga. Poi muoviti verso la gente e la luce." },
        { term: "Allena la leva, non i muscoli", detail: "Le arti di lotta come il BJJ e il judo insegnano a una persona più piccola a controllarne una più grande. Vedi la guida sugli sport da combattimento." },
      ],
    },
    {
      kind: "definitions",
      heading: "Con le persone che conosci",
      anchor: "known",
      items: [
        { term: "Riconosci il controllo", detail: "Controllare il tuo telefono, gestire il tuo denaro, isolarti dagli amici, sorvegliare dove sei: sono segnali d'allarme, che qualcuno sia stato picchiato o no." },
        { term: "Un piano d'uscita discreto", detail: "Copie dei documenti, un po' di denaro, un telefono di riserva carico e un posto dove andare, tenuti in un luogo che conosci solo tu." },
        { term: "L'aiuto esiste", detail: "In Svizzera i centri di aiuto alle vittime (Opferhilfe) offrono consulenza gratuita e confidenziale. In caso di pericolo chiama il 117." },
      ],
    },
    {
      kind: "definitions",
      heading: "Nel tuo telefono",
      anchor: "phone",
      items: [
        { term: "Localizzatori sconosciuti", detail: "Gli iPhone e i telefoni Android attuali avvisano quando un localizzatore sconosciuto si sposta con te. Tieni attivi questi avvisi e, se ne compare uno, controlla borse e auto." },
        { term: "Stalkerware", detail: "Una batteria che si scarica in fretta, impostazioni cambiate che non hai cambiato tu, qualcuno che sa cosa hai scritto nei messaggi privati. Un controllo da uno specialista, o un ripristino alle impostazioni di fabbrica, lo rimuove." },
        { term: "Account condivisi", detail: "La condivisione in famiglia, le foto condivise nel cloud e le password salvate su un dispositivo usato da qualcun altro possono tutte mostrare dove sei. Controllale." },
      ],
    },
  ],
};

export const CHILDREN: Guide = {
  slug: "childrens-safety",
  title: "La sicurezza dei bambini, età per età",
  fields: ["FAMILY", "HEALTH", "CYBER"],
  summary: "Cosa può imparare un bambino a ogni età, dal proprio numero di telefono all'adescamento online, senza crescerlo nella paura.",
  photo: "familyPath",
  statement: "Un bambino capace è un bambino più sicuro.",
  lead: [
    "I bambini non sono protetti dalla paura del mondo, ma dal sapere cosa fare in esso. Ogni capacità qui sotto si adatta a un'età e cresce con il bambino.",
    "Lo scopo è la libertà: un bambino che conosce le regole può andare a scuola a piedi, andare a casa di un amico e usare un telefono con più autonomia, e prima.",
  ],
  sections: [
    {
      kind: "table",
      heading: "Cosa insegnare, e quando",
      anchor: "by-age",
      columns: ["Età", "Capacità"],
      rows: [
        ["Da 3 a 5", "Il proprio nome completo e il nome di un genitore; cosa fare se si perde (restare fermo, cercare un genitore con bambini o un commesso); i nomi delle parti del corpo; nessun adulto gli chiede di tenere un segreto ai genitori."],
        ["Da 6 a 9", "Il numero di telefono di un genitore a memoria; i numeri d'emergenza; attraversare la strada; gli adulti fidati e un punto di ritrovo della famiglia; nuotare."],
        ["Da 10 a 12", "Percorsi a piedi da solo con brevi aggiornamenti; dire di no e andarsene; i primi passi online: profili privati, nessuna condivisione della posizione con sconosciuti."],
        ["13 e oltre", "I segnali dell'adescamento online; condividere immagini e la loro permanenza; le feste e il ritorno a casa; il primo soccorso di base."],
      ],
    },
    {
      kind: "definitions",
      heading: "Regole che valgono a ogni età",
      anchor: "rules",
      items: [
        { term: "Sorprese, non segreti", detail: "Una sorpresa è divertente e finisce; un segreto verso i genitori è un segnale d'allarme. I bambini capiscono presto la differenza." },
        { term: "Il suo corpo è suo", detail: "Può rifiutare un abbraccio, anche dai parenti. Gli insegna che il suo no conta." },
        { term: "Chiamare casa, sempre", detail: "Può chiamare per farsi venire a prendere da qualsiasi posto, a qualsiasi ora, e quella sera non ci sarà nessuna predica." },
        { term: "L'acqua", detail: "L'Organizzazione mondiale della sanità annovera l'annegamento tra le principali cause di morte dei bambini piccoli. Le lezioni di nuoto e la sorveglianza vicino all'acqua sono tra i passi di sicurezza più efficaci che una famiglia possa fare." },
      ],
    },
    {
      kind: "prose",
      heading: "Adescamento online",
      anchor: "grooming",
      paragraphs: [
        "L'adescamento segue uno schema: attenzioni e lusinghe, il passaggio a un canale privato, regali o crediti per i giochi, segretezza, poi pressione. Insegna lo schema, non una lista di app: le app cambiano, lo schema no.",
        "Se succede, conserva i messaggi, non affrontare la persona e fai una denuncia alla polizia. Assicurati che il bambino sappia che non è nei guai per avertelo detto.",
      ],
    },
  ],
};

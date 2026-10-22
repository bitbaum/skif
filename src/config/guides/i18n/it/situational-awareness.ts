import { SITUATIONAL_AWARENESS as EN } from "../../situational-awareness";
import type { Guide } from "../../types";

export const SITUATIONAL_AWARENESS: Guide = {
  slug: "situational-awareness",
  title: "Consapevolezza della situazione, senza paranoia",
  fields: ["PHYSICAL", "ENVIRONMENTAL"],
  summary: "Accorgerti presto, con calma: com'è la normalità in un luogo, cosa la rompe e le poche abitudini che ti fanno guadagnare tempo.",
  photo: "tramStop",
  statement: "Essere attento vuol dire sapere com'è la normalità.",
  lead: [
    "La consapevolezza della situazione non è scrutare ogni volto in cerca di pericoli. È estenuante, e la ricerca su come leggere gli sconosciuti dice che funziona a malapena. È qualcosa di più tranquillo: un'idea di cosa è normale in un luogo, così che ciò che non torna salti all'occhio presto, quando c'è ancora tempo per fare qualcosa di piccolo.",
    "Fatta bene, ti rende più libero, non più ansioso. Noti meno rumore e più ciò che conta.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Normalità e anomalia",
      anchor: "baseline",
      items: [
        { term: "La normalità", detail: "Ciò che è abituale qui, adesso: quanto rumore c'è, come si muove la gente, dove guarda, cosa porta con sé. Una stazione affollata all'ora di punta e una strada tranquilla alle 2 di notte hanno normalità diverse." },
        { term: "L'anomalia", detail: "Qualcosa che non corrisponde alla normalità: qualcuno che non fa ciò che fanno tutti gli altri, l'assenza di ciò che dovrebbe esserci (una strada animata improvvisamente vuota), un cambiamento nei suoni o nei movimenti." },
        { term: "La risposta", detail: "Un'anomalia isolata di solito non è niente. È un segnale per prestare attenzione e sapere qual è la tua prossima piccola mossa, non per reagire." },
      ],
    },
    {
      kind: "cards",
      heading: "Abitudini che fanno guadagnare tempo",
      anchor: "habits",
      columns: 3,
      cards: [
        { title: "Le uscite appena arrivi", body: "Due vie d'uscita da ogni stanza, vagone e bar. Ci vuole un secondo; in poche settimane diventa automatico." },
        { title: "Testa alta nei passaggi", body: "Porte, scale, posteggi, attraversamenti, il momento in cui arrivi alla porta di casa. Lì metti via il telefono: negli Stati Uniti, nel 2010 i pronto soccorso hanno curato secondo le stime più di 1'500 pedoni per ferite legate al telefono, più del doppio rispetto al 2005 [1]." },
        { title: "Un orecchio libero", body: "Le cuffie in luoghi tranquilli di notte ti tolgono il senso che ti avverte per primo." },
        { title: "Siediti con la vista sulla sala", body: "Rivolto verso la sala e vicino a un'uscita, senza dare nell'occhio." },
        { title: "Fidati del disagio", body: "Se qualcosa non ti convince, agisci in piccolo: attraversa la strada, aspetta il tram successivo, torna dentro. Non ti serve un motivo." },
        { title: "Prova una mossa", body: "Su un percorso abituale, decidi una volta dove andresti se succedesse qualcosa. Sotto stress, le persone fanno ciò che hanno deciso prima." },
      ],
    },
    {
      kind: "prose",
      heading: "Cosa non è la consapevolezza",
      anchor: "not",
      paragraphs: [
        "Non è profilazione. L'aspetto dice molto poco; il comportamento nel suo contesto dice di più. Trattare le persone come minacce per il loro aspetto è sbagliato e inefficace.",
        "Non è vigilanza costante. La maggior parte della vita è sicura. Tieni l'attenzione per i passaggi e per i momenti in cui qualcosa cambia; il resto del tempo, guarda il lago.",
      ],
    },
  ],
  sources: EN.sources,
  checked: EN.checked,
};

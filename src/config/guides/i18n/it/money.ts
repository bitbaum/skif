import type { Guide } from "../../types";

export const MONEY: Guide = {
  slug: "scams-coercion-keys",
  title: "Truffe, coercizione e chiavi",
  fields: ["FINANCIAL", "CYBER"],
  summary: "Come funzionano le truffe, le poche regole che le battono quasi tutte e come custodire Bitcoin in modo che nessun momento di pressione possa spostarli.",
  statement: "Ogni truffa ha bisogno che tu abbia fretta.",
  lead: [
    "La frode si basa sulle stesse poche leve, qualunque sia la storia: urgenza, autorità, segretezza e isolamento. Impara le leve e le storie smettono di funzionare, per quanto convincente sia la voce al telefono.",
    "La coercizione usa le stesse leve con una minaccia dietro. La difesa contro entrambe è la stessa: accordi presi in anticipo, così che nessun singolo momento, chiamata o persona possa spostare ciò che possiedi.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Le leve",
      anchor: "levers",
      items: [
        { term: "Urgenza", detail: "«Deve essere oggi», «il tuo conto verrà chiuso», «l'offerta scade tra un'ora». La fretta ti impedisce di verificare." },
        { term: "Autorità", detail: "Qualcuno che sembra la banca, la polizia, un corriere o il tuo capo. Il numero del chiamante e gli indirizzi e-mail si falsificano facilmente." },
        { term: "Segretezza", detail: "«Non dirlo a nessuno, fa parte dell'indagine.» Le vere istituzioni non hanno mai bisogno che tu nasconda qualcosa alla tua famiglia." },
        { term: "Isolamento", detail: "Tenerti al telefono, spostarti su un'app di messaggistica, chiederti di installare un programma di accesso remoto." },
        { term: "Troppo bello", detail: "Rendimenti che nessun altro ottiene, una lotteria a cui non hai partecipato, una storia d'amore che ha bisogno di soldi per una visita." },
      ],
    },
    {
      kind: "definitions",
      heading: "Regole che le battono quasi tutte",
      anchor: "rules",
      items: [
        { term: "La regola della pausa", detail: "Nessun pagamento, bonifico o codice inatteso parte lo stesso giorno. Una richiesta vera sopravvive a un'attesa di 24 ore; una truffa raramente." },
        { term: "Richiama tu", detail: "Riattacca, cerca tu il numero e chiama. Non usare mai il numero, il link o l'app che ti ha dato chi ha chiamato." },
        { term: "I codici non escono mai", detail: "Le banche e la polizia non chiedono codici di accesso, PIN della carta né di spostare denaro «al sicuro»." },
        { term: "Due persone per le grosse somme", detail: "Accordati con qualcuno di fiducia che tutto ciò che supera un certo importo se ne parla prima. Protegge entrambi." },
        { term: "Nessuno guida il tuo schermo", detail: "Nessun programma di accesso remoto per chiunque ti abbia contattato per primo." },
      ],
    },
    {
      kind: "prose",
      heading: "Custodire Bitcoin in modo che la pressione non possa spostarli",
      anchor: "keys",
      paragraphs: [
        "L'autocustodia significa che le chiavi le tieni tu, e nessuno può congelarle. Significa anche che nessuno può recuperarle, e che chi ti costringe può spostarle. Entrambi i rischi si gestiscono in anticipo.",
        "Tieni la frase di recupero offline, idealmente incisa nel metallo, mai fotografata, digitata o salvata nel cloud. Per importi consistenti, una configurazione multifirma (per esempio due chiavi su tre, tenute in luoghi diversi) elimina ogni singolo punto che possa essere rubato o forzato.",
        "La protezione più economica è il silenzio. Gli averi di cui nessuno sa sono averi che nessuno cerca di prendere. Tieni un piccolo portafoglio per tutti i giorni separato dai risparmi, e non legare indirizzi o importi al tuo nome in pubblico.",
      ],
    },
    {
      kind: "prose",
      heading: "Se qualcuno ti mette sotto pressione",
      anchor: "pressured",
      paragraphs: [
        "Se qualcuno ti minaccia, la tua sicurezza viene prima di qualsiasi importo. Se devi, obbedisci, mettiti al sicuro e chiama la polizia al 117. Conserva tutto: messaggi, numeri, identificativi delle transazioni.",
        "Se hai già mandato denaro a una truffa, chiama subito la tua banca al numero che trovi sulla carta. Prima lo sanno, più ci sono possibilità di bloccare o richiamare un pagamento.",
      ],
    },
  ],
};

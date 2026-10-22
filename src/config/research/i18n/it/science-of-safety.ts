import { SCIENCE_OF_SAFETY } from "../../science-of-safety";
import type { Research } from "../../types";

export const SCIENCE_OF_SAFETY_IT: Research = {
  slug: SCIENCE_OF_SAFETY.slug,
  title: "La scienza della sicurezza: cosa dicono le prove",
  fields: SCIENCE_OF_SAFETY.fields,
  summary:
    "Perché la criminalità si concentra dove si concentra, cosa fanno davvero l'illuminazione e le telecamere, se opporre resistenza funziona, la de-escalation, la sicurezza degli account, la Svizzera in cifre, i primi minuti di un'emergenza e come confrontare i rischi.",
  photo: SCIENCE_OF_SAFETY.photo,
  statement: "Cosa funziona, misurato.",
  lead: [
    "Molti consigli sulla sicurezza sono folclore. Questo articolo raccoglie ciò che è stato davvero misurato (revisioni sistematiche, studi randomizzati, statistiche nazionali) con l'entità di ogni effetto e i suoi limiti. Ogni cifra viene dalla fonte citata accanto.",
  ],
  checked: SCIENCE_OF_SAFETY.checked,
  sections: [
    {
      kind: "prose",
      heading: "Perché la criminalità si concentra dove si concentra",
      anchor: "where",
      paragraphs: [
        "La teoria delle attività routinarie, formulata da Cohen e Felson nel 1979, spiega il reato come l'incontro di tre elementi: qualcuno motivato a commetterlo, un bersaglio adatto e l'assenza di un guardiano capace [1]. La prevenzione situazionale del crimine, sviluppata da Clarke, agisce sugli ultimi due: rendere i bersagli più difficili e la sorveglianza più probabile [2].",
        "L'obiezione abituale è che la criminalità si sposta semplicemente altrove. Una revisione di 102 valutazioni ha trovato uno spostamento nel 26% delle osservazioni e l'opposto (benefici che si estendono ai luoghi vicini) nel 27%; dove lo spostamento c'è stato, tendeva a essere minore dell'effetto della misura stessa [3].",
      ],
    },
    {
      kind: "prose",
      heading: "Illuminazione e telecamere",
      anchor: "lighting-cameras",
      paragraphs: [
        "Un'illuminazione stradale migliorata ha ridotto la criminalità del 20% in 13 studi, più nel Regno Unito che negli Stati Uniti. La criminalità notturna non è calata più di quella diurna, quindi gli autori attribuiscono l'effetto all'orgoglio della comunità e al controllo sociale informale più che all'essere visti [4].",
        "Le telecamere fanno meno di quanto si pensi. Una revisione Campbell ha constatato che la videosorveglianza «ha un impatto modesto sulla criminalità», funziona meglio nei parcheggi e «non ha alcun effetto sui livelli di criminalità violenta» [5]. Un aggiornamento su 40 anni ha trovato gli effetti maggiori e più costanti nei parcheggi, effetti maggiori quando le telecamere sono sorvegliate attivamente, e sconsiglia le telecamere come misura «a sé stante» [6].",
        "Per una casa o un negozio è un risultato utile: una telecamera aiuta soprattutto contro i reati contro il patrimonio e i veicoli, a cose fatte, con un costo reale per la privacy di tutti quelli che riprende. Luce, persone e attenzione fanno di più per la sicurezza personale.",
      ],
    },
    {
      kind: "prose",
      heading: "Progettare i luoghi",
      anchor: "design",
      paragraphs: [
        "La prevenzione del crimine attraverso la progettazione ambientale (visuali libere, sorveglianza naturale, chiara appartenenza degli spazi) è molto diffusa e plausibile. I suoi stessi revisori scrivono che le prove sono «inconcludenti e molto criticate» [7]. Skif la considera una pratica sensata, non scienza dimostrata.",
      ],
    },
    {
      kind: "prose",
      heading: "Opporre resistenza funziona?",
      anchor: "resisting",
      paragraphs: [
        "In 27'595 episodi dell'indagine statunitense sulla vittimizzazione, le azioni di autoprotezione, con o senza uso della forza, hanno ridotto la probabilità di perdere beni e di essere feriti rispetto al non opporre resistenza; dove sono avvenute entrambe le cose, la ferita è seguita all'autoprotezione solo nel 10% dei casi [8]. Per lo stupro in particolare, la maggior parte delle azioni di autoprotezione ha ridotto il rischio che venisse consumato senza aumentare in modo significativo il rischio di ulteriori ferite [9]. Sono dati osservazionali statunitensi, non esperimenti.",
        "La prova più solida è uno studio randomizzato su un programma di resistenza per 893 studentesse universitarie: valutare il rischio, riconoscere il pericolo e agire con resistenza verbale e fisica. Il rischio di stupro consumato in un anno è stato del 5,2% contro il 9,8% nel gruppo di controllo, una riduzione relativa del 46% [10]. Nell'uso corrente successivo in cinque università, gli stupri consumati sono calati del 57% a sei mesi, anche se senza randomizzazione [11].",
      ],
    },
    {
      kind: "prose",
      heading: "De-escalation",
      anchor: "de-escalation",
      paragraphs: [
        "In un'introduzione randomizzata della formazione alla de-escalation nel dipartimento di polizia di Louisville, gli episodi di uso della forza sono calati del 28%, le ferite ai cittadini del 26% e quelle agli agenti del 36% [12]. Una revisione di 64 valutazioni in diverse professioni ha trovato miglioramenti da lievi a moderati, avvertendo però che quasi tutti gli studi erano di qualità dubbia [13]; nell'assistenza psichiatrica, la formazione migliora in modo affidabile conoscenze e sicurezza di sé, ma non permette ancora conclusioni solide sulle aggressioni [14].",
        "Il riassunto onesto: la de-escalation è il giusto punto di partenza e le prove vanno nella direzione giusta, ma sono più giovani della sua popolarità.",
      ],
    },
    {
      kind: "prose",
      heading: "Account e dispositivi",
      anchor: "accounts",
      paragraphs: [
        "La ricerca di Google con la New York University e la UC San Diego ha constatato che un codice via SMS a un telefono di recupero bloccava il 100% dei bot automatici, il 96% del phishing di massa e il 76% degli attacchi mirati; una richiesta di conferma sul dispositivo bloccava il 99% del phishing di massa e il 90% degli attacchi mirati; e nessun utente che si affidava solo alle chiavi di sicurezza è caduto vittima di phishing mirato durante lo studio [15]. Microsoft afferma che un account ha «oltre il 99,9% di probabilità in meno di essere compromesso» con l'autenticazione a più fattori [16]: una cifra del produttore senza un metodo pubblicato.",
        "L'agenzia statunitense per la cibersicurezza CISA lo dice chiaramente: qualsiasi autenticazione a più fattori è meglio di nessuna, e l'autenticazione resistente al phishing (FIDO/WebAuthn: chiavi di sicurezza e passkey) è «lo standard di riferimento» [17].",
      ],
    },
    {
      kind: "table",
      heading: "La Svizzera in cifre",
      blurb: "Le cifre ufficiali più recenti che abbiamo potuto leggere per intero. Le segnalazioni all'Ufficio federale della cibersicurezza sono volontarie, quindi i numeri reali sono più alti.",
      anchor: "switzerland",
      columns: ["Indicatore", "Cifra", "Fonte"],
      rows: [
        ["Reati commessi in forma digitale, 2025", "57'761 (−2%); 54'247 di questi cibercriminalità economica", "Ufficio federale di statistica [18]"],
        ["Vittime di cibercriminalità economica truffate online", "81,2% di 36'572", "Ufficio federale di statistica [18]"],
        ["Segnalazioni all'Ufficio federale della cibersicurezza, 2025", "Poco meno di 65'000 (21'000 cinque anni prima)", "UFCS tramite Netzwoche [19]"],
        ["Fenomeno più segnalato, 2025", "False chiamate a nome delle autorità, 26% delle segnalazioni", "UFCS tramite Netzwoche [19]"],
        ["Reati violenti, 2025", "49'915 (+2%)", "Ufficio federale di statistica [18]"],
        ["Omicidi consumati, 2025", "55, di cui il 61,8% nella coppia o in famiglia", "Ufficio federale di statistica [18]"],
        ["Persone ferite in infortuni ogni anno", "Più di un milione; circa 2'400 muoiono", "UPI [20][21]"],
        ["Morti in valanga", "21 all'anno in media su 20 anni", "SLF tramite SRF [22]"],
      ],
      monoColumns: [1],
    },
    {
      kind: "prose",
      heading: "I primi minuti",
      anchor: "first-minutes",
      paragraphs: [
        "L'annegamento è la quarta causa di morte nel mondo per i bambini da 1 a 4 anni e la terza per quelli da 5 a 14 anni [23]. In 30'381 arresti cardiaci avvenuti davanti a testimoni in Svezia, la sopravvivenza a 30 giorni è stata del 10,5% quando un passante ha iniziato la rianimazione prima dell'arrivo dell'ambulanza e del 4,0% quando nessuno l'ha fatto [24].",
        "Per le emorragie gravi, i lacci emostatici applicati prima dello shock erano fortemente associati alla sopravvivenza nei feriti militari (90% contro 10%) [25], e su 1'026 pazienti civili traumatizzati l'uso del laccio emostatico era associato in modo indipendente alla sopravvivenza [26].",
      ],
    },
    {
      kind: "table",
      heading: "Confrontare i rischi: i micromort",
      blurb: "Un micromort è una probabilità su un milione di morire. Mettere attività diverse sulla stessa scala rende una scelta informata, non proibita. Le cifre segnate con ≈ sono nostri calcoli a partire dai numeri della fonte.",
      anchor: "micromorts",
      columns: ["Attività", "Rischio di morte", "Fonte"],
      rows: [
        ["Anestesia generale (l'anestesia, non l'operazione)", "10 micromort", "Spiegelhalter [27]"],
        ["Paracadutismo, per lancio (USA, 2025)", "0,46 ogni 100'000 lanci ≈ 4,6 micromort", "USPA [28]"],
        ["BASE jumping, per lancio (Kjerag, Norvegia)", "1 ogni 2'317 lanci ≈ 430 micromort", "Søreide et al. [29]"],
        ["Maratona o mezza maratona, morte cardiaca per chi arriva al traguardo", "0,20 ogni 100'000 ≈ 2 micromort", "Kim et al. [30]"],
      ],
      monoColumns: [1],
    },
    {
      kind: "cards",
      heading: "Cosa significa per te",
      anchor: "means",
      columns: 2,
      cards: [
        {
          title: "Preferisci luce e attenzione alle telecamere",
          body: "Illuminazione e sorveglianza umana proteggono le persone; le telecamere proteggono soprattutto le auto parcheggiate, con un costo per la privacy [4][5][6].",
        },
        {
          title: "Opporre resistenza di solito è giusto",
          body: "L'autoprotezione riduce il compimento del reato e le ferite nella maggior parte dei reati studiati, e una resistenza appresa dimezza circa il rischio nell'unico studio randomizzato [8][10].",
        },
        {
          title: "Un accesso resistente al phishing",
          body: "Passkey o chiavi di sicurezza, prima di tutto sulla tua e-mail; qualsiasi secondo fattore è meglio di nessuno [15][17].",
        },
        {
          title: "In Svizzera la truffa è il reato di massa",
          body: "Le truffe online e le false chiamate a nome delle «autorità» dominano le segnalazioni [18][19].",
        },
        {
          title: "Impara la rianimazione e a fermare un'emorragia",
          body: "I passanti più che raddoppiano la sopravvivenza dopo un arresto cardiaco [24].",
        },
        {
          title: "Misura prima di giudicare un rischio",
          body: "Il BASE jumping è circa cento volte più rischioso per lancio del paracadutismo; entrambi sono scelte, ora informate [28][29].",
        },
      ],
    },
  ],
  sources: SCIENCE_OF_SAFETY.sources,
};

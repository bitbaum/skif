import type { Guide } from "../../types";

export const COMBAT_SPORTS: Guide = {
  slug: "combat-sports",
  title: "Sport da combattimento, giudicati sulla strada",
  fields: ["PHYSICAL", "HEALTH"],
  summary: "Pugilato, Muay Thai, lotta, judo, BJJ, Krav Maga, Systema e altri, confrontati su ciò che conta fuori dalla palestra.",
  photo: "grappling",
  statement: "Contro cosa ti alleni conta più di come si chiama.",
  lead: [
    "Ogni arte marziale sostiene di funzionare. L'unica prova che predice se funzionerà è la resistenza reale: lo sparring regolare contro un partner che cerca davvero di fermarti. Le arti che fanno sparring costruiscono capacità che resistono all'adrenalina; quelle che fanno solo esercizi spesso no.",
    "La seconda prova è la distanza. Uno scontro può avvenire alla distanza dei calci, nel corpo a corpo o a terra, spesso in quest'ordine. Nessuna arte da sola copre tutte e tre, ed è per questo che il confronto qui sotto conta.",
  ],
  sections: [
    {
      kind: "table",
      heading: "Il confronto",
      blurb: "Il giudizio di Skif, in base a come si allena ogni arte e a cosa lascia fuori. La qualità di una scuola, e se fa sparring, conta più del nome dell'arte.",
      anchor: "comparison",
      columns: ["Arte", "Distanza", "Sparring vero", "Forte fuori dalla palestra", "Debole fuori dalla palestra", "Rischio di infortunio in allenamento"],
      rows: [
        ["Pugilato", "Pugni", "Sì", "Distanza, movimento della testa, velocità delle mani, forma fisica", "Niente calci né lotta; le mani nude si rompono sui crani", "Medio — colpi alla testa"],
        ["Muay Thai", "Pugni, calci, ginocchiate, gomitate, clinch", "Sì", "Controllo nel clinch, ginocchiate, resistenza", "Poco lavoro a terra", "Da medio ad alto"],
        ["Kickboxing", "Pugni e calci", "Sì", "I punti di forza del pugilato, più i calci", "Clinch e terra", "Medio"],
        ["Lotta", "Atterramenti, controllo", "Sì", "Restare in piedi, rialzarsi, controllo", "Niente colpi; un atterramento sul cemento può fare danni gravi", "Medio"],
        ["Judo", "Proiezioni, immobilizzazioni", "Sì", "Proiezioni, equilibrio e cadute: cadere in sicurezza è una capacità in sé", "Niente colpi; le proiezioni su un suolo duro sono pericolose", "Medio"],
        ["Brazilian Jiu-Jitsu", "Controllo a terra, sottomissioni", "Sì", "Controllo senza colpire; calma sotto pressione; la stazza conta meno", "Il suolo è un brutto posto con più aggressori o sul cemento", "Da basso a medio — articolazioni"],
        ["MMA", "Tutte le distanze", "Sì", "La prova reale più ampia su tutte le distanze", "Regole sportive: niente armi, un solo avversario", "Alto"],
        ["Krav Maga", "Misto, armi, più aggressori", "Dipende dalla scuola", "Allenamento a scenari, conoscenza delle armi, aggressività sotto stress", "La qualità varia molto; molte scuole fanno raramente sparring", "Da basso a medio"],
        ["Systema", "Movimento, respirazione, colpi", "Dipende dalla scuola", "Respirazione e rilassamento sotto stress", "Poche verifiche aperte; la qualità varia", "Basso"],
        ["Kali / Escrima", "Bastoni, lame, mani nude", "In parte", "Come si muovono le armi, e quanto sono veloci", "Senza sparring gli esercizi possono allontanarsi dalla realtà", "Da basso a medio"],
        ["Parkour", "Movimento", "Non è un'arte di combattimento", "Fuga: velocità, terreno, ostacoli", "Non serve a nulla quando ti hanno preso", "Medio — cadute"],
      ],
    },
    {
      kind: "prose",
      heading: "Una combinazione sensata",
      anchor: "combination",
      paragraphs: [
        "Per la maggior parte degli adulti: un'arte di percussione che fa sparring (pugilato, kickboxing o Muay Thai), un'arte di lotta che fa sparring (lotta, judo o BJJ) e l'abitudine di correre. Questo copre le tre distanze e l'uscita.",
        "Per una persona più piccola, le arti di lotta contano di più: la leva permette di controllare una persona più grande e non allenata senza scambiare colpi. Per i bambini, judo, lotta e BJJ insegnano a cadere, l'equilibrio e il controllo senza pugni alla testa.",
        "Ognuna di queste comporta un rischio in allenamento, e questo fa parte del calcolo, non è un motivo per evitarle. Lo sparring con colpi alla testa ha costi che si accumulano negli anni; le buone palestre li gestiscono, quelle scadenti no.",
      ],
    },
    {
      kind: "definitions",
      heading: "Come scegliere una scuola",
      anchor: "choosing",
      items: [
        { term: "Prima guarda una lezione", detail: "Ogni buona scuola te lo permette. Guarda se si fa sparring, e come vengono trattati i principianti." },
        { term: "Cerca la resistenza", detail: "Gli esercizi vanno bene; solo esercizi no. Chiedi quanto spesso gli allievi si allenano contro un partner che oppone resistenza." },
        { term: "Osserva la cultura degli infortuni", detail: "Allenarsi duro è normale; allievi infortunati e sparring dettato dall'ego no." },
        { term: "Diffida delle promesse", detail: "«Disarmo garantito», «tecniche letali» e metodi segreti sono marketing. I veri istruttori parlano di probabilità." },
        { term: "Informati sull'istruttore", detail: "Chi gli ha insegnato, come gareggia o mette alla prova i suoi allievi, e se manda le persone in altre palestre quando serve." },
      ],
    },
  ],
};

import type { Guide } from "../../types";

export const SELF_DEFENCE_LADDER_FR: Guide = {
  slug: "self-defence-ladder",
  title: "D'abord partir : l'échelle de l'autodéfense",
  fields: ["PHYSICAL", "RESILIENCE"],
  summary: "Éviter, fuir, désamorcer, se défendre, se remettre — dans cet ordre, et pourquoi l'ordre est tout l'enjeu.",
  photo: "parkour",
  statement: "Le meilleur combat est celui où vous n'avez jamais été.",
  lead: [
    "L'autodéfense est une échelle, pas une technique. Chaque échelon coûte plus et risque plus que celui du dessous, alors vous ne montez que jusqu'où il le faut : éviter, fuir, désamorcer, se défendre, se remettre.",
    "Connaître l'échelle est aussi ce qui permet de vivre librement. Quelqu'un qui sait comment il quitterait une mauvaise situation sort le soir, voyage et rentre en tram sans emporter la peur avec lui.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Les cinq échelons",
      anchor: "rungs",
      items: [
        {
          term: "1 · Éviter",
          detail:
            "La plupart des dangers se voient avant d'arriver : un groupe qui se tait à votre approche, quelqu'un qui cale son pas sur le vôtre, une dispute qui monte. Remarquez tôt, et changez quelque chose de petit — le trajet, l'heure, le wagon, le côté de la rue. Éviter ne coûte presque rien.",
        },
        {
          term: "2 · Fuir",
          detail:
            "La distance est la défense la plus fiable qui soit. Partir n'est pas perdre : une personne qui n'est pas là ne peut pas être blessée. Allez vers la lumière, les gens et les portes ouvertes, et continuez jusqu'à être en lieu sûr, pas seulement hors de vue.",
        },
        {
          term: "3 · Désamorcer",
          detail:
            "Quand vous ne pouvez pas partir, faites baisser la température. Mains ouvertes levées entre vous et l'autre, une voix calme et basse, des phrases courtes, une porte de sortie offerte à vous deux. Cédez vos affaires sans discuter : un téléphone ou un portemonnaie se remplace, vous pas.",
        },
        {
          term: "4 · Se défendre",
          detail:
            "Seulement quand il n'y a ni issue ni dialogue possible. Le but n'est pas de gagner mais de créer l'instant dont vous avez besoin pour fuir : bref, décidé, puis parti. La loi attend que la défense corresponde à l'attaque (voir ci-dessous).",
        },
        {
          term: "5 · Se remettre",
          detail:
            "Mettez-vous en lieu sûr, appelez le 117 ou le 144, et notez ce qui s'est passé pendant que c'est frais : heure, lieu, visages, paroles. Faites-vous soigner même si vous vous sentez bien ; le choc masque les blessures. Ensuite, parlez-en à quelqu'un.",
        },
      ],
    },
    {
      kind: "cards",
      heading: "Voir le monde comme un traceur",
      blurb:
        "Le parkour vous entraîne à voir une rue comme des itinéraires plutôt que des murs. Cette habitude est la compétence d'autodéfense la plus sous-estimée qui soit : dans un mauvais moment, vous connaissez déjà trois façons de partir.",
      anchor: "parkour",
      columns: 3,
      cards: [
        { title: "Les sorties d'abord", body: "En entrant dans un bar, un train ou sur une place, repérez deux sorties. Cela prend une seconde et devient automatique en quelques semaines." },
        { title: "Les obstacles sont des boucliers", body: "Une table, une voiture garée ou une borne entre vous et quelqu'un d'autre, c'est une distance qu'il doit contourner, et du temps pour vous." },
        { title: "Écarts et hauteurs", body: "Un muret, une clôture, un escalier : des endroits où vous pouvez aller vite et qui obligent un poursuivant à réfléchir." },
        { title: "La lumière et les gens", body: "Courez vers un magasin éclairé, une station de taxis ou une foule, pas dans un parc vide ou une impasse." },
        { title: "Votre moteur", body: "Pouvez-vous sprinter 200 mètres et continuer à courir ? Fuir est une compétence physique. La course fractionnée l'entraîne mieux que n'importe quelle technique." },
        { title: "Chaussures et mains", body: "Des chaussures avec lesquelles vous pouvez courir, et des mains qui ne sont pas encombrées de courses quand vous allez quelque part où vous ne vous sentez pas sûr." },
      ],
    },
    {
      kind: "prose",
      heading: "Ce que la loi vous demande en Suisse",
      anchor: "law",
      paragraphs: [
        "Article 15 du Code pénal suisse : quiconque est attaqué sans droit ou menacé sans droit d'une attaque imminente peut repousser l'attaque par des moyens proportionnés aux circonstances. Le même droit couvre la défense d'autrui.",
        "Article 16 : si la personne qui se défend a excédé ce qui était proportionné, le juge atténue la peine ; et si cet excès provient d'un état excusable d'excitation ou de saisissement causé par l'attaque, elle n'agit pas de manière coupable.",
        "Deux choses en découlent. Mettre fin au danger, c'est se défendre ; continuer une fois qu'il a pris fin ne l'est pas. Et ce qui est proportionné dépend de l'attaque : une gifle ne justifie pas une arme. Les règles d'autres pays diffèrent, parfois nettement. Ceci décrit la loi et ne constitue pas un conseil juridique.",
      ],
    },
    {
      kind: "table",
      heading: "L'entraînement qui construit chaque échelon",
      anchor: "training",
      columns: ["Échelon", "Ce qui le construit", "À l'Académie"],
      rows: [
        ["Éviter", "Attention à l'environnement, habitudes de trajet", "Attention à l'environnement"],
        ["Fuir", "Parkour, course fractionnée, condition physique générale", "Parkour et fuite"],
        ["Désamorcer", "Désescalade verbale, psychologie de la peur", "Désescalade"],
        ["Se défendre", "Un sport de combat avec sparring réel", "Arts de frappe et de lutte"],
        ["Se remettre", "Premiers secours, réaction aux urgences", "Premiers secours"],
      ],
    },
    {
      kind: "faq",
      heading: "Questions fréquentes",
      anchor: "questions",
      items: [
        { question: "Fuir, est-ce lâche ?", answer: "Non. C'est le résultat que vise tout instructeur sérieux d'autodéfense. Personne n'est blessé, personne ne finit au tribunal, et vous rentrez chez vous." },
        { question: "Dois-je donner mon téléphone si quelqu'un l'exige ?", answer: "Oui. Lancez-le un peu à l'écart de vous si vous le pouvez et partez dans l'autre direction. Un objet se remplace ou se récupère ; une bagarre pour lui peut changer votre vie." },
        { question: "Et si je protège quelqu'un d'autre ?", answer: "La même échelle vaut pour vous deux, et la loi couvre la défense d'autrui. Fuir ensemble reste le premier choix." },
        { question: "Un cours d'autodéfense me rendra-t-il en sécurité ?", answer: "Un cours vous donne des compétences ; ce sont les habitudes qui vous gardent en sécurité. L'attention et la fuite se pratiquent chaque jour, sans salle de sport." },
      ],
    },
  ],
};

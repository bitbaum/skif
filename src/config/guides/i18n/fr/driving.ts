import { DRIVING } from "../../driving";
import type { Guide } from "../../types";

export const DRIVING_FR: Guide = {
  slug: "driving",
  title: "Conduire, rouler et la route",
  fields: ["PHYSICAL", "HEALTH"],
  summary: "La route est l'endroit où la plupart des gens prennent leur plus grand risque quotidien. Ce que les chiffres suisses disent des causes des accidents graves, les limites d'alcool, et les habitudes qui changent les probabilités.",
  photo: "nightRoad",
  statement: "Le téléphone peut attendre. La route, non.",
  lead: [
    "En 2025, 214 personnes sont mortes sur les routes suisses et 3 935 ont été grièvement blessées [1]. Pour la plupart des gens, le trajet en voiture jusqu'au travail est un risque plus grand que tout ce qu'ils rencontreront dans une rue la nuit, et il reçoit une fraction de l'attention.",
    "Les causes n'ont rien de mystérieux. L'Office fédéral des routes les nomme chaque année, et presque toutes sont des choix faits dans les secondes qui précèdent un accident.",
  ],
  sections: [
    {
      kind: "table",
      heading: "Ce qui cause les accidents graves",
      blurb: "Telles que l'Office fédéral des routes (OFROU) les indique pour 2025, selon qui était impliqué [1].",
      anchor: "causes",
      columns: ["Qui", "Causes principales"],
      rows: [
        ["Voitures", "Refus de priorité, inattention, distraction"],
        ["Motos", "Surtout la vitesse et l'inattention"],
        ["Piétons", "Surtout leur propre comportement"],
      ],
    },
    {
      kind: "cards",
      heading: "La distraction, en chiffres",
      anchor: "distraction",
      columns: 3,
      cards: [
        { title: "3,6×", body: "Utiliser un téléphone en conduisant multiplie le risque d'accident par 3,6, selon le Bureau de prévention des accidents (BPA) [2]." },
        { title: "31 %", body: "Des accidents de la route graves en Suisse ont l'inattention ou la distraction pour cause principale ou secondaire : 1 201 personnes grièvement blessées ou tuées en 2025 [3]." },
        { title: "+⅓", body: "La distraction allonge votre temps de réaction d'environ un tiers [3]. À 50 km/h, cela représente des mètres de route parcourus avant que votre pied ne bouge." },
      ],
    },
    {
      kind: "table",
      heading: "Les limites d'alcool en Suisse",
      blurb: "Alcoolémie (‰) et l'équivalent dans l'haleine que mesure la police [4]. Un accident grave sur huit implique l'alcool [5].",
      anchor: "alcohol",
      columns: ["Qui", "Limite", "Ce que cela signifie"],
      rows: [
        ["La plupart des conducteurs", "0,5 ‰ (0,25 mg/l dans l'haleine)", "À partir de là, vous êtes légalement considéré comme inapte à conduire"],
        ["La plupart des conducteurs", "0,8 ‰ (0,4 mg/l dans l'haleine)", "Conduite en état d'ébriété qualifiée"],
        ["Élèves conducteurs et titulaires d'un permis à l'essai", "0,1 ‰ (0,05 mg/l dans l'haleine)", "Pratiquement zéro, à chaque trajet"],
        ["Chauffeurs de bus et de camion, moniteurs de conduite", "0,1 ‰ (0,05 mg/l dans l'haleine)", "Pratiquement zéro, pendant le travail"],
      ],
    },
    {
      kind: "definitions",
      heading: "Des habitudes qui changent les probabilités",
      anchor: "habits",
      items: [
        { term: "Le téléphone hors de portée", detail: "Dans la boîte à gants ou sur le siège arrière, ou en mode ne pas déranger pendant la conduite. Réglez l'itinéraire avant de partir." },
        { term: "Cédez le passage en cas de doute", detail: "Le refus de priorité est la première cause que l'Office fédéral des routes nomme pour les accidents de voiture [1]. Dans le doute, l'autre voiture passe d'abord." },
        { term: "Prévoyez la boisson, ou le conducteur", detail: "Si vous allez boire, décidez avant de partir comment vous rentrerez. Un taxi coûte moins cher que toutes les autres options." },
        { term: "Fatigué, c'est inapte", detail: "Sur un long trajet, arrêtez-vous avant d'en avoir besoin. Une courte pause toutes les deux heures environ coûte quelques minutes." },
        { term: "Sur deux roues", detail: "La vitesse et l'inattention sont les causes nommées pour les motos [1]. Un équipement de protection complet, et roulez comme si personne ne vous avait vu." },
        { term: "À pied", detail: "Tête haute et téléphone baissé aux passages piétons et en descendant d'un tram. Les accidents de piétons viennent surtout du comportement des piétons eux-mêmes [1]." },
      ],
    },
    {
      kind: "prose",
      heading: "Si vous êtes le premier sur les lieux d'un accident",
      anchor: "crash",
      paragraphs: [
        "Sécurisez les lieux avant toute chose : feux de détresse allumés, gilet de haute visibilité enfilé, et triangle de panne posé derrière l'accident. Puis appelez le 144 pour les blessés, ou le 117 pour la police, et dites où vous êtes aussi précisément que possible.",
        "Ne déplacez pas un blessé, sauf s'il est en danger immédiat là où il se trouve. Parlez-lui, gardez-le au chaud, et attendez avec lui. Des premiers secours que vous avez pratiqués valent bien plus que des premiers secours que vous avez lus ; les cours de premiers secours de l'Académie sont le bon point de départ.",
      ],
    },
  ],
  sources: DRIVING.sources,
  checked: "21 October 2026",
};

import type { Guide } from "../../types";

export const BEYOND_PEOPLE_FR: Guide = {
  slug: "nature-travel-sport",
  title: "Les risques qui ne sont pas des personnes : nature, animaux, voyages et sport",
  fields: ["ENVIRONMENTAL", "HEALTH", "RESILIENCE"],
  summary: "Avalanches, inondations, tiques, vaches, villes à l'étranger et les sports que vous aimez : mesurés, pas redoutés.",
  photo: "skiTouring",
  statement: "La plupart des risques n'ont pas de visage.",
  lead: [
    "La météo, le terrain, les animaux, une ville que vous ne connaissez pas et le sport que vous aimez comportent tous des risques, souvent plus que les gens autour de vous. Skif les traite de la même façon : comprendre le risque, réduire ce qui coûte peu à réduire, puis aller vivre.",
    "Mesurer un risque, ce n'est pas le juger. Un base jumper et un combattant de muay-thaï acceptent tous deux un risque réel pour quelque chose qui compte pour eux. Le travail consiste à en connaître la taille et à gérer ce qui peut l'être.",
  ],
  sections: [
    {
      kind: "table",
      heading: "Les dangers naturels en Suisse, et où les suivre",
      anchor: "nature",
      columns: ["Danger", "Où regarder", "Que faire"],
      rows: [
        ["Avalanches", "Bulletin d'avalanches du SLF ; l'application White Risk", "Lisez le bulletin avant chaque sortie hors-piste ; emportez DVA, sonde et pelle, et entraînez-vous à les utiliser."],
        ["Tempêtes, fortes pluies, chaleur", "Alertes et application de MétéoSuisse", "Activez les alertes pour l'endroit où vous vivez et celui où vous allez."],
        ["Inondations et glissements de terrain", "Alertes fédérales et cantonales aux dangers naturels", "Sachez si votre logement se trouve dans une zone de danger ; gardez les objets de valeur au-dessus de la cave."],
        ["Tremblements de terre", "Service Sismologique Suisse", "Fixez les meubles hauts aux murs ; sachez où se trouvent les robinets d'arrêt du gaz et de l'eau."],
        ["Toute alerte officielle", "Application Alertswiss", "Une seule application pour les alertes fédérales et cantonales, y compris les sirènes et ce qu'elles signifient."],
      ],
    },
    {
      kind: "definitions",
      heading: "Animaux",
      anchor: "animals",
      items: [
        { term: "Tiques", detail: "L'Office fédéral de la santé publique recommande la vaccination contre l'encéphalite à tiques pour la plupart des personnes dans la plus grande partie de la Suisse. Examinez-vous après une promenade dans l'herbe ou en forêt." },
        { term: "Vaches avec leurs veaux", detail: "Sur les pâturages d'alpage, les vaches mères protègent leurs veaux. Gardez vos distances, tenez les chiens en laisse, et contournez un troupeau plutôt que de le traverser." },
        { term: "Chiens", detail: "Ne fuyez pas devant un chien et ne le fixez pas ; tenez-vous de profil, immobile, les mains près du corps. Apprenez la même chose aux enfants." },
        { term: "À l'étranger", detail: "La rage, les serpents et les insectes varient selon les pays. Lisez les conseils de santé pour votre destination avant de partir, pas après." },
      ],
    },
    {
      kind: "prose",
      heading: "Villes et pays",
      anchor: "travel",
      paragraphs: [
        "Le risque varie selon le pays, la ville, le quartier et l'heure. Le Département fédéral des affaires étrangères publie des conseils aux voyageurs pour chaque pays, et son application Travel Admin vous permet d'enregistrer un voyage pour que l'ambassade puisse vous joindre en cas de crise.",
        "Dans une ville, la meilleure source est locale : demandez à un hôtel, à un hôte ou à un collègue quels quartiers ils évitent, et quand. Renseignez-vous sur les arnaques courantes visant les touristes à cet endroit avant d'arriver, et connaissez le numéro d'urgence local.",
      ],
    },
    {
      kind: "prose",
      heading: "Les sports que vous choisissez",
      anchor: "sport",
      paragraphs: [
        "Les chercheurs en risques utilisent le micromort, une chance sur un million de mourir, pour comparer les activités sur une même échelle. Un saut en parachute aux États-Unis représente environ 4,6 micromorts ; un saut BASE depuis le Kjerag en Norvège, environ 430 ; une anesthésie générale, environ 10. Les sources se trouvent dans la recherche de la Bibliothèque sur la science de la sécurité.",
        "La mort n'est pas le seul coût. Les sports de combat comportent le risque plus lent des chocs répétés à la tête ; les sports d'endurance, des risques liés à la chaleur et au cœur ; les sports de montagne, ceux du terrain et de la météo. Chacun se réduit de la même façon : l'entraînement, le bon équipement, la lecture des conditions, et des partenaires qui sauront dire non.",
        "Skif ne dit à personne quels risques valent la peine d'être pris. Il vous aide à voir leur taille, pour que le choix soit le vôtre, et éclairé.",
      ],
    },
  ],
};

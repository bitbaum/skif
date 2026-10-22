import type { Guide } from "../../types";
import { WHERE_YOU_LIVE } from "../../where-you-live";

export const WHERE_YOU_LIVE_FR: Guide = {
  slug: "where-you-live",
  title: "Là où vous vivez : lire les chiffres de la criminalité honnêtement",
  fields: ["ENVIRONMENTAL", "PHYSICAL"],
  summary: "Ce que disent les statistiques suisses de la criminalité sur les villes et les cantons, pourquoi le taux d'une ville paraît pire que le risque pour celles et ceux qui y vivent, et ce qui rend vraiment un logement et une rue plus sûrs.",
  photo: "eveningFlats",
  statement: "Un chiffre est une question, pas un verdict.",
  lead: [
    "On choisit où vivre, travailler et sortir en partie selon un sentiment de sécurité, et ce sentiment est généralement façonné par un gros titre. Les chiffres officiels sont publics, et ils disent quelque chose de plus calme et de plus utile.",
    "La Suisse a enregistré 61 infractions au Code pénal pour 1 000 habitants en 2025, contre environ 72 en 2009 [1].",
  ],
  sections: [
    {
      kind: "table",
      heading: "Infractions pour 1 000 habitants, 2025",
      blurb: "Infractions au Code pénal, d'après les statistiques policières fédérales et celles du canton de Zurich [1] [2].",
      anchor: "numbers",
      columns: ["Où", "Pour 1 000"],
      rows: [
        ["Suisse", "61"],
        ["Canton de Zurich", "64,6 (68,7 en 2024)"],
        ["Ville de Zurich", "101,8 (111,3 en 2024)"],
      ],
    },
    {
      kind: "prose",
      heading: "Pourquoi la ville paraît pire qu'elle ne l'est",
      anchor: "commuters",
      paragraphs: [
        "Un taux par habitant compte chaque infraction commise dans la ville et le divise par le nombre de personnes qui y dorment. Il laisse de côté les centaines de milliers de personnes qui y viennent chaque jour pour travailler, faire leurs achats et sortir, et la police cantonale dit clairement que dans les grandes villes, cet effet ne peut pas être ignoré [2]. Le taux de la ville de Zurich est élevé en partie parce qu'une si grande part de la vie du canton s'y déroule.",
        "Le même rapport ventile les chiffres par district et par arrondissement (Kreis) [2]. C'est ce niveau qui vaut la peine d'être lu si vous choisissez un appartement : un chiffre valable pour toute la ville ne décrit la rue de personne.",
        "Une tendance mérite de l'attention plutôt que d'être rassurante : à l'échelle nationale, les infractions de violence grave ont augmenté de 8,1 % en 2025, alors que les infractions dans leur ensemble ont diminué [1]. Les deux sont vrais en même temps.",
      ],
    },
    {
      kind: "definitions",
      heading: "Ce qui rend vraiment un logement plus sûr",
      anchor: "home",
      items: [
        { term: "La porte et la fenêtre que vous oubliez", detail: "La plupart des cambriolages passent par l'accès le plus facile. Une bonne serrure sur la porte principale compte moins si la porte du balcon ou une fenêtre du rez-de-chaussée reste ouverte." },
        { term: "Avoir l'air habité", detail: "Des lumières sur minuterie et le courrier relevé quand vous êtes absent. Un voisin au courant vaut plus qu'une caméra." },
        { term: "Connaître ses voisins", detail: "Des gens qui se reconnaissent remarquent qui n'a rien à faire là. C'est la plus ancienne protection qui soit, et elle est gratuite." },
        { term: "Lumière et lignes de vue", detail: "Une entrée visible depuis la rue et éclairée la nuit est une entrée moins souvent choisie." },
        { term: "Les caméras en dernier, pas en premier", detail: "Utiles comme preuves, moins sûres comme prévention, et elles coûtent en vie privée : la vôtre et celle de vos voisins. Le plan de sécurité de Skif pèse ce coût avant d'en recommander une." },
      ],
    },
    {
      kind: "prose",
      heading: "Choisir un lieu",
      anchor: "choosing",
      paragraphs: [
        "Parcourez-le aux heures où vous y vivrez : tard le soir, une nuit de week-end, tôt le matin. Parlez avec les gens qui y habitent déjà. Regardez les chiffres de l'arrondissement, pas ceux de la ville.",
        "Et pesez tout le reste de ce qui rend un lieu sûr ou non : la circulation dans la rue devant, le chemin jusqu'au tram, les sorties de secours de l'immeuble, la carte des dangers d'inondation. La criminalité est un risque parmi plusieurs, et rarement le plus grand.",
      ],
    },
  ],
  sources: WHERE_YOU_LIVE.sources,
  checked: "21 October 2026",
};

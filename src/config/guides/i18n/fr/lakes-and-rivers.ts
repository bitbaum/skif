import type { Guide } from "../../types";
import { WATER } from "../../water";

export const WATER_FR: Guide = {
  slug: "lakes-and-rivers",
  title: "Lacs et rivières",
  fields: ["ENVIRONMENTAL", "HEALTH"],
  summary: "Nager dans la Limmat, se laisser porter par l'Aar, un lac par une journée chaude : les douze règles qu'enseigne la Société Suisse de Sauvetage, et pourquoi l'eau froide est le risque que l'on sous-estime.",
  photo: "cityRiver",
  statement: "L'eau est libre. Respectez-la.",
  lead: [
    "Les lacs et rivières suisses sont l'un des meilleurs côtés de la vie ici, et Skif veut vous y voir. C'est aussi là que des gens meurent chaque été : 43 personnes se sont noyées en Suisse en 2025, contre une moyenne à long terme d'environ 50 par an [1].",
    "La Société Suisse de Sauvetage (SLRG SSS) résume ce qu'elle sait en deux séries de six règles, une pour la baignade et une pour les rivières [2] [3]. Elles sont courtes parce que ce sont celles qui comptent.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Les six règles de la baignade",
      blurb: "Les maximes de la baignade de la SSS (Baderegeln) [2].",
      anchor: "bathing",
      items: [
        { term: "Les enfants seulement avec un adulte", detail: "Les petits enfants à portée de bras. La noyade est rapide et silencieuse ; elle ne ressemble pas à ce qu'on voit dans les films." },
        { term: "Jamais ivre ou sous l'effet de drogues", detail: "Et jamais l'estomac plein ou complètement vide." },
        { term: "Ne jamais sauter dans l'eau en ayant trop chaud", detail: "Le corps a besoin de temps pour s'adapter. Mouillez-vous la peau et entrez lentement après des heures au soleil." },
        { term: "Ne sautez pas dans une eau trouble ou inconnue", detail: "Ce que vous ne voyez pas peut vous blesser : rochers, branches, fond peu profond." },
        { term: "Les matelas pneumatiques et les aides à la flottaison ne sont pas faits pour l'eau profonde", detail: "Ils n'y offrent aucune sécurité. Ils dérivent, se dégonflent et basculent." },
        { term: "Ne jamais nager seul sur de longues distances", detail: "Même le corps le mieux entraîné peut avoir un moment de faiblesse." },
      ],
    },
    {
      kind: "definitions",
      heading: "Les six règles des rivières",
      blurb: "Les maximes de la rivière de la SSS (Flussregeln) [3]. Elles comptent sur l'Aar, le Rhin, la Reuss et la Limmat.",
      anchor: "rivers",
      items: [
        { term: "Gilet de sauvetage dans un canot", detail: "Toute personne à bord d'un bateau pneumatique en porte un." },
        { term: "Respectez la charge indiquée", detail: "Ne mettez jamais plus sur un bateau que ce que son étiquette autorise." },
        { term: "Ne jamais attacher les bateaux ensemble", detail: "Des bateaux attachés ne se dirigent plus." },
        { term: "Reconnaissez d'abord les tronçons inconnus", detail: "Les barrages, les piles de pont et les arbres tombés sont les endroits où les gens restent coincés. Sachez où ils se trouvent et où vous sortirez avant d'entrer dans l'eau." },
        { term: "Les eaux libres sont pour les bons nageurs", detail: "Rivières, étangs et lacs : seulement pour les nageurs bons et entraînés." },
        { term: "Plus l'eau est froide, plus la baignade est courte", detail: "Le froid provoque des crampes. L'eau des rivières en début d'été est bien plus froide que l'air au-dessus." },
      ],
    },
    {
      kind: "cards",
      heading: "Avant d'entrer dans l'eau",
      anchor: "before",
      columns: 3,
      cards: [
        { title: "Connaissez votre sortie", body: "Sur une rivière, choisissez avant d'entrer dans l'eau l'escalier ou l'échelle par lequel vous sortirez, et le suivant au cas où vous le manqueriez." },
        { title: "Allez-y avec quelqu'un", body: "Quelqu'un sur la rive qui sait où vous êtes entré dans l'eau et quand vous devriez être de retour." },
        { title: "Sac étanche, bouée voyante", body: "Une bouée de natation vous rend visible pour les bateaux et vous donne de quoi vous tenir. Ce n'est pas un gilet de sauvetage." },
      ],
    },
    {
      kind: "prose",
      heading: "Si quelqu'un est en difficulté",
      anchor: "rescue",
      paragraphs: [
        "Appelez immédiatement le 144, ou faites appeler quelqu'un d'autre pendant que vous agissez. Tendez ou lancez quelque chose avant d'y aller : une branche, une corde, une bouée, n'importe quoi qui flotte. Les sauveteurs non formés se noient avec la personne qu'ils rejoignent à la nage.",
        "La SSS propose des cours de natation et de sauvetage dans toute la Suisse, et les cours de premiers secours de l'Académie couvrent la réanimation. Les deux durent quelques heures, et les deux font partie de ces choses dont on espère ne jamais avoir besoin et qu'on est content d'avoir.",
      ],
    },
  ],
  sources: WATER.sources,
  checked: "21 October 2026",
};

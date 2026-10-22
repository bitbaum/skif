import { SITUATIONAL_AWARENESS } from "../../situational-awareness";
import type { Guide } from "../../types";

export const SITUATIONAL_AWARENESS_FR: Guide = {
  slug: "situational-awareness",
  title: "Rester attentif sans paranoïa",
  fields: ["PHYSICAL", "ENVIRONMENTAL"],
  summary: "Remarquer tôt, calmement : à quoi ressemble la normale dans un lieu, ce qui la rompt, et les quelques habitudes qui vous font gagner du temps.",
  photo: "tramStop",
  statement: "Être attentif, c'est savoir à quoi ressemble la normale.",
  lead: [
    "Être attentif à son environnement, ce n'est pas scruter chaque visage à la recherche d'un danger. C'est épuisant, et la recherche sur la lecture des inconnus montre que cela ne marche presque pas. C'est quelque chose de plus calme : un sens de ce qui est normal dans un lieu, pour que ce qui ne colle pas ressorte tôt, quand il reste du temps pour faire quelque chose de petit.",
    "Bien pratiquée, cette attention vous rend plus libre, pas plus anxieux. Vous remarquez moins le bruit de fond et davantage ce qui compte.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "La normale et l'anomalie",
      anchor: "baseline",
      items: [
        { term: "La normale", detail: "Ce qui est habituel ici, maintenant : le niveau de bruit, la façon dont les gens bougent, où ils regardent, ce qu'ils portent. Une gare bondée à l'heure de pointe et une rue calme à 2 h du matin n'ont pas la même normale." },
        { term: "L'anomalie", detail: "Quelque chose qui ne correspond pas à la normale : quelqu'un qui ne fait pas ce que font tous les autres, l'absence de ce qui devrait être là (une rue animée soudain vide), un changement dans les sons ou les mouvements." },
        { term: "La réponse", detail: "Une anomalie isolée, ce n'est généralement rien. C'est un signal pour faire attention et savoir quel serait votre prochain petit geste, pas pour réagir." },
      ],
    },
    {
      kind: "cards",
      heading: "Des habitudes qui font gagner du temps",
      anchor: "habits",
      columns: 3,
      cards: [
        { title: "Les sorties en arrivant", body: "Deux façons de sortir de chaque pièce, wagon et bar. Cela prend une seconde ; cela devient automatique en quelques semaines." },
        { title: "Tête haute aux transitions", body: "Portes, cages d'escalier, parkings, passages piétons, le moment où vous arrivez devant votre porte. Rangez le téléphone à ces endroits : aux États-Unis, les urgences ont soigné en 2010 plus de 1 500 piétons, selon les estimations, pour des blessures liées au téléphone, plus du double du chiffre de 2005 [1]." },
        { title: "Une oreille libre", body: "Des écouteurs dans des endroits calmes la nuit vous privent du sens qui vous avertit le plus tôt." },
        { title: "S'asseoir avec une vue", body: "Face à la salle et près d'une sortie, sans en faire une démonstration." },
        { title: "Écouter le malaise", body: "Si quelque chose vous semble anormal, agissez-y à petite échelle : changez de trottoir, attendez le tram suivant, retournez à l'intérieur. Vous n'avez pas besoin d'une raison." },
        { title: "Répéter un geste", body: "Sur un trajet habituel, décidez une fois pour toutes où vous iriez s'il se passait quelque chose. Sous stress, on fait ce qu'on a décidé avant." },
      ],
    },
    {
      kind: "prose",
      heading: "Ce que cette attention n'est pas",
      anchor: "not",
      paragraphs: [
        "Ce n'est pas du profilage. L'apparence vous dit très peu ; le comportement dans son contexte vous en dit davantage. Traiter des gens comme des menaces à cause de leur apparence est à la fois injuste et inefficace.",
        "Ce n'est pas une vigilance constante. La plus grande partie de la vie est sûre. Gardez votre attention pour les transitions et pour les moments où quelque chose change ; le reste du temps, regardez le lac.",
      ],
    },
  ],
  sources: SITUATIONAL_AWARENESS.sources,
  checked: "21 October 2026",
};

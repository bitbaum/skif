import { ALCOHOL_AND_DRUGS } from "../../alcohol-and-drugs";
import type { Guide } from "../../types";

export const ALCOHOL_AND_DRUGS_FR: Guide = {
  slug: "alcohol-and-drugs",
  title: "Alcool et drogues : réduire les risques",
  fields: ["HEALTH", "PHYSICAL"],
  summary: "Que faire avant, pendant et après une soirée avec de l'alcool ou d'autres drogues : l'analyse de substances à Zurich, les quelques règles qui préviennent la plupart des urgences, et comment s'occuper de quelqu'un qui en a trop pris.",
  photo: "festival",
  statement: "Personne ne devrait mourir d'une soirée.",
  lead: [
    "Skif ne dit pas aux adultes ce qu'ils doivent mettre dans leur corps. Ce qui lui importe, c'est qu'ils se réveillent le lendemain. La politique suisse en matière de drogues est construite de la même façon : prévention, thérapie et répression, et à côté d'elles la réduction des risques, un pilier à part entière [1].",
    "La plupart des décès et des blessures lors d'une soirée viennent d'une courte liste : ne pas savoir ce que contient une pilule ou une poudre, mélanger des substances, reprendre trop tôt, être seul quand ça tourne mal, et des gens autour qui ne savent pas quoi faire. Chacun de ces points a une réponse simple.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Avant : savoir ce que vous avez",
      anchor: "before",
      items: [
        {
          term: "L'analyse de substances à Zurich",
          detail:
            "Le Drogeninformationszentrum de la ville, sous le nom Saferparty, analyse chimiquement les substances et discute du résultat avec vous. C'est gratuit et anonyme, sur rendez-vous, à la Wasserwerkstrasse 17 et à la Langstrasse 14, ainsi que lors de certaines fêtes et festivals [2]. Les horaires changent ; consultez la page avant d'y aller.",
        },
        { term: "Fixez votre limite à jeun", detail: "Combien, et quand vous arrêtez. Une décision prise à 22 h vaut mieux qu'une décision prise à 2 h." },
        { term: "Mangez, et prévoyez de l'eau", detail: "Un repas avant, et de l'eau entre les verres. Cela ralentit la soirée sans y mettre fin." },
        { term: "Prévoyez d'abord le retour", detail: "Ne conduisez jamais. En Suisse, la limite générale est de 0,5 ‰, et les nouveaux conducteurs et les conducteurs professionnels ne peuvent pas conduire du tout sous influence ; le guide sur la conduite donne les détails [6]." },
      ],
    },
    {
      kind: "cards",
      heading: "Pendant : quatre règles qui préviennent la plupart des urgences",
      anchor: "during",
      columns: 2,
      cards: [
        { title: "Ne mélangez pas", body: "Le premier conseil de Saferparty pour presque chaque substance : évitez de la mélanger avec d'autres substances psychoactives, ou sachez ce que fait la combinaison [3]. Cela inclut l'alcool." },
        { title: "Une petite quantité, et attendez", body: "Prenez une petite quantité et ne reprenez pas trop tôt ; reprendre une dose augmente le risque de surdose [3]. Les effets peuvent mettre plus de temps que prévu à venir." },
        { title: "Pas seul", body: "Ne consommez pas seul, et dites aux personnes autour de vous ce que vous avez pris [3], pour que, s'il se passe quelque chose, elles puissent le dire aux ambulanciers." },
        { title: "Appelez tôt", body: "Si quelqu'un va mal, restez avec lui et appelez le 144 [3]. Appeler trop tôt ne coûte rien ; appeler trop tard, c'est ainsi que des gens meurent." },
      ],
    },
    {
      kind: "table",
      heading: "Les signes d'une intoxication alcoolique",
      blurb: "Un seul de ces signes chez quelqu'un qui a bu est une raison d'appeler le 144 [4].",
      anchor: "signs",
      columns: ["Signe", "Ce que vous voyez"],
      rows: [
        ["Confusion", "Ne sait pas où il se trouve, ne peut pas suivre une question simple"],
        ["Parole et mouvements", "Articule mal, n'arrive pas à coordonner ses mouvements"],
        ["Vomissements", "Vomit, surtout en étant somnolent"],
        ["Peau", "Pâle ou bleutée"],
        ["Respiration", "Lente ou irrégulière"],
        ["Convulsions", "Une crise, quelle qu'elle soit"],
        ["Inconscience", "Impossible à réveiller"],
      ],
    },
    {
      kind: "definitions",
      heading: "Après : s'occuper de quelqu'un",
      anchor: "after",
      items: [
        { term: "Restez avec la personne", detail: "Ne laissez jamais seule, pour qu'elle « cuve », une personne très ivre ou sous l'effet de drogues [4]." },
        { term: "Position latérale de sécurité", detail: "Si elle a perdu connaissance, couchez-la sur le côté pour qu'elle ne puisse pas s'étouffer avec ses vomissements, et vérifiez sans cesse qu'elle respire [4]." },
        { term: "Gardez-la au chaud", detail: "Une veste ou une couverture. Le froid aggrave les choses [4]." },
        { term: "Ce qu'il ne faut pas faire", detail: "Pas d'alcool supplémentaire, pas de café, pas de douche froide, et n'essayez pas de la faire vomir [4]. Rien de tout cela ne dessoûle qui que ce soit ; certaines de ces choses aggravent la situation." },
        { term: "Qui appeler", detail: "Le 144 pour une ambulance. Le 145, c'est Tox Info Suisse, la ligne d'information sur les intoxications, qui répond jour et nuit [5] : appelez-la quand vous ne savez pas si quelque chose d'avalé est dangereux et que la personne n'est pas en danger immédiat." },
      ],
    },
    {
      kind: "faq",
      heading: "Questions fréquentes",
      anchor: "questions",
      items: [
        { question: "Appeler le 144 va-t-il attirer des ennuis à mon ami ?", answer: "Les ambulanciers sont là pour soigner. Quelle que soit la question juridique, une personne qui ne respire pas correctement a besoin d'une ambulance, et cela passe en premier." },
        { question: "Skif encourage-t-il la consommation de drogues ?", answer: "Non. Skif adopte la position qu'énonce la politique suisse en matière de drogues : réduire la consommation et réduire ses dommages pour les personnes qui consomment et pour tous les autres, les deux à la fois [1]." },
        { question: "Où puis-je parler de ma propre consommation ?", answer: "Saferparty propose un entretien personnel avec chaque analyse, et en parler fait partie du service, ce n'est pas un sermon [2]." },
      ],
    },
  ],
  sources: ALCOHOL_AND_DRUGS.sources,
  checked: "21 October 2026",
};

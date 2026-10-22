import { TRAVEL } from "../../travel";
import type { Guide } from "../../types";

export const TRAVEL_FR: Guide = {
  slug: "travel",
  title: "Voyager : d'autres pays, d'autres règles",
  fields: ["ENVIRONMENTAL", "HEALTH", "FINANCIAL"],
  summary: "Comment aller presque partout et bien en revenir : se préparer avant de partir, la nourriture et l'eau, l'argent et les documents, et que faire quand un voyage tourne mal.",
  photo: "platform",
  statement: "Allez plus loin. Préparez-vous une fois.",
  lead: [
    "Voyager est l'une des choses les plus libres qu'une personne puisse faire, et ses risques sont surtout banals : un estomac dérangé, un passeport perdu, une arnaque, une route. Les risques spectaculaires sont réels dans quelques endroits et bien documentés, si bien que vous pouvez les connaître avant de réserver.",
    "La préparation prend une soirée. Ensuite, le voyage est à vous.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Avant de partir",
      anchor: "before",
      items: [
        {
          term: "Enregistrez le voyage dans Travel Admin",
          detail: "L'application de voyage du Département fédéral des affaires étrangères (DFAE). Le DFAE recommande de la télécharger avant de partir, de s'y enregistrer et d'y saisir ses voyages à l'étranger [1], pour que, si une crise éclate là où vous êtes, il sache que vous y êtes.",
        },
        { term: "Lisez les conseils aux voyageurs", detail: "Le DFAE publie des conseils pour chaque pays. Lisez la version actuelle pour le vôtre, pas celle de l'an dernier." },
        { term: "Santé et vaccins", detail: "Un centre de médecine des voyages ou votre médecin, quelques semaines à l'avance pour toute destination où les maladies diffèrent." },
        { term: "Une assurance qui couvre le voyage", detail: "Vérifiez la couverture médicale à l'étranger et le rapatriement, et si les sports que vous prévoyez sont inclus." },
        { term: "Des copies des documents", detail: "Passeport et cartes photographiés et gardés hors ligne, et une copie papier rangée à part des originaux." },
        { term: "Quelqu'un à la maison", detail: "Laissez vos plans à une personne, et convenez du moment où vous donnerez des nouvelles." },
      ],
    },
    {
      kind: "cards",
      heading: "Nourriture et eau",
      blurb: "Là où l'eau du robinet peut être contaminée, les conseils des CDC [2].",
      anchor: "food",
      columns: 2,
      cards: [
        { title: "Ne buvez pas l'eau du robinet", body: "Là où l'eau du robinet pourrait être contaminée, buvez des boissons en bouteille scellée, et évitez les glaçons [2]." },
        { title: "Rendez l'eau sûre", body: "L'eau du robinet peut être rendue sûre en la faisant bouillir, en la filtrant ou en la traitant chimiquement [2]." },
        { title: "Pelez-le ou lavez-le", body: "Les fruits et légumes sont plus sûrs quand vous les pelez vous-même ou les lavez avec de l'eau en bouteille ou désinfectée [2]." },
        { title: "Chaud et fraîchement cuit", body: "Un plat servi chaud et cuisiné devant vous est généralement un choix plus sûr qu'un buffet qui attend depuis longtemps." },
      ],
    },
    {
      kind: "definitions",
      heading: "Argent et documents en route",
      anchor: "money",
      items: [
        { term: "Répartissez", detail: "Deux cartes à deux endroits, et un peu d'argent liquide à un troisième. Un portemonnaie perdu doit être un désagrément, pas la fin du voyage." },
        { term: "Le sac du jour porte la journée", detail: "Le passeport dans le coffre de l'hôtel, sauf si vous en avez besoin ; une copie sur vous." },
        { term: "Les arnaques suivent des scénarios", detail: "Des taxis sans compteur, des attractions « fermées » avec un ami tout près, une tache sur votre veste. Le guide sur les arnaques explique les leviers qu'elles ont toutes en commun." },
        { term: "Des distributeurs à l'intérieur des banques", detail: "De jour, et en cachant le clavier." },
      ],
    },
    {
      kind: "prose",
      heading: "Quand ça tourne mal",
      anchor: "wrong",
      paragraphs: [
        "Enregistrez le numéro d'urgence local avant d'atterrir ; ce n'est pas toujours le 112. Pour tout ce qu'un citoyen suisse ne peut pas résoudre seul à l'étranger — un passeport perdu, une arrestation, un hôpital — l'ambassade ou le consulat suisse le plus proche et la ligne d'assistance du DFAE sont ceux qu'il faut appeler.",
        "Dans une crise là où vous êtes, la règle est la même qu'à la maison : éloignez-vous d'abord, puis dites à quelqu'un où vous êtes. Travel Admin est le moyen par lequel le DFAE vous trouve [1].",
      ],
    },
  ],
  sources: TRAVEL.sources,
  checked: "21 October 2026",
};

import type { Guide } from "../../types";

export const PROFESSIONALS_FR: Guide = {
  slug: "what-professionals-teach",
  title: "Ce que les professionnels enseignent au public",
  fields: ["RESILIENCE", "HEALTH", "PHYSICAL"],
  summary: "Fuir, se cacher, alerter ; arrêter une hémorragie ; repérer les signaux d'alarme. Des programmes publics de la police et de la médecine, pas des mythes d'agences.",
  photo: "cprTraining",
  statement: "Les meilleures méthodes sont publiées, éprouvées et ennuyeuses.",
  lead: [
    "Les polices, les organismes médicaux et les chercheurs en évaluation de la menace publient des recommandations pour le public, éprouvées sur des incidents réels. C'est moins excitant que les histoires de forces spéciales et de services de renseignement, et bien plus utile.",
    "Skif s'appuie sur des méthodes publiées et vérifiables, et les nomme. Il n'emprunte pas la mystique d'agences dont les méthodes ne sont pas publiques et ne peuvent pas être vérifiées.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Des programmes à connaître",
      anchor: "programmes",
      items: [
        {
          term: "Run, Hide, Tell (police antiterroriste britannique)",
          detail: "En cas d'attaque : fuyez s'il existe un itinéraire sûr ; sinon, cachez-vous hors de vue, mettez votre téléphone en silencieux et barricadez-vous ; alertez la police quand c'est sans danger. Assez simple pour s'en souvenir sous stress, et c'est tout l'intérêt.",
        },
        {
          term: "Run, Hide, Fight (Département de la sécurité intérieure des États-Unis)",
          detail: "Le même ordre face à un agresseur actif, avec le combat comme dernier recours quand se cacher échoue. Encore l'échelle : d'abord fuir.",
        },
        {
          term: "Stop the Bleed (American College of Surgeons)",
          detail: "Une hémorragie grave peut tuer avant l'arrivée d'une ambulance. Le cours enseigne la compression directe, le méchage de la plaie et le garrot en deux heures environ. C'est l'une des formations les plus précieuses que l'on puisse suivre.",
        },
        {
          term: "Évaluation comportementale de la menace (US Secret Service, National Threat Assessment Center)",
          detail: "Ses recherches sur les attaques ciblées ont montré que les auteurs avaient généralement eu, auparavant, des comportements qui inquiétaient leur entourage. Signaler tôt ses inquiétudes, à quelqu'un qui peut agir, évite des drames.",
        },
      ],
    },
    {
      kind: "cards",
      heading: "Des habitudes à emprunter",
      blurb: "Ce que fait chaque profession sérieuse de la sécurité, ramené à une personne et à un foyer.",
      anchor: "habits",
      columns: 2,
      cards: [
        { title: "Décider avant que ça arrive", body: "Sous stress, on fait ce qu'on a décidé avant. Convenez-en maintenant : où la famille se retrouve, qui appelle qui, ce que vous faites si la voiture tombe en panne la nuit." },
        { title: "Répéter la première minute", body: "Parcourez une fois vos sorties, trouvez l'extincteur, dites les numéros d'urgence à voix haute. Un plan que vous avez répété est un plan que vous pouvez suivre." },
        { title: "Rester simple", body: "« Run, hide, tell » tient en trois mots parce que les plans compliqués échouent sous l'adrénaline. Si votre plan a besoin d'une page, raccourcissez-le." },
        { title: "Faire le bilan après", body: "Après une frayeur ou un incident évité de justesse, demandez-vous ce qui s'est passé, ce qui a marché, et ce que vous changeriez. Sans chercher de coupable, puis changez-le." },
      ],
    },
    {
      kind: "prose",
      heading: "Pourquoi pas les forces spéciales et les services secrets ?",
      anchor: "agencies",
      paragraphs: [
        "Des unités comme le GIGN français ou le SAS britannique, et des services comme la CIA, le MI6 ou le Mossad, résolvent des problèmes qu'une personne privée n'a pas, avec une formation, des pouvoirs légaux et un soutien que personne d'autre n'a. Leurs vraies méthodes ne sont pour la plupart pas publiques, et ce qui se vend en leur nom ne peut généralement pas être vérifié.",
        "Ce qui se transpose, c'est l'habitude qui se trouve en dessous : planifier, répéter, rester simple, et faire le bilan après. C'est gratuit, et c'est sur cela que ce site est construit.",
      ],
    },
  ],
};

import type { Guide } from "../../types";

export const MONEY_FR: Guide = {
  slug: "scams-coercion-keys",
  title: "Arnaques, contrainte et clés",
  fields: ["FINANCIAL", "CYBER"],
  summary: "Comment fonctionnent les arnaques, les quelques règles qui les déjouent presque toutes, et comment détenir des bitcoins pour qu'aucun moment de pression ne puisse les déplacer.",
  statement: "Toute arnaque a besoin que vous vous dépêchiez.",
  lead: [
    "La fraude repose sur la même poignée de leviers, quelle que soit l'histoire : l'urgence, l'autorité, le secret et l'isolement. Apprenez les leviers et les histoires cessent de fonctionner, aussi convaincante que soit la voix au téléphone.",
    "La contrainte utilise les mêmes leviers, avec une menace derrière. La défense contre les deux est la même : des dispositions prises à l'avance, pour qu'aucun moment, aucun appel et aucune personne ne puisse à lui seul déplacer ce que vous possédez.",
  ],
  sections: [
    {
      kind: "definitions",
      heading: "Les leviers",
      anchor: "levers",
      items: [
        { term: "L'urgence", detail: "« Il faut que ce soit fait aujourd'hui », « votre compte va être fermé », « l'offre se termine dans une heure ». La précipitation vous empêche de vérifier." },
        { term: "L'autorité", detail: "Quelqu'un qui se fait passer pour la banque, la police, une entreprise de livraison ou votre patron. Le numéro affiché et les adresses e-mail se falsifient facilement." },
        { term: "Le secret", detail: "« N'en parlez à personne, cela fait partie de l'enquête. » Les vraies institutions n'ont jamais besoin que vous cachiez quelque chose à votre famille." },
        { term: "L'isolement", detail: "Vous garder en ligne, vous faire passer sur une messagerie, vous demander d'installer un logiciel d'accès à distance." },
        { term: "Trop beau", detail: "Des rendements que personne d'autre n'obtient, une loterie à laquelle vous n'avez pas participé, une romance qui a besoin d'argent pour une visite." },
      ],
    },
    {
      kind: "definitions",
      heading: "Des règles qui les déjouent presque toutes",
      anchor: "rules",
      items: [
        { term: "La règle de la pause", detail: "Aucun paiement, virement ou code inattendu ne part le jour même. Une vraie demande survit à une attente de 24 heures ; une arnaque, rarement." },
        { term: "Rappelez vous-même", detail: "Raccrochez, cherchez le numéro vous-même, et appelez. N'utilisez jamais le numéro, le lien ou l'application que l'interlocuteur vous a donnés." },
        { term: "Les codes ne sortent jamais", detail: "Les banques et la police ne demandent pas de codes de connexion, de code PIN de carte, ni de mettre votre argent « en sécurité »." },
        { term: "À deux pour les gros montants", detail: "Convenez avec une personne de confiance que tout ce qui dépasse un montant fixé est d'abord discuté ensemble. Cela vous protège tous les deux." },
        { term: "Personne ne prend la main sur votre écran", detail: "Aucun logiciel d'accès à distance pour quelqu'un qui vous a contacté en premier." },
      ],
    },
    {
      kind: "prose",
      heading: "Détenir des bitcoins pour que la pression ne puisse pas les déplacer",
      anchor: "keys",
      paragraphs: [
        "L'autoconservation signifie que vous détenez les clés, et que personne ne peut les geler. Cela signifie aussi que personne ne peut les récupérer, et qu'une personne qui vous y force peut les déplacer. Les deux risques se gèrent à l'avance.",
        "Gardez la phrase de récupération hors ligne, idéalement gravée dans du métal, jamais photographiée, tapée ni stockée dans le cloud. Pour des montants importants, une configuration multisignature (par exemple deux clés sur trois, gardées à des endroits différents) élimine tout point unique qui pourrait être volé ou contraint.",
        "La protection la moins chère est le silence. Des avoirs dont personne ne connaît l'existence sont des avoirs que personne n'essaie de prendre. Gardez un petit portefeuille du quotidien séparé de l'épargne, et ne liez pas publiquement d'adresses ou de montants à votre nom.",
      ],
    },
    {
      kind: "prose",
      heading: "Si l'on fait pression sur vous",
      anchor: "pressured",
      paragraphs: [
        "Si quelqu'un vous menace, votre sécurité passe avant n'importe quel montant. Obtempérez s'il le faut, mettez-vous en lieu sûr, et appelez la police au 117. Gardez tout : messages, numéros, identifiants de transaction.",
        "Si vous avez déjà envoyé de l'argent à une arnaque, appelez immédiatement votre banque au numéro figurant sur votre carte. Plus tôt elle le sait, plus il y a de chances de bloquer ou de rappeler un paiement.",
      ],
    },
  ],
};

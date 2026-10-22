import type { SitePage } from "@bitbaum/sitekit";

export const PROTECTORS_FR: SitePage = {
  path: "protectors",
  title: "Protectors",
  intro: "Quelqu'un de calme à vos côtés.",
  sections: [
    {
      kind: "hero",
      eyebrow: "Protectors",
      statement: "Quelqu'un de calme à vos côtés.",
      lead: [
        "Un Protector Skif est un professionnel vérifié que vous voudriez à côté de vous : attentif, posé, formé à la désescalade et aux premiers secours. Choisi pour son jugement plutôt que pour sa carrure, attribué selon ce que vous avez demandé, et le choix est expliqué.",
      ],
      actions: [
        { label: "Réserver un Protector", href: "/signin?mode=create&from=%2Fbookings%2Fnew" },
        { label: "Devenir Protector", href: "/join" },
      ],
    },
    {
      kind: "cards",
      heading: "Pourquoi on réserve un Protector",
      anchor: "services",
      columns: 2,
      cards: [
        { title: "Sortie du soir", body: "Une personne calme et qualifiée avec vous pour une soirée en ville." },
        { title: "Rentrer chez soi", body: "Raccompagné chez vous après une attention importune ou une soirée tardive." },
        { title: "Personne très exposée", body: "Une protection discrète pour quelqu'un qui a un profil public ou financier." },
        { title: "Famille", body: "Une présence posée pour une sortie en famille ou une occasion difficile." },
        { title: "Personnel de désescalade pour établissements", body: "Pour les boîtes de nuit et les établissements : un personnel qui désamorce plutôt qu'il ne confronte." },
        { title: "Protection rapprochée", body: "Un professionnel formé à la protection rapprochée avec vous pour la journée ou une occasion." },
        { title: "Protector + chauffeur", body: "Un Protector qui vous conduit aussi, de porte à porte." },
        { title: "Soutien spécialisé", body: "Quelqu'un avec une qualification précise : médicale, sécurité numérique, soutien aux personnes vulnérables." },
      ],
    },
    {
      kind: "definitions",
      heading: "Comment se déroule une réservation",
      anchor: "booking",
      items: [
        { term: "1 · Vous demandez", detail: "Dites ce dont vous avez besoin, quand, pour combien de temps et à peu près où. Le lieu de rendez-vous exact n'est communiqué qu'au Protector qui accepte." },
        { term: "2 · Les opérations attribuent", detail: "Seulement des Protectors qui ont chaque compétence que la mission exige, vérifiée et valable le jour même, et qui sont disponibles. Chacun est classé avec une raison pour chaque point." },
        { term: "3 · Un Protector accepte", detail: "Il voit où vous rejoindre, jamais qui vous êtes au-delà de ce dont la mission a besoin." },
        { term: "4 · Le jour même", detail: "Il signale son arrivée, reste avec vous et rédige un rapport ensuite. En cas d'urgence, il appelle le 117 ou le 144 ; Skif n'est pas un service d'urgence." },
        { term: "5 · Vous évaluez", detail: "Le respect, la discrétion et votre sentiment de sécurité, chacun sur sa propre échelle, pas des étoiles. Une plainte est entendue en toute confidentialité et tranchée par une personne." },
      ],
    },
    {
      kind: "definitions",
      heading: "Ce qu'un Protector n'est pas",
      blurb: "Dit clairement, pour que personne ne réserve la mauvaise chose.",
      anchor: "not",
      items: [
        { term: "Pas la police", detail: "Un Protector n'a aucun pouvoir de police. Quand une situation demande la police, il appelle le 117 et reste avec vous jusqu'à son arrivée." },
        { term: "Pas un service d'urgence", detail: "Skif ne peut envoyer ni police, ni ambulance, ni pompiers. En cas d'urgence, appelez-les d'abord." },
        { term: "Pas là pour se battre", detail: "Le travail consiste à garder les choses calmes et à vous garder en sécurité : la distance, la désescalade, le départ. La force est le dernier recours, dans le cadre de la loi, et jamais le plan." },
        { term: "Pas de la surveillance", detail: "Le service, c'est quelqu'un avec vous, pas quelqu'un qui observe les autres. Le rapport d'un Protector après une mission est un texte écrit ; Skif ne collecte ni photos ni vidéos." },
        { term: "Pas une garantie", detail: "Personne ne peut promettre que rien n'arrivera. Un Protector rend les choses probables moins probables, et les mauvais moments plus courts." },
      ],
    },
    {
      kind: "prose",
      heading: "Armes",
      anchor: "weapons",
      paragraphs: [
        "La plupart des missions Skif ne font intervenir aucune arme : les outils d'un Protector sont le jugement, la distance, la désescalade et les premiers secours. Un Protector ne porte une arme que là où il détient le permis légal de la porter et où la mission l'exige.",
      ],
    },
    {
      kind: "faq",
      heading: "Les questions qu'on pose",
      anchor: "questions",
      items: [
        { question: "Combien ça coûte ?", answer: "Les opérations établissent un devis pour chaque réservation ; il n'y a pas encore de prix fixe. Le paiement est réglé directement avec vous par les opérations." },
        { question: "En combien de temps quelqu'un peut-il venir ?", answer: "Skif ne promet pas de disponibilité immédiate. Réservez le plus tôt possible ; une demande sans Protector attribué expire à son heure de début plutôt que de vous laisser attendre." },
        { question: "Puis-je choisir la personne ?", answer: "Vous fixez ce qui compte, comme les langues, les premiers secours ou un chauffeur, et si la présence doit être discrète ou visible. Les opérations attribuent dans ce cadre." },
      ],
    },
  ],
};

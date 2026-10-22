import type { SitePage } from "@bitbaum/sitekit";

export const JOIN_FR: SitePage = {
  path: "join",
  title: "Nous rejoindre",
  intro: "Protectors, écoles et spécialistes.",
  sections: [
    {
      kind: "hero",
      eyebrow: "Nous rejoindre",
      statement: "Travailler avec Skif.",
      lead: [
        "Skif est une nouvelle entreprise de sécurité, fondée sur le jugement plutôt que sur l'intimidation. Elle a besoin de trois sortes de personnes : des Protectors pour être aux côtés de celles et ceux qui le demandent, des écoles pour enseigner ce qu'apprennent les Protectors, et des spécialistes pour les mesures qu'un plan de sécurité recommande.",
      ],
      actions: [
        { label: "Postuler comme Protector", href: "/signin?mode=create&from=%2Fprotector" },
        { label: "Devenir partenaire de Skif", href: "mailto:cato@orangecat.ch?subject=Skif%20%E2%80%94%20partnership" },
      ],
    },
    {
      kind: "definitions",
      heading: "Ce qui fait un bon Protector",
      blurb: "Quelqu'un que les gens veulent à leurs côtés. Les compétences physiques comptent, et ce sont elles qui comptent le moins.",
      anchor: "protector",
      items: [
        { term: "Jugement", detail: "Lire une situation tôt et choisir la chose la plus discrète qui fonctionne." },
        { term: "Calme sous pression", detail: "Rester stable quand quelqu'un d'autre ne l'est pas, et l'aider à le redevenir." },
        { term: "Désescalade", detail: "Mettre fin à un conflit par les mots, la distance et l'attitude plutôt que par la force." },
        { term: "Premiers secours", detail: "Être la personne utile dans les minutes avant l'arrivée des secours." },
        { term: "Attention aux autres", detail: "De la discrétion, du respect et du tact avec les personnes qui ont vécu quelque chose de difficile." },
        { term: "Langues", detail: "Anglais, allemand, suisse allemand, français, italien, romanche, espagnol, portugais, arabe, chinois, japonais, coréen, russe : chacune élargit le cercle des personnes que vous pouvez aider." },
      ],
    },
    {
      kind: "prose",
      heading: "Comment postuler",
      anchor: "apply",
      paragraphs: [
        "Connectez-vous avec OrangeCat et décrivez votre expérience ; Skif peut vous aider à remplir le formulaire à partir de quelques phrases. Les opérations examinent chaque candidature et vérifient chaque compétence au regard de sa preuve.",
        "Une fois accepté, vous voyez les missions qui vous correspondent, avec la raison pour laquelle elles vous ont été attribuées. Vous ne voyez le lieu de rendez-vous qu'après avoir accepté, et jamais qui est la personne au-delà de cela.",
      ],
    },
    {
      kind: "cards",
      heading: "Écoles et formateurs",
      blurb: "L'Académie donnera certains cours elle-même et enverra les gens vers des écoles partenaires pour les autres. Si vous enseignez les premiers secours, le parkour, un sport de combat, les armes dans un stand de tir autorisé, la conduite ou la sécurité numérique, nous aimerions vous parler.",
      anchor: "schools",
      columns: 3,
      cards: [
        { title: "Médical", body: "Premiers secours, réaction aux urgences et cours avancés." },
        { title: "Arts martiaux et autodéfense", body: "Jiu-jitsu, muay-thaï, krav-maga, immobilisation et contrôle." },
        { title: "Armes", body: "Stands de tir et instructeurs autorisés pour les armes à feu ; arts du bâton et de la lame ; défense contre les armes." },
        { title: "Conduite", body: "Conduite défensive et professionnelle." },
        { title: "Numérique", body: "Sécurité des comptes, vie privée et conservation sûre des clés." },
        { title: "Humain", body: "Accompagnement tenant compte des traumatismes, psychologie du conflit et de la crise." },
      ],
    },
    {
      kind: "cards",
      heading: "Spécialistes",
      blurb: "Les types d'aide qu'un plan de sécurité recommande déjà. À mesure que les gens prennent ces mesures, Skif les enverra vers des spécialistes en qui il a confiance.",
      anchor: "specialists",
      columns: 3,
      cards: [
        { title: "Un serrurier ou un installateur", body: "Cité dans 6 mesures qu'un plan de sécurité peut recommander." },
        { title: "Une centrale d'alarme", body: "Citée dans 1 mesure qu'un plan de sécurité peut recommander." },
        { title: "Un formateur ou une formatrice en désescalade", body: "Cité dans 1 mesure qu'un plan de sécurité peut recommander." },
        { title: "Un spécialiste en cybersécurité", body: "Cité dans 3 mesures qu'un plan de sécurité peut recommander." },
        { title: "Un spécialiste de la vie privée et de l'effacement des données", body: "Cité dans 2 mesures qu'un plan de sécurité peut recommander." },
        { title: "Un spécialiste de la réputation et de la gestion de crise", body: "Cité dans 1 mesure qu'un plan de sécurité peut recommander." },
        { title: "Un formateur ou une formatrice en premiers secours et en préparation", body: "Cité dans 3 mesures qu'un plan de sécurité peut recommander." },
        { title: "Un avocat indépendant : Skif oriente, il ne donne jamais de conseil juridique", body: "Cité dans 1 mesure qu'un plan de sécurité peut recommander." },
      ],
    },
  ],
};

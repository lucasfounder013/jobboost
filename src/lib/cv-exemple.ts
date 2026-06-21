import { CVStructure } from "@/types/cv";

export const CV_EXEMPLE: CVStructure = {
  nom: "Marie Dupont",
  titre: "Développeuse Web Full-Stack",
  contact: {
    email: "marie.dupont@email.com",
    telephone: "06 12 34 56 78",
    localisation: "Paris, France",
    linkedin: "linkedin.com/in/marie-dupont",
    site: "marie-dupont.dev",
  },
  resume:
    "Développeuse web full-stack avec 5 ans d'expérience sur des stacks JavaScript/TypeScript modernes. Spécialisée dans la création d'applications React/Next.js performantes, avec un fort intérêt pour l'expérience développeur et l'optimisation des performances.",
  experiences: [
    {
      poste: "Développeuse Full-Stack Senior",
      entreprise: "TechCorp",
      dates: "Jan 2023 – Aujourd'hui",
      lieu: "Paris",
      missions: [
        "Conception et développement d'une application SaaS de gestion de projet (Next.js, TypeScript, PostgreSQL) utilisée par 12 000 utilisateurs",
        "Mise en place d'une CI/CD GitHub Actions réduisant le temps de déploiement de 18 à 4 minutes",
        "Encadrement technique de 2 développeurs juniors et revue de code quotidienne",
      ],
    },
    {
      poste: "Développeuse Full-Stack",
      entreprise: "StartupXYZ",
      dates: "Sep 2020 – Déc 2022",
      lieu: "Lyon",
      missions: [
        "Développement d'une marketplace B2B de la conception au lancement (React, Node.js, Stripe)",
        "Refonte de l'architecture monolithique en microservices, division par 3 du temps de réponse API",
        "Mise en place de tests end-to-end avec Playwright (couverture 78%)",
      ],
    },
  ],
  formation: [
    {
      diplome: "Master Informatique – Spécialité Génie Logiciel",
      etablissement: "Université Lyon 1",
      dates: "2018 – 2020",
      details: "Mention Bien. Projet de fin d'études : plateforme collaborative open source (3 000 étoiles GitHub).",
    },
    {
      diplome: "Licence Informatique",
      etablissement: "Université Lyon 1",
      dates: "2015 – 2018",
    },
  ],
  competences: {
    techniques: [
      "TypeScript",
      "React / Next.js",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "AWS",
      "GraphQL",
      "Tailwind CSS",
    ],
    langues: ["Français (natif)", "Anglais (C1)", "Espagnol (B2)"],
    autres: ["Méthodes Agile", "Mentorat", "Open source"],
  },
  projets: [
    {
      nom: "DevTools Pro",
      description:
        "Extension VS Code de productivité (15 000 téléchargements). Snippets intelligents pour React et TypeScript.",
      technologies: "TypeScript, VS Code API",
    },
    {
      nom: "API Climate France",
      description:
        "API publique gratuite agrégeant les données météo et qualité de l'air pour 35 000 communes françaises.",
      technologies: "Node.js, PostgreSQL, Redis",
    },
  ],
  certifications: [
    {
      nom: "AWS Certified Developer – Associate",
      organisme: "Amazon Web Services",
      date: "2024",
    },
    {
      nom: "Professional Scrum Master I",
      organisme: "Scrum.org",
      date: "2023",
    },
  ],
};

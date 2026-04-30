export type CVStructure = {
  nom: string;
  titre: string;
  contact: {
    email?: string;
    telephone?: string;
    localisation?: string;
    linkedin?: string;
    site?: string;
  };
  resume?: string;
  experiences?: {
    poste: string;
    entreprise: string;
    dates: string;
    lieu?: string;
    missions: string[];
  }[];
  formation?: {
    diplome: string;
    etablissement: string;
    dates: string;
    details?: string;
  }[];
  competences?: {
    techniques?: string[];
    langues?: string[];
    autres?: string[];
  };
  projets?: {
    nom: string;
    description: string;
    technologies?: string;
  }[];
  certifications?: {
    nom: string;
    organisme?: string;
    date?: string;
  }[];
};

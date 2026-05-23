export interface OffreFT {
  id: string;
  titre: string;
  entreprise: string;
  localisation: string;
  datePublication: string;
  descriptionCourte: string;
  urlOffre: string;
  offreTexteComplet: string;
}

export interface OffreSauvegardee extends OffreFT {
  dbId: string;
  savedAt: string;
}

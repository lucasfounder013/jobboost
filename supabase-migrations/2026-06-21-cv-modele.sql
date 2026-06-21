-- Table de sauvegarde des CV créés via /modeles-cv (templates gratuits).
-- À exécuter sur Supabase (SQL Editor) OU via :
-- node -e "const {Pool}=require('pg'); const p=new Pool({connectionString:process.env.DATABASE_URL,ssl:{rejectUnauthorized:false}}); p.query(require('fs').readFileSync('supabase-migrations/2026-06-21-cv-modele.sql','utf8')).then(()=>{console.log('OK');process.exit(0)}).catch(e=>{console.error(e);process.exit(1)})"

CREATE TABLE IF NOT EXISTS cv_modele (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  nom text NOT NULL DEFAULT '',
  template_slug text NOT NULL,
  cv_data jsonb NOT NULL,
  ordre_sections jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS cv_modele_user_id_idx ON cv_modele(user_id);
CREATE INDEX IF NOT EXISTS cv_modele_user_created_idx ON cv_modele(user_id, created_at DESC);

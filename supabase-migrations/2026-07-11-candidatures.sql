-- Table de suivi des candidatures (Kanban Dashboard).
-- À exécuter sur Supabase (SQL Editor) OU via :
-- node -e "const {Pool}=require('pg'); const p=new Pool({connectionString:process.env.DATABASE_URL,ssl:{rejectUnauthorized:false}}); p.query(require('fs').readFileSync('supabase-migrations/2026-07-11-candidatures.sql','utf8')).then(()=>{console.log('OK');process.exit(0)}).catch(e=>{console.error(e);process.exit(1)})"

CREATE TABLE IF NOT EXISTS candidatures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  poste text NOT NULL,
  entreprise text NOT NULL,
  statut text NOT NULL DEFAULT 'souhaitee',
  lien_offre text,
  date_candidature date,
  date_rappel date,
  notes text,
  analyse_id uuid REFERENCES analyses(id) ON DELETE SET NULL,
  cv_adapte_id uuid REFERENCES cv_adapte(id) ON DELETE SET NULL,
  ordre integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS candidatures_user_id_idx ON candidatures(user_id);
CREATE INDEX IF NOT EXISTS candidatures_user_statut_idx ON candidatures(user_id, statut, ordre);
CREATE INDEX IF NOT EXISTS candidatures_analyse_id_idx ON candidatures(analyse_id);

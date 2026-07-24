-- Refonte pricing : ajout du support "lifetime" (paiement unique).
-- À exécuter sur Supabase (SQL Editor) OU via :
-- node -e "const {Pool}=require('pg'); const p=new Pool({connectionString:process.env.DATABASE_URL,ssl:{rejectUnauthorized:false}}); p.query(require('fs').readFileSync('supabase-migrations/2026-07-24-pricing-lifetime.sql','utf8')).then(()=>{console.log('OK');process.exit(0)}).catch(e=>{console.error(e);process.exit(1)})"

-- 1. Flag lifetime sur les users
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS is_lifetime boolean NOT NULL DEFAULT false;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS lifetime_purchased_at timestamptz;

-- 2. Table de monitoring anti-abus (léger — juste observabilité, pas de blocage)
CREATE TABLE IF NOT EXISTS lifetime_usage_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  operation_type text NOT NULL, -- 'analyse' | 'adaptation' | 'lettre' | 'rh'
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS lifetime_usage_log_user_idx ON lifetime_usage_log(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS lifetime_usage_log_op_idx ON lifetime_usage_log(operation_type, created_at DESC);

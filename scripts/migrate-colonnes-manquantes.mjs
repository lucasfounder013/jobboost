import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const migrations = [
  `ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "plan_type" TEXT`,
  `ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "lm_credits" INTEGER NOT NULL DEFAULT 1`,
  `ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "rh_credits" INTEGER NOT NULL DEFAULT 1`,
];

const client = await pool.connect();
try {
  await client.query("BEGIN");
  for (const sql of migrations) {
    await client.query(sql);
    console.log("OK :", sql.slice(0, 80));
  }
  await client.query("COMMIT");
  console.log("Migration terminée avec succès.");
} catch (err) {
  await client.query("ROLLBACK");
  console.error("Erreur — rollback effectué :", err.message);
  process.exit(1);
} finally {
  client.release();
  await pool.end();
}

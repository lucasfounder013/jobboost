## Project Overview
JobBoost (https://www.jobboost.fr) est une alternative française à Jobscan.co.
L'utilisateur colle son CV + une offre d'emploi. L'outil analyse la correspondance gratuitement (score + mots-clés manquants), puis propose d'adapter le CV via un compte (3 essais gratuits, ensuite payant).

## Tech Stack
- Framework: Next.js (App Router)
- Language: TypeScript
- Style: Tailwind CSS
- Auth: Better-Auth + Supabase
- IA: Anthropic Claude API
- Paiement: Stripe (Phase 2)
- Export: PDF + Word .docx (Phase 2)

## Project Structure
```
src/
├── app/
│   ├── api/
│   │   ├── analyser/route.ts        # Analyse CV vs offre (Claude Haiku)
│   │   ├── extraire-cv/route.ts     # Extraction texte PDF/DOCX
│   │   ├── adapter-cv/route.ts      # Adaptation CV avec décompte crédits
│   │   └── auth/[...all]/route.ts   # Better-Auth handler
│   ├── login/page.tsx
│   ├── register/page.tsx
│   └── page.tsx                     # Page principale
├── middleware.ts                     # Redirige login/register si déjà connecté
└── lib/
    ├── auth.ts          # Config serveur better-auth (NE PAS importer côté client)
    └── auth-client.ts   # Config client (hooks React uniquement)
```

## Deployment & Repository
- Production : https://www.jobboost.fr (Vercel)
- GitHub : https://github.com/lucasfounder013/jobboost
- Git config : user.name = Lucas Ledonne, user.email = lucasledonne@live.fr
- **Toujours commiter depuis le terminal de Lucas** — les commits faits par Claude Code utilisent noreply@anthropic.com ce qui peut bloquer Vercel

## Commands
npm run dev    # Lancer le serveur en local
npm run build  # Build de production
npm run lint   # Vérifier le code

## Code Style
- TypeScript strict mode
- Async/await over callbacks
- Named exports over default exports
- Commentaires toujours en français
- Interface utilisateur en français

## Auth Notes
- CLI Better-Auth : utiliser `npx @better-auth/cli` (package séparé, pas inclus dans better-auth)
- Générer le schéma : `npx @better-auth/cli generate`
- Appliquer les migrations : `npx @better-auth/cli migrate`
- Côté serveur : `auth.api.getSession({ headers: await headers() })`
- Côté client : `useSession()` dans les composants `"use client"` uniquement
- `requireEmailVerification` est activé — tester Resend avant toute démo (domaine jobboost.fr doit être vérifié)

## PDF/DOCX Parsing
- pdf-parse v1.1.1 — importer via `require("pdf-parse/lib/pdf-parse")` et non `index.js` (charge du code canvas qui crashe le build Next.js)
- mammoth v1 — import ESM direct, pas de problème
- Limite : 5 Mo par fichier
- PDF scannés (images sans couche texte) non supportés — prévoir message d'erreur explicite

## Environment Variables
- `BETTER_AUTH_SECRET` — secret de session (min. 32 chars)
- `DATABASE_URL` — connection string PostgreSQL Supabase (pooler)
- `RESEND_API_KEY` — clé Resend pour les emails
- `NEXT_PUBLIC_APP_URL` — URL de l'app (http://localhost:3000 en dev)
- `ANTHROPIC_API_KEY` — clé Claude API (côté serveur uniquement)
- `BETTER_AUTH_URL` — URL de base de l'app (= `NEXT_PUBLIC_APP_URL`, évite le warning Better-Auth au démarrage)

## Common Mistakes to Avoid
- Ne jamais exposer les clés API côté client
- Toujours valider les inputs utilisateur
- Utiliser les Server Actions pour les mutations
- Ne jamais stocker le contenu des CV en base de données (transit mémoire uniquement)
- Toujours utiliser les variables d'environnement pour les secrets
- Ne pas importer `pdf-parse` directement (utiliser `pdf-parse/lib/pdf-parse`)
- La réponse JSON de Claude peut être enveloppée en backticks markdown — toujours nettoyer avant `JSON.parse`
- Ne jamais utiliser `npx @better-auth/cli migrate` sur une DB existante — génère un CREATE TABLE complet qui crashe sur les tables déjà présentes. Utiliser ALTER TABLE direct via Node + pg : `node -e "const {Pool}=require('pg'); const p=new Pool({connectionString:'...'}); p.query('ALTER TABLE ...')"`
- `session.user.credits` n'est pas exposé par `useSession()` sans config supplémentaire — récupérer les crédits restants depuis la réponse des routes API (`creditsRestants` dans `/api/adapter-cv`)

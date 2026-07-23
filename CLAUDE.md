## Project Overview
Rivjob (https://www.rivjob.ai) est une alternative française à Jobscan.co (anciennement JobBoost / jobboost.fr — rebrand 2026-07).
L'utilisateur colle son CV + une offre d'emploi. L'outil analyse la correspondance gratuitement (score + mots-clés manquants), puis propose d'adapter le CV via un compte (3 essais gratuits, ensuite payant).

## Tech Stack
- Framework: Next.js (App Router)
- Language: TypeScript
- Style: Tailwind CSS
- Auth: Better-Auth + Supabase
- IA: Anthropic Claude API
- Paiement: Stripe (Phase 2)
- Export PDF : @react-pdf/renderer (server-side, `renderToBuffer`)
- Export DOCX : docx + `Packer.toBuffer`

## Project Structure
```
src/
├── app/
│   ├── api/
│   │   ├── analyser/route.ts        # Analyse CV vs offre (Claude Haiku) → JSON structuré
│   │   ├── extraire-cv/route.ts     # Extraction texte PDF/DOCX
│   │   ├── adapter-cv/route.ts      # Adaptation CV → retourne CVStructure JSON
│   │   ├── exporter-cv/route.ts     # Génère PDF ou DOCX depuis CVStructure
│   │   └── auth/[...all]/route.ts   # Better-Auth handler
│   ├── login/page.tsx
│   ├── register/page.tsx
│   └── page.tsx                     # Page principale
├── middleware.ts                     # Redirige login/register si déjà connecté
├── components/
│   └── CVPreview.tsx                # Preview HTML du CV adapté (Georgia serif, ATS)
├── types/
│   └── cv.ts                        # Type CVStructure partagé
└── lib/
    ├── auth.ts          # Config serveur better-auth (NE PAS importer côté client)
    ├── auth-client.ts   # Config client (hooks React uniquement)
    └── cv-pdf.tsx       # Composant React PDF ATS (Times-Roman/Times-Bold)
```

## Deployment & Repository
- Production : https://www.rivjob.ai (Vercel) — anciennement jobboost.fr, redirection 301 en place
- GitHub : https://github.com/lucasfounder013/rivjob (repo renommé depuis lucasfounder013/jobboost)
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
- `requireEmailVerification` est activé — tester Resend avant toute démo (domaine rivjob.ai doit être vérifié)

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
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — OAuth Google (login "Continuer avec Google"). Redirect URI à déclarer dans Google Cloud Console : `{BETTER_AUTH_URL}/api/auth/callback/google`

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

## PDF Generation (@react-pdf/renderer)
- Ne jamais mettre du JSX dans un fichier `.ts` — isoler les composants React PDF dans un fichier `.tsx` séparé (ex: `src/lib/cv-pdf.tsx`)
- `renderToBuffer` attend `ReactElement<DocumentProps>` — caster avec `as React.ReactElement<DocumentProps>` si nécessaire
- `Buffer` n'est pas assignable à `BodyInit` dans Next.js — envelopper avec `new Uint8Array(buffer)` avant de passer à `NextResponse`
- `letterSpacing` insère des espaces réels entre les caractères (ex: "P R O F I L") — ne pas utiliser
- `alignItems: center` sur un parent flex écrase `height` d'un enfant `View` sans contenu — pour un trait séparateur, utiliser une colonne : titre puis `<View style={{ height: 1, backgroundColor: "#AAAAAA" }} />`
- Polices built-in react-pdf : `Times-Roman`, `Times-Bold`, `Helvetica`, `Helvetica-Bold` — Georgia n'existe pas, utiliser Times-Roman comme équivalent serif
- Pour d'autres polices, utiliser `Font.register()` — les polices système ne sont pas disponibles
- `cv-pdf.tsx` utilise **Times-Roman / Times-Bold** (police serif built-in) — ne pas revenir à Helvetica
- `cv-pdf-moderne.tsx` utilise **Helvetica / Helvetica-Bold** avec accent `#4F46E5` — utilisé par la section `/modeles-cv/moderne`
- `cv-pdf-elegant.tsx` utilise **Times-Roman / Times-Bold** avec layout 2 colonnes (`flexDirection: "row"` sur `<Page>`) — utilisé par la section `/modeles-cv/elegant`

## Section /modeles-cv (templates de CV gratuits)
- Source de vérité des templates : `src/lib/cv-templates.ts` (3 slugs : `classique-ats`, `moderne`, `elegant`)
- CV d'exemple : `src/lib/cv-exemple.ts` (Marie Dupont)
- Persistance navigateur uniquement (localStorage) — clés préfixées `jobboost:*` (conservées après le rebrand pour ne pas perdre les brouillons utilisateurs) : `jobboost:modeles-cv:cv`, `jobboost:modeles-cv:template`, `jobboost:funnel:cv-prefill`. Helpers : `src/lib/cv-localstorage.ts`
- Route `/api/exporter-cv` accepte `template?` optionnel (défaut `"classique-ats"`) → dispatch PDF + DOCX selon le slug

## Routine de session (Augustin & Lucas)

### 🟢 Début de session
```bash
cd jobboost
git pull          # récupérer le travail de l'autre
npm install       # au cas où de nouvelles dépendances
npm run dev       # site sur http://localhost:3000 (laisser ce terminal ouvert)
```
Puis dans un **2e terminal** : `cd jobboost` → `claude`

### 🔴 Fin de session
```bash
git add .
git commit -m "Description claire de ce qui a été fait"
git pull          # toujours pull AVANT push
git push
```
Puis Ctrl+C dans le terminal du serveur.

### ⚠️ Règles d'or
- **Commits toujours à la main dans le terminal** — jamais via Claude Code (email noreply@anthropic.com → bloque Vercel)
- **Prévenir l'autre sur WhatsApp** avant de toucher un fichier sensible (évite les conflits)
- Ne jamais lancer `npm audit fix --force`
- Ne jamais commiter de secrets (`.env.local` reste local)

**IMPORTANT pour Claude Code** : rappelle cette routine à Augustin ou Lucas dès qu'une session commence (checklist début de session) ou se termine (checklist fin de session + règles d'or), sans attendre qu'on te le demande.

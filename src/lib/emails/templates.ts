type EmailProps = {
  nom: string;
  unsubscribeUrl: string;
};

type EmailTemplate = {
  subject: string;
  html: string;
};

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.jobboost.fr";

function base(contenu: string, ctaTexte: string, ctaUrl: string, unsubscribeUrl: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>JobBoost</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Header -->
          <tr>
            <td style="background:#4f46e5;border-radius:12px 12px 0 0;padding:20px 32px;">
              <span style="color:#fff;font-size:18px;font-weight:700;letter-spacing:-0.3px;">JobBoost</span>
            </td>
          </tr>

          <!-- Corps -->
          <tr>
            <td style="background:#fff;padding:32px;color:#111827;font-size:15px;line-height:1.7;">
              ${contenu}

              <!-- CTA -->
              <div style="margin-top:28px;text-align:center;">
                <a href="${ctaUrl}" style="display:inline-block;background:#4f46e5;color:#fff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 28px;border-radius:8px;">${ctaTexte}</a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;border-radius:0 0 12px 12px;padding:16px 32px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;">
                Vous recevez cet email car vous avez créé un compte sur <a href="${appUrl}" style="color:#6366f1;text-decoration:none;">jobboost.fr</a>.<br/>
                <a href="${unsubscribeUrl}" style="color:#9ca3af;">Se désabonner</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function email1({ nom, unsubscribeUrl }: EmailProps): EmailTemplate {
  const prenom = nom.split(" ")[0];
  const contenu = `
    <p style="margin:0 0 16px;">Bonjour ${prenom},</p>
    <p style="margin:0 0 16px;">Saviez-vous que <strong>75 % des CV sont éliminés</strong> avant même d'atteindre un recruteur humain ?</p>
    <p style="margin:0 0 16px;">La cause : les ATS (<em>Applicant Tracking Systems</em>). Ce sont des logiciels automatiques utilisés par la quasi-totalité des entreprises pour trier les candidatures. Ils cherchent des mots-clés précis — et si votre CV n'en contient pas assez, il est rejeté sans que personne ne l'ait lu.</p>
    <p style="margin:0 0 16px;">Concrètement, voici ce qu'un ATS vérifie :</p>
    <ul style="margin:0 0 16px;padding-left:20px;">
      <li style="margin-bottom:8px;">La présence des mots-clés de l'offre dans votre CV</li>
      <li style="margin-bottom:8px;">Le format du fichier (PDF lisible ou Word, pas d'image)</li>
      <li style="margin-bottom:8px;">La structure des sections (expériences, compétences, formation)</li>
    </ul>
    <p style="margin:0 0 16px;">La bonne nouvelle : une fois que vous connaissez les règles, c'est corrigeable en quelques minutes.</p>
    <p style="margin:0;">JobBoost analyse votre CV face à une offre et vous dit exactement ce qui manque.</p>
  `;
  return {
    subject: "Pourquoi votre CV est peut-être ignoré par les recruteurs",
    html: base(contenu, "Testez votre CV gratuitement →", `${appUrl}/dashboard`, unsubscribeUrl),
  };
}

export function email2({ nom, unsubscribeUrl }: EmailProps): EmailTemplate {
  const prenom = nom.split(" ")[0];
  const contenu = `
    <p style="margin:0 0 16px;">Bonjour ${prenom},</p>
    <p style="margin:0 0 16px;">Le problème de la plupart des CV n'est pas l'expérience — c'est le vocabulaire.</p>
    <p style="margin:0 0 16px;">Un ATS compare votre CV mot à mot avec l'offre d'emploi. Si l'offre dit "gestion de projet" et que votre CV dit "pilotage de projets", le système peut ne pas faire le lien. C'est aussi simple — et aussi brutal — que ça.</p>
    <p style="margin:0 0 16px;"><strong>Comment identifier les bons mots-clés dans une offre :</strong></p>
    <ol style="margin:0 0 16px;padding-left:20px;">
      <li style="margin-bottom:8px;">Repérez les compétences techniques mentionnées plusieurs fois</li>
      <li style="margin-bottom:8px;">Notez les outils et logiciels cités (même en passant)</li>
      <li style="margin-bottom:8px;">Relevez les intitulés de poste et les verbes d'action utilisés</li>
    </ol>
    <p style="margin:0 0 16px;"><strong>Les erreurs les plus courantes :</strong></p>
    <ul style="margin:0 0 16px;padding-left:20px;">
      <li style="margin-bottom:8px;">CV générique envoyé sans adaptation à chaque offre</li>
      <li style="margin-bottom:8px;">Compétences listées dans un bloc image ou tableau non lu par les ATS</li>
      <li style="margin-bottom:8px;">Abréviations non développées (ex : "mgmt" au lieu de "management")</li>
    </ul>
    <p style="margin:0;">JobBoost fait cette analyse automatiquement et vous montre les mots-clés manquants.</p>
  `;
  return {
    subject: "Le secret des CV qui passent les filtres automatiques",
    html: base(contenu, "Analyser mon CV vs une offre →", `${appUrl}/dashboard`, unsubscribeUrl),
  };
}

export function email3({ nom, unsubscribeUrl }: EmailProps): EmailTemplate {
  const prenom = nom.split(" ")[0];
  const contenu = `
    <p style="margin:0 0 16px;">Bonjour ${prenom},</p>
    <p style="margin:0 0 16px;">Une lettre de motivation efficace, c'est rare — et c'est précisément ce qui la rend efficace.</p>
    <p style="margin:0 0 16px;">La plupart des lettres se ressemblent : beaucoup d'enthousiasme, peu de concret. Un recruteur qui reçoit 200 candidatures repère immédiatement celle qui parle de lui plutôt que de soi.</p>
    <p style="margin:0 0 16px;"><strong>La structure qui fonctionne :</strong></p>
    <ol style="margin:0 0 16px;padding-left:20px;">
      <li style="margin-bottom:8px;"><strong>Paragraphe 1</strong> — Pourquoi ce poste maintenant. Un fait concret, pas une déclaration d'intention vague.</li>
      <li style="margin-bottom:8px;"><strong>Paragraphe 2</strong> — Ce que vous apportez. Des résultats chiffrés ou des projets précis, pas des qualificatifs génériques.</li>
      <li style="margin-bottom:8px;"><strong>Paragraphe 3</strong> — Conclusion courte. Disponibilité et demande d'entretien, deux phrases maximum.</li>
    </ol>
    <p style="margin:0 0 16px;"><strong>Ce qu'il faut éviter :</strong></p>
    <ul style="margin:0 0 16px;padding-left:20px;">
      <li style="margin-bottom:8px;">"Je suis passionné par..." — trop commun, trop vague</li>
      <li style="margin-bottom:8px;">"Ma candidature saura répondre à vos attentes" — formule creuse</li>
      <li style="margin-bottom:8px;">Répéter le contenu du CV mot pour mot</li>
    </ul>
    <p style="margin:0;">JobBoost génère une lettre sobre et personnalisée à partir de votre CV et de l'offre.</p>
  `;
  return {
    subject: "La lettre de motivation que les recruteurs lisent vraiment",
    html: base(contenu, "Générer ma lettre de motivation →", `${appUrl}/dashboard`, unsubscribeUrl),
  };
}

export function email4({ nom, unsubscribeUrl }: EmailProps): EmailTemplate {
  const prenom = nom.split(" ")[0];
  const contenu = `
    <p style="margin:0 0 16px;">Bonjour ${prenom},</p>
    <p style="margin:0 0 16px;">Décrocher un entretien, c'est bien. Ne pas le rater, c'est mieux.</p>
    <p style="margin:0 0 16px;">La bonne nouvelle : une préparation d'une heure suffit pour aborder la majorité des entretiens avec assurance.</p>
    <p style="margin:0 0 16px;"><strong>Ce que vous devez préparer :</strong></p>
    <ul style="margin:0 0 16px;padding-left:20px;">
      <li style="margin-bottom:8px;"><strong>Votre "fil rouge"</strong> — en 2 minutes, expliquez pourquoi vous êtes là et ce que vous apportez. Entraînez-vous à voix haute.</li>
      <li style="margin-bottom:8px;"><strong>3 expériences concrètes</strong> — choisissez des situations avec un résultat mesurable. Utilisez le format : contexte → action → résultat.</li>
      <li style="margin-bottom:8px;"><strong>2 questions à poser</strong> — cela montre que vous avez préparé. Évitez les questions sur le salaire au premier entretien.</li>
    </ul>
    <p style="margin:0 0 16px;"><strong>Questions fréquentes à anticiper :</strong></p>
    <ul style="margin:0 0 16px;padding-left:20px;">
      <li style="margin-bottom:8px;">"Parlez-moi de vous" → votre fil rouge</li>
      <li style="margin-bottom:8px;">"Quels sont vos points faibles ?" → choisissez quelque chose de vrai mais sans impact sur le poste</li>
      <li style="margin-bottom:8px;">"Où vous voyez-vous dans 5 ans ?" → montrez une ambition cohérente avec le poste</li>
    </ul>
    <p style="margin:0;">Un dossier de candidature solide (CV ATS + lettre adaptée) augmente vos chances d'être convoqué.</p>
  `;
  return {
    subject: "Comment se préparer à un entretien en moins d'une heure",
    html: base(contenu, "Optimiser mon dossier de candidature →", `${appUrl}/dashboard`, unsubscribeUrl),
  };
}

export function email5({ nom, unsubscribeUrl }: EmailProps): EmailTemplate {
  const prenom = nom.split(" ")[0];
  const contenu = `
    <p style="margin:0 0 16px;">Bonjour ${prenom},</p>
    <p style="margin:0 0 16px;">Après avoir analysé des milliers de candidatures, voici ce qui distingue les profils retenus.</p>
    <p style="margin:0 0 16px;"><strong>5 choses que font les candidats qui décrochent des entretiens :</strong></p>
    <ol style="margin:0 0 16px;padding-left:20px;">
      <li style="margin-bottom:10px;"><strong>Ils adaptent leur CV à chaque offre.</strong> Un CV générique, ça se voit. Deux paragraphes retravaillés suffisent pour faire la différence.</li>
      <li style="margin-bottom:10px;"><strong>Ils utilisent les mots-clés de l'offre.</strong> Pas pour "tricher", mais parce que les ATS et les recruteurs cherchent exactement ces termes.</li>
      <li style="margin-bottom:10px;"><strong>Ils soignent le format.</strong> Un CV lisible, sans colonnes complexes ni tableaux, passe mieux les ATS et se lit plus vite.</li>
      <li style="margin-bottom:10px;"><strong>Ils écrivent une lettre courte et directe.</strong> Trois paragraphes, des faits concrets, zéro formule creuse.</li>
      <li style="margin-bottom:10px;"><strong>Ils candidatent tôt.</strong> Les offres publiées depuis moins de 3 jours reçoivent 4 fois moins de candidatures que celles publiées depuis une semaine.</li>
    </ol>
    <p style="margin:0 0 16px;">JobBoost automatise les étapes 1, 2 et 4 — l'analyse ATS, l'adaptation du CV et la génération de lettre de motivation.</p>
    <p style="margin:0;">Avec l'abonnement, toutes ces fonctionnalités sont illimitées.</p>
  `;
  return {
    subject: "5 choses que les candidats retenus font différemment",
    html: base(contenu, "Passer à l'abonnement illimité →", `${appUrl}/pricing`, unsubscribeUrl),
  };
}

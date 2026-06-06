type EmailProps = {
  nom: string;
  unsubscribeUrl: string;
  poste?: string;
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

// Email 1 - J+0 : Bienvenue
export function email1({ nom, unsubscribeUrl }: EmailProps): EmailTemplate {
  const prenom = nom.split(" ")[0];
  const contenu = `
    <p style="margin:0 0 16px;">Bonjour ${prenom},</p>
    <p style="margin:0 0 16px;">Bienvenue sur JobBoost !</p>
    <p style="margin:0 0 16px;">JobBoost analyse votre CV face à une offre d'emploi et vous dit exactement ce qui manque pour passer les filtres automatiques des recruteurs.</p>
    <p style="margin:0;">C'est gratuit, ça prend moins de 30 secondes, et vous obtenez un score immédiat avec les mots-clés manquants.</p>
  `;
  return {
    subject: `Bienvenue sur JobBoost, ${nom.split(" ")[0]}`,
    html: base(contenu, "Analyser mon CV maintenant →", `${appUrl}/dashboard`, unsubscribeUrl),
  };
}

// Email 2 - J+3 : Nudge premier usage (skippé si l'user a déjà analysé)
export function email2({ nom, unsubscribeUrl }: EmailProps): EmailTemplate {
  const prenom = nom.split(" ")[0];
  const contenu = `
    <p style="margin:0 0 16px;">Bonjour ${prenom},</p>
    <p style="margin:0 0 16px;">La plupart des candidats envoient le même CV à toutes les offres et attendent. Résultat : peu de réponses, beaucoup de silence.</p>
    <p style="margin:0 0 16px;">Ce que vous gagnez en adaptant votre CV à chaque offre : un taux de réponse plus élevé, moins de candidatures dans le vide, et une vraie visibilité auprès des recruteurs qui cherchent exactement votre profil.</p>
    <p style="margin:0;">JobBoost vous montre en 30 secondes ce qui manque dans votre CV pour cette offre précise.</p>
  `;
  return {
    subject: "Avez-vous testé votre CV ?",
    html: base(contenu, "Tester mon CV gratuitement →", `${appUrl}/dashboard`, unsubscribeUrl),
  };
}

// Email 3 - J+6 : Education ATS (personnalisé avec le poste si disponible)
export function email3({ nom, unsubscribeUrl, poste }: EmailProps): EmailTemplate {
  const prenom = nom.split(" ")[0];
  const subject = poste
    ? `Votre CV de ${poste} : ce que vérifient les ATS`
    : "Pourquoi votre CV est peut-être ignoré par les recruteurs";
  const ouverture = poste
    ? `<p style="margin:0 0 16px;">Vous avez analysé votre CV pour un poste de <strong>${poste}</strong>. Voici comment un ATS traite votre candidature, et pourquoi les mots-clés font toute la différence.</p>`
    : `<p style="margin:0 0 16px;">Vous avez déposé des candidatures en ligne ? Elles sont passées par un ATS avant d'atterrir sur le bureau du recruteur.</p>`;
  const contenu = `
    <p style="margin:0 0 16px;">Bonjour ${prenom},</p>
    ${ouverture}
    <p style="margin:0 0 16px;">Un ATS est un logiciel qui extrait les informations de votre CV et les structure dans une base de données. Le recruteur filtre ensuite par mots-clés pour ne voir que les profils qui correspondent.</p>
    <p style="margin:0 0 16px;">Résultat : si votre CV ne contient pas les bons termes, le recruteur ne le verra jamais dans ses résultats de recherche, même si votre profil correspond parfaitement au poste.</p>
    <p style="margin:0 0 16px;">Concrètement, voici ce qui compte pour être visible :</p>
    <ul style="margin:0 0 16px;padding-left:20px;">
      <li style="margin-bottom:8px;">Les mots-clés de l'offre présents dans votre CV</li>
      <li style="margin-bottom:8px;">Un format lisible par l'ATS (PDF texte ou Word, pas d'image)</li>
      <li style="margin-bottom:8px;">Des sections bien structurées (expériences, compétences, formation)</li>
    </ul>
    <p style="margin:0;">JobBoost analyse votre CV face à une offre et vous montre exactement quels mots-clés ajouter pour apparaître dans les recherches du recruteur.</p>
  `;
  return {
    subject,
    html: base(contenu, "Analyser mon CV →", `${appUrl}/dashboard`, unsubscribeUrl),
  };
}

// Email 4 - J+10 : Lettre de motivation (personnalisé avec le poste si disponible)
export function email4({ nom, unsubscribeUrl, poste }: EmailProps): EmailTemplate {
  const prenom = nom.split(" ")[0];
  const subject = poste
    ? `Lettre de motivation pour ${poste} : ce qui fonctionne vraiment`
    : "La lettre de motivation que les recruteurs lisent vraiment";
  const ouverture = poste
    ? `<p style="margin:0 0 16px;">Vous candidatez pour un poste de <strong>${poste}</strong>. Une lettre efficace pour ce type de rôle, c'est rare, et c'est précisément ce qui la rend décisive.</p>`
    : `<p style="margin:0 0 16px;">Une lettre de motivation efficace, c'est rare, et c'est précisément ce qui la rend efficace.</p>`;
  const contenu = `
    <p style="margin:0 0 16px;">Bonjour ${prenom},</p>
    ${ouverture}
    <p style="margin:0 0 16px;">La plupart des lettres se ressemblent : beaucoup d'enthousiasme, peu de concret. Un recruteur qui reçoit 200 candidatures repère immédiatement celle qui parle de lui plutôt que de soi.</p>
    <p style="margin:0 0 16px;"><strong>La structure qui fonctionne :</strong></p>
    <ol style="margin:0 0 16px;padding-left:20px;">
      <li style="margin-bottom:8px;"><strong>Paragraphe 1 :</strong> Pourquoi ce poste maintenant. Un fait concret, pas une déclaration d'intention vague.</li>
      <li style="margin-bottom:8px;"><strong>Paragraphe 2 :</strong> Ce que vous apportez. Des résultats chiffrés ou des projets précis, pas des qualificatifs génériques.</li>
      <li style="margin-bottom:8px;"><strong>Paragraphe 3 :</strong> Conclusion courte. Disponibilité et demande d'entretien, deux phrases maximum.</li>
    </ol>
    <p style="margin:0 0 16px;"><strong>Ce qu'il faut éviter :</strong></p>
    <ul style="margin:0 0 16px;padding-left:20px;">
      <li style="margin-bottom:8px;">"Je suis passionné par..." : trop commun, trop vague</li>
      <li style="margin-bottom:8px;">"Ma candidature saura répondre à vos attentes" : formule creuse</li>
      <li style="margin-bottom:8px;">Répéter le contenu du CV mot pour mot</li>
    </ul>
    <p style="margin:0;">JobBoost génère une lettre sobre et personnalisée à partir de votre CV et de l'offre.</p>
  `;
  return {
    subject,
    html: base(contenu, "Générer ma lettre de motivation →", `${appUrl}/dashboard`, unsubscribeUrl),
  };
}

// Email 5 - J+14 : Conversion abonnement (personnalisé avec le poste si disponible)
export function email5({ nom, unsubscribeUrl, poste }: EmailProps): EmailTemplate {
  const prenom = nom.split(" ")[0];
  const subject = poste
    ? `Décrocher un poste de ${poste} : ce que font les candidats retenus`
    : "5 choses que les candidats retenus font différemment";
  const ouverture = poste
    ? `<p style="margin:0 0 16px;">Vous visez un poste de <strong>${poste}</strong>. Voici ce qui distingue les candidats retenus sur ce type de profil.</p>`
    : `<p style="margin:0 0 16px;">Après avoir analysé des milliers de candidatures, voici ce qui distingue les profils retenus.</p>`;
  const contenu = `
    <p style="margin:0 0 16px;">Bonjour ${prenom},</p>
    ${ouverture}
    <p style="margin:0 0 16px;"><strong>5 choses que font les candidats qui décrochent des entretiens :</strong></p>
    <ol style="margin:0 0 16px;padding-left:20px;">
      <li style="margin-bottom:10px;"><strong>Ils adaptent leur CV à chaque offre.</strong> Un CV générique, ça se voit. Deux paragraphes retravaillés suffisent pour faire la différence.</li>
      <li style="margin-bottom:10px;"><strong>Ils utilisent les mots-clés de l'offre.</strong> Pas pour "tricher", mais parce que les ATS et les recruteurs cherchent exactement ces termes.</li>
      <li style="margin-bottom:10px;"><strong>Ils soignent le format.</strong> Un CV lisible, sans colonnes complexes ni tableaux, passe mieux les ATS et se lit plus vite.</li>
      <li style="margin-bottom:10px;"><strong>Ils écrivent une lettre courte et directe.</strong> Trois paragraphes, des faits concrets, zéro formule creuse.</li>
      <li style="margin-bottom:10px;"><strong>Ils candidatent tôt.</strong> Les offres publiées depuis moins de 3 jours reçoivent 4 fois moins de candidatures que celles publiées depuis une semaine.</li>
    </ol>
    <p style="margin:0 0 16px;">JobBoost automatise les étapes 1, 2 et 4 : l'analyse ATS, l'adaptation du CV et la génération de lettre de motivation.</p>
    <p style="margin:0;">Avec l'abonnement, toutes ces fonctionnalités sont illimitées.</p>
  `;
  return {
    subject,
    html: base(contenu, "Passer à l'abonnement illimité →", `${appUrl}/pricing`, unsubscribeUrl),
  };
}

// Trigger RH - envoyé quand rh_credits = 0 et non abonné
export function triggerRH({ nom, unsubscribeUrl }: EmailProps): EmailTemplate {
  const prenom = nom.split(" ")[0];
  const contenu = `
    <p style="margin:0 0 16px;">Bonjour ${prenom},</p>
    <p style="margin:0 0 16px;">Vous avez utilisé votre recherche de contact RH gratuite.</p>
    <p style="margin:0 0 16px;">Trouver le bon interlocuteur avant d'envoyer une candidature augmente significativement vos chances d'obtenir une réponse. Une candidature adressée directement à un RH ou un manager est lue bien plus souvent qu'une candidature déposée sur une plateforme.</p>
    <p style="margin:0;">Avec l'abonnement JobBoost, vous débloquez des recherches illimitées pour toutes vos candidatures.</p>
  `;
  return {
    subject: "Votre recherche RH gratuite a été utilisée",
    html: base(contenu, "Débloquer les recherches illimitées →", `${appUrl}/pricing`, unsubscribeUrl),
  };
}

// Trigger scans - envoyé quand scans = 0 et non abonné (personnalisé avec le poste si disponible)
export function triggerScans({ nom, unsubscribeUrl, poste }: EmailProps): EmailTemplate {
  const prenom = nom.split(" ")[0];
  const subject = poste
    ? `Vos analyses gratuites sont épuisées, continuez sur ${poste}`
    : "Vos 5 analyses gratuites ont été utilisées";
  const ouverture = poste
    ? `<p style="margin:0 0 16px;">Vous avez utilisé vos 5 analyses gratuites, notamment pour des postes de <strong>${poste}</strong>.</p>`
    : `<p style="margin:0 0 16px;">Vous avez utilisé vos 5 analyses gratuites.</p>`;
  const contenu = `
    <p style="margin:0 0 16px;">Bonjour ${prenom},</p>
    ${ouverture}
    <p style="margin:0 0 16px;">Chaque offre d'emploi est différente. Un CV non adapté passe rarement les filtres ATS, même avec une bonne expérience. Analyser votre CV à chaque nouvelle candidature est la façon la plus efficace d'augmenter votre taux de réponse.</p>
    <p style="margin:0;">Avec l'abonnement JobBoost, toutes vos analyses sont illimitées.</p>
  `;
  return {
    subject,
    html: base(contenu, "Continuer avec l'abonnement →", `${appUrl}/pricing`, unsubscribeUrl),
  };
}

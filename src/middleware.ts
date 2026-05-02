import { NextRequest, NextResponse } from "next/server";

// Routes accessibles uniquement aux utilisateurs NON connectés
const routesPubliquesUniquement = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!routesPubliquesUniquement.includes(pathname)) {
    return NextResponse.next();
  }

  // Vérification rapide : si pas de cookie, pas besoin de valider
  const sessionCookie =
    req.cookies.get("better-auth.session_token") ??
    req.cookies.get("__Secure-better-auth.session_token");

  if (!sessionCookie) {
    return NextResponse.next();
  }

  // Valide la session réelle via better-auth (évite les redirects avec cookies expirés)
  try {
    const res = await fetch(new URL("/api/auth/get-session", req.url).toString(), {
      headers: { cookie: req.headers.get("cookie") ?? "" },
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.session) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  } catch {
    // En cas d'erreur réseau, laisser accéder à la page de connexion
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register"],
};

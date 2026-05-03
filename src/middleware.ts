import { NextRequest, NextResponse } from "next/server";

// Routes où un utilisateur connecté doit être redirigé vers /dashboard
const routesRedirigeesConnecte = ["/", "/login", "/register"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

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
      if (data?.session && routesRedirigeesConnecte.includes(pathname)) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
  } catch {
    // En cas d'erreur réseau, laisser passer
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register"],
};

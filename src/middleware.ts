import { NextRequest, NextResponse } from "next/server";

// Routes accessibles uniquement aux utilisateurs NON connectés
const routesPubliquesUniquement = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Récupère le cookie de session Better-Auth
  const sessionCookie =
    req.cookies.get("better-auth.session_token") ??
    req.cookies.get("__Secure-better-auth.session_token");

  const estConnecte = Boolean(sessionCookie);

  // Redirige vers "/" si déjà connecté et tente d'accéder à login/register
  if (estConnecte && routesPubliquesUniquement.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register"],
};

import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Convenção do Next 16 (substitui o middleware.ts): protege o /dashboard.
 * Mesma verificação de lib/dashboard/auth.ts (duplicada aqui porque o proxy
 * não importa módulos "server-only"); /dashboard/login fica livre.
 */
const COOKIE = "pacheco_dash";

function valid(token: string | undefined) {
  const secret = process.env.DASHBOARD_SECRET || "";
  if (secret.length < 16 || !token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const expected = createHmac("sha256", secret).update(exp).digest("base64url");
  const a = Buffer.from(expected);
  const b = Buffer.from(sig);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const logged = valid(request.cookies.get(COOKIE)?.value);

  if (pathname === "/dashboard/login") {
    if (logged) return NextResponse.redirect(new URL("/dashboard", request.url));
    return NextResponse.next();
  }
  if (!logged) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard/login";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

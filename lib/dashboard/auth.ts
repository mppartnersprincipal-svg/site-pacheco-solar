import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Login do /dashboard: senha única (DASHBOARD_PASSWORD) → token HMAC com
 * validade de 30 dias num cookie httpOnly. Mesmo modelo das LPs da M|P
 * (Nova Ferragista, Pádua), sem usuários no Supabase.
 */
export const COOKIE = "pacheco_dash";
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

const password = () => process.env.DASHBOARD_PASSWORD || "";
const secret = () => process.env.DASHBOARD_SECRET || "";

export const authConfigured = () => password().length >= 8 && secret().length >= 16;

const sign = (payload: string) => createHmac("sha256", secret()).update(payload).digest("base64url");

// Compara hashes de tamanho fixo: não vaza o tamanho da senha pelo tempo de resposta
function safeEqual(a: string, b: string) {
  const h = (v: string) => createHash("sha256").update(v).digest();
  return timingSafeEqual(h(a), h(b));
}

export function checkPassword(candidate: string) {
  return authConfigured() && safeEqual(candidate || "", password());
}

export function issueToken() {
  const exp = String(Date.now() + TTL_MS);
  return `${exp}.${sign(exp)}`;
}

export function verifyToken(token: string | undefined | null) {
  if (!authConfigured() || typeof token !== "string") return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  if (Number(exp) < Date.now()) return false;
  return safeEqual(sign(exp), sig);
}

/** true se o cookie da sessão do painel é válido. */
export async function isLoggedIn() {
  const store = await cookies();
  return verifyToken(store.get(COOKIE)?.value);
}

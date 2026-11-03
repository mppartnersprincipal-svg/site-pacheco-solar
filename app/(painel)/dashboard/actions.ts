"use server";

import { cookies, headers } from "next/headers";
import { createHash } from "node:crypto";
import { redirect } from "next/navigation";
import { COOKIE, authConfigured, checkPassword, isLoggedIn, issueToken } from "@/lib/dashboard/auth";
import { getRecent } from "@/lib/analytics-queries";
import type { RecentRow } from "@/lib/analytics-types";

const COOKIE_MAX_AGE_S = 30 * 24 * 60 * 60;
const WRONG_PASSWORD_DELAY_MS = 400;
// Força bruta (best-effort, por instância; o limite forte fica no WAF da Vercel):
// 10 erros por IP ou 50 no total em 15 min bloqueiam o login por 15 min.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_IP = 10;
const MAX_GLOBAL = 50;
const failures = new Map<string, { n: number; reset: number }>();

function failuresOf(key: string) {
  const now = Date.now();
  const f = failures.get(key);
  return !f || f.reset < now ? { n: 0, reset: now + WINDOW_MS } : f;
}
async function clientKey() {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "local";
  return "ip:" + createHash("sha256").update(ip).digest("hex").slice(0, 16);
}
function isBlocked(ipKey: string) {
  return failuresOf(ipKey).n >= MAX_PER_IP || failuresOf("global").n >= MAX_GLOBAL;
}
function registerFailure(ipKey: string) {
  for (const key of [ipKey, "global"]) {
    const f = failuresOf(key);
    failures.set(key, { n: f.n + 1, reset: f.reset });
  }
  if (failures.size > 10_000) {
    const now = Date.now();
    for (const [k, v] of failures) if (v.reset < now) failures.delete(k);
  }
}

export type LoginState = { error: string | null };

/** Login do painel: senha única → cookie httpOnly assinado (30 dias). */
export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!authConfigured()) {
    return { error: "Painel sem senha configurada. Defina DASHBOARD_PASSWORD e DASHBOARD_SECRET na Vercel e faça um novo deploy." };
  }
  const ipKey = await clientKey();
  if (isBlocked(ipKey)) {
    await new Promise((r) => setTimeout(r, WRONG_PASSWORD_DELAY_MS));
    return { error: "Muitas tentativas. Aguarde 15 minutos e tente de novo." };
  }
  const senha = String(formData.get("senha") ?? "");
  if (!checkPassword(senha)) {
    registerFailure(ipKey);
    await new Promise((r) => setTimeout(r, WRONG_PASSWORD_DELAY_MS));
    return { error: "Senha incorreta." };
  }
  failures.delete(ipKey);
  const store = await cookies();
  store.set(COOKIE, issueToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/dashboard",
    maxAge: COOKIE_MAX_AGE_S,
  });
  redirect("/dashboard");
}

export async function logout() {
  const store = await cookies();
  store.delete({ name: COOKIE, path: "/dashboard" });
  redirect("/dashboard/login");
}

/** Usado pelo feed "Ao vivo" (polling a cada 30 s). Exige sessão do painel. */
export async function getRecentEvents(limit = 40): Promise<RecentRow[]> {
  if (!(await isLoggedIn())) return [];
  return getRecent(Math.min(Math.max(1, Math.floor(limit)), 100));
}

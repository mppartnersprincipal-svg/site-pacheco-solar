"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE, authConfigured, checkPassword, isLoggedIn, issueToken } from "@/lib/dashboard/auth";
import { getRecent } from "@/lib/analytics-queries";
import type { RecentRow } from "@/lib/analytics-types";

const COOKIE_MAX_AGE_S = 30 * 24 * 60 * 60;
const WRONG_PASSWORD_DELAY_MS = 400;

export type LoginState = { error: string | null };

/** Login do painel: senha única → cookie httpOnly assinado (30 dias). */
export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!authConfigured()) {
    return { error: "Painel sem senha configurada. Defina DASHBOARD_PASSWORD e DASHBOARD_SECRET na Vercel e faça um novo deploy." };
  }
  const senha = String(formData.get("senha") ?? "");
  if (!checkPassword(senha)) {
    await new Promise((r) => setTimeout(r, WRONG_PASSWORD_DELAY_MS));
    return { error: "Senha incorreta." };
  }
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

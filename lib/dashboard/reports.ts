import "server-only";
import { isLoggedIn } from "@/lib/dashboard/auth";
import { fetchGoogleAdsReport } from "@/lib/google-ads-api";
import { fetchGa4Report } from "@/lib/ga4-api";
import type { Range } from "@/lib/analytics-queries";
import type { Ga4Report, GoogleAdsReport } from "@/lib/google-ads-types";

/**
 * As APIs usam credenciais do servidor: validar a sessão do painel antes de
 * buscar dados, independentemente da proteção de rota feita pelo proxy.ts.
 */
export async function getGoogleAdsReport(range: Range): Promise<GoogleAdsReport> {
  if (!(await isLoggedIn())) return { status: "error", message: "Entre novamente no painel para consultar o Google Ads." };
  return fetchGoogleAdsReport(range);
}

export async function getGa4Report(range: Range, previous: Range): Promise<Ga4Report> {
  if (!(await isLoggedIn())) return { status: "error", message: "Entre novamente no painel para consultar o GA4." };
  return fetchGa4Report({ from: range.from, to: range.to, prevFrom: previous.from, prevTo: previous.to });
}

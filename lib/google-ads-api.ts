import "server-only";
import type { GoogleAdsCampaign, GoogleAdsMetrics, GoogleAdsReport } from "@/lib/google-ads-types";

/**
 * Leitura de relatórios do Google Ads (REST / searchStream), portada do padrão
 * M|P (Sólida / Nova Ferragista). Só consulta: nunca altera campanhas.
 * Credenciais só no servidor (variáveis de ambiente da Vercel).
 *
 * GOOGLE_ADS_CUSTOMER_ID = conta do CLIENTE (10 dígitos, sem traços);
 * GOOGLE_ADS_LOGIN_CUSTOMER_ID = MCC da M|P (acesso via gerenciadora).
 */

class AdsError extends Error {}

const METRICS = "metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions";
const TIMEOUT_MS = 20_000;

type RawMetrics = { impressions?: unknown; clicks?: unknown; costMicros?: unknown; conversions?: unknown };
type RawRow = {
  metrics?: RawMetrics;
  campaign?: { id?: string; name?: string; status?: string };
  customer?: { id?: string; descriptiveName?: string; currencyCode?: string; timeZone?: string; manager?: boolean };
};

function numeric(value: unknown) {
  // O protobuf omite campos com valor zero nas respostas JSON.
  if (value === undefined) return 0;
  const result = Number(value);
  if (!Number.isFinite(result)) throw new AdsError("O Google Ads retornou dados inválidos. Tente atualizar o painel.");
  return result;
}

function metrics(row: RawRow | undefined): GoogleAdsMetrics {
  const source = row?.metrics;
  const impressions = numeric(source?.impressions);
  const clicks = numeric(source?.clicks);
  const cost = numeric(source?.costMicros) / 1_000_000;
  const conversions = numeric(source?.conversions);
  return {
    impressions,
    clicks,
    cost,
    conversions,
    ctr: impressions > 0 ? clicks / impressions : null,
    averageCpc: clicks > 0 ? cost / clicks : null,
    costPerConversion: conversions > 0 ? cost / conversions : null,
  };
}

function dateInDashboard(date: Date) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

/** `range`: início inclusivo, término exclusivo (meia-noite de São Paulo). */
export async function fetchGoogleAdsReport(range: { from: Date; to: Date }, env = process.env): Promise<GoogleAdsReport> {
  const developerToken = env.GOOGLE_ADS_DEVELOPER_TOKEN?.trim();
  const clientId = env.GOOGLE_ADS_CLIENT_ID?.trim();
  const clientSecret = env.GOOGLE_ADS_CLIENT_SECRET?.trim();
  const refreshToken = env.GOOGLE_ADS_REFRESH_TOKEN?.trim();
  const customerId = env.GOOGLE_ADS_CUSTOMER_ID?.replace(/[\s-]/g, "");
  const loginCustomerId = env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.replace(/[\s-]/g, "");
  const version = env.GOOGLE_ADS_API_VERSION?.trim() || "v25";

  if (!developerToken || !clientId || !clientSecret || !refreshToken || !customerId) {
    return {
      status: "not_configured",
      message: "Conecte a conta do Google Ads para acompanhar investimento, impressões, cliques e conversões neste painel.",
    };
  }
  if (!/^\d{10}$/.test(customerId) || (loginCustomerId && !/^\d{10}$/.test(loginCustomerId)) || !/^v\d+$/.test(version)) {
    return { status: "error", message: "A configuração da conexão com o Google Ads precisa ser revisada." };
  }

  try {
    if (!(range.from instanceof Date) || !(range.to instanceof Date) || Number.isNaN(range.from.getTime()) || range.from >= range.to) {
      throw new AdsError("Selecione um período válido para consultar o Google Ads.");
    }
    // O dashboard usa término exclusivo; o GAQL inclui ambos os dias.
    const from = dateInDashboard(range.from);
    const to = dateInDashboard(new Date(range.to.getTime() - 1));
    const signal = AbortSignal.timeout(TIMEOUT_MS);

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "refresh_token", client_id: clientId, client_secret: clientSecret, refresh_token: refreshToken }),
      cache: "no-store",
      signal,
    });
    if (!tokenResponse.ok) {
      throw new AdsError(
        tokenResponse.status >= 500 || tokenResponse.status === 429
          ? "O Google Ads está temporariamente indisponível. Tente atualizar o painel em alguns minutos."
          : "Não foi possível autorizar a conexão. Revise o acesso da conta ao Google Ads."
      );
    }
    const token = (await tokenResponse.json()) as { access_token?: string };
    if (!token.access_token) throw new AdsError("Não foi possível autorizar a conexão com o Google Ads.");

    const query = async (gaql: string): Promise<RawRow[]> => {
      const response = await fetch(`https://googleads.googleapis.com/${version}/customers/${customerId}/googleAds:searchStream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
          "developer-token": developerToken,
          ...(loginCustomerId ? { "login-customer-id": loginCustomerId } : {}),
        },
        body: JSON.stringify({ query: gaql }),
        cache: "no-store",
        signal,
      });
      if (!response.ok) {
        // Não propagar payloads de erro do provedor: podem conter informações da conta.
        if (response.status === 401 || response.status === 403) {
          throw new AdsError("A conexão não tem acesso aos relatórios desta conta. Revise as permissões do Google Ads.");
        }
        if (response.status === 429) throw new AdsError("O limite de consultas do Google Ads foi atingido. Tente novamente em alguns minutos.");
        throw new AdsError("Não foi possível consultar o Google Ads. Tente atualizar o painel; se persistir, revise a conexão.");
      }
      const chunks = (await response.json()) as unknown;
      if (
        !Array.isArray(chunks) ||
        chunks.some((c) => !c || typeof c !== "object" || Array.isArray(c) || c.error || (c.results !== undefined && !Array.isArray(c.results)))
      ) {
        throw new AdsError("O Google Ads retornou uma resposta inesperada. Tente atualizar o painel.");
      }
      // searchStream devolve vários lotes: lê todos
      return (chunks as Array<{ results?: RawRow[] }>).flatMap((c) => c.results ?? []);
    };

    const metadata = await query(
      "SELECT customer.id, customer.descriptive_name, customer.currency_code, customer.time_zone, customer.manager FROM customer LIMIT 1"
    );
    const customer = metadata[0]?.customer;
    if (customer?.manager) {
      throw new AdsError("A conexão aponta para a conta de administrador (MCC). Use em GOOGLE_ADS_CUSTOMER_ID a conta de anúncios da Pacheco Solar.");
    }
    if (!customer?.id || !customer.currencyCode || !customer.timeZone) {
      throw new AdsError("Não foi possível identificar a conta do Google Ads. Revise a conexão.");
    }
    const where = `WHERE segments.date BETWEEN '${from}' AND '${to}'`;
    const [totals, campaigns] = await Promise.all([
      query(`SELECT ${METRICS} FROM customer ${where}`),
      query(`SELECT campaign.id, campaign.name, campaign.status, ${METRICS} FROM campaign ${where} ORDER BY metrics.cost_micros DESC`),
    ]);

    return {
      status: "ready",
      customer: { id: customer.id, name: customer.descriptiveName || "Conta Google Ads", currencyCode: customer.currencyCode, timeZone: customer.timeZone },
      from,
      to,
      totals: metrics(totals[0]),
      campaigns: campaigns.map((row): GoogleAdsCampaign => {
        if (!row.campaign?.id) throw new AdsError("O Google Ads retornou uma campanha inválida. Tente atualizar o painel.");
        return { id: row.campaign.id, name: row.campaign.name || "Campanha sem nome", status: row.campaign.status || "UNKNOWN", ...metrics(row) };
      }),
      fetchedAt: new Date().toISOString(),
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof AdsError ? error.message : "A consulta ao Google Ads não foi concluída. Tente atualizar o painel em alguns minutos.",
    };
  }
}

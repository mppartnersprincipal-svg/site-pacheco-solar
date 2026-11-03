import { fmtDuration, labelLinha, labelPage, labelPosicao, type TrailEvent } from "@/lib/analytics-types";

/**
 * Resume a trilha bruta de eventos de uma sessão em passos legíveis:
 * "Home (48 s)" → "Estruturas de Solo (1 min)" → "WhatsApp: Estrutura de solo (CTA final)".
 */
export type JourneyStep = {
  kind: "page" | "whatsapp" | "phone" | "email" | "cta" | "video" | "download";
  label: string;
  detail?: string;
  ts: string;
};

export function summarizeTrail(trail: TrailEvent[]): JourneyStep[] {
  const steps: JourneyStep[] = [];
  let lastPage: JourneyStep | null = null;

  for (const e of trail) {
    const p = e.params ?? {};
    switch (e.name) {
      case "page_view": {
        lastPage = { kind: "page", label: labelPage(e.path, e.title), ts: e.ts };
        steps.push(lastPage);
        break;
      }
      case "page_leave": {
        const target = lastPage && steps[steps.length - 1] === lastPage ? lastPage : findPage(steps, e.path);
        if (target && p.duration_ms != null) target.detail = fmtDuration(Number(p.duration_ms));
        break;
      }
      case "click_whatsapp":
        steps.push({
          kind: "whatsapp",
          label: labelLinha(String(p.linha ?? "")),
          detail: [p.item, p.posicao ? labelPosicao(String(p.posicao)) : null].filter(Boolean).join(" · "),
          ts: e.ts,
        });
        break;
      case "click_phone":
        steps.push({ kind: "phone", label: `Ligou: ${p.phone ?? ""}`, ts: e.ts });
        break;
      case "click_email":
        steps.push({ kind: "email", label: "E-mail", detail: String(p.email ?? ""), ts: e.ts });
        break;
      case "click_cta":
        steps.push({ kind: "cta", label: String(p.cta_id ?? "CTA"), detail: [p.tipo, p.valor].filter(Boolean).join(" · "), ts: e.ts });
        break;
      case "video_play":
        steps.push({ kind: "video", label: `Vídeo: ${p.video_id ?? ""}`, ts: e.ts });
        break;
      case "file_download":
        steps.push({ kind: "download", label: `Baixou: ${p.file ?? ""}`, ts: e.ts });
        break;
      default:
        break;
    }
  }
  return steps;
}

function findPage(steps: JourneyStep[], path: string) {
  for (let i = steps.length - 1; i >= 0; i--) {
    if (steps[i].kind === "page" && !steps[i].detail && steps[i].label === labelPage(path)) return steps[i];
  }
  return null;
}

/** Só os cliques genéricos, para a visão expandida. */
export function genericClicks(trail: TrailEvent[]) {
  return trail
    .filter((e) => e.name === "click")
    .map((e) => ({
      ts: e.ts,
      label: String(e.params?.track ?? e.params?.text ?? e.params?.href ?? "clique"),
      page: labelPage(e.path, e.title),
    }));
}

import { ImageResponse } from "next/og";

export const alt = "Pacheco Solar — estruturas metálicas para energia solar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** OG padrão (1200×630): fundo industrial, arco solar, nome e linhas de produto. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(135deg, #0f0f10 0%, #1c1c1c 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 56, height: 6, background: "#d35400" }} />
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#9aa3ad" }}>ESTRUTURAS METÁLICAS PARA ENERGIA SOLAR</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
            <div style={{ fontSize: 120, fontWeight: 800, lineHeight: 0.9, color: "#d35400" }}>PACHECO</div>
            <div style={{ fontSize: 40, fontWeight: 700, color: "#f2a93b", paddingBottom: 10 }}>SOLAR</div>
          </div>
          <div style={{ fontSize: 34, lineHeight: 1.3, maxWidth: 1000, color: "#e9eaec" }}>
            Estruturas para usinas de solo · Linha Titan para telhado · Kits completos · Itens avulsos · Vedacap
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "#9aa3ad" }}>
          <div>Pronta entrega na maior parte do tempo · Engenharia própria · Entrega em todo o Brasil</div>
          <div style={{ color: "#ffffff" }}>pachecosolar.com.br</div>
        </div>
      </div>
    ),
    { ...size }
  );
}

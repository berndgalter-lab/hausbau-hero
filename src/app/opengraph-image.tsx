import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Hausbau Hero — Materialrechner für Bauherren";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 700, color: "#1C1917", marginBottom: 16 }}>
          ⚡ Hausbau Hero
        </div>
        <div style={{ fontSize: 28, color: "#D97706", fontWeight: 600 }}>
          Kostenlose Materialrechner für Bauherren & Handwerker
        </div>
        <div style={{ fontSize: 20, color: "#78716C", marginTop: 24 }}>
          Wandfarbe · Fliesen · Trockenbau · Stromerzeuger
        </div>
      </div>
    ),
    { ...size }
  );
}

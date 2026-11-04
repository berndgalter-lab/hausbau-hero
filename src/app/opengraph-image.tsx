import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Hausbau Hero — Ersatzteile und Reparatur rund ums Haus";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#fbfaf7",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Farben aus tailwind.config.ts: paper, stone-900, accent-700, stone-500 */}
        <div style={{ fontSize: 48, fontWeight: 700, color: "#191917", marginBottom: 16 }}>
          Hausbau Hero
        </div>
        <div style={{ fontSize: 30, color: "#104e4d", fontWeight: 600 }}>
          Was ist kaputt? Wir finden das passende Teil.
        </div>
        <div style={{ fontSize: 22, color: "#76736a", marginTop: 24 }}>
          Ersatzteile mit Originalnummer · Problemlöser · Ratgeber
        </div>
      </div>
    ),
    { ...size }
  );
}

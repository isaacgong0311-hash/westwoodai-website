// Shared renderer for the generated social share images (opengraph-image.tsx
// files). Satori only understands flexbox, so every multi-child div sets
// display: flex explicitly.
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const NIGHT = "#111a33";
const PEACH = "#f0ad82";
const SKY = "#a9c5ff";

export async function renderOgImage({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  const logo = await readFile(join(process.cwd(), "public/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: NIGHT,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          color: "white",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: -120, top: -140, width: 520, height: 520, borderRadius: 9999, border: "56px solid rgba(255,255,255,.06)", display: "flex" }} />
        <div style={{ position: "absolute", right: 120, bottom: -80, width: 320, height: 320, borderRadius: 9999, backgroundColor: "rgba(168,77,37,.35)", filter: "blur(80px)", display: "flex" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> only */}
          <img src={logoSrc} width={72} height={72} alt="" style={{ borderRadius: 9999 }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.5 }}>WESTWOOD</span>
            <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: 4, color: SKY }}>AI CLUB</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase", color: SKY, marginBottom: 18 }}>{eyebrow}</span>
          <span style={{ fontSize: 92, fontWeight: 900, lineHeight: 1, letterSpacing: -4, maxWidth: 960 }}>{title}</span>
          <span style={{ fontSize: 32, lineHeight: 1.3, color: "#d5e1f7", marginTop: 26, maxWidth: 900 }}>{subtitle}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: PEACH, fontWeight: 700 }}>
          <div style={{ width: 14, height: 14, borderRadius: 9999, backgroundColor: PEACH, display: "flex" }} />
          Westwood High School · Austin, TX
        </div>
      </div>
    ),
    ogSize,
  );
}

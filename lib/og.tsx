// Shared renderer for the generated social share images (opengraph-image.tsx
// files). Satori only understands flexbox, so every multi-child div sets
// display: flex explicitly.
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const PAPER = "#f8f6ef";
const INK = "#111a33";
const MUTED = "#536179";
const RULE = "#dfe3ea";

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
          backgroundColor: PAPER,
          color: INK,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> only */}
          <img src={logoSrc} width={56} height={56} alt="" style={{ borderRadius: 9999, backgroundColor: INK }} />
          <span style={{ fontSize: 28, fontWeight: 600 }}>Westwood AI Club</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", borderTop: `2px solid ${INK}`, paddingTop: 36 }}>
          <span style={{ fontSize: 24, color: MUTED, marginBottom: 16 }}>{eyebrow}</span>
          <span style={{ fontSize: 80, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>{title}</span>
          <span style={{ fontSize: 30, lineHeight: 1.35, color: MUTED, marginTop: 24, maxWidth: 960 }}>{subtitle}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${RULE}`, paddingTop: 20, fontSize: 22, color: MUTED }}>
          <span>Meets after school in Room E1307</span>
          <span>No experience needed</span>
        </div>
      </div>
    ),
    ogSize,
  );
}

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

let emblemSrc: string | undefined;
async function getEmblem() {
  if (!emblemSrc) {
    const data = await readFile(join(process.cwd(), "public", "og-emblem.png"));
    emblemSrc = `data:image/png;base64,${data.toString("base64")}`;
  }
  return emblemSrc;
}

export async function GET() {
  const emblem = await getEmblem();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #f7f1e3 0%, #efe4c8 100%)",
          color: "#23422c",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={emblem} width={150} height={150} />
          <div style={{ fontSize: 72, fontWeight: 700 }}>All Ayurvedics</div>
        </div>
        <div style={{ marginTop: 36, fontSize: 40, color: "#3d5a44", maxWidth: 900 }}>
          Everyday Ayurveda — home remedies, routines and honest guidance in English &amp; Hindi.
        </div>
        <div style={{ marginTop: 48, fontSize: 28, color: "#b7791f" }}>allayurvedics.in</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": "public, max-age=86400, immutable" },
    }
  );
}

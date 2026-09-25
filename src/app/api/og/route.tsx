import { ImageResponse } from "next/og";

export async function GET() {
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
          <svg width="96" height="96" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="30" fill="#2f5d3a" />
            <path d="M32 50c0-14 6-24 16-30-2 14-8 24-16 30z" fill="#e0a526" />
            <path d="M32 50c0-12-5-21-14-26 1 12 6 21 14 26z" fill="#a9c79a" />
          </svg>
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

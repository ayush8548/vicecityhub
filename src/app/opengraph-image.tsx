import { ImageResponse } from "next/og";

export const alt = "ViceCityHub — The Premium GTA 6 Information Hub";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social-share card (og:image) generated at build/request time.
export default function OpengraphImage() {
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
          background:
            "radial-gradient(900px 500px at 80% -10%, #3b0d4f 0%, transparent 60%), radial-gradient(700px 500px at 0% 110%, #4a0f3a 0%, transparent 55%), #07060e",
          color: "#f4f1ff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#22d3ee",
            display: "flex",
          }}
        >
          Vice City · Leonida · GTA VI
        </div>
        <div
          style={{
            fontSize: 130,
            fontWeight: 900,
            lineHeight: 1,
            marginTop: 24,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>ENTER</span>
          <span
            style={{
              background: "linear-gradient(90deg, #22d3ee, #ff2d95 55%, #a855f7)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            VICE CITY
          </span>
        </div>
        <div style={{ fontSize: 34, color: "#b6aedb", marginTop: 32, display: "flex" }}>
          The premium GTA 6 information hub
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#6f6796",
            marginTop: 16,
            display: "flex",
          }}
        >
          Verified news · Databases · Interactive map · Launches Nov 19, 2026
        </div>
      </div>
    ),
    { ...size },
  );
}

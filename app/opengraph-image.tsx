import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PDFForge Lite HTML-to-PDF API";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5f7fa",
          color: "#132032",
          padding: "76px",
          fontFamily: "Arial"
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 800, color: "#0f766e" }}>PDFForge Lite</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 78, fontWeight: 900, lineHeight: 0.96, maxWidth: 940 }}>
            HTML-to-PDF without babysitting Chromium.
          </div>
          <div style={{ fontSize: 30, color: "#617086", maxWidth: 860 }}>
            Send HTML. Get a reliable PDF. Built for small SaaS, no-code workflows, and developer tools.
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 24 }}>
          {['Playwright renderer', 'API-first', 'Docker-ready'].map((item) => (
            <div
              key={item}
              style={{
                padding: "12px 18px",
                border: "2px solid #dce3ec",
                borderRadius: 8,
                background: "#ffffff"
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}

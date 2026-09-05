import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

/**
 * No webfont is fetched here: an OG image is rendered wherever the build runs,
 * and a font request that fails there fails the build. The system serif stack
 * carries the headline instead, which is close enough at this size.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#110e08",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
            <path
              d="M20.2 12.6a8.4 8.4 0 1 1-4.9-7.9"
              stroke="#ccff00"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M11.6 12.4 20.8 3.2m0 0h-6.1m6.1 0v6.1"
              stroke="#ccff00"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ color: "#ffffff", fontSize: 44 }}>
            {siteConfig.wordmark}
          </span>
          <span
            style={{
              color: "#bfbfbf",
              fontSize: 20,
              border: "1px solid #ffffff30",
              borderRadius: 999,
              padding: "6px 16px",
              fontFamily: "monospace",
            }}
          >
            {siteConfig.version}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#ffffff",
              fontSize: 92,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Launch tokens with
          </span>
          <span
            style={{
              color: "#ffffff",
              fontSize: 92,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            a vault attached.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #ffffff1a",
            paddingTop: 28,
            fontFamily: "monospace",
            fontSize: 22,
          }}
        >
          <span style={{ color: "#bfbfbf" }}>Robinhood Chain · pons v2</span>
          <span style={{ color: "#ccff00" }}>{siteConfig.ticker}</span>
        </div>
      </div>
    ),
    size,
  );
}

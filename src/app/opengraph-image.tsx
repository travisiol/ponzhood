import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

/**
 * The mark is inlined as a data URI rather than fetched.
 *
 * This route renders wherever `next build` runs, which may have no outbound
 * network and certainly has no running server of its own to request
 * `/og-mark.png` from. Reading the file off disk at module scope is the one
 * path that works in every one of those environments. `public/og-mark.png` is
 * a 320px crop of the master render, so the base64 costs about 55KB.
 *
 * No webfont is loaded for the same reason: a font request that fails at build
 * time fails the build. The system serif carries the headline, which at this
 * size is close enough to the face the site itself sets.
 */
const markSrc = `data:image/png;base64,${fs
  .readFileSync(path.join(process.cwd(), "public", "og-mark.png"))
  .toString("base64")}`;

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
          padding: "68px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={markSrc}
            alt=""
            width={76}
            height={76}
            style={{ borderRadius: 18 }}
          />
          <span style={{ color: "#ffffff", fontSize: 46 }}>
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
              fontSize: 88,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Launch tokens with
          </span>
          <span
            style={{
              color: "#ffffff",
              fontSize: 88,
              lineHeight: 1.06,
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
            paddingTop: 26,
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

import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** The mark, on the brand ground, at favicon size. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#110e08",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M20.2 12.6a8.4 8.4 0 1 1-4.9-7.9"
            stroke="#ccff00"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M11.6 12.4 20.8 3.2m0 0h-6.1m6.1 0v6.1"
            stroke="#ccff00"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}

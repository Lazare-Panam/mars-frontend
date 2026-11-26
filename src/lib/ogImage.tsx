import { ImageResponse } from "next/og";

// Shared Open Graph / social-share image template. Used by the site-wide
// default (src/app/opengraph-image.tsx) and the per-category route
// (src/app/products/[id]/opengraph-image.tsx) so every shared link gets a
// consistent, branded 1200×630 card instead of a missing or random photo.
//
// Rendered with next/og's ImageResponse (Satori): only a flexbox subset of CSS
// is supported, every element with children needs display:flex, and we avoid
// remote image/font fetches so the build stays deterministic and offline-safe.

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Brand gradient mirrors the footer (Common/Footer/Footer.tsx).
const BRAND_GRADIENT =
  "linear-gradient(135deg, #E0393E 0%, #B8262C 60%, #C42E33 100%)";

export function renderOgImage({
  title,
  subtitle = "Industrial Ball Valve Manufacturer",
}: {
  title: string;
  subtitle?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: BRAND_GRADIENT,
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: "0.02em",
          }}
        >
          Kronox Valves
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 34,
              fontWeight: 400,
              color: "rgba(255,255,255,0.85)",
              maxWidth: 900,
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Footer URL */}
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 600,
            color: "rgba(255,255,255,0.9)",
          }}
        >
          marsvalvenok.com
        </div>
      </div>
    ),
    OG_SIZE,
  );
}

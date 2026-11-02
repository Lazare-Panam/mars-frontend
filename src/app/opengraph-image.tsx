import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogImage";

// Site-wide default Open Graph image. Colocated at the root app segment, so it
// is inherited by every route that doesn't define its own opengraph-image
// (homepage, legal pages, about, contact, …). Twitter/X falls back to og:image
// when no twitter:image is set, so this covers both.
export const alt = "Mars Valvenok — Authorised UK Distributor of MARS Ball Valves";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "MARS Ball Valves, UK Stock & Delivery",
  });
}

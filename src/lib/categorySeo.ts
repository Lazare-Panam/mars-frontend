// On-site SEO overrides for category pages (/products/{id}). The heading and
// title otherwise come from the catalogue API (bannerTitle / seo.title); these
// take precedence so marketing can set them without a CMS change.
//   h1:    replaces the hero heading (and drops the API's accent line under it)
//   title: the full <title>, used as-is (no " | Mars Valvenok" suffix added)
export const CATEGORY_SEO: Record<string, { h1?: string; title?: string }> = {
  "two-piece-ball-valves": {
    h1: "Threaded ball valves for certified industrial applications",
    title: "Ball Valves for Gas Applications & Threaded Options – MARS Valve",
  },
  "multi-port-ball-valves": {
    h1: "Multi port valve solutions for reliable flow control",
    title: "Multi Port Valves: L-Port & T-Port Ball Valves - Mars Valve",
  },
  "three-piece-ball-valves": {
    h1: "Three-piece ball valves for certified industrial performance",
  },
};

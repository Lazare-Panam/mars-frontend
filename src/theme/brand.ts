// Shared colours for the site's dark banners, so they can be tuned in one
// place. They replace the old near-black (#0a0604) with the brand's rust tones.

/** Title banners: the site's brand red (#E7390F, the top bar and Shop button
 *  colour) with only a slight deepening for depth, not a shift to brown. */
export const BANNER_GRADIENT =
  "linear-gradient(135deg, #E7390F 0%, #D9350D 100%)";

/** Deep rust: fallback behind photo heroes, and the cookie banner. */
export const BANNER_DARK = "#4A1206";

// Photo and video overlays use the same deep rust as rgba(74,18,6,<alpha>).

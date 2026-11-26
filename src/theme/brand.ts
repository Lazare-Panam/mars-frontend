// Kronox Valves brand colours (from the v6 logo), shared so they can be tuned
// in one place. The site is light only: no black or dark backgrounds.

export const KRONOX = {
  red: "#E0393E",
  redDark: "#B8262C",
  redTint: "#FCE9EA",
  steel: "#6E7175",
  steelDeep: "#575A5F",
  text: "#3A3D42",
  line: "#DFE0E2",
  cloud: "#ECEDEE",
  mist: "#EDEEF0",
  white: "#FFFFFF",
} as const;

/** Light title banners (direction C): white fading to pale grey, with a red
 *  bottom edge (BANNER_EDGE). Text on these banners uses KRONOX.text. */
export const BANNER_LIGHT = "linear-gradient(135deg, #FFFFFF 0%, #ECEDEF 100%)";
export const BANNER_EDGE = "3px solid #E0393E";

/** Mid-tone steel bands for contrast (stats section, footer). Grey from the
 *  logo letters, never black. White text on these passes WCAG AA. */
export const STEEL_BAND = "linear-gradient(135deg, #7A7D82 0%, #62656A 100%)";

/** Title banners on pages not yet moved to BANNER_LIGHT. They still render
 *  white text, so this stays a solid colour (Kronox red) until each page is
 *  converted. */
export const BANNER_GRADIENT =
  "linear-gradient(135deg, #E0393E 0%, #C42E33 100%)";

/** Fallback behind photo heroes that still use white text. Steel grey, not
 *  dark rust. */
export const BANNER_DARK = "#6E7175";

// Photo overlays on unconverted pages: steel grey, rgba(110,113,117,<alpha>).

/** Page title banners (inner pages), matching the home hero: light grey,
 *  a pale red panel cut at the logo's angle, a red slash, a red bottom edge.
 *  Spread into a Box's sx; text inside uses KRONOX.text / KRONOX.steel. */
export const LIGHT_BANNER = {
  position: "relative",
  overflow: "hidden",
  isolation: "isolate",
  color: "#3A3D42",
  // Pale pink, so every page header reads as one family and stands apart
  // from the white and grey sections below.
  backgroundColor: "#FBEBEC",
  borderBottom: "3px solid #E0393E",
  // Right-hand panel: solid Kronox red with faint diagonal hatching, cut at
  // the logo's angle. A white slash runs through it.
  "&::after": {
    content: '""',
    position: "absolute",
    zIndex: -2,
    top: 0,
    bottom: 0,
    right: 0,
    width: { md: "32%", lg: "30%" },
    backgroundColor: "#E0393E",
    backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.10) 0 1px, transparent 1px 11px), linear-gradient(135deg, #E0393E 0%, #C42E33 100%)",
    clipPath: "polygon(22% 0, 100% 0, 100% 100%, 0 100%)",
    display: { xs: "none", md: "block" },
  },
  "&::before": {
    content: '""',
    position: "absolute",
    zIndex: -1,
    top: 0,
    bottom: 0,
    right: "6%",
    width: 56,
    bgcolor: "#FFFFFF",
    clipPath: "polygon(70% 0, 100% 0, 30% 100%, 0 100%)",
    display: { xs: "none", md: "block" },
  },
} as const;

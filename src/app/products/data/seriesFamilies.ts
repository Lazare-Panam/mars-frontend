
// Series shown on each category page (/products/{category} or
// /products/{category}/{product}), mirroring Mars Valve Co.'s own listings.
// Edit this file to add, remove or reorder series; the page updates itself.
//
//   name   — series name as Mars lists it ("Series 22, SIL3"); tags after the
//            first comma become pills (DM = direct mount, FS = fire safe)
//   image  — photo URL on our blob storage (IMG + "<range>/<series-id>.<ext>")
//   specs  — [label, value] rows shown on the card, from Mars's series pages
//   href   — where the card goes; omit to send people to a quote request
//   action — "configure" | "view" | "models" | "quote" (button wording)

// Our copies of Mars Valve Co.'s series photos, on Azure blob storage,
// stored as <range folder>/<series-id>.<ext>.
const IMG = "https://pblol2.blob.core.windows.net/mars-valves/mars%20series%20images/";

export type FamilySeries = {
  name: string;
  image: string;
  specs?: [string, string][];
  href?: string;
  action: "configure" | "view" | "models" | "quote";
};

export type SeriesFamily = {
  categoryId: string;
  productId?: string;
  title: string;
  kind: string;
  intro: string;
  /** No "All Models" table exists for this range (backend has no models). */
  noModelsPage?: boolean;
  /** Series in this range are quote-only (no online price), so configure CTAs
      read "Configure & quote" instead of "Configure & price". */
  quoteOnly?: boolean;
  /** Links to the sub-ranges, shown on a category-level page (crawlable). */
  types?: { label: string; href: string }[];
  series: FamilySeries[];
};

export const SERIES_FAMILIES: SeriesFamily[] = [
  {
    categoryId: "one-piece-ball-valves",
    title: "One-Piece Ball Valves",
    kind: "One-piece",
    intro: "Compact, high-pressure stainless steel one-piece ball valves. Choose a series to configure sizes, ends and options.",
    series: [
      { name: "Series 10-10", image: IMG + "one-piece-ball-valves/series-10-10.png", href: "/series/4", specs: [["Design", "1-piece design ball valve"], ["Port", "Reduced port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "800 PSI"], ["Body", "SS316 (CF8M)"], ["Seats", "PTFE"], ["Ends", "NPT, BSP, BSPT"]], action: "configure" },
      { name: "Series 10-30", image: IMG + "one-piece-ball-valves/series-10-30.png", specs: [["Design", "1-piece design ball valve"], ["Port", "Reduced port"], ["Size", "1/4\" \u2013 1\""], ["Pressure", "800 PSI"], ["Body", "CF8M"], ["Seats", "PTFE"], ["Ends", "NPT, BSP, BSPT"]], href: "/series/16", action: "configure" },
      { name: "Series 10-40", image: IMG + "one-piece-ball-valves/series-10-40.jpg", specs: [["Design", "1-piece design ball valve"], ["Port", "Reduced port"], ["Size", "1/8\" \u2013 1/2\""], ["Pressure", "PN50"], ["Body", "CF8M"], ["Seats", "PTFE"], ["Ends", "NPT, BSP, BSPT (female-female thread)"]], href: "/series/17", action: "configure" },
      { name: "Series 10-50", image: IMG + "one-piece-ball-valves/series-10-50.jpg", specs: [["Design", "1-piece design ball valve"], ["Port", "Reduced port"], ["Size", "1/8\" \u2013 1/2\""], ["Pressure", "PN50"], ["Body", "CF8M"], ["Seats", "PTFE"], ["Ends", "NPT, BSP, BSPT (female-male thread)"]], href: "/series/18", action: "configure" },
      { name: "Series F10-20, Direct Mount", image: IMG + "one-piece-ball-valves/series-f10-20.jpg", specs: [["Design", "1-piece direct mount ball valve"], ["Port", "Reduced port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "1000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE"], ["Ends", "NPT, BSP, BSPT"]], href: "/series/19", action: "configure" },
      { name: "Series F10-30", image: IMG + "one-piece-ball-valves/series-f10-30.png", specs: [["Design", "1-piece design ball valve"], ["Port", "Reduced port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "1000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE / TFM1600"], ["Ends", "NPT, BSP, BSPT"]], href: "/series/20", action: "configure" },
      { name: "Series F10-50, 2000PSI", image: IMG + "one-piece-ball-valves/series-f10-50.png", specs: [["Design", "1-piece design ball valve"], ["Port", "Reduced port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "2000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE / RTFE"], ["Ends", "NPT, BSP, BSPT"]], href: "/series/21", action: "configure" },
      { name: "Series F10-60, Fire Safe", image: IMG + "one-piece-ball-valves/series-f10-60.jpg", specs: [["Design", "1-piece fire safe ball valve"], ["Port", "Reduced port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "2000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE"], ["Ends", "NPT, BSP, BSPT"], ["Fire safe", "API 607,4th Edition"]], href: "/series/22", action: "configure" },
    ],
  },
  {
    categoryId: "two-piece-ball-valves",
    productId: "economical-two-piece-ball-valve",
    title: "Economical 2-Piece Ball Valves",
    kind: "2-piece",
    intro: "Cost-effective two-piece stainless steel ball valves for general industrial service.",
    series: [
      { name: "Series 20-10", image: IMG + "economical-two-piece-ball-valve/series-20-10.jpg", specs: [["Design", "2-piece design ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "1000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE / RTFE"], ["Ends", "NPT, BSP, BSPT"]], href: "/series/23", action: "configure" },
      { name: "Series 20-20", image: IMG + "economical-two-piece-ball-valve/series-20-20.jpg", href: "/series/5", specs: [["Design", "2-piece design ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 4\""], ["Pressure", "1000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE"], ["Ends", "NPT, BSP, BSPT"]], action: "configure" },
      { name: "Series 20-30", image: IMG + "economical-two-piece-ball-valve/series-20-30.jpg", specs: [["Design", "2-piece design ball valve"], ["Port", "Reduced port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "2000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE"], ["Ends", "NPT, BSP, BSPT"]], href: "/series/24", action: "configure" },
      { name: "Series 20-40", image: IMG + "economical-two-piece-ball-valve/series-20-40.jpg", href: "/series/1", specs: [["Design", "2-piece design ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "2000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE"], ["Ends", "NPT, BSP, BSPT"]], action: "configure" },
      { name: "Series F20B-2C, B16.34", image: IMG + "economical-two-piece-ball-valve/series-f20b-2c.jpg", specs: [["Design", "2-piece B16.34 design ball valve"], ["Port", "Full port"], ["Size", "1/4\" – 4\""], ["Pressure", "1000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE"], ["Ends", "NPT, BSP, BSPT"]], href: "/series/25", action: "configure" },
      { name: "Series F20B-3C, B16.34", image: IMG + "economical-two-piece-ball-valve/series-f20b-3c.jpg", specs: [["Design", "2-piece B16.34 design ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "2000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE"], ["Ends", "NPT, BSP, BSPT"]], href: "/series/26", action: "configure" },
      { name: "Series F20-60", image: IMG + "economical-two-piece-ball-valve/series-f20-60.jpg", specs: [["Design", "2-piece design ball valve"], ["Port", "Full port / Reduced port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "1000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE / RTFE"], ["Ends", "Male x Male Threaded (NPT, BSP, BSPT)"]], href: "/series/27", action: "configure" },
    ],
  },
  {
    categoryId: "two-piece-ball-valves",
    productId: "high-performance-two-piece-ball-valve",
    title: "High Performance 2-Piece Ball Valves",
    kind: "2-piece",
    intro: "High performance two-piece ball valves for demanding process applications, including direct-mount and fire-safe series.",
    series: [
      { name: "Series 22, SIL3", image: IMG + "high-performance-two-piece-ball-valve/series-22.png", href: "/series/3", specs: [["Design", "2-piece direct mount ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 3\""], ["Pressure", "1000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE"], ["Ends", "NPT, BSP, BSPT"]], action: "configure" },
      { name: "Series 28", image: IMG + "high-performance-two-piece-ball-valve/series-28.jpg", specs: [["Design", "2-piece fire safe ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 3\""], ["Pressure", "1000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE (others on request)"], ["Ends", "NPT, BSP, BSPT"], ["Fire safe", "API 607, 7th Edition"]], href: "/series/28", action: "configure" },
      { name: "Series 20-50", image: IMG + "high-performance-two-piece-ball-valve/series-20-50.jpg", specs: [["Design", "2-piece design ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 3\""], ["Pressure", "1000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE (others on request)"], ["Ends", "NPT, BSP, BSPT"]], href: "/series/29", action: "configure" },
      { name: "Series F20-80, 1500PSI, DM", image: IMG + "high-performance-two-piece-ball-valve/series-f20-80.jpg", specs: [["Design", "2-piece Direct Mount design ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "1500 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE / TFM1600"], ["Ends", "NPT, BSP, BSPT"]], href: "/series/30", action: "configure" },
      { name: "Series F21-10, SRS Handle", image: IMG + "high-performance-two-piece-ball-valve/series-f21-10.jpg", specs: [["Design", "2-piece design ball valve with SRS Handle"], ["Port", "Full port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "2000 PSI"], ["Body", "CF8M"], ["Seats", "RTFE"], ["Ends", "NPT, BSP, BSPT"]], href: "/series/32", action: "configure" },
      { name: "Series F21-20, Fire Safe", image: IMG + "high-performance-two-piece-ball-valve/series-f21-20.jpg", specs: [["Design", "2-piece Fire Safe ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 4\""], ["Pressure", "2000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE"], ["Ends", "NPT, BSP, BSPT"], ["Fire safe", "API 607, 6th Edition"]], href: "/series/33", action: "configure" },
      { name: "Series F202D, Seal Welded", image: IMG + "high-performance-two-piece-ball-valve/series-f202d.jpg", specs: [["Design", "2-piece Seal Welded Direct Mount ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 4\""], ["Pressure", "2000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "TFM1600"], ["Ends", "NPT, BSP, BSPT"]], href: "/series/31", action: "configure" },
    ],
  },
  {
    categoryId: "two-piece-ball-valves",
    productId: "high-pressure-two-piece-ball-valve",
    title: "High Pressure 2-Piece Ball Valves",
    kind: "2-piece",
    intro: "Two-piece ball valves rated from 3000 to 6000 PSI for high pressure industrial service.",
    // All five configurable series are quote-only (no online price).
    quoteOnly: true,
    series: [
      { name: "Series 24, 3000PSI, DM", image: IMG + "high-pressure-two-piece-ball-valve/series-24.jpg", specs: [["Design", "2-piece Direct Mount design Ball Valve"], ["Port", "Reduced port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "3000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "Delrin / Peek"], ["Ends", "NPT, BSP, BSPT"]], href: "/products/two-piece-ball-valves/high-pressure-two-piece-ball-valve/variants/series-24", action: "view" },
      { name: "Series F21-70, 3000PSI, FS", image: IMG + "high-pressure-two-piece-ball-valve/series-f21-70.jpg", specs: [["Design", "2-piece Fire Safe Ball Valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "3000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "Delrin / Peek"], ["Ends", "NPT, BSP, BSPT"], ["Fire safe", "API 607, 5th Edition"]], href: "/series/38", action: "configure" },
      { name: "Series F21-90, 6000PSI", image: IMG + "high-pressure-two-piece-ball-valve/series-f21-90.jpg", specs: [["Design", "2-piece design Ball Valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 1 1/2\""], ["Pressure", "6000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "Delrin+5% carbon"], ["Ends", "NPT, BSP, BSPT"]], href: "/series/34", action: "configure" },
      { name: "Series F21-9K, 6000PSI, FS", image: IMG + "high-pressure-two-piece-ball-valve/series-f21-9k.jpg", specs: [["Design", "2-piece Fire Safe Ball Valve"], ["Port", "Reduced port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "6000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "Delrin / Peek"], ["Ends", "NPT, BSP, BSPT"], ["Fire safe", "API 607, 5th Edition"]], href: "/series/35", action: "configure" },
      { name: "Series F22-40, 3600PSI, DM", image: IMG + "high-pressure-two-piece-ball-valve/series-f22-40.jpg", specs: [["Design", "2-piece Direct Mount Ball Valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "3600 PSI"], ["Body", "CF8M"], ["Seats", "Delrin / Peek"], ["Ends", "NPT, BSP, BSPT"], ["Stem", "17-4ph"]], href: "/series/36", action: "configure" },
      { name: "Series F22-50, 6000PSI, DM", image: IMG + "high-pressure-two-piece-ball-valve/series-f22-50.jpg", specs: [["Design", "2-piece Direct Mount Ball Valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "6000 PSI"], ["Body", "CF8M"], ["Seats", "Delrin / Peek"], ["Ends", "NPT, BSP, BSPT"], ["Stem", "17-4ph"]], href: "/series/37", action: "configure" },
    ],
  },
  {
    categoryId: "three-piece-ball-valves",
    productId: "economical-three-piece-ball-valve",
    title: "Economical 3-Piece Ball Valves",
    kind: "3-piece",
    intro: "Cost-effective three-piece ball valves that can be maintained in-line without removing the end caps.",
    series: [
      { name: "Series 50", image: IMG + "economical-three-piece-ball-valve/series-50.jpg", href: "/series/10", specs: [["Design", "3-piece economical ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 4\""], ["Pressure", "1000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE (others on request)"], ["Ends", "Threaded, Butt weld, Socket weld"]], action: "configure" },
      { name: "Series 55", image: IMG + "economical-three-piece-ball-valve/series-55.jpg", specs: [["Design", "3-piece economical ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 4\""], ["Pressure", "1000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE (others on request)"], ["Ends", "Threaded, Butt weld, Socket weld"]], href: "/series/39", action: "configure" },
      { name: "Series 55A", image: IMG + "economical-three-piece-ball-valve/series-55a.jpg", specs: [["Design", "3-piece economical ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 4\""], ["Pressure", "1000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE (others on request)"], ["Ends", "Threaded, Butt weld, Socket weld"]], href: "/series/40", action: "configure" },
    ],
  },
  {
    categoryId: "three-piece-ball-valves",
    productId: "high-performance-three-piece-ball-valve",
    title: "High Performance 3-Piece Ball Valves",
    kind: "3-piece",
    intro: "High performance three-piece ball valves with direct-mount, fire-safe and SIL 3 series.",
    series: [
      { name: "Series 77, SIL3", image: IMG + "high-performance-three-piece-ball-valve/series-77.png", href: "/series/8", specs: [["Design", "3-piece high performance ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 4\""], ["Pressure", "1000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE"], ["Ends", "Threaded, Butt weld, Socket weld, Flanged"]], action: "configure" },
      { name: "Series 83, SIL3", image: IMG + "high-performance-three-piece-ball-valve/series-83.png", href: "/series/12", specs: [["Design", "3-piece fire safe ball valve"], ["Port", "Full port / Reduced port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "2000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE"], ["Ends", "Threaded, Butt weld, Socket weld, Flanged"], ["Fire safe", "API 607, 7th Edition"]], action: "configure" },
      { name: "Series 88, SIL3", image: IMG + "high-performance-three-piece-ball-valve/series-88.png", href: "/series/13", specs: [["Design", "3-piece fire safe metal seated ball valve"], ["Port", "Full port / Reduced port"], ["Size", "1/4\" \u2013 4\""], ["Pressure", "2000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE"], ["Ends", "Threaded, Butt weld, Socket weld, Flanged"], ["Fire safe", "API 607, 7th Edition"]], action: "configure" },
      { name: "Series F86A, 7500PSI", image: IMG + "high-performance-three-piece-ball-valve/series-f86a.jpg", href: "/series/41", specs: [["Design", "3-piece fire safe ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "7500 PSI"], ["Body", "CF8M / WCB"], ["Seats", "Delrin / Peek"], ["Ends", "Threaded, Butt weld, Socket weld"]], action: "configure" },
    ],
  },
  {
    categoryId: "three-piece-ball-valves",
    productId: "steam-jacketed-three-piece-ball-valve",
    title: "Steam Jacketed 3-Piece Ball Valves",
    kind: "3-piece",
    intro: "Three-piece ball valves with a steam jacket for media that must stay hot to flow, such as bitumen, resins and adhesives.",
    series: [
      { name: "Series 83J", image: IMG + "steam-jacketed-three-piece-ball-valve/series-83j.jpg", specs: [["Design", "3-piece design steam jacketed ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "2000 PSI"], ["Body", "CF8M"], ["Seats", "25% carbon+PTFE"], ["Ends", "Threaded, Butt weld, Socket weld, Flanged, Extended BW, ISO orbital welding"], ["Fire safe", "API 607, 7th Edition"]], href: "/series/42", action: "configure" },
      { name: "Series 88J", image: IMG + "steam-jacketed-three-piece-ball-valve/series-88j.jpg", specs: [["Design", "3-piece design steam jacketed ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 1 1/2\""], ["Pressure", "2000 PSI"], ["Body", "CF8M"], ["Seats", "25% carbon+PTFE"], ["Ends", "Threaded, Butt weld, Socket weld, Flanged, Extended BW, ISO orbital welding"], ["Fire safe", "API 607, 7th Edition"]], href: "/series/43", action: "configure" },
    ],
  },
  {
    categoryId: "v-port-ball-valves",
    title: "V-Port Control Ball Valves",
    kind: "V-port",
    intro: "Ball valves with a 30°, 60° or 90° V-port ball for flow control, in 3-piece, flanged, uni-body and wafer designs.",
    series: [
      { name: "Series 77V", image: IMG + "v-port-ball-valves/series-77v.png", specs: [["Design", "3-piece high performance ball valve"], ["Port", "Full port"], ["Size", "1/4\" – 4\""], ["Pressure", "1000 PSI"], ["Body", "CF8M/ WCB"], ["Seats", "PTFE/RTFE (others on request)"], ["Ends", "Threaded, Butt weld, Socket weld, Flanged, Extended BW, ISO orbital welding"]], href: "/products/v-port-ball-valves/v-port-ball-valves/variants/series-77v", action: "view" },
      { name: "Series 83V", image: IMG + "v-port-ball-valves/series-83v.png", specs: [["Design", "3-piece fire safe ball valve"], ["Port", "Full & Reduced port"], ["Size", "1/4\" – 2\""], ["Pressure", "2000 PSI"], ["Body", "CF8M/ WCB"], ["Seats", "PTFE/RTFE (others on request)"], ["Ends", "Threaded, Butt weld, Socket weld, Flanged, Extended BW, ISO orbital welding"], ["Fire safe", "API 607, 7th Edition"]], href: "/products/v-port-ball-valves/v-port-ball-valves/variants/series-83v", action: "view" },
      { name: "Series 88V", image: IMG + "v-port-ball-valves/series-88v.png", specs: [["Design", "3-piece fire safe ball valve"], ["Port", "Full & Reduced port"], ["Size", "1/4\" – 4\""], ["Pressure", "2000 PSI"], ["Body", "CF8M/ WCB"], ["Seats", "PTFE/RTFE (others on request)"], ["Ends", "Threaded, Butt weld, Socket weld, Flanged, Extended BW, ISO orbital welding"], ["Fire safe", "API 607, 7th Edition"]], href: "/products/v-port-ball-valves/v-port-ball-valves/variants/series-88v", action: "view" },
      { name: "Series 90V", image: IMG + "v-port-ball-valves/series-90v.png", specs: [["Design", "2-piece fire safe flanged ball valve"], ["Port", "Full port"], ["Size", "1/2\" – 4\""], ["Pressure", "ANSI Class 150/300, PN16/40, JIS 5K"], ["Body", "CF8M/ WCB/ Special Alloy based on request"], ["Seats", "PTFE/RTFE (others on request)"], ["Fire safe", "API 607, 7th Edition"]], href: "/products/v-port-ball-valves/v-port-ball-valves/variants/series-90v", action: "view" },
      { name: "Series 90DV", image: IMG + "v-port-ball-valves/series-90dv.png", specs: [["Design", "2-piece fire safe flanged ball valve"], ["Port", "Full port"], ["Size", "1/2\" – 12\""], ["Pressure", "ANSI Class 150, Class 300, PN16/40, JIS 10K, JIS 20K"], ["Body", "CF8M/ WCB/ Special Alloy based on request"], ["Seats", "PTFE/RTFE (others on request)"], ["Fire safe", "API 607, 7th Edition"]], action: "quote" },
      { name: "Series 91DV", image: IMG + "v-port-ball-valves/series-91dv.png", specs: [["Design", "Uni-body design fire safe flanged ball valve"], ["Port", "Reduced port"], ["Size", "1/2\" – 6\""], ["Pressure", "ANSI Class 150, Class 300"], ["Body", "CF8M/ WCB/ Special Alloy based on request"], ["Seats", "PTFE/RTFE (others on request)"], ["Fire safe", "API 607, 7th Edition"]], href: "/products/v-port-ball-valves/v-port-ball-valves/variants/series-91dv", action: "view" },
      { name: "Series 99V", image: IMG + "v-port-ball-valves/series-99v.png", specs: [["Design", "Wafer type compact ball valve"], ["Port", "Full port"], ["Size", "1/2\" – 6\""], ["Pressure", "ANSI Class 150, PN16/40"], ["Body", "CF8M"], ["Seats", "PTFE/RTFE (others on request)"]], href: "/products/v-port-ball-valves/v-port-ball-valves/variants/series-99v", action: "view" },
    ],
  },
  {
    categoryId: "multi-port-ball-valves",
    productId: "three-way-multi-port-ball-valve",
    noModelsPage: true,
    title: "3-Way Multi-Port Ball Valves",
    kind: "3-way",
    intro: "Threaded 3-way and 4-way ball valves with L-port and T-port balls for diverting and mixing flow.",
    series: [
      { name: "Series 38", image: IMG + "three-way-multi-port-ball-valve/series-38.jpg", specs: [["Design", "3-way threaded ball valve"], ["Port", "Reduced port"], ["Ports", "L port, T port"], ["Size", "1/4\" – 3\""], ["Pressure", "1000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE/RTFE (others on request)"], ["Ends", "NPT, BSP, BSPT"]], href: "/series/57", action: "configure" },
      { name: "Series 39, SIL3", image: IMG + "three-way-multi-port-ball-valve/series-39.png", specs: [["Design", "3-way threaded ball valve"], ["Port", "Full port & Reduced port"], ["Ports", "L port, T port"], ["Size", "1/4\" – 2\""], ["Pressure", "1000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE/RTFE (others on request)"], ["Ends", "NPT, BSP, BSPT"]], href: "/series/58", action: "configure" },
      { name: "Series F36-40", image: IMG + "three-way-multi-port-ball-valve/series-f36-40.jpg", specs: [["Design", "4-way Direct Mount ball valve"], ["Port", "Full port & Reduced port"], ["Ports", "L port, LL port, T port"], ["Size", "1/4\" – 2\""], ["Pressure", "1000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE/RTFE (cavity filler seat on request)"], ["Ends", "Threaded"]], href: "/series/59", action: "configure" },
      { name: "Series F36-60", image: IMG + "three-way-multi-port-ball-valve/series-f36-60.jpg", specs: [["Design", "3-way Bottom Entry ball valve"], ["Port", "Reduced port"], ["Ports", "L port, T port"], ["Size", "1/4\" – 3\""], ["Pressure", "1000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE"], ["Ends", "NPT, BSP, BSPT"]], href: "/series/60", action: "configure" },
    ],
  },
  {
    categoryId: "multi-port-ball-valves",
    productId: "three-four-five-way-ball-valve",
    title: "3/4/5-Way Ball Valves",
    kind: "Multi-port",
    intro: "Flanged and threaded 3, 4 and 5-way ball valves, from compact direct-mount designs to trunnion-mounted 12\" valves.",
    series: [
      { name: "Series 30", image: IMG + "three-four-five-way-ball-valve/series-30.png", specs: [["Design", "3-way, 4-way flanged ball valve"], ["Port", "Full port"], ["Ports", "L port, T port, X port"], ["Size", "1 1/2\" – 12\""], ["Pressure", "ANSI Class 150, Class 300, PN16/40"], ["Body", "CF8M/ WCB"], ["Seats", "PTFE/RTFE (others on request)"]], href: "/series/61", action: "configure" },
      { name: "Series 30M, SIL3", image: IMG + "three-four-five-way-ball-valve/series-30m.jpg", specs: [["Design", "3-way flanged ball valve"], ["Port", "Full port"], ["Ports", "L port, T port"], ["Size", "1 1/2\" – 6\""], ["Pressure", "ANSI Class 150, Class 300, PN10/16, PN25/40"], ["Body", "CF8M/ WCB"], ["Seats", "PTFE/RTFE (others on request)"]], href: "/series/62", action: "configure" },
      { name: "Series 33, SIL3", image: IMG + "three-four-five-way-ball-valve/series-33.png", specs: [["Design", "3-way, 4-way, 5-way ball valve"], ["Port", "Full port"], ["Ports", "L port, T port, I port, X port, LL port, TT Port"], ["Size", "1/4\" – 4\""], ["Pressure", "ANSI Class 150, Class 300, PN16/40"], ["Body", "CF8M"], ["Seats", "PTFE/RTFE (others on request)"], ["Ends", "Flanged, Threaded, Socket weld, Butt weld"]], href: "/series/6", action: "configure" },
      { name: "Series 36", image: IMG + "three-four-five-way-ball-valve/series-36.jpg", specs: [["Design", "3-way, 4-way ball valve"], ["Port", "Full port & Reduced port"], ["Ports", "L port, T port, I port, X port"], ["Size", "1/4\" – 2\""], ["Pressure", "ANSI Class 150, Class 300, PN16/40"], ["Body", "CF8M/ WCB"], ["Seats", "PTFE/RTFE (others on request)"], ["Ends", "Flanged, Threaded, Socket weld, Butt weld"]], href: "/series/63", action: "configure" },
      { name: "Series F35", image: IMG + "three-four-five-way-ball-valve/series-f35.jpg", specs: [["Design", "5-way Direct Mount ball valve"], ["Port", "Full port"], ["Ports", "L port, T port, X port"], ["Size", "1/2\" – 2\""], ["Pressure", "ANSI Class150,PN16/40, JIS10K"], ["Body", "CF8M"], ["Seats", "PTFE/RTFE/ TFM1600"], ["Ends", "Flanged end"]], href: "/series/64", action: "configure" },
      { name: "Series F51, 3000PSI", image: IMG + "three-four-five-way-ball-valve/series-f51.jpg", specs: [["Design", "3/4-way Direct Mount ball valve"], ["Port", "Full port"], ["Ports", "L port, T port, X port, I port"], ["Size", "1/4\" – 2\""], ["Pressure", "3000 PSI"], ["Body", "CF8M/ WCB (Special Alloy: Hastelloy C/ Alloy 20/ Super Duplex/ Monel on request)"], ["Seats", "TFM4215/ Peek (cavity filler seat on request)"], ["Ends", "Threaded/ Socket weld/ Butt weld"]], href: "/series/65", action: "configure" },
      { name: "Series F52, ANSI#600/900/1500", image: IMG + "three-four-five-way-ball-valve/series-f52.jpg", specs: [["Design", "3/4-way Direct Mount ball valve"], ["Port", "Full port"], ["Ports", "L port, T port, X port, I port"], ["Size", "1/2\" – 2\""], ["Pressure", "ANSI#600/900/1500"], ["Body", "CF8M/ WCB (Special Alloy: Hastelloy C/ Alloy 20/ Super Duplex/ Monel on request)"], ["Seats", "TFM1600/TFM4215/ Peek (cavity filler seat on request)"], ["Ends", "Flanged end"]], href: "/series/66", action: "configure" },
    ],
  },
  {
    categoryId: "multi-port-ball-valves",
    productId: "diverter-ball-valve",
    noModelsPage: true,
    title: "Diverter Ball Valves",
    kind: "Diverter",
    intro: "Diverter ball valves with side or bottom opening, rated up to 2250 PSI, for switching flow between lines.",
    series: [
      { name: "Series 83D", image: IMG + "diverter-ball-valve/series-83d.png", specs: [["Design", "Diverter ball valve"], ["Port", "Full port & Reduced port"], ["Ports", "L port, T port"], ["Size", "1/4\" – 2\""], ["Pressure", "2000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE/RTFE (others on request)"], ["Ends", "Threaded, Socket weld, Butt weld, Flanged"]], action: "quote" },
      { name: "Series 88D", image: IMG + "diverter-ball-valve/series-88d.png", specs: [["Design", "Diverter ball valve"], ["Port", "Full port & Reduced port"], ["Ports", "L port, T port"], ["Size", "1/4\" – 2\""], ["Pressure", "2000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE/RTFE (others on request)"], ["Ends", "Threaded, Socket weld, Butt weld, Flanged"]], action: "quote" },
      { name: "Series F89D", image: IMG + "diverter-ball-valve/series-f89d.jpg", specs: [["Design", "Diverter ball valve"], ["Port", "Full port"], ["Size", "1/2\" – 2\""], ["Pressure", "2250 PSI, ANSI#600"], ["Body", "CF8M/ WCB"], ["Seats", "PTFE/ TFM1600/ PEEK"], ["Ends", "Threaded, Socket weld, Butt weld, Flanged end"]], action: "quote" },
    ],
  },
  {
    categoryId: "multi-port-ball-valves",
    title: "Multi-Port Ball Valves",
    noModelsPage: true,
    types: [
      { label: "3-Way Ball Valves", href: "/products/multi-port-ball-valves/three-way-multi-port-ball-valve" },
      { label: "3/4/5-Way Ball Valves", href: "/products/multi-port-ball-valves/three-four-five-way-ball-valve" },
      { label: "Diverter Ball Valves", href: "/products/multi-port-ball-valves/diverter-ball-valve" },
    ],
    kind: "Multi-port",
    intro: "3-way, 4-way and 5-way MARS ball valves for diverting, mixing and switching flow, including direct-mount, flanged and diverter designs.",
    series: [
      { name: "Series 38", image: IMG + "three-way-multi-port-ball-valve/series-38.jpg", specs: [["Design", "3-way threaded ball valve"], ["Port", "Reduced port"], ["Ports", "L port, T port"], ["Size", "1/4\" – 3\""], ["Pressure", "1000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE/RTFE (others on request)"], ["Ends", "NPT, BSP, BSPT"]], href: "/series/57", action: "configure" },
      { name: "Series 39, SIL3", image: IMG + "three-way-multi-port-ball-valve/series-39.png", specs: [["Design", "3-way threaded ball valve"], ["Port", "Full port & Reduced port"], ["Ports", "L port, T port"], ["Size", "1/4\" – 2\""], ["Pressure", "1000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE/RTFE (others on request)"], ["Ends", "NPT, BSP, BSPT"]], href: "/series/58", action: "configure" },
      { name: "Series F36-40", image: IMG + "three-way-multi-port-ball-valve/series-f36-40.jpg", specs: [["Design", "4-way Direct Mount ball valve"], ["Port", "Full port & Reduced port"], ["Ports", "L port, LL port, T port"], ["Size", "1/4\" – 2\""], ["Pressure", "1000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE/RTFE (cavity filler seat on request)"], ["Ends", "Threaded"]], href: "/series/59", action: "configure" },
      { name: "Series F36-60", image: IMG + "three-way-multi-port-ball-valve/series-f36-60.jpg", specs: [["Design", "3-way Bottom Entry ball valve"], ["Port", "Reduced port"], ["Ports", "L port, T port"], ["Size", "1/4\" – 3\""], ["Pressure", "1000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE"], ["Ends", "NPT, BSP, BSPT"]], href: "/series/60", action: "configure" },
      { name: "Series 30", image: IMG + "three-four-five-way-ball-valve/series-30.png", specs: [["Design", "3-way, 4-way flanged ball valve"], ["Port", "Full port"], ["Ports", "L port, T port, X port"], ["Size", "1 1/2\" – 12\""], ["Pressure", "ANSI Class 150, Class 300, PN16/40"], ["Body", "CF8M/ WCB"], ["Seats", "PTFE/RTFE (others on request)"]], href: "/series/61", action: "configure" },
      { name: "Series 30M, SIL3", image: IMG + "three-four-five-way-ball-valve/series-30m.jpg", specs: [["Design", "3-way flanged ball valve"], ["Port", "Full port"], ["Ports", "L port, T port"], ["Size", "1 1/2\" – 6\""], ["Pressure", "ANSI Class 150, Class 300, PN10/16, PN25/40"], ["Body", "CF8M/ WCB"], ["Seats", "PTFE/RTFE (others on request)"]], href: "/series/62", action: "configure" },
      { name: "Series 33, SIL3", image: IMG + "three-four-five-way-ball-valve/series-33.png", specs: [["Design", "3-way, 4-way, 5-way ball valve"], ["Port", "Full port"], ["Ports", "L port, T port, I port, X port, LL port, TT Port"], ["Size", "1/4\" – 4\""], ["Pressure", "ANSI Class 150, Class 300, PN16/40"], ["Body", "CF8M"], ["Seats", "PTFE/RTFE (others on request)"], ["Ends", "Flanged, Threaded, Socket weld, Butt weld"]], href: "/series/6", action: "configure" },
      { name: "Series 36", image: IMG + "three-four-five-way-ball-valve/series-36.jpg", specs: [["Design", "3-way, 4-way ball valve"], ["Port", "Full port & Reduced port"], ["Ports", "L port, T port, I port, X port"], ["Size", "1/4\" – 2\""], ["Pressure", "ANSI Class 150, Class 300, PN16/40"], ["Body", "CF8M/ WCB"], ["Seats", "PTFE/RTFE (others on request)"], ["Ends", "Flanged, Threaded, Socket weld, Butt weld"]], href: "/series/63", action: "configure" },
      { name: "Series F35", image: IMG + "three-four-five-way-ball-valve/series-f35.jpg", specs: [["Design", "5-way Direct Mount ball valve"], ["Port", "Full port"], ["Ports", "L port, T port, X port"], ["Size", "1/2\" – 2\""], ["Pressure", "ANSI Class150,PN16/40, JIS10K"], ["Body", "CF8M"], ["Seats", "PTFE/RTFE/ TFM1600"], ["Ends", "Flanged end"]], href: "/series/64", action: "configure" },
      { name: "Series F51, 3000PSI", image: IMG + "three-four-five-way-ball-valve/series-f51.jpg", specs: [["Design", "3/4-way Direct Mount ball valve"], ["Port", "Full port"], ["Ports", "L port, T port, X port, I port"], ["Size", "1/4\" – 2\""], ["Pressure", "3000 PSI"], ["Body", "CF8M/ WCB (Special Alloy: Hastelloy C/ Alloy 20/ Super Duplex/ Monel on request)"], ["Seats", "TFM4215/ Peek (cavity filler seat on request)"], ["Ends", "Threaded/ Socket weld/ Butt weld"]], href: "/series/65", action: "configure" },
      { name: "Series F52, ANSI#600/900/1500", image: IMG + "three-four-five-way-ball-valve/series-f52.jpg", specs: [["Design", "3/4-way Direct Mount ball valve"], ["Port", "Full port"], ["Ports", "L port, T port, X port, I port"], ["Size", "1/2\" – 2\""], ["Pressure", "ANSI#600/900/1500"], ["Body", "CF8M/ WCB (Special Alloy: Hastelloy C/ Alloy 20/ Super Duplex/ Monel on request)"], ["Seats", "TFM1600/TFM4215/ Peek (cavity filler seat on request)"], ["Ends", "Flanged end"]], href: "/series/66", action: "configure" },
      { name: "Series 83D", image: IMG + "diverter-ball-valve/series-83d.png", specs: [["Design", "Diverter ball valve"], ["Port", "Full port & Reduced port"], ["Ports", "L port, T port"], ["Size", "1/4\" – 2\""], ["Pressure", "2000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE/RTFE (others on request)"], ["Ends", "Threaded, Socket weld, Butt weld, Flanged"]], action: "quote" },
      { name: "Series 88D", image: IMG + "diverter-ball-valve/series-88d.png", specs: [["Design", "Diverter ball valve"], ["Port", "Full port & Reduced port"], ["Ports", "L port, T port"], ["Size", "1/4\" – 2\""], ["Pressure", "2000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE/RTFE (others on request)"], ["Ends", "Threaded, Socket weld, Butt weld, Flanged"]], action: "quote" },
      { name: "Series F89D", image: IMG + "diverter-ball-valve/series-f89d.jpg", specs: [["Design", "Diverter ball valve"], ["Port", "Full port"], ["Size", "1/2\" – 2\""], ["Pressure", "2250 PSI, ANSI#600"], ["Body", "CF8M/ WCB"], ["Seats", "PTFE/ TFM1600/ PEEK"], ["Ends", "Threaded, Socket weld, Butt weld, Flanged end"]], action: "quote" },
    ],
  },
];

// Fire safe: the series in the backend's fire-safe catalogue (28, 83, 88, 90,
// 90D, 91D). 28/83/88 reuse their entries above; the flanged ones are here.
const allSeries = SERIES_FAMILIES.flatMap((f) => f.series);
const pick = (name: string) => allSeries.find((s) => s.name === name);
const FS = "/products/fire-safe-ball-valves";
const flangedSpecs = (size: string, pressure: string, port: string, design: string): [string, string][] => [
  ["Design", design],
  ["Port", port],
  ["Size", size],
  ["Pressure", pressure],
  ["Body", "CF8M / WCB"],
  ["Seats", "PTFE / RTFE (others on request)"],
  ["Fire safe", "API 607, 7th Edition"],
];

SERIES_FAMILIES.push({
  categoryId: "fire-safe-ball-valves",
  title: "Fire Safe Ball Valves",
  kind: "Fire safe",
  intro:
    "MARS ball valves fire-type tested to API 607, for flammable fluids and hazardous areas in oil & gas, petrochemical and chemical plants.",
  series: [
    pick("Series 28"),
    pick("Series 83, SIL3"),
    pick("Series 88, SIL3"),
    {
      name: "Series 90",
      image: IMG + "fire-safe-ball-valves/series-90.png",
      specs: flangedSpecs('1/2" – 4"', "ANSI Class 150/300, PN16/40", "Full port", "2-piece fire safe flanged"),
      href: "/series/44",
      action: "configure" as const,
    },
    {
      name: "Series 90D",
      image: IMG + "fire-safe-ball-valves/series-90d.jpg",
      specs: flangedSpecs('1/2" – 12"', "ANSI Class 150/300, PN16/40, JIS 10K/20K", "Full port", "2-piece fire safe flanged"),
      href: "/series/14",
      action: "configure" as const,
    },
    {
      name: "Series 91D",
      image: IMG + "fire-safe-ball-valves/series-91d.png",
      specs: flangedSpecs('1/2" – 6"', "ANSI Class 150/300", "Reduced port", "Uni-body fire safe flanged"),
      href: "/series/45",
      action: "configure" as const,
    },
  ].filter((s): s is FamilySeries => Boolean(s)),
});

// Flanged ball valves: the backend's flanged catalogue sub-families. The
// uni-body design is our SQL Series 91D (/series/45); the other five still
// link to their legacy sub-pages until each gets its own SQL series. Tile
// photos live on a different blob path than the mars-series-images base.
const FLG = "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/flanged/";
const FL = "/products/flanged-ball-valves";

SERIES_FAMILIES.push({
  categoryId: "flanged-ball-valves",
  title: "Flanged Ball Valves",
  kind: "Flanged",
  intro:
    "MARS flanged ball valves in ANSI, DIN and JIS flange ratings for direct in-line installation — uni-body, two-piece, three-piece, wafer and steam-jacketed designs.",
  series: [
    {
      name: "Uni Flanged",
      image: FLG + "uni.png",
      specs: [
        ["Series", "91D"],
        ["Design", "Uni-body flanged ball valve"],
        ["Port", "Reduced port"],
        ["Size", '1/2" – 6"'],
        ["Pressure", "ANSI Class 150/300"],
        ["Body", "CF8M / WCB"],
        ["Seats", "PTFE / RTFE (others on request)"],
      ],
      href: `${FL}/uni-body-flanged-ball-valve`,
      action: "view" as const,
    },
    {
      name: "Economical 2-Piece Flanged",
      image: FLG + "eco.gif",
      specs: [
        ["Series", "93, 94D"],
        ["Design", "2-piece economical flanged ball valve"],
        ["Port", "Full port"],
        ["Size", '1/2" – 12"'],
        ["Pressure", "ANSI Class 150/300, PN16/40, JIS 10K/20K"],
        ["Body", "CF8M / WCB / Special Alloy"],
        ["Seats", "PTFE / RTFE (Metal seat optional)"],
      ],
      href: `${FL}/economical-two-piece-flanged-ball-valve`,
      action: "view" as const,
    },
    {
      name: "High Performance 2-Piece Flanged",
      image: FLG + "hp-flanged.png",
      specs: [
        ["Series", "90, 90D"],
        ["Design", "High performance 2-piece flanged ball valve"],
        ["Port", "Full port"],
        ["Size", '1/2" – 12"'],
        ["Pressure", "ANSI Class 150/300, PN16/40"],
        ["Body", "CF8M / WCB / Special Alloy"],
        ["Seats", "PTFE / RTFE"],
      ],
      href: `${FL}/high-performance-two-piece-flanged-ball-valve`,
      action: "view" as const,
    },
    {
      name: "Wafer Type Flanged",
      image: FLG + "water-type.png",
      specs: [
        ["Series", "99, F98A, F98"],
        ["Design", "Wafer type flanged ball valve"],
        ["Port", "Full port"],
        ["Size", '1/2" – 6"'],
        ["Pressure", "ANSI Class 150, PN16/40"],
        ["Body", "CF8M"],
        ["Seats", "PTFE / RTFE"],
      ],
      href: `${FL}/wafer-type-flanged-ball-valve`,
      action: "view" as const,
    },
    {
      name: "3-Piece Flanged",
      image: FLG + "3-piece.jpg",
      specs: [
        ["Series", "F85, F88, F89"],
        ["Design", "3-piece flanged ball valve, high pressure"],
        ["Port", "Full port"],
        ["Size", '1/2" – 4"'],
        ["Pressure", "ANSI #600 – #2500"],
        ["Body", "CF8M / WCB / Special Alloy"],
        ["Seats", "Delrin / Peek / TFM1600"],
      ],
      href: `${FL}/three-piece-flanged-ball-valve`,
      action: "view" as const,
    },
    {
      name: "Steam Jacketed Flanged",
      image: FLG + "series-90j.jpg",
      specs: [
        ["Series", "90J, 90DJ"],
        ["Design", "2-piece steam jacketed flanged ball valve"],
        ["Port", "Full port"],
        ["Size", '1/2" – 8"'],
        ["Pressure", "ANSI Class 150/300, PN16/40, JIS 5K–20K"],
        ["Body", "CF8M"],
        ["Seats", "25% carbon + PTFE"],
      ],
      href: `${FL}/steam-jacketed-flanged-ball-valve`,
      action: "view" as const,
    },
  ],
});

// Uni-body flanged sub-page: one SQL series lives under it — Series 91D.
SERIES_FAMILIES.push({
  categoryId: "flanged-ball-valves",
  productId: "uni-body-flanged-ball-valve",
  title: "Uni-Body Flanged Ball Valves",
  kind: "Flanged",
  intro:
    "Compact uni-body flanged ball valve for general industrial service, in ANSI Class 150/300 flange ratings.",
  series: [
    {
      name: "Series 91D",
      image: FLG + "uni.png",
      specs: flangedSpecs('1/2" – 6"', "ANSI Class 150/300", "Reduced port", "Uni-body flanged"),
      href: "/series/45",
      action: "configure" as const,
    },
  ],
});

// Economical 2-piece flanged sub-page: two SQL series — Series 93 (large bore,
// 5"-12") and the Direct Mount Series 94D (small bore, 1/2"-4").
SERIES_FAMILIES.push({
  categoryId: "flanged-ball-valves",
  productId: "economical-two-piece-flanged-ball-valve",
  title: "Economical 2-Piece Flanged Ball Valves",
  kind: "Flanged",
  intro:
    "Cost-effective 2-piece full-port flanged ball valves in ANSI, DIN and JIS flange ratings — Series 93 for large bores and the Direct Mount Series 94D for small bores.",
  series: [
    {
      name: "Series 93",
      image: FLG + "eco.gif",
      specs: [
        ["Design", "2-piece economical flanged ball valve"],
        ["Port", "Full port"],
        ["Size", '5" – 12"'],
        ["Pressure", "ANSI Class 150/300, PN16/40, JIS 10K/20K"],
        ["Body", "CF8M / WCB / Special Alloy"],
        ["Seats", "PTFE / RTFE (Metal seat optional)"],
      ],
      href: "/series/46",
      action: "configure" as const,
    },
    {
      name: "Series 94D",
      image: FLG + "series94d.jpg",
      specs: [
        ["Design", "2-piece economical flanged ball valve, Direct Mount"],
        ["Port", "Full port"],
        ["Size", '1/2" – 4"'],
        ["Pressure", "ANSI Class 150, PN16"],
        ["Body", "CF8M / WCB"],
        ["Seats", "PTFE / RTFE"],
      ],
      href: "/series/47",
      action: "configure" as const,
    },
  ],
});

// High-performance 2-piece flanged sub-page: Series 90 and 90D. These are the
// same fire-safe flanged valves shown on the fire-safe page (/series/44, /14) —
// one series, two families, like Mars's own site.
SERIES_FAMILIES.push({
  categoryId: "flanged-ball-valves",
  productId: "high-performance-two-piece-flanged-ball-valve",
  title: "High Performance 2-Piece Flanged Ball Valves",
  kind: "Flanged",
  intro:
    "Heavy-duty 2-piece full-port flanged ball valves for demanding process service — fire-safe to API 607, in ANSI, DIN and JIS flange ratings.",
  series: [
    {
      name: "Series 90",
      image: IMG + "fire-safe-ball-valves/series-90.png",
      specs: flangedSpecs('1/2" – 4"', "ANSI Class 150/300, PN16/40", "Full port", "2-piece fire safe flanged"),
      href: "/series/44",
      action: "configure" as const,
    },
    {
      name: "Series 90D",
      image: IMG + "fire-safe-ball-valves/series-90d.jpg",
      specs: flangedSpecs('1/2" – 12"', "ANSI Class 150/300, PN16/40, JIS 10K/20K", "Full port", "2-piece fire safe flanged"),
      href: "/series/14",
      action: "configure" as const,
    },
  ],
});

// Wafer-type flanged sub-page: Series 99 (already in the DB as /series/15) plus
// the two new wafer series F98A (ISO 15848-1) and F98 (fire-safe, direct mount).
SERIES_FAMILIES.push({
  categoryId: "flanged-ball-valves",
  productId: "wafer-type-flanged-ball-valve",
  title: "Wafer Type Flanged Ball Valves",
  kind: "Flanged",
  intro:
    "Compact wafer-type ball valves for space-constrained installations — ISO 5211 direct-mount pads, in ANSI and DIN flange ratings.",
  series: [
    {
      name: "Series 99",
      image: "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/series-99.png",
      specs: [
        ["Design", "1-piece compact wafer ball valve"],
        ["Port", "Full port"],
        ["Size", '1/2" – 4"'],
        ["Pressure", "PN16/40, PN25/40"],
        ["Body", "CF8M"],
        ["Seats", "PTFE / RPTFE"],
      ],
      href: "/series/15",
      action: "configure" as const,
    },
    {
      name: "Series F98A, ISO 15848-1",
      image: FLG + "series-98fa.jpg",
      specs: [
        ["Design", "Wafer type ball valve"],
        ["Port", "Full port"],
        ["Size", '1/2" – 4"'],
        ["Pressure", "PN10/40"],
        ["Body", "1.4408 / 1.0619"],
        ["Seats", "PTFE / RTFE"],
        ["Emissions", "ISO 15848-1 certified"],
      ],
      href: "/series/48",
      action: "configure" as const,
    },
    {
      name: "Series F98, Fire Safe",
      image: FLG + "series-98.jpg",
      specs: [
        ["Design", "Wafer type Direct Mount ball valve"],
        ["Port", "Full port"],
        ["Size", '1/2" – 4"'],
        ["Pressure", "PN16"],
        ["Body", "1.4408 / 1.0619"],
        ["Seats", "PTFE / RTFE"],
        ["Fire safe", "Conforms to B16.34"],
      ],
      href: "/series/49",
      action: "configure" as const,
    },
  ],
});

// 3-piece flanged sub-page: high-pressure Series F85 (ANSI #2500) plus the two
// fire-safe + ISO 15848-1 direct-mount series F88 (#600/#900) and F89 (#1500).
SERIES_FAMILIES.push({
  categoryId: "flanged-ball-valves",
  productId: "three-piece-flanged-ball-valve",
  title: "3-Piece Flanged Ball Valves",
  kind: "Flanged",
  intro:
    "Fully maintainable 3-piece flanged ball valves for high-pressure process service — fire-safe and ISO 15848-1 options, in ANSI Class 600 to 2500.",
  series: [
    {
      name: "Series F85",
      image: FLG + "3-piece.jpg",
      specs: [
        ["Design", "3-piece flanged ball valve, high pressure"],
        ["Port", "Full port"],
        ["Size", '1/2" – 2"'],
        ["Pressure", "ANSI #2500"],
        ["Body", "CF8M"],
        ["Seats", "Delrin / Peek"],
      ],
      href: "/series/50",
      action: "configure" as const,
    },
    {
      name: "Series F88, Fire Safe",
      image: FLG + "series-f88.jpg",
      specs: [
        ["Design", "3-piece Direct Mount flanged ball valve"],
        ["Port", "Full port"],
        ["Size", '1/2" – 4"'],
        ["Pressure", "ANSI #600 / #900"],
        ["Body", "CF8M / WCB / Special Alloy"],
        ["Seats", "Delrin / Peek / TFM1600"],
        ["Certified", "Fire-safe, ISO 15848-1"],
      ],
      href: "/series/51",
      action: "configure" as const,
    },
    {
      name: "Series F89, Fire Safe",
      image: FLG + "series-f89.jpg",
      specs: [
        ["Design", "3-piece Direct Mount flanged ball valve"],
        ["Port", "Full port"],
        ["Size", '1/2" – 3"'],
        ["Pressure", "ANSI #1500"],
        ["Body", "CF8M / WCB"],
        ["Seats", "Delrin / Peek"],
        ["Certified", "Fire-safe, ISO 15848-1"],
      ],
      href: "/series/52",
      action: "configure" as const,
    },
  ],
});

// Steam-jacketed 2-piece flanged sub-page: Series 90J (1/2"-4") and 90DJ (1/2"-8").
SERIES_FAMILIES.push({
  categoryId: "flanged-ball-valves",
  productId: "steam-jacketed-flanged-ball-valve",
  title: "Steam Jacketed Flanged Ball Valves",
  kind: "Flanged",
  intro:
    "Steam-jacketed 2-piece flanged ball valves for high-temperature viscous media — full port, in ANSI, DIN and JIS flange ratings.",
  series: [
    {
      name: "Series 90J",
      image: FLG + "series-90j.jpg",
      specs: [
        ["Design", "2-piece steam jacketed flanged ball valve"],
        ["Port", "Full port"],
        ["Size", '1/2" – 4"'],
        ["Pressure", "ANSI Class 150/300, PN16/40, JIS 5K"],
        ["Body", "CF8M"],
        ["Seats", "25% carbon + PTFE"],
      ],
      href: "/series/53",
      action: "configure" as const,
    },
    {
      name: "Series 90DJ",
      image: FLG + "series-90dj.jpg",
      specs: [
        ["Design", "2-piece steam jacketed flanged ball valve"],
        ["Port", "Full port"],
        ["Size", '1/2" – 8"'],
        ["Pressure", "ANSI Class 150/300, PN16/40, JIS 10K/20K"],
        ["Body", "CF8M"],
        ["Seats", "25% carbon + PTFE"],
      ],
      href: "/series/54",
      action: "configure" as const,
    },
    {
      name: "Series 91DJ",
      image: FLG + "series-91dj.jpg",
      specs: [
        ["Design", "Uni-body steam jacketed flanged ball valve"],
        ["Port", "Reduced port"],
        ["Size", '1/2" – 6"'],
        ["Pressure", "ANSI Class 150/300"],
        ["Body", "CF8M"],
        ["Seats", "25% carbon + PTFE"],
      ],
      href: "/series/55",
      action: "configure" as const,
    },
    {
      name: "Series 99J",
      image: FLG + "series-99j.jpg",
      specs: [
        ["Design", "Wafer type steam jacketed compact ball valve"],
        ["Port", "Full port"],
        ["Size", '1/2" – 4"'],
        ["Pressure", "ANSI Class 150, PN16/40"],
        ["Body", "CF8M"],
        ["Seats", "25% carbon + PTFE"],
      ],
      href: "/series/56",
      action: "configure" as const,
    },
  ],
});

// Cryogenic ball valves: a new category. Sub-types are Flanged (Series CG9) and
// 3-piece. The cryogenic photos live on the ball-valves/cyrogenic/ blob path.
const CRYO_IMG = "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/cyrogenic/c1.jpg";
const CRYO = "/products/cryogenic-ball-valves";

SERIES_FAMILIES.push({
  categoryId: "cryogenic-ball-valves",
  title: "Cryogenic Ball Valves",
  kind: "Cryogenic",
  intro:
    "Cryogenic ball valves for liquefied-gas and low-temperature service down to -196°C, with blow-out-proof stems and ISO 5211 direct-mount pads.",
  series: [
    {
      name: "Flanged",
      image: CRYO_IMG,
      specs: [
        ["Design", "2-piece cryogenic flanged ball valve"],
        ["Port", "Full port"],
        ["Size", '1/2" – 4"'],
        ["Temperature", "-196 to +95°C"],
        ["Body", "CF8M"],
        ["Seats", "PCTFE"],
      ],
      href: `${CRYO}/flanged-ball-valve`,
      action: "view" as const,
    },
    {
      name: "3-Piece",
      image: "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/cyrogenic/84c.jpg",
      specs: [
        ["Design", "3-piece cryogenic ball valve"],
        ["Port", "Full port"],
        ["Size", '1/4" – 4"'],
        ["Temperature", "-196 to +95°C"],
        ["Body", "CF8M (alloys on request)"],
        ["Seats", "TFM4215 / PCTFE"],
      ],
      href: `${CRYO}/three-piece-ball-valve`,
      action: "view" as const,
    },
  ],
});

// Cryogenic → Flanged sub-page: Series CG9-10/30/40.
SERIES_FAMILIES.push({
  categoryId: "cryogenic-ball-valves",
  productId: "flanged-ball-valve",
  title: "Cryogenic Flanged Ball Valves",
  kind: "Cryogenic",
  intro:
    "2-piece cryogenic flanged ball valves with an ISO 5211 direct-mount pad and a blow-out-proof stem, rated to -196°C.",
  series: [
    {
      name: "Series CG9-10/30/40",
      image: CRYO_IMG,
      specs: [
        ["Design", "2-piece cryogenic flanged ball valve"],
        ["Port", "Full port"],
        ["Mount", "ISO 5211 Direct Mount"],
        ["Size", '1/2" – 4"'],
        ["Pressure", "ANSI #150, PN10/16, PN40"],
        ["Body", "CF8M"],
        ["Seats", "PCTFE"],
        ["Temperature", "-196 to +95°C"],
      ],
      href: "/series/67",
      action: "configure" as const,
    },
    {
      name: "Series 94C-10/20/30/40",
      image: "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/cyrogenic/3-piece.jpg",
      specs: [
        ["Design", "2-piece cryogenic flanged ball valve"],
        ["Port", "Full port"],
        ["Mount", "ISO 5211"],
        ["Size", '1/2" – 4"'],
        ["Pressure", "ANSI #150/#300, PN16, PN40"],
        ["Body", "CF8M (alloys on request)"],
        ["Seats", "TFM4215 / PCTFE"],
        ["Temperature", "-196 to +95°C"],
      ],
      href: "/series/68",
      action: "configure" as const,
    },
  ],
});

// Cryogenic → 3-Piece sub-page: Series 84C-10/20/30.
SERIES_FAMILIES.push({
  categoryId: "cryogenic-ball-valves",
  productId: "three-piece-ball-valve",
  title: "Cryogenic 3-Piece Ball Valves",
  kind: "Cryogenic",
  intro:
    "3-piece cryogenic ball valves with ISO 5211 mounting pads and blow-out-proof stems, for threaded or welded lines down to -196°C.",
  series: [
    {
      name: "Series 84C-10/20/30",
      image: "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/cyrogenic/84c.jpg",
      specs: [
        ["Design", "3-piece cryogenic ball valve"],
        ["Port", "Full port"],
        ["Mount", "ISO 5211"],
        ["Size", '1/4" – 4"'],
        ["Ends", "Threaded, Socket Weld, Butt Weld"],
        ["Body", "CF8M (alloys on request)"],
        ["Seats", "TFM4215 / PCTFE"],
        ["Temperature", "-196 to +95°C"],
      ],
      href: "/series/69",
      action: "configure" as const,
    },
    {
      name: "Series 89C-10/20/30/60",
      image: "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/cyrogenic/series-89c.jpg",
      specs: [
        ["Design", "3-piece cryogenic ball valve"],
        ["Port", "Full port"],
        ["Mount", "ISO 5211"],
        ["Size", '1/2" – 4"'],
        ["Ends", "Threaded, SW, BW, Flanged"],
        ["Pressure", "2250 PSI · ANSI #150/300/600"],
        ["Body", "CF8M / WCB"],
        ["Seats", "PCTFE / Metal seat"],
        ["Temperature", "-196 to +120°C"],
      ],
      href: "/series/70",
      action: "configure" as const,
    },
  ],
});

export const findFamily = (categoryId: string, productId?: string) =>
  SERIES_FAMILIES.find((f) => f.categoryId === categoryId && f.productId === productId);

/** The range's "All Models" table, or null when it has none. */
export const familyModelsHref = (f: SeriesFamily): string | null =>
  f.noModelsPage ? null : `/products/${f.categoryId}${f.productId ? `/${f.productId}` : ""}/variants`;

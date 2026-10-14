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
    series: [
      { name: "Series 24, 3000PSI, DM", image: IMG + "high-pressure-two-piece-ball-valve/series-24.jpg", specs: [["Design", "2-piece Direct Mount design Ball Valve"], ["Port", "Reduced port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "3000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "Delrin / Peek"], ["Ends", "Female x Female/Male x Male thread (NPT, BSP, BSPT)"]], href: "/products/two-piece-ball-valves/high-pressure-two-piece-ball-valve/variants/series-24", action: "view" },
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
      { name: "Series 55", image: IMG + "economical-three-piece-ball-valve/series-55.jpg", specs: [["Design", "3-piece economical ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 4\""], ["Pressure", "1000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE (others on request)"], ["Ends", "Threaded, Butt weld, Socket weld"]], href: "/products/three-piece-ball-valves/economical-three-piece-ball-valve/variants/series-55", action: "view" },
      { name: "Series 55A", image: IMG + "economical-three-piece-ball-valve/series-55a.jpg", specs: [["Design", "3-piece economical ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 4\""], ["Pressure", "1000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE (others on request)"], ["Ends", "Threaded, Butt weld, Socket weld"]], href: "/products/three-piece-ball-valves/economical-three-piece-ball-valve/variants/series-55a", action: "view" },
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
      { name: "Series F86A, 7500PSI", image: IMG + "high-performance-three-piece-ball-valve/series-f86a.jpg", specs: [["Design", "3-piece fire safe ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "7500 PSI"], ["Body", "CF8M / WCB"], ["Seats", "Delrin / Peek"], ["Ends", "Threaded, Butt weld, Socket weld"]], action: "quote" },
    ],
  },
  {
    categoryId: "three-piece-ball-valves",
    productId: "steam-jacketed-three-piece-ball-valve",
    title: "Steam Jacketed 3-Piece Ball Valves",
    kind: "3-piece",
    intro: "Three-piece ball valves with a steam jacket for media that must stay hot to flow, such as bitumen, resins and adhesives.",
    series: [
      { name: "Series 83J", image: IMG + "steam-jacketed-three-piece-ball-valve/series-83j.jpg", specs: [["Design", "3-piece design steam jacketed ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "2000 PSI"], ["Body", "CF8M"], ["Seats", "25% carbon+PTFE"], ["Ends", "Threaded, Butt weld, Socket weld, Flanged, Extended BW, ISO orbital welding"], ["Fire safe", "API 607, 7th Edition"]], href: "/products/three-piece-ball-valves/steam-jacketed-three-piece-ball-valve/variants/series-83j", action: "view" },
      { name: "Series 88J", image: IMG + "steam-jacketed-three-piece-ball-valve/series-88j.jpg", specs: [["Design", "3-piece design steam jacketed ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 1 1/2\""], ["Pressure", "2000 PSI"], ["Body", "CF8M"], ["Seats", "25% carbon+PTFE"], ["Ends", "Threaded, Butt weld, Socket weld, Flanged, Extended BW, ISO orbital welding"], ["Fire safe", "API 607, 7th Edition"]], href: "/products/three-piece-ball-valves/steam-jacketed-three-piece-ball-valve/variants/series-88j", action: "view" },
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
      { name: "Series 38", image: IMG + "three-way-multi-port-ball-valve/series-38.jpg", specs: [["Design", "3-way threaded ball valve"], ["Port", "Reduced port"], ["Ports", "L port, T port"], ["Size", "1/4\" – 3\""], ["Pressure", "1000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE/RTFE (others on request)"], ["Ends", "NPT, BSP, BSPT"]], action: "quote" },
      { name: "Series 39, SIL3", image: IMG + "three-way-multi-port-ball-valve/series-39.png", specs: [["Design", "3-way threaded ball valve"], ["Port", "Full port & Reduced port"], ["Ports", "L port, T port"], ["Size", "1/4\" – 2\""], ["Pressure", "1000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE/RTFE (others on request)"], ["Ends", "NPT, BSP, BSPT"]], action: "quote" },
      { name: "Series F36-40", image: IMG + "three-way-multi-port-ball-valve/series-f36-40.jpg", specs: [["Design", "4-way Direct Mount ball valve"], ["Port", "Full port & Reduced port"], ["Ports", "L port, LL port, T port"], ["Size", "1/4\" – 2\""], ["Pressure", "1000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE/RTFE (cavity filler seat on request)"], ["Ends", "Threaded"]], action: "quote" },
      { name: "Series F36-60", image: IMG + "three-way-multi-port-ball-valve/series-f36-60.jpg", specs: [["Design", "3-way Bottom Entry ball valve"], ["Port", "Reduced port"], ["Ports", "L port, T port"], ["Size", "1/4\" – 3\""], ["Pressure", "1000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE"], ["Ends", "NPT, BSP, BSPT"]], action: "quote" },
    ],
  },
  {
    categoryId: "multi-port-ball-valves",
    productId: "three-four-five-way-ball-valve",
    title: "3/4/5-Way Ball Valves",
    kind: "Multi-port",
    intro: "Flanged and threaded 3, 4 and 5-way ball valves, from compact direct-mount designs to trunnion-mounted 12\" valves.",
    series: [
      { name: "Series 30", image: IMG + "three-four-five-way-ball-valve/series-30.png", specs: [["Design", "3-way, 4-way flanged ball valve"], ["Port", "Full port"], ["Ports", "L port, T port, X port"], ["Size", "1 1/2\" – 12\""], ["Pressure", "ANSI Class 150, Class 300, PN16/40"], ["Body", "CF8M/ WCB"], ["Seats", "PTFE/RTFE (others on request)"]], action: "quote" },
      { name: "Series 30M, SIL3", image: IMG + "three-four-five-way-ball-valve/series-30m.jpg", specs: [["Design", "3-way flanged ball valve"], ["Port", "Full port"], ["Ports", "L port, T port"], ["Size", "1 1/2\" – 6\""], ["Pressure", "ANSI Class 150, Class 300, PN10/16, PN25/40"], ["Body", "CF8M/ WCB"], ["Seats", "PTFE/RTFE (others on request)"]], action: "quote" },
      { name: "Series 33, SIL3", image: IMG + "three-four-five-way-ball-valve/series-33.png", specs: [["Design", "3-way, 4-way, 5-way ball valve"], ["Port", "Full port"], ["Ports", "L port, T port, I port, X port, LL port, TT Port"], ["Size", "1/4\" – 4\""], ["Pressure", "ANSI Class 150, Class 300, PN16/40"], ["Body", "CF8M"], ["Seats", "PTFE/RTFE (others on request)"], ["Ends", "Flanged, Threaded, Socket weld, Butt weld"]], href: "/series/6", action: "configure" },
      { name: "Series 36", image: IMG + "three-four-five-way-ball-valve/series-36.jpg", specs: [["Design", "3-way, 4-way ball valve"], ["Port", "Full port & Reduced port"], ["Ports", "L port, T port, I port, X port"], ["Size", "1/4\" – 12\""], ["Pressure", "ANSI Class 150, Class 300, PN16/40"], ["Body", "CF8M/ WCB"], ["Seats", "PTFE/RTFE (others on request)"], ["Ends", "Flanged, Threaded, Socket weld, Butt weld"]], action: "quote" },
      { name: "Series F35", image: IMG + "three-four-five-way-ball-valve/series-f35.jpg", specs: [["Design", "5-way Direct Mount ball valve"], ["Port", "Full port"], ["Ports", "L port, T port, X port"], ["Size", "1/2\" – 2\""], ["Pressure", "ANSI Class150,PN16/40, JIS10K"], ["Body", "CF8M"], ["Seats", "PTFE/RTFE/ TFM1600"], ["Ends", "Flanged end"]], action: "quote" },
      { name: "Series F51, 3000PSI", image: IMG + "three-four-five-way-ball-valve/series-f51.jpg", specs: [["Design", "3/4-way Direct Mount ball valve"], ["Port", "Full port"], ["Ports", "L port, T port, X port, I port"], ["Size", "1/4\" – 2\""], ["Pressure", "3000 PSI"], ["Body", "CF8M/ WCB (Special Alloy: Hastelloy C/ Alloy 20/ Super Duplex/ Monel on request)"], ["Seats", "TFM4215/ Peek (cavity filler seat on request)"], ["Ends", "Threaded/ Socket weld/ Butt weld"]], action: "quote" },
      { name: "Series F52, ANSI#600/900/1500", image: IMG + "three-four-five-way-ball-valve/series-f52.jpg", specs: [["Design", "3/4-way Direct Mount ball valve"], ["Port", "Full port"], ["Ports", "L port, T port, X port, I port"], ["Size", "1/2\" – 2\""], ["Pressure", "ANSI#600/900/1500"], ["Body", "CF8M/ WCB (Special Alloy: Hastelloy C/ Alloy 20/ Super Duplex/ Monel on request)"], ["Seats", "TFM1600/TFM4215/ Peek (cavity filler seat on request)"], ["Ends", "Flanged end"]], action: "quote" },
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
      { name: "Series 38", image: IMG + "three-way-multi-port-ball-valve/series-38.jpg", specs: [["Design", "3-way threaded ball valve"], ["Port", "Reduced port"], ["Ports", "L port, T port"], ["Size", "1/4\" – 3\""], ["Pressure", "1000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE/RTFE (others on request)"], ["Ends", "NPT, BSP, BSPT"]], action: "quote" },
      { name: "Series 39, SIL3", image: IMG + "three-way-multi-port-ball-valve/series-39.png", specs: [["Design", "3-way threaded ball valve"], ["Port", "Full port & Reduced port"], ["Ports", "L port, T port"], ["Size", "1/4\" – 2\""], ["Pressure", "1000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE/RTFE (others on request)"], ["Ends", "NPT, BSP, BSPT"]], action: "quote" },
      { name: "Series F36-40", image: IMG + "three-way-multi-port-ball-valve/series-f36-40.jpg", specs: [["Design", "4-way Direct Mount ball valve"], ["Port", "Full port & Reduced port"], ["Ports", "L port, LL port, T port"], ["Size", "1/4\" – 2\""], ["Pressure", "1000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE/RTFE (cavity filler seat on request)"], ["Ends", "Threaded"]], action: "quote" },
      { name: "Series F36-60", image: IMG + "three-way-multi-port-ball-valve/series-f36-60.jpg", specs: [["Design", "3-way Bottom Entry ball valve"], ["Port", "Reduced port"], ["Ports", "L port, T port"], ["Size", "1/4\" – 3\""], ["Pressure", "1000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE"], ["Ends", "NPT, BSP, BSPT"]], action: "quote" },
      { name: "Series 30", image: IMG + "three-four-five-way-ball-valve/series-30.png", specs: [["Design", "3-way, 4-way flanged ball valve"], ["Port", "Full port"], ["Ports", "L port, T port, X port"], ["Size", "1 1/2\" – 12\""], ["Pressure", "ANSI Class 150, Class 300, PN16/40"], ["Body", "CF8M/ WCB"], ["Seats", "PTFE/RTFE (others on request)"]], action: "quote" },
      { name: "Series 30M, SIL3", image: IMG + "three-four-five-way-ball-valve/series-30m.jpg", specs: [["Design", "3-way flanged ball valve"], ["Port", "Full port"], ["Ports", "L port, T port"], ["Size", "1 1/2\" – 6\""], ["Pressure", "ANSI Class 150, Class 300, PN10/16, PN25/40"], ["Body", "CF8M/ WCB"], ["Seats", "PTFE/RTFE (others on request)"]], action: "quote" },
      { name: "Series 33, SIL3", image: IMG + "three-four-five-way-ball-valve/series-33.png", specs: [["Design", "3-way, 4-way, 5-way ball valve"], ["Port", "Full port"], ["Ports", "L port, T port, I port, X port, LL port, TT Port"], ["Size", "1/4\" – 4\""], ["Pressure", "ANSI Class 150, Class 300, PN16/40"], ["Body", "CF8M"], ["Seats", "PTFE/RTFE (others on request)"], ["Ends", "Flanged, Threaded, Socket weld, Butt weld"]], href: "/series/6", action: "configure" },
      { name: "Series 36", image: IMG + "three-four-five-way-ball-valve/series-36.jpg", specs: [["Design", "3-way, 4-way ball valve"], ["Port", "Full port & Reduced port"], ["Ports", "L port, T port, I port, X port"], ["Size", "1/4\" – 12\""], ["Pressure", "ANSI Class 150, Class 300, PN16/40"], ["Body", "CF8M/ WCB"], ["Seats", "PTFE/RTFE (others on request)"], ["Ends", "Flanged, Threaded, Socket weld, Butt weld"]], action: "quote" },
      { name: "Series F35", image: IMG + "three-four-five-way-ball-valve/series-f35.jpg", specs: [["Design", "5-way Direct Mount ball valve"], ["Port", "Full port"], ["Ports", "L port, T port, X port"], ["Size", "1/2\" – 2\""], ["Pressure", "ANSI Class150,PN16/40, JIS10K"], ["Body", "CF8M"], ["Seats", "PTFE/RTFE/ TFM1600"], ["Ends", "Flanged end"]], action: "quote" },
      { name: "Series F51, 3000PSI", image: IMG + "three-four-five-way-ball-valve/series-f51.jpg", specs: [["Design", "3/4-way Direct Mount ball valve"], ["Port", "Full port"], ["Ports", "L port, T port, X port, I port"], ["Size", "1/4\" – 2\""], ["Pressure", "3000 PSI"], ["Body", "CF8M/ WCB (Special Alloy: Hastelloy C/ Alloy 20/ Super Duplex/ Monel on request)"], ["Seats", "TFM4215/ Peek (cavity filler seat on request)"], ["Ends", "Threaded/ Socket weld/ Butt weld"]], action: "quote" },
      { name: "Series F52, ANSI#600/900/1500", image: IMG + "three-four-five-way-ball-valve/series-f52.jpg", specs: [["Design", "3/4-way Direct Mount ball valve"], ["Port", "Full port"], ["Ports", "L port, T port, X port, I port"], ["Size", "1/2\" – 2\""], ["Pressure", "ANSI#600/900/1500"], ["Body", "CF8M/ WCB (Special Alloy: Hastelloy C/ Alloy 20/ Super Duplex/ Monel on request)"], ["Seats", "TFM1600/TFM4215/ Peek (cavity filler seat on request)"], ["Ends", "Flanged end"]], action: "quote" },
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
      href: `${FS}/series-90`,
      action: "view" as const,
    },
    {
      name: "Series 90D",
      image: IMG + "fire-safe-ball-valves/series-90d.jpg",
      specs: flangedSpecs('1/2" – 12"', "ANSI Class 150/300, PN16/40, JIS 10K/20K", "Full port", "2-piece fire safe flanged"),
      href: `${FS}/series-90d`,
      action: "view" as const,
    },
    {
      name: "Series 91D",
      image: IMG + "fire-safe-ball-valves/series-91d.png",
      specs: flangedSpecs('1/2" – 6"', "ANSI Class 150/300", "Reduced port", "Uni-body fire safe flanged"),
      href: `${FS}/series-91d`,
      action: "view" as const,
    },
  ].filter((s): s is FamilySeries => Boolean(s)),
});

export const findFamily = (categoryId: string, productId?: string) =>
  SERIES_FAMILIES.find((f) => f.categoryId === categoryId && f.productId === productId);

/** The range's "All Models" table, or null when it has none. */
export const familyModelsHref = (f: SeriesFamily): string | null =>
  f.noModelsPage ? null : `/products/${f.categoryId}${f.productId ? `/${f.productId}` : ""}/variants`;

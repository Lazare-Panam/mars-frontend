// Series shown on each category page (/products/{category} or
// /products/{category}/{product}), mirroring Mars Valve Co.'s own listings.
// Edit this file to add, remove or reorder series; the page updates itself.
//
//   name   — series name as Mars lists it ("Series 22, SIL3"); tags after the
//            first comma become pills (DM = direct mount, FS = fire safe)
//   image  — photo URL (Mars's site; swap for our blob storage when uploaded)
//   specs  — [label, value] rows shown on the card, from Mars's series pages
//   href   — where the card goes; omit to send people to a quote request
//   action — "configure" | "view" | "models" | "quote" (button wording)

const M = "https://www.marsvalve.com.tw/_i/assets/";

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
  series: FamilySeries[];
};

export const SERIES_FAMILIES: SeriesFamily[] = [
  {
    categoryId: "one-piece-ball-valves",
    title: "One-Piece Ball Valves",
    kind: "One-piece",
    intro: "Compact, high-pressure stainless steel one-piece ball valves. Choose a series to configure sizes, ends and options.",
    series: [
      { name: "Series 10-10", image: M + "thumb/product/1000x652_c623263a6af4a3524daf73e0d8449200.png", href: "/series/4", specs: [["Design", "1-piece design ball valve"], ["Port", "Reduced port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "800 PSI"], ["Body", "SS316 (CF8M)"], ["Seats", "PTFE"], ["Ends", "NPT, BSP, BSPT"]], action: "configure" },
      { name: "Series 10-30", image: M + "thumb/product/1000x652_aca7f664b13af46f86db1ac61930983a.png", specs: [["Design", "1-piece design ball valve"], ["Port", "Reduced port"], ["Size", "1/4\" \u2013 1\""], ["Pressure", "800 PSI"], ["Body", "CF8M"], ["Seats", "PTFE"], ["Ends", "NPT, BSP, BSPT"]], href: "/products/one-piece-ball-valves/one-piece-ball-valves/variants/series-10-30", action: "view" },
      { name: "Series 10-40", image: M + "thumb/product/1000x652_photo_b_32_133894838027.jpg", specs: [["Design", "1-piece design ball valve"], ["Port", "Reduced port"], ["Size", "1/8\" \u2013 1/2\""], ["Pressure", "PN50"], ["Body", "CF8M"], ["Seats", "PTFE"], ["Ends", "NPT, BSP, BSPT (female-female thread)"]], href: "/products/one-piece-ball-valves/one-piece-ball-valves/variants/series-10-40", action: "view" },
      { name: "Series 10-50", image: M + "thumb/product/1000x652_photo_b_31_133894831900.jpg", specs: [["Design", "1-piece design ball valve"], ["Port", "Reduced port"], ["Size", "1/8\" \u2013 1/2\""], ["Pressure", "PN50"], ["Body", "CF8M"], ["Seats", "PTFE"], ["Ends", "NPT, BSP, BSPT (female-male thread)"]], href: "/products/one-piece-ball-valves/one-piece-ball-valves/variants/series-10-50", action: "view" },
      { name: "Series F10-20, Direct Mount", image: M + "upload/product/0fd6313ee500dd6e48bae4a595db9ee4.jpg", specs: [["Design", "1-piece direct mount ball valve"], ["Port", "Reduced port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "1000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE"], ["Ends", "NPT, BSP, BSPT"]], href: "/products/one-piece-ball-valves/one-piece-ball-valves/variants/series-f10-20", action: "view" },
      { name: "Series F10-30", image: M + "upload/product/52e698b4ffc7ad1645aab4939ad8b9d8.png", specs: [["Design", "1-piece design ball valve"], ["Port", "Reduced port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "1000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE / TFM1600"], ["Ends", "NPT, BSP, BSPT"]], href: "/products/one-piece-ball-valves/one-piece-ball-valves/variants/series-f10-30", action: "view" },
      { name: "Series F10-50, 2000PSI", image: M + "upload/product/e994a28cd630c91440090d1736e6e5f1.png", specs: [["Design", "1-piece design ball valve"], ["Port", "Reduced port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "2000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE / RTFE"], ["Ends", "NPT, BSP, BSPT"]], href: "/products/one-piece-ball-valves/one-piece-ball-valves/variants/series-f10-50", action: "view" },
      { name: "Series F10-60, Fire Safe", image: M + "upload/product/4d23633e9bbd9b1277270123a6cab686.JPG", specs: [["Design", "1-piece fire safe ball valve"], ["Port", "Reduced port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "2000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE"], ["Ends", "NPT, BSP, BSPT"], ["Fire safe", "API 607,4th Edition"]], href: "/products/one-piece-ball-valves/one-piece-ball-valves/variants/series-f10-60", action: "view" },
    ],
  },
  {
    categoryId: "two-piece-ball-valves",
    productId: "economical-two-piece-ball-valve",
    title: "Economical 2-Piece Ball Valves",
    kind: "2-piece",
    intro: "Cost-effective two-piece stainless steel ball valves for general industrial service.",
    series: [
      { name: "Series 20-10", image: M + "thumb/product/1000x652_photo_b_20_133894668579.jpg", specs: [["Design", "2-piece design ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "1000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE / RTFE"], ["Ends", "NPT, BSP, BSPT"]], href: "/products/two-piece-ball-valves/economical-two-piece-ball-valve/variants/series-20-10", action: "view" },
      { name: "Series 20-20", image: M + "thumb/product/1000x652_photo_b_21_133894729653.jpg", href: "/series/5", specs: [["Design", "2-piece design ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 4\""], ["Pressure", "1000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE"], ["Ends", "NPT, BSP, BSPT"]], action: "configure" },
      { name: "Series 20-30", image: M + "upload/product/9df470cd2fdb4bef9f7f57a7f9c0fec8.jpg", specs: [["Design", "2-piece design ball valve"], ["Port", "Reduced port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "2000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE"], ["Ends", "NPT, BSP, BSPT"]], href: "/products/two-piece-ball-valves/economical-two-piece-ball-valve/variants/series-20-30", action: "view" },
      { name: "Series 20-40", image: M + "thumb/product/1000x652_photo_b_23_133894744134.jpg", href: "/series/1", specs: [["Design", "2-piece design ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "2000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE"], ["Ends", "NPT, BSP, BSPT"]], action: "configure" },
      { name: "Series F20B-2C, B16.34", image: M + "upload/product/82ecc63c029b2ea1a81f911be4680d43.jpg", specs: [["Design", "2-piece B16.34 design ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 4\""], ["Pressure", "1000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE"], ["Ends", "NPT, BSP, BSPT"]], action: "quote" },
      { name: "Series F20B-3C, B16.34", image: M + "upload/product/8a1c0e5862ea1db2e02fd12b79e2c3e7.jpg", specs: [["Design", "2-piece B16.34 design ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "2000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE"], ["Ends", "NPT, BSP, BSPT"]], href: "/products/two-piece-ball-valves/economical-two-piece-ball-valve/variants/series-f20b-3c", action: "view" },
      { name: "Series F20-60", image: M + "upload/product/ccfee06b02db90b84bef6ee90146dc30.jpg", specs: [["Design", "2-piece design ball valve"], ["Port", "Full port / Reduced port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "1000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE / RTFE"], ["Ends", "Male x Male Threaded (NPT, BSP, BSPT)"]], href: "/products/two-piece-ball-valves/economical-two-piece-ball-valve/variants/series-f20-60", action: "view" },
    ],
  },
  {
    categoryId: "two-piece-ball-valves",
    productId: "high-performance-two-piece-ball-valve",
    title: "High Performance 2-Piece Ball Valves",
    kind: "2-piece",
    intro: "High performance two-piece ball valves for demanding process applications, including direct-mount and fire-safe series.",
    series: [
      { name: "Series 22, SIL3", image: M + "thumb/product/1000x652_f29c20cb0f15177b7b2dcd9cb9cad9d6.png", href: "/series/3", specs: [["Design", "2-piece direct mount ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 3\""], ["Pressure", "1000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE"], ["Ends", "NPT, BSP, BSPT"]], action: "configure" },
      { name: "Series 28", image: M + "thumb/product/1000x652_photo_b_19_133894659638.jpg", specs: [["Design", "2-piece fire safe ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 3\""], ["Pressure", "1000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE (others on request)"], ["Ends", "NPT, BSP, BSPT"], ["Fire safe", "API 607, 7th Edition"]], href: "/products/two-piece-ball-valves/high-performance-two-piece-ball-valve/variants/series-28", action: "view" },
      { name: "Series 20-50", image: M + "thumb/product/1000x652_photo_b_17_133894640696.jpg", specs: [["Design", "2-piece design ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 3\""], ["Pressure", "1000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE (others on request)"], ["Ends", "NPT, BSP, BSPT"]], href: "/products/two-piece-ball-valves/high-performance-two-piece-ball-valve/variants/series-20-50", action: "view" },
      { name: "Series F20-80, 1500PSI, DM", image: M + "thumb/product/1000x652_e89ae6c48176c47d2878d6ae88239138.jpg", specs: [["Design", "2-piece Direct Mount design ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "1500 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE / TFM1600"], ["Ends", "NPT, BSP, BSPT"]], href: "/products/two-piece-ball-valves/high-performance-two-piece-ball-valve/variants/series-f20-80", action: "view" },
      { name: "Series F21-10, SRS Handle", image: M + "upload/product/23b4f707fbbb0bcd23dd887350b41fba.jpg", specs: [["Design", "2-piece design ball valve with SRS Handle"], ["Port", "Full port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "2000 PSI"], ["Body", "CF8M"], ["Seats", "RTFE"], ["Ends", "NPT, BSP, BSPT"]], href: "/products/two-piece-ball-valves/high-performance-two-piece-ball-valve/variants/series-f21-10", action: "view" },
      { name: "Series F21-20, Fire Safe", image: M + "thumb/product/1000x652_0b22170a0efeff4e287252863e197ab4.jpg", specs: [["Design", "2-piece Fire Safe ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 4\""], ["Pressure", "2000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE"], ["Ends", "NPT, BSP, BSPT"], ["Fire safe", "API 607, 6th Edition"]], href: "/products/two-piece-ball-valves/high-performance-two-piece-ball-valve/variants/series-f21-20", action: "view" },
      { name: "Series F201D, 1000PSI, DM", image: M + "thumb/product/1000x652_289ab0bc4c27cfb52b83e9e7b13c78d4.jpg", specs: [["Design", "2-piece Direct Mount design ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 4\""], ["Pressure", "1000 PSI"], ["Body", "CF8M"], ["Seats", "PTFE"], ["Ends", "NPT, BSP, BSPT"]], action: "quote" },
      { name: "Series F202D, Seal Welded", image: M + "upload/product/1f4efa5cbc221ac19cdb511b74fee349.jpg", specs: [["Design", "2-piece Seal Welded Direct Mount ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 4\""], ["Pressure", "2000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "TFM1600"], ["Ends", "NPT, BSP, BSPT"]], href: "/products/two-piece-ball-valves/high-performance-two-piece-ball-valve/variants/series-f202d", action: "view" },
    ],
  },
  {
    categoryId: "two-piece-ball-valves",
    productId: "high-pressure-two-piece-ball-valve",
    title: "High Pressure 2-Piece Ball Valves",
    kind: "2-piece",
    intro: "Two-piece ball valves rated from 3000 to 6000 PSI for high pressure industrial service.",
    series: [
      { name: "Series 24, 3000PSI, DM", image: M + "thumb/product/1000x652_photo_b_133896753383.jpg", specs: [["Design", "2-piece Direct Mount design Ball Valve"], ["Port", "Reduced port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "3000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "Delrin / Peek"], ["Ends", "Female x Female/Male x Male thread (NPT, BSP, BSPT)"]], href: "/products/two-piece-ball-valves/high-pressure-two-piece-ball-valve/variants/series-24", action: "view" },
      { name: "Series F21-70, 3000PSI, FS", image: M + "upload/product/244b23949e0d050632bfa7059532835e.jpg", specs: [["Design", "2-piece Fire Safe Ball Valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "3000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "Delrin / Peek"], ["Ends", "NPT, BSP, BSPT"], ["Fire safe", "API 607, 5th Edition"]], href: "/products/two-piece-ball-valves/high-pressure-two-piece-ball-valve/variants/series-f21-70", action: "view" },
      { name: "Series F21-90, 6000PSI", image: M + "upload/product/12a14236b8fa8dfc65f1267eece976a3.jpg", specs: [["Design", "2-piece design Ball Valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 1 1/2\""], ["Pressure", "6000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "Delrin+5% carbon"], ["Ends", "NPT, BSP, BSPT"]], href: "/products/two-piece-ball-valves/high-pressure-two-piece-ball-valve/variants/series-f21-90", action: "view" },
      { name: "Series F21-9K, 6000PSI, FS", image: M + "upload/product/d1ccff965a64bd6f1399034b49b113ca.jpg", specs: [["Design", "2-piece Fire Safe Ball Valve"], ["Port", "Reduced port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "6000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "Delrin / Peek"], ["Ends", "NPT, BSP, BSPT"], ["Fire safe", "API 607, 5th Edition"]], href: "/products/two-piece-ball-valves/high-pressure-two-piece-ball-valve/variants/series-f21-9k", action: "view" },
      { name: "Series F22-40, 3600PSI, DM", image: M + "upload/product/aee4bfbb60150fbc85770db474445e80.jpg", specs: [["Design", "2-piece Direct Mount Ball Valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "3600 PSI"], ["Body", "CF8M"], ["Seats", "Delrin / Peek"], ["Ends", "NPT, BSP, BSPT"], ["Stem", "17-4ph"]], href: "/products/two-piece-ball-valves/high-pressure-two-piece-ball-valve/variants/series-f22-40", action: "view" },
      { name: "Series F22-50, 6000PSI, DM", image: M + "upload/product/5e52a26eddc5359bb15826fb68864fe7.jpg", specs: [["Design", "2-piece Direct Mount Ball Valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "6000 PSI"], ["Body", "CF8M"], ["Seats", "Delrin / Peek"], ["Ends", "NPT, BSP, BSPT"], ["Stem", "17-4ph"]], href: "/products/two-piece-ball-valves/high-pressure-two-piece-ball-valve/variants/series-f22-50", action: "view" },
    ],
  },
  {
    categoryId: "three-piece-ball-valves",
    productId: "economical-three-piece-ball-valve",
    title: "Economical 3-Piece Ball Valves",
    kind: "3-piece",
    intro: "Cost-effective three-piece ball valves that can be maintained in-line without removing the end caps.",
    series: [
      { name: "Series 50", image: M + "thumb/product/1000x652_photo_b_24_133894764164.jpg", specs: [["Design", "3-piece economical ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 4\""], ["Pressure", "1000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE (others on request)"], ["Ends", "Threaded, Butt weld, Socket weld"]], href: "/products/three-piece-ball-valves/economical-three-piece-ball-valve/variants/series-50", action: "view" },
      { name: "Series 55", image: M + "thumb/product/1000x652_photo_b_26_133894779692.jpg", specs: [["Design", "3-piece economical ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 4\""], ["Pressure", "1000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE (others on request)"], ["Ends", "Threaded, Butt weld, Socket weld"]], href: "/products/three-piece-ball-valves/economical-three-piece-ball-valve/variants/series-55", action: "view" },
      { name: "Series 55A", image: M + "thumb/product/1000x652_photo_b_25_133894772329.jpg", specs: [["Design", "3-piece economical ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 4\""], ["Pressure", "1000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE (others on request)"], ["Ends", "Threaded, Butt weld, Socket weld"]], href: "/products/three-piece-ball-valves/economical-three-piece-ball-valve/variants/series-55a", action: "view" },
    ],
  },
  {
    categoryId: "three-piece-ball-valves",
    productId: "high-performance-three-piece-ball-valve",
    title: "High Performance 3-Piece Ball Valves",
    kind: "3-piece",
    intro: "High performance three-piece ball valves with direct-mount, fire-safe and SIL 3 series.",
    series: [
      { name: "Series 77, SIL3", image: M + "thumb/product/1000x652_41d3c3a5dfa3edbc77ddc8bcb760982c.png", href: "/products/series-77", specs: [["Design", "3-piece high performance ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 4\""], ["Pressure", "1000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE"], ["Ends", "Threaded, Butt weld, Socket weld, Flanged"]], action: "view" },
      { name: "Series 83, SIL3", image: M + "thumb/product/1000x652_e571ff1f227c7acc22ef9957adf1f94d.png", href: "/products/series-83", specs: [["Design", "3-piece fire safe ball valve"], ["Port", "Full port / Reduced port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "2000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE"], ["Ends", "Threaded, Butt weld, Socket weld, Flanged"], ["Fire safe", "API 607, 7th Edition"]], action: "view" },
      { name: "Series 88, SIL3", image: M + "thumb/product/1000x652_8fc78ae916136db7e70024bbff1cbc4a.png", href: "/products/series-88", specs: [["Design", "3-piece fire safe metal seated ball valve"], ["Port", "Full port / Reduced port"], ["Size", "1/4\" \u2013 4\""], ["Pressure", "2000 PSI"], ["Body", "CF8M / WCB"], ["Seats", "PTFE / RTFE"], ["Ends", "Threaded, Butt weld, Socket weld, Flanged"], ["Fire safe", "API 607, 7th Edition"]], action: "view" },
      { name: "Series F86A, 7500PSI", image: M + "upload/product/5936db68557c95368b91bc7db9c71f3e.jpg", specs: [["Design", "3-piece fire safe ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "7500 PSI"], ["Body", "CF8M / WCB"], ["Seats", "Delrin / Peek"], ["Ends", "Threaded, Butt weld, Socket weld"]], action: "quote" },
    ],
  },
  {
    categoryId: "three-piece-ball-valves",
    productId: "steam-jacketed-three-piece-ball-valve",
    title: "Steam Jacketed 3-Piece Ball Valves",
    kind: "3-piece",
    intro: "Three-piece ball valves with a steam jacket for media that must stay hot to flow, such as bitumen, resins and adhesives.",
    series: [
      { name: "Series 83J", image: M + "thumb/product/1000x652_photo_b_71_133895918797.jpg", specs: [["Design", "3-piece design steam jacketed ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 2\""], ["Pressure", "2000 PSI"], ["Body", "CF8M"], ["Seats", "25% carbon+PTFE"], ["Ends", "Threaded, Butt weld, Socket weld, Flanged, Extended BW, ISO orbital welding"], ["Fire safe", "API 607, 7th Edition"]], href: "/products/three-piece-ball-valves/steam-jacketed-three-piece-ball-valve/variants/series-83j", action: "view" },
      { name: "Series 88J", image: M + "thumb/product/1000x652_photo_b_70_133895907500.jpg", specs: [["Design", "3-piece design steam jacketed ball valve"], ["Port", "Full port"], ["Size", "1/4\" \u2013 1 1/2\""], ["Pressure", "2000 PSI"], ["Body", "CF8M"], ["Seats", "25% carbon+PTFE"], ["Ends", "Threaded, Butt weld, Socket weld, Flanged, Extended BW, ISO orbital welding"], ["Fire safe", "API 607, 7th Edition"]], href: "/products/three-piece-ball-valves/steam-jacketed-three-piece-ball-valve/variants/series-88j", action: "view" },
    ],
  },
];

export const findFamily = (categoryId: string, productId?: string) =>
  SERIES_FAMILIES.find((f) => f.categoryId === categoryId && f.productId === productId);

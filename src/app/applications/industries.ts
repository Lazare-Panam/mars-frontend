// Content for /applications, one entry per industry section. Kept outside the
// page so the homepage tiles and the category pages' "Used in" line can link to
// the same #anchors.
//
// Claims are limited to what the product data (mars-api catalog) and the
// existing blog posts back up: fire-safe series 28/83/88/90/90D/91D (API 607),
// NACE MR0175 optional on those series, live-loaded packing on KX-88/KX-90,
// carbon-filled RTFE seats on the steam-jacketed valves (to +200 °C), metal
// seated valves to +450/+550 °C, sanitary 77SN/88SN/83SN, 33SN, 55SN/50SN.
// Cryogenic, PFA-lined, knife gate and DBB valves aren't listed on the site, so
// the build sheet's blocks/bullets for them are left out.

export const URLS = {
  onePiece: "/products/one-piece-ball-valves",
  twoPiece: "/products/two-piece-ball-valves",
  threePiece: "/products/three-piece-ball-valves",
  flanged: "/products/flanged-ball-valves",
  multiPort: "/products/multi-port-ball-valves",
  metalSeated: "/products/metal-seated-ball-valves",
  fireSafe: "/products/fire-safe-ball-valves",
  vPort: "/products/v-port-ball-valves",
  sanitaryHp: "/products/sanitary-ball-valves/high-performance-sanitary-ball-valve",
  sanitaryMultiPort: "/products/sanitary-ball-valves/sanitary-multi-port-ball-valve",
  sanitaryEconomical: "/products/sanitary-ball-valves/economical-sanitary-ball-valve",
  sanitaryButterfly: "/products/sanitary-ball-valves/sanitary-butterfly-valve",
  actuated: "/actuated-packages",
  fireSafeBlog: "/news/fire-safe-ball-valves",
  triClampBlog: "/news/tri-clamp-sanitary-ball-valves-cf3m-vs-cf8m",
  catalogue: "https://pblol2.blob.core.windows.net/mars-valves/catalogs/mars-e-catalog.pdf",
} as const;

export type IndustryId =
  | "oil-gas"
  | "chemical"
  | "food-pharma"
  | "power"
  | "water"
  | "marine"
  | "machinery";

/** A list item: plain text, or text with one linked phrase. */
export type Item = string | { before?: string; link: string; href: string; after?: string };

export type Industry = {
  id: IndustryId;
  /** Tile / short name. */
  label: string;
  /** One-line hook on the quick-finder tile. */
  hook: string;
  heading: string;
  intro: string;
  duties: Item[];
  specify?: Item[];
  recommended: Item[];
  readNext?: { link: string; href: string };
  cta: { lead?: string; link: string };
  image: string;
  imageAlt: string;
};

export const INDUSTRIES: Industry[] = [
  {
    id: "oil-gas",
    label: "Oil & gas and refining",
    hook: "Fire-safe, API 607 tested series",
    heading: "Ball valves for oil & gas and refining",
    intro:
      "In production, refining and processing, a valve may need to keep sealing when the line around it is on fire. That's why fire-safe testing matters. Selected Kronox series are fire-tested to API 607.",
    duties: [
      "Isolation on hydrocarbon process lines",
      "Emergency shutdown with actuated packages",
      "Sour service, with NACE MR0175 available as an option on selected fire-safe series",
    ],
    recommended: [
      { link: "Fire-safe ball valves", href: URLS.fireSafe, after: ": KX-28, KX-83, KX-88, KX-90, KX-90D and KX-91D" },
      { link: "Flanged ball valves", href: URLS.flanged },
      { link: "Metal seated ball valves", href: URLS.metalSeated, after: " (ANSI Class 600 three-piece) for abrasive or high-temperature duty" },
      { link: "Actuated packages", href: URLS.actuated },
    ],
    cta: { lead: "Need a fire-safe valve for a hydrocarbon line?", link: "Ask which series are API 607 tested" },
    image:
      "https://images.unsplash.com/photo-1726111262949-e22631a8c376?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Oil refinery process towers and pipework",
  },
  {
    id: "chemical",
    label: "Chemical processing",
    hook: "Corrosion-resistant bodies and seat choices",
    heading: "Ball valves for chemical processing",
    intro:
      "Chemical plants move corrosive, hazardous or high-purity media, often at high temperature and pressure. The right choice comes down to three things: body material, seat material, and sealing around the stem.",
    duties: [
      "Isolation on acid, alkali and solvent lines",
      "Diverting or mixing between lines",
      "Dosing and modulating flow",
    ],
    specify: [
      "Body: CF8M (316) or CF3M (316L) stainless as standard",
      "Seats: PTFE for most media; RPTFE, carbon-filled RTFE, PEEK or metal seats for higher temperatures, pressures or abrasion",
      "Stem sealing: live-loaded stem packing on selected series",
    ],
    recommended: [
      { link: "Three-piece ball valves", href: URLS.threePiece },
      { link: "Multi-port 3-, 4- and 5-way valves", href: URLS.multiPort },
      { link: "V-port control ball valves", href: URLS.vPort, after: " for modulating duty" },
    ],
    cta: { lead: "Not sure which seat suits your media?", link: "Send us the media and temperature" },
    image:
      "https://images.unsplash.com/photo-1726731782158-fcf6822b6ca4?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Chemical processing plant with stainless steel pipework",
  },
  {
    id: "food-pharma",
    label: "Food, beverage & pharma",
    hook: "Tri-clamp sanitary valves in CF3M",
    heading: "Sanitary ball valves for food, beverage and pharmaceutical",
    intro:
      "Hygienic lines need valves that clean easily, trap as little product as possible, and use the right grade of stainless steel. Kronox sanitary ball valves have tri-clamp or tube OD butt weld ends, a full port and PTFE seats, with cavity filler seats available on selected series.",
    duties: [
      "Product isolation in dairy, brewing and beverage lines",
      "Clean-in-place (CIP) circuits",
      "Pharmaceutical and cosmetics process lines",
      "Diverting between tanks with multi-port sanitary valves",
    ],
    recommended: [
      { link: "High-performance sanitary ball valves", href: URLS.sanitaryHp, after: ": KX-77SN, KX-88SN and KX-83SN, with a CF3M body and 316L stem" },
      { link: "Sanitary multi-port valves", href: URLS.sanitaryMultiPort, after: ": KX-33SN, 3-way L-port or T-port" },
      { link: "Economical sanitary ball valves", href: URLS.sanitaryEconomical, after: ": KX-55SN and KX-50SN" },
      { link: "Sanitary butterfly valves", href: URLS.sanitaryButterfly },
    ],
    cta: { lead: "Need a surface finish, certificate or cavity filler seats?", link: "Ask us about sanitary specifications" },
    image: "https://pblol2.blob.core.windows.net/hiflux/food-beverage-mars.jpg",
    imageAlt: "Fresh food bowl representing the food and beverage industry",
  },
  {
    id: "power",
    label: "Power generation",
    hook: "High-temperature and steam service",
    heading: "Ball valves for power generation",
    intro:
      "Power plants run for long periods between outages. Valves in steam, cooling, condensate and auxiliary systems need to keep sealing through repeated heating and cooling.",
    duties: [
      "Steam and condensate isolation",
      "Cooling water and auxiliary systems",
      "High-temperature isolation",
    ],
    specify: [
      "Seats: carbon-filled RTFE for steam service (steam-jacketed valves to +200 °C); metal seats for higher temperatures, up to +450 °C or +550 °C depending on the series",
      "Stem sealing: live-loaded packing to cope with thermal cycling",
    ],
    recommended: [
      { link: "Metal seated ball valves", href: URLS.metalSeated },
      { link: "Three-piece ball valves", href: URLS.threePiece, after: " with weld ends" },
      { link: "Flanged ball valves", href: URLS.flanged },
    ],
    cta: { lead: "Specifying for steam?", link: "Tell us the pressure and temperature" },
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Power station cooling towers and transmission lines",
  },
  {
    id: "water",
    label: "Water and wastewater",
    hook: "Long-life stainless isolation",
    heading: "Ball valves for water supply and wastewater",
    intro:
      "Municipal and industrial water systems need valves that resist corrosion over long service lives with little maintenance.",
    duties: [
      "Isolation on treatment and distribution lines",
      "Chemical dosing (chlorine and pH correction)",
    ],
    recommended: [
      { link: "Two-piece ball valves", href: URLS.twoPiece, after: " for general isolation" },
      { link: "Flanged ball valves", href: URLS.flanged },
    ],
    cta: { link: "Discuss your water or wastewater application" },
    image:
      "https://images.unsplash.com/photo-1767274714714-dda4c25c6376?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Water treatment plant settling tanks",
  },
  {
    id: "marine",
    label: "Marine and shipbuilding",
    hook: "Stainless valves for corrosive environments",
    heading: "Stainless steel ball valves for marine and shipbuilding",
    intro:
      "On board, fuel, ballast, cooling and fire main systems run in a salt-laden environment, where a valve failure can't be fixed quickly. 316-type stainless steel with molybdenum resists chloride corrosion much better than 304.",
    duties: [
      "Fuel, ballast and bilge isolation",
      "Seawater cooling systems",
      "Deck and engine room utility lines",
    ],
    recommended: [
      { link: "Flanged ball valves", href: URLS.flanged, after: " (ANSI / DIN)" },
      { link: "Three-piece ball valves", href: URLS.threePiece },
      { link: "Fire-safe series", href: URLS.fireSafe, after: " for fuel lines" },
    ],
    cta: { link: "Ask about marine specifications" },
    image:
      "https://images.unsplash.com/photo-1670121180530-cfcba4438038?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Cargo ship at sea",
  },
  {
    id: "machinery",
    label: "General machinery and OEM",
    hook: "Repeatable specs for equipment builders",
    heading: "Ball valves for general machinery and OEM equipment",
    intro:
      "From compressed air and hydraulic circuits to process skids and OEM builds, equipment builders need valves that stay consistent from batch to batch, so they can design around a known specification.",
    duties: [
      "Compressed air and utility isolation",
      "Process skids and packaged plant",
      "OEM equipment builds",
    ],
    recommended: [
      { link: "One-piece ball valves", href: URLS.onePiece },
      { link: "Two-piece ball valves", href: URLS.twoPiece, after: " (NPT, BSP, BSPT)" },
      { link: "Three-piece ball valves", href: URLS.threePiece },
      { link: "Direct mount series", href: URLS.actuated, after: " for automated skids" },
    ],
    cta: { lead: "Building equipment in volume?", link: "Talk to us about OEM supply" },
    image:
      "https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Industrial machinery on a factory floor",
  },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Which Kronox ball valves are fire-safe?",
    a: "Selected series are fire-tested to API 607, including KX-28, KX-83, KX-88, KX-90, KX-90D and KX-91D. Tell us your application and we'll confirm the right series and send the certificate.",
  },
  {
    q: "Which ball valve is best for food and pharmaceutical lines?",
    a: "Sanitary ball valves with tri-clamp or tube OD ends. For welded lines, or where 316L is specified, choose a CF3M body, such as the Kronox 77SN, 88SN or 83SN.",
  },
  {
    q: "What's the difference between CF8M and CF3M?",
    a: "Both are cast 316-type stainless steels. CF3M is the low-carbon grade (equivalent to 316L), preferred where the valve is welded in or 316L is specified.",
  },
  {
    q: "Can Kronox ball valves be used for steam?",
    a: "Yes, with the right seat. Carbon-filled RTFE seats suit steam service, and metal seats suit higher temperatures. Send us your pressure and temperature to confirm.",
  },
  {
    q: "Do you supply actuated valves for automated lines?",
    a: "Yes. Direct mount Kronox series can be supplied as pneumatic or electric actuated packages.",
  },
];

/**
 * Which /applications sections each category page links to in its
 * "Used in" line. Derived from the recommended valves above.
 */
export const CATEGORY_INDUSTRIES: Record<string, IndustryId[]> = {
  "one-piece-ball-valves": ["machinery"],
  "two-piece-ball-valves": ["water", "machinery"],
  "three-piece-ball-valves": ["chemical", "power", "marine", "machinery"],
  "flanged-ball-valves": ["oil-gas", "power", "water", "marine"],
  "multi-port-ball-valves": ["chemical"],
  "metal-seated-ball-valves": ["oil-gas", "power"],
  "fire-safe-ball-valves": ["oil-gas", "marine"],
  "v-port-ball-valves": ["chemical"],
  "sanitary-ball-valves": ["food-pharma"],
};

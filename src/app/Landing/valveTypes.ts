import { SERIES } from "@/app/products/data/categories";

// The six valve types shown in "Shop by valve type" and in the hero's product
// finder, so both always list the same ranges. Images are the products' own
// photos from the catalog.

const IMG = "https://pblol2.blob.core.windows.net/mars-valves/ball-valves";

/** A product inside a range, shown as a tile in the hero's product finder. */
export type FinderProduct = { name: string; href: string; image: string };

export const VALVE_TYPES = [
  {
    label: "Two-piece ball valves",
    line: "Economical isolation, threaded ends",
    href: "/products/two-piece-ball-valves",
    products: [
      { name: "Economical 2-Piece Ball Valve", href: `/products/two-piece-ball-valves/economical-two-piece-ball-valve`, image: `${IMG}/two-piece/eco-2.jpg` },
      { name: "High Performance 2-Piece Ball Valve", href: `/products/two-piece-ball-valves/high-performance-two-piece-ball-valve`, image: `${IMG}/two-piece/hp-2.png` },
      { name: "High Pressure Ball Valve", href: `/products/two-piece-ball-valves/high-pressure-two-piece-ball-valve`, image: `${IMG}/two-piece/hp-bv-2.jpg` },
    ],
    image: `${IMG}/two-piece/eco-2.jpg`,
    alt: "MARS two-piece stainless steel ball valve",
  },
  {
    label: "Three-piece ball valves",
    line: "In-line maintenance, weld or thread",
    href: "/products/three-piece-ball-valves",
    products: [
      { name: "Economical 3-Piece Ball Valve", href: `/products/three-piece-ball-valves/economical-three-piece-ball-valve`, image: `${IMG}/three-piece/eco-3.jpg` },
      { name: "High Performance 3-Piece Ball Valve", href: `/products/three-piece-ball-valves/high-performance-three-piece-ball-valve`, image: `${IMG}/three-piece/hp-3.png` },
      { name: "Steam Jacketed Ball Valve", href: `/products/three-piece-ball-valves/steam-jacketed-three-piece-ball-valve`, image: `${IMG}/three-piece/jacket-3.jpg` },
    ],
    image: `${IMG}/three-piece/hp-3.png`,
    alt: "MARS three-piece stainless steel ball valve",
  },
  {
    label: "Flanged ball valves",
    line: "ANSI / DIN flanged, fire-safe options",
    href: "/products/flanged-ball-valves",
    products: [
      { name: "Uni-Body Flanged Ball Valve", href: `/products/flanged-ball-valves/uni-body-flanged-ball-valve`, image: `${IMG}/flanged/uni.png` },
      { name: "Economical 2-Piece Flanged Ball Valve", href: `/products/flanged-ball-valves/economical-two-piece-flanged-ball-valve`, image: `${IMG}/flanged/eco.gif` },
      { name: "High Performance 2-Piece Flanged Ball Valve", href: `/products/flanged-ball-valves/high-performance-two-piece-flanged-ball-valve`, image: `${IMG}/flanged/hp-flanged.png` },
      { name: "Wafer Type Flanged Ball Valve", href: `/products/flanged-ball-valves/wafer-type-flanged-ball-valve`, image: `${IMG}/flanged/water-type.png` },
      { name: "3-Piece Flanged Ball Valve", href: `/products/flanged-ball-valves/three-piece-flanged-ball-valve`, image: `${IMG}/flanged/3-piece.jpg` },
      { name: "Steam Jacketed Ball Valve", href: `/products/flanged-ball-valves/steam-jacketed-flanged-ball-valve`, image: `${IMG}/flanged/3-piece.jpg` },
    ],
    image: `${IMG}/flanged/hp-flanged.png`,
    alt: "MARS flanged ball valve",
  },
  {
    label: "Multi-port ball valves",
    line: "3-, 4- and 5-way, T- or L-port",
    href: "/products/multi-port-ball-valves",
    products: [
      { name: "3-Way Multi-Port Ball Valve", href: `/products/multi-port-ball-valves/three-way-multi-port-ball-valve`, image: `${IMG}/multi-port-valve/3-way-multi.jpg` },
      { name: "3/4/5-Way Ball Valve", href: `/products/multi-port-ball-valves/three-four-five-way-ball-valve`, image: `${IMG}/multi-port-valve/3-4-5.png` },
      { name: "Diverter Ball Valve", href: `/products/multi-port-ball-valves/diverter-ball-valve`, image: `${IMG}/multi-port-valve/diverter.png` },
    ],
    image: `${IMG}/multi-port-valve/3-way-multi.jpg`,
    alt: "MARS 3-way multi-port ball valve",
  },
  {
    label: "Sanitary ball valves",
    line: "Tri-clamp and tube OD, CF3M",
    href: "/products/sanitary-ball-valves",
    products: [
      { name: "Economical Sanitary Ball Valve", href: `/products/sanitary-ball-valves/economical-sanitary-ball-valve`, image: `${IMG}/sanitary-ball-valves/eco-san.png` },
      { name: "High Performance Sanitary Ball Valve", href: `/products/sanitary-ball-valves/high-performance-sanitary-ball-valve`, image: `${IMG}/sanitary-ball-valves/hp-san.png` },
      { name: "Sanitary Butterfly Valve", href: `/products/sanitary-ball-valves/sanitary-butterfly-valve`, image: `${IMG}/sanitary-ball-valves/butterfly-san.png` },
      { name: "Sanitary Multi-Port Ball Valve", href: `/products/sanitary-ball-valves/sanitary-multi-port-ball-valve`, image: `${IMG}/sanitary-ball-valves/multi-port-san.jpg` },
    ],
    image: `${IMG}/sanitary-ball-valves/hp-san.png`,
    alt: "MARS sanitary ball valve with tri-clamp ends",
  },
  {
    label: "Metal seated ball valves",
    line: "Abrasive and high-temperature service",
    href: "/products/metal-seated-ball-valves",
    products: [
      { name: "Metal Seated Multi-Port Ball Valve", href: `/products/metal-seated-ball-valves/metal-seated-multi-port-ball-valve`, image: `${IMG}/meta-seat/multi-port.jpg` },
      { name: "Metal Seated 3-Piece Ball Valve", href: `/products/metal-seated-ball-valves/metal-seated-three-piece-ball-valve`, image: `${IMG}/meta-seat/3-p.jpg` },
      { name: "Metal Seated High Pressure Ball Valve", href: `/products/metal-seated-ball-valves/metal-seated-high-pressure-ball-valve`, image: `${IMG}/meta-seat/hp.jpg` },
      { name: "Metal Seated Flanged Ball Valve", href: `/products/metal-seated-ball-valves/metal-seated-flanged-ball-valve`, image: `${IMG}/meta-seat/flanged-ball.jpg` },
    ],
    image: `${IMG}/meta-seat/3-p.jpg`,
    alt: "MARS metal seated three-piece ball valve",
  },
];


// ---------------------------------------------------------------- search


export type SearchItem = {
  name: string;
  href: string;
  image: string;
  /** Shown under the name, e.g. "Flanged ball valves" or "Series". */
  group: string;
  /** Extra words people might type that aren't in the name. */
  keywords?: string;
};

// Everything the hero search box can find. There's no search endpoint in the
// API, so this runs in the browser over the site's own product list.
export const SEARCH_INDEX: SearchItem[] = [
  ...VALVE_TYPES.flatMap((type) =>
    type.products.map((product) => ({ ...product, group: type.label, keywords: type.line })),
  ),
  ...SERIES.map((series) => ({
    name: series.label,
    href: series.href,
    image: series.image,
    group: "Series",
    keywords: series.description,
  })),
  {
    name: "Fire safe ball valves",
    href: "/products/fire-safe-ball-valves",
    image: `${IMG}/fire-safe/series-28.jpg`,
    group: "Range",
    keywords: "API 607 fire tested series 83 88 90 90D 91D",
  },
  {
    name: "V-port control ball valves",
    href: "/products/v-port-ball-valves",
    image: `${IMG}/v-port/77v.png`,
    group: "Range",
    keywords: "modulating control throttling",
  },
];

/**
 * Items matching every word of the query (in name, group or keywords).
 * Name matches come first, so "fire" lists the fire safe range before
 * products that only mention fire safety in their description.
 */
export function searchProducts(query: string, limit = 8): SearchItem[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  const score = (item: SearchItem) => {
    const name = item.name.toLowerCase();
    const all = `${name} ${item.group} ${item.keywords ?? ""}`.toLowerCase();
    if (!words.every((word) => all.includes(word))) return 0;
    return words.every((word) => name.includes(word)) ? 2 : 1;
  };
  return SEARCH_INDEX.map((item) => ({ item, s: score(item) }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s) // stable sort: keeps catalogue order within a rank
    .slice(0, limit)
    .map(({ item }) => item);
}

import { SHOP_PRODUCTS } from "@/app/shop/shopData";

/** Image for a product exactly as the shop page shows it. */
function shopImage(productId: string): string {
  const product = SHOP_PRODUCTS.find((p) => p.productId === productId);
  if (!product) throw new Error(`No shop product "${productId}"`);
  return product.thumbnailImage;
}

export type FeaturedValve = {
  code: string;
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  image: string;
  /** Descriptive alt text for the card image. */
  alt: string;
  href: string;
  price: string;
};

// Sourced from the live shop catalog (src/app/shop/page.tsx) — the cheapest
// priced variant of each product, so what's shown here is buyable, in
// stock, and matches what the shop page charges. Images come straight from
// the shop data so the two never drift apart.
export const FEATURED_VALVES: FeaturedValve[] = [
  {
    code: "V33",
    title: "3/4/5-Way Ball Valve",
    subtitle: "Multi-Port Flow Diversion",
    description:
      "T-port configuration for flexible diversion, mixing or splitting service across multiple lines.",
    specs: ['1/4"~1/2"', "CF8M"],
    image: shopImage("three-four-five-way-ball-valve"),
    alt: "MARS V33 3/4/5-way multi-port ball valve, T-port",
    href: "/products/ball-valves/three-four-five-way-ball-valve/variants/v33-123-1-4into1-2in-t-port-bare-shaft",
    price: "161.70",
  },
  {
    code: "V36SN",
    title: "Sanitary Multi-Port Ball Valve",
    subtitle: "T-Clamp / OD Tube End",
    description:
      "Cavity filler seat design built for sanitary process lines — clean-in-place ready, SS316 body.",
    specs: ['1/2"', "SS316"],
    image: shopImage("sanitary-multi-port-ball-valve"),
    alt: "MARS V36SN sanitary multi-port ball valve with tri-clamp ends",
    href: "/products/ball-valves/sanitary-multi-port-ball-valve/variants/v36sn-1020-1-2in-cavity-filler-seat-w-handle",
    price: "165.24",
  },
  {
    code: "V20",
    title: "Economical 2-Piece Ball Valve",
    subtitle: "Full Port, 1000 PSI",
    description:
      "Reliable, cost-effective isolation for general service lines — PTFE seats, NPT/BSP/BSPT ends.",
    specs: ["1000 PSI", "CF8M"],
    image: shopImage("economical-two-piece-ball-valve"),
    alt: "MARS V20 economical 2-piece stainless steel ball valve",
    href: "/products/ball-valves/economical-two-piece-ball-valve/variants/V20-20-1-4IN-W-O-LOCK",
    price: "11.55",
  },
  {
    code: "V77",
    title: "High Performance 3-Piece Ball Valve",
    subtitle: "1000 PSI Rated",
    description:
      "Three-piece design for easy in-line maintenance, with RPTFE/PTFE seats and SS316 stem.",
    specs: ["1000 PSI", "SS316 Stem"],
    image: shopImage("high-performance-three-piece-ball-valve"),
    alt: "MARS V77 high performance 3-piece stainless steel ball valve",
    href: "/products/ball-valves/high-performance-three-piece-ball-valve/variants/v77-1-4in-w-o-handle",
    price: "27.72",
  },
  {
    code: "V77SN",
    title: "High Performance Sanitary Ball Valve",
    subtitle: "T-Clamp End Connection",
    description:
      "Sanitary-grade three-piece valve for hygienic process service — CF3M body, SS316L stem.",
    specs: ['1/2"', "CF3M"],
    image: shopImage("high-performance-sanitary-ball-valve"),
    alt: "MARS V77SN sanitary ball valve with tri-clamp ends",
    href: "/products/ball-valves/high-performance-sanitary-ball-valve/variants/v77sn-10-2a-1-2in-t-clamp-std-ptfe-seat",
    price: "43.27",
  },
];

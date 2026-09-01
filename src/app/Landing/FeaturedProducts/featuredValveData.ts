export type FeaturedValve = {
  code: string;
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  image: string;
  href: string;
  price: string;
};

// Sourced from the live shop catalog (src/app/shop/page.tsx) — the cheapest
// priced variant of each product, so what's shown here is buyable, in
// stock, and matches what the shop page charges.
export const FEATURED_VALVES: FeaturedValve[] = [
  {
    code: "V33",
    title: "3/4/5-Way Ball Valve",
    subtitle: "Multi-Port Flow Diversion",
    description:
      "T-port configuration for flexible diversion, mixing or splitting service across multiple lines.",
    specs: ['1/4"~1/2"', "CF8M"],
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/multi-port-valve/3-4-5.png",
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
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/sanitary-ball-valves/multi-port-san.jpg",
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
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/two-piece/eco-2.jpg",
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
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/three-piece/hp-3.png",
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
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/sanitary-ball-valves/hp-san.png",
    href: "/products/ball-valves/high-performance-sanitary-ball-valve/variants/v77sn-10-2a-1-2in-t-clamp-std-ptfe-seat",
    price: "43.27",
  },
];

// Series that are single (Grid-type) catalogs with prices directly in their
// /variants table — shown in the "Ball Valves by Series" section with a
// "View Prices" action. Verified live: /api/product/{id}/variants -> 200.
export const SERIES = [
  {
    id: "series-10-10",
    label: "Series 10-10",
    description:
      "Robust 1-piece reduced port ball valves rated to 2000 PSI for high pressure threaded-line service.",
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/one-piece/10-10.png",
    href: "/products/series-10-10",
    pricesHref: "/products/series-10-10/variants",
  },
  {
    id: "series-20-20",
    label: "Series 20-20",
    description:
      "2-piece full port ball valves rated to 1000 PSI for general industrial service.",
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/two-piece/eco-2.jpg",
    href: "/products/series-20-20",
    pricesHref: "/products/series-20-20/variants",
  },
  {
    id: "series-22",
    label: "Series 22",
    description:
      "2-piece direct mount full port ball valves with ISO 5211 mounting pad for actuated service.",
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/two-piece/hp-2.png",
    href: "/products/series-22",
    pricesHref: "/products/series-22/variants",
  },
  {
    id: "series-77",
    label: "Series 77",
    description:
      "3-piece high performance direct mount ball valves with full port and a wide range of end connections.",
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/three-piece/series-77.png",
    href: "/products/series-77",
    pricesHref: "/products/series-77/variants",
  },
  {
    id: "series-77sn",
    label: "Series 77SN",
    description:
      "3-piece high performance sanitary ball valves with Tri-clamp and OD tube ends for hygienic process lines.",
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/three-piece/series77sn.png",
    href: "/products/series-77sn",
    pricesHref: "/products/series-77sn/variants",
  },
];

export const CATEGORIES = [
  {
    id: "one-piece-ball-valves",
    label: "One-Piece Ball Valves",
    description:
      "Compact, high pressure stainless steel ball valves for industrial fluid control.",
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/one-piece/10-10.png",
    href: "/products/one-piece-ball-valves",
  },
  {
    id: "two-piece-ball-valves",
    label: "Two-Piece Ball Valves",
    description:
      "Versatile two-piece ball valves available in economical, high performance, and high pressure variants.",
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/one-piece/10-10.png",
    href: "/products/two-piece-ball-valves",
  },
  {
    id: "three-piece-ball-valves",
    label: "Three-Piece Ball Valves",
    description:
      "Fully maintainable three-piece ball valves for process and industrial applications.",
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/three-piece/eco-3.jpg",
    href: "/products/three-piece-ball-valves",
  },
  {
    id: "flanged-ball-valves",
    label: "Flanged Ball Valves",
    description:
      "A complete range of flanged ball valves for industrial pipeline applications.",
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/flanged/hp-flanged.png",
    href: "/products/flanged-ball-valves",
  },
  {
    id: "multi-port-ball-valves",
    label: "Multi-Port Ball Valves",
    description:
      "Three and four-way multi-port ball valves for flow diversion and mixing applications.",
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/multi-port-valve/3-way-multi.jpg",
    href: "/products/multi-port-ball-valves",
  },
  {
    id: "metal-seated-ball-valves",
    label: "Metal Seated Ball Valves",
    description:
      "Metal-to-metal sealing for high temperature and abrasive severe service applications.",
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/meta-seat/multi-port.jpg",
    href: "/products/metal-seated-ball-valves",
  },
];

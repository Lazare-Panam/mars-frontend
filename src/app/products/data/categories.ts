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
      "https://pblol2.blob.core.windows.net/mars-valves/mars%20series%20images/one-piece-ball-valves/series-10-10.png",
    href: "/series/4",
    pricesHref: "/series/4/variants",
  },
  {
    id: "series-20-20",
    label: "Series 20-20",
    description:
      "2-piece full port ball valves rated to 1000 PSI for general industrial service.",
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/mars%20series%20images/economical-two-piece-ball-valve/series-20-20.jpg",
    href: "/series/5",
    pricesHref: "/series/5/variants",
  },
  {
    id: "series-22",
    label: "Series 22",
    description:
      "2-piece direct mount full port ball valves with ISO 5211 mounting pad for actuated service.",
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/mars%20series%20images/high-performance-two-piece-ball-valve/series-22.png",
    href: "/series/3",
    pricesHref: "/series/3/variants",
  },
  {
    id: "series-33",
    label: "Series 33",
    description:
      "3-way full port direct mount ball valves with ISO 5211 pad and L/T port for diverting and mixing service.",
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/s33.jpg",
    href: "/series/6",
    pricesHref: "/series/6/variants",
  },
  {
    id: "series-36sn",
    label: "Series 36SN",
    description:
      "Sanitary 3-way / 4-way full port direct mount ball valves with Tri-clamp or OD tube ends, FDA approved and 3-A certified.",
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/series-36sn.jpg",
    href: "/series/7",
    pricesHref: "/series/7/variants",
  },
  {
    id: "series-50",
    label: "Series 50",
    description:
      "3-piece full bore maintainable ball valves with blow-out proof stem, lockable lever and steam-rated carbon-filled R-PTFE seats.",
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/mars%20series%20images/economical-three-piece-ball-valve/series-50.jpg",
    href: "/series/10",
    pricesHref: "/series/10/variants",
  },
  {
    id: "series-50sn",
    label: "Series 50SN",
    description:
      "3-piece full bore hygienic manual ball valves with cavity-filled PTFE seats and Tri-clamp or short-welding ends, FDA compliant.",
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/series-50sn.png",
    href: "/series/11",
    pricesHref: "/series/11/variants",
  },
  {
    id: "series-77",
    label: "Series 77",
    description:
      "3-piece high performance direct mount ball valves with full port and a wide range of end connections.",
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/mars%20series%20images/high-performance-three-piece-ball-valve/series-77.png",
    href: "/series/8",
    pricesHref: "/series/8/variants",
  },
  {
    id: "series-77sn",
    label: "Series 77SN",
    description:
      "3-piece high performance sanitary ball valves with Tri-clamp and OD tube ends for hygienic process lines.",
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/three-piece/series77sn.png",
    href: "/series/9",
    pricesHref: "/series/9/variants",
  },
  {
    id: "series-83",
    label: "Series 83",
    description:
      "3-piece fire safe ball valves certified to API 607 7th Edition, rated to 2000 PSI.",
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/mars%20series%20images/high-performance-three-piece-ball-valve/series-83.png",
    href: "/series/12",
    pricesHref: "/series/12/variants",
  },
  {
    id: "series-88",
    label: "Series 88",
    description:
      "3-piece fire safe metal seated ball valves with direct mount design for severe service up to 2000 PSI.",
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/mars%20series%20images/high-performance-three-piece-ball-valve/series-88.png",
    href: "/series/13",
    pricesHref: "/series/13/variants",
  },
  {
    id: "series-90d",
    label: "Series 90D",
    description:
      "2-piece fire safe flanged metal seated ball valves, full port, from 1/2\" to 12\".",
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/three-piece/series-90d.jpg",
    href: "/products/series-90d",
    pricesHref: "/products/series-90d/variants",
  },
];

export const CATEGORIES = [
  {
    id: "one-piece-ball-valves",
    label: "One-Piece Ball Valves",
    description:
      "Compact, high pressure stainless steel ball valves for industrial fluid control.",
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/mars%20series%20images/one-piece-ball-valves/series-10-10.png",
    href: "/products/one-piece-ball-valves",
  },
  {
    id: "two-piece-ball-valves",
    label: "Two-Piece Ball Valves",
    description:
      "Versatile two-piece ball valves available in economical, high performance, and high pressure variants.",
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/mars%20series%20images/economical-two-piece-ball-valve/series-20-20.jpg",
    href: "/products/two-piece-ball-valves",
  },
  {
    id: "three-piece-ball-valves",
    label: "Three-Piece Ball Valves",
    description:
      "Fully maintainable three-piece ball valves for process and industrial applications.",
    image:
      "https://pblol2.blob.core.windows.net/mars-valves/mars%20series%20images/economical-three-piece-ball-valve/series-50.jpg",
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

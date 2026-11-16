import { SERIES } from "@/app/products/data/categories";

// The product category bar under the main header (modelled on marsselect.co.uk).
//
// Classification follows the manufacturer's own catalogue (marsvalve.com.tw):
// body construction first (1/2/3-piece, flanged), then configuration
// (multi-port, V-port), then service (sanitary, fire safe, metal seated), plus
// a by-series list. Only ranges we actually list are included; every link was
// checked to open a real page (1 Oct 2026). Series 28 is left out because its
// fire-safe product page currently has no content.

export type CategoryLink = { label: string; href: string };

export type CategoryColumn = {
  heading: string;
  /** Where the column heading itself links. */
  href: string;
  links: CategoryLink[];
};

export type CategoryBarItem = {
  label: string;
  href: string;
  /**
   * Each entry is one column of the dropdown: a single section, or a list of
   * short sections stacked on top of each other.
   */
  columns: (CategoryColumn | CategoryColumn[])[];
};

const P = "/products";

export const CATEGORY_BAR: CategoryBarItem[] = [
  {
    label: "MARS Ball Valves",
    href: P,
    columns: [
      {
        heading: "By Series",
        href: P,
        // Read from the series data, so new series pages appear here automatically.
        // Series 20-40 is the new SQL-backed configurator (/series/[categoryId]).
        links: [
          { label: "Series 10-10", href: "/series/4" },
          { label: "Series 20-20", href: "/series/5" },
          { label: "Series 20-40", href: "/series/1" },
          { label: "Series 22", href: "/series/3" },
          ...SERIES
            .filter(
              (series) =>
                series.id !== "series-10-10" &&
                series.id !== "series-20-20" &&
                series.id !== "series-22",
            )
            .map((series) => ({ label: series.label, href: series.href })),
        ],
      },
      {
        // One column for the 1, 2 and 3-piece ranges.
        heading: "By Category",
        href: P,
        links: [
          { label: "One-Piece Ball Valves", href: `${P}/one-piece-ball-valves` },
          { label: "Economical 2-Piece", href: `${P}/two-piece-ball-valves/economical-two-piece-ball-valve` },
          { label: "High Performance 2-Piece", href: `${P}/two-piece-ball-valves/high-performance-two-piece-ball-valve` },
          { label: "High Pressure 2-Piece", href: `${P}/two-piece-ball-valves/high-pressure-two-piece-ball-valve` },
          { label: "Economical 3-Piece", href: `${P}/three-piece-ball-valves/economical-three-piece-ball-valve` },
          { label: "High Performance 3-Piece", href: `${P}/three-piece-ball-valves/high-performance-three-piece-ball-valve` },
          { label: "Steam Jacketed 3-Piece", href: `${P}/three-piece-ball-valves/steam-jacketed-three-piece-ball-valve` },
        ],
      },
      // Third column: three short sections stacked, each with a "View all" link.
      [
        {
          heading: "Fire Safe",
          href: `${P}/fire-safe-ball-valves`,
          links: [{ label: "View all fire safe ball valves", href: `${P}/fire-safe-ball-valves` }],
        },
        {
          heading: "Multi-Port",
          href: `${P}/multi-port-ball-valves`,
          links: [
            { label: "3-Way Ball Valve", href: `${P}/multi-port-ball-valves/three-way-multi-port-ball-valve` },
            { label: "3/4/5-Way Ball Valve", href: `${P}/multi-port-ball-valves/three-four-five-way-ball-valve` },
            { label: "Diverter Ball Valve", href: `${P}/multi-port-ball-valves/diverter-ball-valve` },
          ],
        },
        {
          heading: "V-Port",
          href: `${P}/v-port-ball-valves`,
          links: [{ label: "View all V-port ball valves", href: `${P}/v-port-ball-valves` }],
        },
        {
          heading: "Cryogenic",
          href: `${P}/cryogenic-ball-valves`,
          links: [
            { label: "Cryogenic Flanged Ball Valves", href: `${P}/cryogenic-ball-valves/flanged-ball-valve` },
            { label: "Cryogenic 3-Piece Ball Valves", href: `${P}/cryogenic-ball-valves/three-piece-ball-valve` },
          ],
        },
      ],
    ],
  },
  {
    label: "Flanged & Metal Seated",
    href: `${P}/flanged-ball-valves`,
    columns: [
      {
        heading: "Flanged Ball Valves",
        href: `${P}/flanged-ball-valves`,
        links: [
          { label: "Uni-Body Flanged", href: `${P}/flanged-ball-valves/uni-body-flanged-ball-valve` },
          { label: "Economical 2-Piece Flanged", href: `${P}/flanged-ball-valves/economical-two-piece-flanged-ball-valve` },
          { label: "High Performance 2-Piece Flanged", href: `${P}/flanged-ball-valves/high-performance-two-piece-flanged-ball-valve` },
          { label: "Wafer Type Flanged", href: `${P}/flanged-ball-valves/wafer-type-flanged-ball-valve` },
          { label: "3-Piece Flanged", href: `${P}/flanged-ball-valves/three-piece-flanged-ball-valve` },
          { label: "Steam Jacketed Flanged", href: `${P}/flanged-ball-valves/steam-jacketed-flanged-ball-valve` },
        ],
      },
      {
        heading: "Metal Seated Ball Valves",
        href: `${P}/metal-seated-ball-valves`,
        links: [
          { label: "High Pressure Ball Valve", href: `${P}/metal-seated-ball-valves/high-pressure` },
          { label: "Multi-Port Ball Valve", href: `${P}/metal-seated-ball-valves/multi-port` },
          { label: "3-Piece Ball Valve", href: `${P}/metal-seated-ball-valves/3-piece` },
          { label: "Flanged Ball Valve", href: `${P}/metal-seated-ball-valves/flanged` },
        ],
      },
    ],
  },
  {
    label: "Multi-Port & V-Port",
    href: `${P}/multi-port-ball-valves`,
    columns: [
      {
        heading: "Multi-Port Ball Valves",
        href: `${P}/multi-port-ball-valves`,
        links: [
          { label: "3-Way Multi-Port", href: `${P}/multi-port-ball-valves/three-way-multi-port-ball-valve` },
          { label: "3/4/5-Way", href: `${P}/multi-port-ball-valves/three-four-five-way-ball-valve` },
          { label: "Diverter", href: `${P}/multi-port-ball-valves/diverter-ball-valve` },
        ],
      },
      {
        heading: "V-Port Control Ball Valves",
        href: `${P}/v-port-ball-valves`,
        links: [{ label: "View all V-port ball valves", href: `${P}/v-port-ball-valves` }],
      },
    ],
  },
  {
    label: "Sanitary Ball Valves",
    href: `${P}/sanitary-ball-valves`,
    columns: [
      {
        heading: "Sanitary Ball Valves",
        href: `${P}/sanitary-ball-valves`,
        links: [
          { label: "Economical Sanitary", href: `${P}/sanitary-ball-valves/economical-sanitary-ball-valve` },
          { label: "High Performance Sanitary", href: `${P}/sanitary-ball-valves/high-performance-sanitary-ball-valve` },
          { label: "Sanitary Butterfly Valve", href: `${P}/sanitary-ball-valves/sanitary-butterfly-valve` },
          { label: "Sanitary Multi-Port", href: `${P}/sanitary-ball-valves/sanitary-multi-port-ball-valve` },
        ],
      },
    ],
  },
  {
    label: "Actuated Packages",
    href: "/actuated-packages",
    columns: [
      {
        heading: "Actuated Packages",
        href: "/actuated-packages",
        links: [
          { label: "Valve + actuator packages", href: "/actuated-packages" },
          { label: "Request a package quote", href: "/contact#enquiry" },
        ],
      },
      {
        heading: "Direct-Mount Series",
        href: "/actuated-packages",
        links: [
          { label: "Series 22", href: "/series/3" },
          { label: "Series 33", href: "/series/6" },
          { label: "Series 77", href: "/series/8" },
          { label: "Series 88", href: "/series/13" },
        ],
      },
    ],
  },
];

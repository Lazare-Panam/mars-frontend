export type NavSubItem = {
  label: string;
  href: string;
};

export type MegaMenuItem = {
  label: string;
  href: string;
  subItems?: NavSubItem[];
};

export type MegaMenuColumn = {
  heading: string;
  href: string;
  items: MegaMenuItem[];
};

export type NavItem = {
  label: string;
  href: string;
  megaMenu?: MegaMenuColumn[];
  newTab?: boolean;
};

export const LEFT_NAV: NavItem[] = [
  { label: "About Us", href: "/about" },
  {
    label: "Products",
    href: "/products",
    megaMenu: [
      {
        heading: "Mars Ball Valves",
        href: "/products",
        items: [
          {
            label: "Series 10-10 (One-Piece)",
            href: "/products/series-10-10",
          },
          {
            label: "Series 20-20 (Two-Piece)",
            href: "/products/series-20-20",
          },
          {
            label: "Series 22 (Two-Piece Direct Mount)",
            href: "/products/series-22",
          },
          {
            label: "Series 77 (Three-Piece Direct Mount)",
            href: "/products/series-77",
          },
          {
            label: "Series 77SN (Three-Piece Sanitary)",
            href: "/products/series-77sn",
          },
          {
            label: "Series 83 (Three-Piece Fire Safe)",
            href: "/products/series-83",
          },
          {
            label: "Series 88 (Three-Piece Metal Seated)",
            href: "/products/series-88",
          },
          {
            label: "Series 90D (Two-Piece Flanged Metal Seated)",
            href: "/products/series-90d",
          },
        ],
      },
      {
        heading: "All-Purpose Ball Valves",
        href: "/products",
        items: [
          {
            label: "One-Piece Ball Valve",
            href: "/products/one-piece-ball-valves",
          },
          {
            label: "2-Piece Ball Valve",
            href: "/products/two-piece-ball-valves",
            subItems: [
              {
                label: "Economical 2-Piece Ball Valve",
                href: "/products/two-piece-ball-valves/economical-two-piece-ball-valve",
              },
              {
                label: "High Performance 2-Piece Ball Valve",
                href: "/products/two-piece-ball-valves/high-performance-two-piece-ball-valve",
              },
              {
                label: "High Pressure Ball Valve",
                href: "/products/two-piece-ball-valves/high-pressure-two-piece-ball-valve",
              },
            ],
          },
          {
            label: "3-Piece Ball Valve",
            href: "/products/three-piece-ball-valves",
            subItems: [
              {
                label: "Economical 3-Piece Ball Valve",
                href: "/products/three-piece-ball-valves/economical-three-piece-ball-valve",
              },
              {
                label: "High Performance 3-Piece Ball Valve",
                href: "/products/three-piece-ball-valves/high-performance-three-piece-ball-valve",
              },
              {
                label: "Steam Jacketed Ball Valve",
                href: "/products/three-piece-ball-valves/steam-jacketed-three-piece-ball-valve",
              },
            ],
          },
          {
            label: "Flanged Ball Valve",
            href: "/products/flanged-ball-valves",
            subItems: [
              {
                label: "Uni-Body Flanged Ball Valve",
                href: "/products/flanged-ball-valves/uni-body-flanged-ball-valve",
              },
              {
                label: "Economical 2-Piece Flanged Ball Valve",
                href: "/products/flanged-ball-valves/economical-two-piece-flanged-ball-valve",
              },
              {
                label: "High Performance 2-Piece Flanged Ball Valve",
                href: "/products/flanged-ball-valves/high-performance-two-piece-flanged-ball-valve",
              },
              {
                label: "Wafer Type Flanged Ball Valve",
                href: "/products/flanged-ball-valves/wafer-type-flanged-ball-valve",
              },
              {
                label: "3-Piece Flanged Ball Valve",
                href: "/products/flanged-ball-valves/three-piece-flanged-ball-valve",
              },
              {
                label: "Steam Jacketed Flanged Ball Valve",
                href: "/products/flanged-ball-valves/steam-jacketed-flanged-ball-valve",
              },
            ],
          },
          // {
          //   label: "Multi-Port Ball Valve",
          //   href: "/products/multi-port-ball-valves",
          //   subItems: [
          //     {
          //       label: "3-Way Multi-Port Ball Valve",
          //       href: "/products/multi-port-ball-valves/three-way-multi-port-ball-valve",
          //     },
          //     {
          //       label: "3/4/5-Way Ball Valve",
          //       href: "/products/multi-port-ball-valves/three-four-five-way-ball-valve",
          //     },
          //     {
          //       label: "Diverter Ball Valve",
          //       href: "/products/multi-port-ball-valves/diverter-ball-valve",
          //     },
          //   ],
          // },

          // {
          //   label: "Sanitary Ball Valve",
          //   href: "/products/sanitary-ball-valves",
          //   subItems: [
          //     {
          //       label: "Economical Sanitary Ball Valve",
          //       href: "/products/sanitary-ball-valves/economical-sanitary-ball-valve",
          //     },
          //     {
          //       label: "High Performance Sanitary Ball Valve",
          //       href: "/products/sanitary-ball-valves/high-performance-sanitary-ball-valve",
          //     },
          //     {
          //       label: "Sanitary Butterfly Valve",
          //       href: "/products/sanitary-ball-valves/sanitary-butterfly-valve",
          //     },
          //     {
          //       label: "Sanitary Multi-Port Ball Valve",
          //       href: "/products/sanitary-ball-valves/sanitary-multi-port-ball-valve",
          //     },
          //   ],
          // },
        ],
      },
      {
        heading: "Specialty Ball Valves",
        href: "/products/specialty-ball-valves",
        items: [
          {
            label: "Fire Safe Ball Valve",
            href: "/products/fire-safe-ball-valves",
          },
          { label: "V-Port Ball Valve", href: "/products/v-port-ball-valves" },
          // {
          //   label: "Cryogenic Ball Valve",
          //   href: "/products/cryogenic-ball-valves",
          // },
          {
            label: "Metal Seated Ball Valve",
            href: "/products/metal-seated-ball-valves",
            subItems: [
              {
                label: "High Pressure Ball Valve",
                href: "/products/metal-seated-ball-valves/high-pressure",
              },
              {
                label: "Multi-Port Ball Valve",
                href: "/products/metal-seated-ball-valves/multi-port",
              },
              {
                label: "3-Piece Ball Valve",
                href: "/products/metal-seated-ball-valves/3-piece",
              },
              {
                label: "Flanged Ball Valve",
                href: "/products/metal-seated-ball-valves/flanged",
              },
            ],
          },
          // {
          //   label: "PFA Lining Ball Valve",
          //   href: "/products/pfa-lining-ball-valves",
          // },
          // {
          //   label: "Top Entry Ball Valve",
          //   href: "/products/top-entry-ball-valves",
          // },
        ],
      },
      // {
      //   heading: "Other Valves & Accessories",
      //   href: "/products/other-valves",
      //   items: [
      //     {
      //       label: "Segment Control Valve",
      //       href: "/products/segment-control-valves",
      //     },
      //     {
      //       label: "Lok Instrumentation Ball Valve",
      //       href: "/products/lok-instrumentation-ball-valves",
      //     },
      //     {
      //       label: "Gate, Globe, Check & Needle Valve",
      //       href: "/products/gate-globe-check-needle-valves",
      //     },
      //     { label: "Y-Strainer", href: "/products/y-strainers" },
      //     { label: "Safety Valve", href: "/products/safety-valves" },
      //     { label: "Butterfly Valve", href: "/products/butterfly-valves" },
      //     { label: "Solenoid Valves", href: "/products/solenoid-valves" },
      //     { label: "Valve Accessories", href: "/products/valve-accessories" },
      //     {
      //       label: "Actuators & Accessories",
      //       href: "/products/actuators-accessories",
      //     },
      //   ],
      // },
    ],
  },
  { label: "MARS® Brand", href: "/mars-brand" },
  { label: "Applications", href: "/applications" },
];

export const RIGHT_NAV: NavItem[] = [
  // Was two links ("Download" and "E-catalog") to the same PDF. On desktop it
  // now lives in the red top bar (TopBar.tsx); the mobile drawer lists it here.
  {
    label: "E-Catalogue",
    href: "https://pblol2.blob.core.windows.net/mars-valves/catalogs/mars-e-catalog.pdf",
    newTab: true,
  },
  { label: "News", href: "/news" },
  { label: "Contact Us", href: "/contact" },
];

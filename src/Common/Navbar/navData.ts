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
  items: MegaMenuItem[];
};

export type NavItem = {
  label: string;
  href: string;
  megaMenu?: MegaMenuColumn[];
};

export const LEFT_NAV: NavItem[] = [
  { label: 'About Us', href: '#' },
  { label: 'MARS® Brand', href: '#' },
  {
    label: 'Products',
    href: '#',
    megaMenu: [
      {
        heading: 'Ball Valves',
        items: [
          { label: 'One-Piece Ball Valve', href: '/products/one-piece-ball-valves' },
          {
            label: '2-Piece Ball Valve', href: '/products/two-piece-ball-valves',
            subItems: [
              { label: 'Economical 2-Piece Ball Valve', href: '/products/two-piece-ball-valves/economical' },
              { label: 'High Performance 2-Piece Ball Valve', href: '/products/two-piece-ball-valves/high-performance' },
            ],
          },
          {
            label: '3-Piece Ball Valve', href: '/products/three-piece-ball-valves',
            subItems: [
              { label: 'Economical 3-Piece Ball Valve', href: '/products/three-piece-ball-valves/economical' },
              { label: 'High Performance 3-Piece Ball Valve', href: '/products/three-piece-ball-valves/high-performance' },
              { label: 'Steam Jacketed Ball Valve', href: '/products/three-piece-ball-valves/steam-jacketed' },
            ],
          },
          {
            label: 'Flanged Ball Valve', href: '/products/flanged-ball-valves',
            subItems: [
              { label: 'Uni-Body Flanged Ball Valve', href: '/products/flanged-ball-valves/uni-body' },
              { label: 'Economical 2-Piece Flanged Ball Valve', href: '/products/flanged-ball-valves/economical-2-piece' },
              { label: 'High Performance 2-Piece Flanged Ball Valve', href: '/products/flanged-ball-valves/high-performance-2-piece' },
              { label: 'Wafer Type Flanged Ball Valve', href: '/products/flanged-ball-valves/wafer-type' },
              { label: '3-Piece Flanged Ball Valve', href: '/products/flanged-ball-valves/3-piece' },
              { label: 'Steam Jacketed Flanged Ball Valve', href: '/products/flanged-ball-valves/steam-jacketed' },
            ],
          },
          { label: 'Multi-Port Ball Valve', href: '/products/multi-port-ball-valves' },
          { label: 'Sanitary Ball Valve', href: '/products/sanitary-ball-valves' },
        ],
      },
      {
        heading: 'Specialty Ball Valves',
        items: [
          { label: 'Fire Safe Ball Valve', href: '/products/fire-safe-ball-valves' },
          { label: 'V-Port Ball Valve', href: '/products/v-port-ball-valves' },
          { label: 'Cryogenic Ball Valve', href: '/products/cryogenic-ball-valves' },
          {
            label: 'Metal Seated Ball Valve', href: '/products/metal-seated-ball-valves',
            subItems: [
              { label: 'High Pressure Ball Valve', href: '/products/metal-seated-ball-valves/high-pressure' },
              { label: 'Multi-Port Ball Valve', href: '/products/metal-seated-ball-valves/multi-port' },
              { label: '3-Piece Ball Valve', href: '/products/metal-seated-ball-valves/3-piece' },
              { label: 'Flanged Ball Valve', href: '/products/metal-seated-ball-valves/flanged' },
            ],
          },
          { label: 'PFA Lining Ball Valve', href: '/products/pfa-lining-ball-valves' },
          { label: 'Top Entry Ball Valve', href: '/products/top-entry-ball-valves' },
        ],
      },
      {
        heading: 'Other Valves & Accessories',
        items: [
          { label: 'Segment Control Valve', href: '/products/segment-control-valves' },
          { label: 'Lok Instrumentation Ball Valve', href: '/products/lok-instrumentation-ball-valves' },
          { label: 'Gate, Globe, Check & Needle Valve', href: '/products/gate-globe-check-needle-valves' },
          { label: 'Y-Strainer', href: '/products/y-strainers' },
          { label: 'Safety Valve', href: '/products/safety-valves' },
          { label: 'Butterfly Valve', href: '/products/butterfly-valves' },
          { label: 'Solenoid Valves', href: '/products/solenoid-valves' },
          { label: 'Valve Accessories', href: '/products/valve-accessories' },
          { label: 'Actuators & Accessories', href: '/products/actuators-accessories' },
        ],
      },
    ],
  },
  { label: 'Certificate', href: '#' },
];

export const RIGHT_NAV: NavItem[] = [
  { label: 'Download', href: '#' },
  { label: 'E-catalog', href: '#' },
  { label: 'News', href: '#' },
  { label: 'Contact Us', href: '#' },
];
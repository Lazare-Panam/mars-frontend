export type MegaMenuColumn = {
  heading: string;
  items: { label: string; href: string }[];
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
          { label: 'Fire-Safe Ball Valve', href: '/products/fire-safe-ball-valves' },
          { label: 'V-Port Ball Valve', href: '/products/v-port-ball-valves' },
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
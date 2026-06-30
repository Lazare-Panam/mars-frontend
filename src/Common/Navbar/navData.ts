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
          { label: 'One-Piece Ball Valve', href: '#' },
          { label: 'Two-Piece Ball Valve', href: '#' },
          { label: 'Three-Piece Ball Valve', href: '#' },
          { label: 'Eco Three-Piece Ball Valve', href: '#' },
        ],
      },
      {
        heading: 'Specialty Ball Valves',
        items: [
          { label: 'Fire-Safe Ball Valve', href: '#' },
          { label: 'High-Pressure Ball Valve', href: '#' },
          { label: 'PFA-Lined Ball Valve', href: '#' },
          { label: 'Three-Way Ball Valve', href: '#' },
        ],
      },
      {
        heading: 'Process & Control',
        items: [
          { label: 'Flanged Ball Valve', href: '#' },
          { label: 'Gate Valve', href: '#' },
          { label: 'Segment Control Valve', href: '#' },
          { label: 'V-Port Ball Valve', href: '#' },
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
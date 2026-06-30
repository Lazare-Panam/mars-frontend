export type FeaturedValve = {
  code: string;
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  image: string;
  href: string;
};

export const FEATURED_VALVES: FeaturedValve[] = [
  {
    code: 'MV-FS',
    title: 'Fire-Safe Ball Valve',
    subtitle: 'API 607 Fire-Safe Certified',
    description:
      'Maintains shut-off integrity under fire conditions — critical isolation for hazardous areas.',
    specs: ['API 607', 'SS316'],
    image: 'https://pblol2.blob.core.windows.net/mars-valves/categories/fire-safe.jpg',
    href: '#',
  },
  {
    code: 'MV-HP',
    title: 'High-Pressure Ball Valve',
    subtitle: 'High-Pressure Series',
    description:
      'Heavy-duty construction engineered for elevated pressure ratings and reliable isolation.',
    specs: ['Up to 2000 PSI', 'Heavy-Duty'],
    image: 'https://pblol2.blob.core.windows.net/mars-valves/categories/series-hp.jpg',
    href: '#',
  },
  {
    code: 'MV-FL',
    title: 'Flanged Ball Valve',
    subtitle: 'Flanged End Connections',
    description:
      'Direct pipeline integration with standard flange face options for process plant service.',
    specs: ['ANSI · PN', 'Full Bore'],
    image: 'https://pblol2.blob.core.windows.net/mars-valves/categories/flanged.jpg',
    href: '#',
  },
  {
    code: 'MV-PFA',
    title: 'PFA-Lined Ball Valve',
    subtitle: 'Corrosion-Resistant Lining',
    description:
      'Full PFA lining protects against chemical attack while maintaining tight shut-off.',
    specs: ['PFA Lined', 'Acid Service'],
    image: 'https://pblol2.blob.core.windows.net/mars-valves/categories/pfa-lining.jpg',
    href: '#',
  },
  {
    code: 'MV-3W',
    title: 'Three-Way Ball Valve',
    subtitle: 'Multi-Port Flow Diversion',
    description:
      'L-port and T-port configurations for flexible diversion, mixing or splitting service.',
    specs: ['L-Port · T-Port', 'OEM'],
    image: 'https://pblol2.blob.core.windows.net/mars-valves/categories/three-way.jpg',
    href: '#',
  },
  {
    code: 'MV-VP',
    title: 'V-Port Ball Valve',
    subtitle: 'Characterised V-Port Control',
    description:
      'Equal-percentage flow characteristics for precise throttling and process control.',
    specs: ['Control Service', 'V-Port Ball'],
    image: 'https://pblol2.blob.core.windows.net/mars-valves/categories/v-port.png',
    href: '#',
  },
];
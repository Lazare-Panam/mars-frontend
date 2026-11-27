import { ProductVariant } from "@/api/useProductVariants";

// Curated picks: two priced variants from each product that actually has
// prices. The two Series-only products (High Pressure Ball Valve,
// Economical 3-Piece Ball Valve) have no Price field on any variant at
// all, so they're left out of this shelf entirely.
export const SHOP_PRODUCTS: {
  productId: string;
  productName: string;
  thumbnailImage: string;
  variants: ProductVariant[];
}[] = [
  {
    productId: "three-four-five-way-ball-valve",
    productName: "3/4/5-Way Ball Valve",
    thumbnailImage:
      "https://pblol2.blob.core.windows.net/kronox/products/By%20Series/s33.jpg",
    variants: [
      {
        id: "v33-123-1-4into1-2in-t-port-bare-shaft",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/kronox/products/By%20Series/s33.jpg",
        specs: {
          SKU: "V33-123-1-4INto1-2IN-T-PORT-BARE-SHAFT",
          Size: '1/4"~1/2"',
          "Port Type": "T-Port",
          Body: "CF8M",
          Operation: "Bare Shaft",
          Price: "161.70",
        },
      },
      {
        id: "v33-123-3-4in-t-port-bare-shaft",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/kronox/products/By%20Series/s33.jpg",
        specs: {
          SKU: "V33-123-3-4IN-T-PORT-BARE-SHAFT",
          Size: '3/4"',
          "Port Type": "T-Port",
          Body: "CF8M",
          Operation: "Bare Shaft",
          Price: "201.12",
        },
      },
    ],
  },
  {
    productId: "sanitary-multi-port-ball-valve",
    productName: "Sanitary Multi-Port Ball Valve",
    thumbnailImage:
      "https://pblol2.blob.core.windows.net/kronox/products/By%20Series/series-36sn.jpg",
    variants: [
      {
        id: "v36sn-1020-1-2in-cavity-filler-seat-w-handle",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/kronox/products/By%20Series/series-36sn.jpg",
        specs: {
          SKU: "V36SN-1020-1-2IN-CAVITY-FILLER-SEAT-W-HANDLE",
          Size: '1/2"',
          "End Connection": "T-Clamp / OD Tube End",
          Body: "CF8M (SS316)",
          Seat: "PTFE",
          "Seat Type": "Cavity Filler Seat",
          Operation: "W Handle",
          Price: "165.24",
        },
      },
      {
        id: "v36sn-1020-3-4in-cavity-filler-seat-w-handle",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/kronox/products/By%20Series/series-36sn.jpg",
        specs: {
          SKU: "V36SN-1020-3-4IN-CAVITY-FILLER-SEAT-W-HANDLE",
          Size: '3/4"',
          "End Connection": "T-Clamp / OD Tube End",
          Body: "CF8M (SS316)",
          Seat: "PTFE",
          "Seat Type": "Cavity Filler Seat",
          Operation: "W Handle",
          Price: "210.06",
        },
      },
    ],
  },
  {
    productId: "economical-two-piece-ball-valve",
    productName: "Economical 2-Piece Ball Valve",
    thumbnailImage:
      "https://pblol2.blob.core.windows.net/kronox/products/Economical%202-Piece%20Ball%20Valves/series-20-20.jpg",
    variants: [
      {
        id: "V20-20-1-4IN-W-O-LOCK",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/kronox/products/Economical%202-Piece%20Ball%20Valves/series-20-20.jpg",
        specs: {
          SKU: "V20-20-1-4IN-W-O-LOCK",
          Size: "1/4 inch",
          Port: "Full",
          "Pressure Rating": "1000 PSI",
          Body: "CF8M",
          Seats: "PTFE",
          Ends: "NPT / BSP / BSPT",
          Design: "2-piece",
          "Locking Device": "Without Lock",
          Price: "11.55",
        },
      },
      {
        id: "V20-20-1-2IN-W-O-LOCK",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/kronox/products/Economical%202-Piece%20Ball%20Valves/series-20-20.jpg",
        specs: {
          SKU: "V20-20-1-2IN-W-O-LOCK",
          Size: "1/2 inch",
          Port: "Full",
          "Pressure Rating": "1000 PSI",
          Body: "CF8M",
          Seats: "PTFE",
          Ends: "NPT / BSP / BSPT",
          Design: "2-piece",
          "Locking Device": "Without Lock",
          Price: "13.71",
        },
      },
    ],
  },
  {
    productId: "high-performance-three-piece-ball-valve",
    productName: "High Performance 3-Piece Ball Valve",
    thumbnailImage:
      "https://pblol2.blob.core.windows.net/kronox/products/High%20Performance%203-Piece%20Ball%20Valves/series-77.png",
    variants: [
      {
        id: "v77-1-4in-w-o-handle",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/kronox/products/High%20Performance%203-Piece%20Ball%20Valves/series-77.png",
        specs: {
          SKU: "V77-1-4IN-W-O-HANDLE",
          Size: '1/4"',
          "Pressure Rating": "1000 PSI",
          Ball: "CF8M",
          Stem: "SS316",
          Seat: "RPTFE/PTFE",
          Operation: "W/O Handle",
          Price: "27.72",
        },
      },
      {
        id: "v77-1-2in-w-handle",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/kronox/products/High%20Performance%203-Piece%20Ball%20Valves/series-77.png",
        specs: {
          SKU: "V77-1-2IN-W-HANDLE",
          Size: '1/2"',
          "Pressure Rating": "1000 PSI",
          Ball: "CF8M",
          Stem: "SS316",
          Seat: "RPTFE/PTFE",
          Operation: "W Handle",
          Price: "30.03",
        },
      },
    ],
  },
  {
    productId: "high-performance-sanitary-ball-valve",
    productName: "High Performance Sanitary Ball Valve",
    thumbnailImage:
      "https://pblol2.blob.core.windows.net/kronox/products/By%20Series/series77sn.png",
    variants: [
      {
        id: "v77sn-10-2a-1-2in-t-clamp-std-ptfe-seat",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/kronox/products/By%20Series/series77sn.png",
        specs: {
          SKU: "V77SN-10-2A-1-2IN-T-CLAMP-STD-PTFE-SEAT",
          Size: '1/2"',
          "End Connection": "T-Clamp",
          Body: "CF3M",
          Ball: "CF3M/SS316L",
          Stem: "SS316L",
          "Seat Type": "Std PTFE Seat",
          Price: "43.27",
        },
      },
      {
        id: "v77sn-10-2a-3-4in-t-clamp-std-ptfe-seat",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/kronox/products/By%20Series/series77sn.png",
        specs: {
          SKU: "V77SN-10-2A-3-4IN-T-CLAMP-STD-PTFE-SEAT",
          Size: '3/4"',
          "End Connection": "T-Clamp",
          Body: "CF3M",
          Ball: "CF3M/SS316L",
          Stem: "SS316L",
          "Seat Type": "Std PTFE Seat",
          Price: "44.66",
        },
      },
    ],
  },
];


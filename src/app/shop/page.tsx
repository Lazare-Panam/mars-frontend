"use client";

import { Box, Typography } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import {
  GridCard,
  FeaturedCard,
} from "../products/[id]/[productId]/variants/components/VariantsGrid";
import { ProductVariant } from "@/api/useProductVariants";
import Reveal from "@/Common/Reveal";

const BRAND = "#E7390F";
const CATEGORY_ID = "ball-valves";

// Curated picks: two priced variants from each product that actually has
// prices. The two Series-only products (High Pressure Ball Valve,
// Economical 3-Piece Ball Valve) have no Price field on any variant at
// all, so they're left out of this shelf entirely.
const FEATURED: {
  productId: string;
  productName: string;
  thumbnailImage: string;
  variants: ProductVariant[];
}[] = [
  {
    productId: "three-four-five-way-ball-valve",
    productName: "3/4/5-Way Ball Valve",
    thumbnailImage:
      "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/multi-port-valve/3-4-5.png",
    variants: [
      {
        id: "v33-123-1-4into1-2in-t-port-bare-shaft",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/multi-port-valve/3-4-5.png",
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
          "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/multi-port-valve/3-4-5.png",
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
      "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/sanitary-ball-valves/multi-port-san.jpg",
    variants: [
      {
        id: "v36sn-1020-1-2in-cavity-filler-seat-w-handle",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/sanitary-ball-valves/multi-port-san.jpg",
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
          "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/sanitary-ball-valves/multi-port-san.jpg",
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
      "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/two-piece/eco-2.jpg",
    variants: [
      {
        id: "V20-20-1-4IN-W-O-LOCK",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/two-piece/eco-2.jpg",
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
          "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/two-piece/eco-2.jpg",
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
      "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/three-piece/hp-3.png",
    variants: [
      {
        id: "v77-1-4in-w-o-handle",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/three-piece/hp-3.png",
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
          "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/three-piece/hp-3.png",
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
      "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/sanitary-ball-valves/hp-san.png",
    variants: [
      {
        id: "v77sn-10-2a-1-2in-t-clamp-std-ptfe-seat",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/sanitary-ball-valves/hp-san.png",
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
          "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/sanitary-ball-valves/hp-san.png",
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

// The cheapest curated item becomes the big featured card — same
// cheapest-wins convention used on the individual product pages.
const ALL_VARIANTS = FEATURED.flatMap((p) =>
  p.variants.map((v) => ({ ...p, variant: v })),
);
const FEATURED_PICK = ALL_VARIANTS.reduce((min, cur) =>
  parseFloat(cur.variant.specs["Price"] ?? "Infinity") <
  parseFloat(min.variant.specs["Price"] ?? "Infinity")
    ? cur
    : min,
);

export default function ShopLandingPage() {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Welcome hero */}
      <Box
        sx={{
          bgcolor: "#fff",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          px: { xs: 3, md: 8 },
          py: { xs: 5, md: 7 },
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            bgcolor: "primary.main",
          }}
        />
        <Reveal>
        <Box sx={{ maxWidth: "1280px", mx: "auto", textAlign: "center" }}>
          <Typography
            sx={{
              color: "primary.main",
              letterSpacing: "0.2em",
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            Mars Valves UK
          </Typography>
          <Typography
            component="h1"
            sx={{
              color: "text.primary",
              fontSize: { xs: "2rem", md: "2.8rem" },
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              mb: 1.5,
            }}
          >
            Welcome to Mars Valves Shop
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "1rem",
              maxWidth: 560,
              mx: "auto",
              mb: 3,
            }}
          >
            Industrial ball valves, engineered for performance and built to spec
            — browse our range below.
          </Typography>

          {/* Stock / dispatch messaging */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: { xs: 2, md: 4 },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <InventoryOutlinedIcon sx={{ fontSize: 18, color: BRAND }} />
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "text.primary",
                }}
              >
                All products shown are in stock
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocalShippingOutlinedIcon sx={{ fontSize: 18, color: BRAND }} />
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "text.primary",
                }}
              >
                Fast dispatch on every order
              </Typography>
            </Box>
          </Box>
        </Box>
        </Reveal>
      </Box>

      {/* Content */}
      <Box
        sx={{
          maxWidth: "1600px",
          mx: "auto",
          px: { xs: 2, md: 4 },
          py: { xs: 5, md: 7 },
        }}
      >
        {/* Featured */}
        <Reveal>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            <Box sx={{ width: 3, height: 20, bgcolor: BRAND }} />
            <Typography sx={{ fontSize: "1.3rem", fontWeight: 800 }}>
              Featured
            </Typography>
          </Box>
        </Reveal>
        <Reveal>
          <FeaturedCard
            variant={FEATURED_PICK.variant}
            productName={FEATURED_PICK.productName}
            thumbnailImage={FEATURED_PICK.thumbnailImage}
            categoryId={CATEGORY_ID}
            productId={FEATURED_PICK.productId}
          />
        </Reveal>

        {/* Rest of the shelf */}
        <Reveal>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3, mt: 5 }}
          >
            <Box sx={{ width: 3, height: 20, bgcolor: BRAND }} />
            <Typography sx={{ fontSize: "1.3rem", fontWeight: 800 }}>
              More Products
            </Typography>
          </Box>
        </Reveal>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 2,
          }}
        >
          {ALL_VARIANTS.filter(
            (v) => v.variant.id !== FEATURED_PICK.variant.id,
          ).map(({ productId, productName, thumbnailImage, variant }, i) => (
            <Reveal key={variant.id} delay={Math.min(i * 50, 400)}>
              <GridCard
                variant={variant}
                productName={productName}
                thumbnailImage={thumbnailImage}
                categoryId={CATEGORY_ID}
                productId={productId}
              />
            </Reveal>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

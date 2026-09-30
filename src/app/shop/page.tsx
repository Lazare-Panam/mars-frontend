"use client";

import { Box, Typography } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import {
  GridCard,
  FeaturedCard,
} from "../products/[id]/[productId]/variants/components/VariantsGrid";
import { SHOP_PRODUCTS } from "./shopData";
import Reveal from "@/Common/Reveal";

const BRAND = "#E7390F";
const CATEGORY_ID = "ball-valves";

// The cheapest curated item becomes the big featured card — same
// cheapest-wins convention used on the individual product pages.
const ALL_VARIANTS = SHOP_PRODUCTS.flatMap((p) =>
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

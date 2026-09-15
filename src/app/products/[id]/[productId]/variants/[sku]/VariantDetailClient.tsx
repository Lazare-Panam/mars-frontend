"use client";

import { useMemo } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { alpha } from "@mui/material/styles";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import Image from "next/image";
import { useProductVariants, ProductVariant } from "@/api/useProductVariants";
import { GridCard, buildTitle, parsePrice } from "../components/VariantsGrid";
import Reveal from "@/Common/Reveal";
import MagneticWrap from "@/Common/MagneticWrap";

const BRAND = "#E7390F";
const RELATED_COUNT = 4;

export default function VariantDetailClient({
  id,
  productId,
  sku,
}: {
  id: string;
  productId: string;
  sku: string;
}) {
  const { data, isLoading, isError } = useProductVariants(productId);

  const variant = useMemo(
    () => data?.variants.find((v) => v.id === sku),
    [data, sku]
  );

  // Related variants: other variants of the same product, closest in price
  // to this one first (a reasonable, data-driven notion of "similar").
  const related = useMemo(() => {
    if (!data?.variants || !variant) return [];
    const thisPrice = parsePrice(variant.specs["Price"]) ?? 0;
    return data.variants
      .filter((v) => v.id !== variant.id)
      .sort((a, b) => {
        const da = Math.abs((parsePrice(a.specs["Price"]) ?? 0) - thisPrice);
        const db = Math.abs((parsePrice(b.specs["Price"]) ?? 0) - thisPrice);
        return da - db;
      })
      .slice(0, RELATED_COUNT);
  }, [data, variant]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (isError || !data || !variant) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <Typography sx={{ color: "text.secondary" }}>Variant not found.</Typography>
      </Box>
    );
  }

  const image = variant.thumbnailImage || data.thumbnailImage;
  const price = variant.specs["Price"];
  const title = buildTitle(data.name, variant);

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Detail */}
      <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 3, md: 8 }, py: { xs: 4, md: 6 } }}>
        <Box sx={{ display: "flex", gap: { xs: 4, md: 6 }, flexWrap: { xs: "wrap", md: "nowrap" } }}>
          {/* Image */}
          <Box
            sx={{
              width: { xs: "100%", md: 420 },
              height: { xs: 320, md: 420 },
              flexShrink: 0,
              border: "1px solid rgba(0,0,0,0.08)",
              bgcolor: "#fafafa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              "&:hover .product-thumb-img": {
                transform: "scale(1.06)",
              },
            }}
          >
            <Reveal>
              {image && (
                <Image
                  src={image}
                  alt={variant.id}
                  width={340}
                  height={340}
                  className="product-thumb-img"
                  style={{ objectFit: "contain", transition: "transform 0.5s ease" }}
                />
              )}
            </Reveal>
          </Box>

          {/* Details */}
          <Reveal delay={100}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: "0.75rem", fontWeight: 900, letterSpacing: "0.08em", color: BRAND, textTransform: "uppercase", mb: 1.5 }}>
              {data.name}
            </Typography>
            <Typography sx={{ fontSize: { xs: "1.4rem", md: "1.8rem" }, fontWeight: 800, lineHeight: 1.25, mb: 2.5 }}>
              {title}
            </Typography>

            {/* Full spec table */}
            <Box sx={{ border: "1px solid rgba(0,0,0,0.08)", mb: 3 }}>
              {Object.entries(variant.specs)
                .filter(([k]) => k !== "Price")
                .map(([k, v], i) => (
                  <Box
                    key={k}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      px: 2,
                      py: 1.25,
                      bgcolor: i % 2 === 1 ? alpha("#000", 0.015) : "transparent",
                      borderBottom: "1px solid rgba(0,0,0,0.06)",
                      "&:last-of-type": { borderBottom: "none" },
                    }}
                  >
                    <Typography sx={{ fontSize: "0.8rem", color: "text.secondary", fontWeight: 600 }}>
                      {k}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        fontFamily: k === "SKU" ? "monospace" : "inherit",
                      }}
                    >
                      {v}
                    </Typography>
                  </Box>
                ))}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 1 }}>
              <Typography sx={{ fontWeight: 800, fontSize: "2rem", color: "text.primary" }}>
                {price ? `£${price}` : "Login to view price"}
              </Typography>
              <MagneticWrap>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<RequestQuoteOutlinedIcon sx={{ fontSize: 19 }} />}
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    borderRadius: 0,
                    bgcolor: BRAND,
                    boxShadow: "none",
                    px: 4,
                    "&:hover": {
                      bgcolor: "#A8270A",
                      boxShadow: "none",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Request Quote
                </Button>
              </MagneticWrap>
            </Box>
          </Box>
          </Reveal>
        </Box>

        {/* Related products */}
        {related.length > 0 && (
          <Box sx={{ mt: { xs: 6, md: 8 } }}>
            <Reveal>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
                <Box sx={{ width: 3, height: 18, bgcolor: BRAND }} />
                <Typography sx={{ fontSize: "1.1rem", fontWeight: 800 }}>
                  Related Products
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
              {related.map((v: ProductVariant, i: number) => (
                <Reveal key={v.id} delay={Math.min(i * 50, 400)}>
                  <GridCard
                    variant={v}
                    productName={data.name}
                    thumbnailImage={data.thumbnailImage}
                    categoryId={id}
                    productId={productId}
                  />
                </Reveal>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

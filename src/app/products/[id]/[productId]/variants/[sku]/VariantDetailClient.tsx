"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import Image from "next/image";
import NextLink from "next/link";
import { useProductVariants, ProductVariant } from "@/api/useProductVariants";
import { useCartStore } from "@/store/useCartStore";
import { toAddToCartRequest } from "@/lib/cartRequest";
import { parsePrice } from "../components/VariantsGrid";
import Reveal from "@/Common/Reveal";
import PageBreadcrumbs from "@/Common/PageBreadcrumbs";
import { productCrumbs } from "@/lib/breadcrumbs";
import { useQuoteStore } from "@/store/useQuoteStore";
import { variantTitleParts } from "@/lib/variantTitle";

const BRAND = "#E7390F";
const BRAND_DARK = "#A8270A";
const RELATED_COUNT = 4;
// Shown elsewhere on the page (heading / price box), so left out of the spec table.
const HIDDEN_SPEC_KEYS = new Set(["SKU", "Price"]);

// Backend may send a non-URL placeholder (e.g. "PLACEHOLDER - no URL
// provided"); next/image throws on a non-URL src and 500s the page. Only
// render an image when the src is a real relative/absolute URL.
function safeImage(src?: string): string | null {
  return src && /^(https?:\/\/|\/)/.test(src) ? src : null;
}

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
  const addToCart = useCartStore((s) => s.addToCart);
  const setQuote = useQuoteStore((s) => s.setRequest);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

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
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <Typography sx={{ color: "text.secondary" }}>Variant not found.</Typography>
        <Button
          component={NextLink}
          href={`/products/${id}/${productId}/variants`}
          sx={{ textTransform: "none", fontWeight: 700, color: BRAND }}
        >
          Back to all models
        </Button>
      </Box>
    );
  }

  const image = safeImage(variant.thumbnailImage || data.thumbnailImage);
  const price = variant.specs["Price"];
  const hasPrice = (parsePrice(price) ?? 0) > 0;
  const skuLabel = variant.specs["SKU"] ?? variant.id;
  // Short spec summary under the SKU, e.g. "1/2 inch, With Lock". Shared with
  // the <title> tag (see variantTitle.ts) so the two can't drift.
  const { detail } = variantTitleParts(data, sku);
  const specs = Object.entries(variant.specs).filter(([k]) => !HIDDEN_SPEC_KEYS.has(k));

  const handleAddToCart = async () => {
    if (adding) return;
    setAdding(true);
    try {
      // seriesId + variantId must match Mars.API.Models.Basket.AddToCartRequest.
      // The basket is held client-side until checkout, so unitPrice is passed
      // here for the local subtotal; it's stripped before the server sync,
      // which recalculates price itself.
      if (await addToCart(toAddToCartRequest(productId, variant, image))) {
        setAdded(true);
      }
    } finally {
      setAdding(false);
    }
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 3, md: 4 }, py: { xs: 4, md: 6 } }}>
        {/* Breadcrumb */}
        <PageBreadcrumbs
          items={productCrumbs({
            categoryId: id,
            product: { id: productId, name: data.name },
            extra: [{ label: skuLabel, mono: true }],
          })}
          sx={{ mb: 4 }}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "5fr 7fr" },
            gap: { xs: 4, md: 6 },
            alignItems: "start",
          }}
        >
          {/* Image */}
          <Reveal>
            <Box
              sx={{
                position: { md: "sticky" },
                top: 24,
                border: `1px solid ${alpha(BRAND, 0.15)}`,
                borderRadius: "12px",
                bgcolor: "#fff",
                overflow: "hidden",
                "&:hover .product-thumb-img": { transform: "scale(1.05)" },
              }}
            >
              <Box sx={{ position: "relative", aspectRatio: "1 / 1", bgcolor: alpha(BRAND, 0.03) }}>
                {image && (
                  <Image
                    src={image}
                    alt={`${data.name} ${skuLabel}`}
                    fill
                    priority
                    sizes="(max-width: 900px) 100vw, 480px"
                    className="product-thumb-img"
                    style={{ objectFit: "contain", padding: 40, transition: "transform 0.5s ease" }}
                  />
                )}
              </Box>
            </Box>
          </Reveal>

          {/* Details */}
          <Reveal delay={100}>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  fontWeight: 900,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: BRAND,
                  mb: 1,
                }}
              >
                {data.name}
              </Typography>

              <Typography
                component="h1"
                sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 800, lineHeight: 1.15, wordBreak: "break-word" }}
              >
                {skuLabel}
              </Typography>
              {detail && detail !== skuLabel && (
                <Typography sx={{ mt: 0.75, color: "text.secondary", fontSize: "0.95rem" }}>
                  {detail}
                </Typography>
              )}

              {/* Price */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "baseline",
                  gap: 0.75,
                  mt: 2.5,
                  px: 2,
                  py: 1,
                  bgcolor: alpha(BRAND, 0.06),
                  borderRadius: "8px",
                  borderLeft: `4px solid ${BRAND}`,
                }}
              >
                {hasPrice ? (
                  <>
                    <Typography sx={{ fontSize: "1.9rem", fontWeight: 800, color: BRAND }}>
                      £{price}
                    </Typography>
                    <Typography sx={{ fontSize: "0.8rem", color: "text.secondary" }}>per unit</Typography>
                  </>
                ) : (
                  <Typography sx={{ fontSize: "1.1rem", fontWeight: 800, color: BRAND, py: 0.5 }}>
                    Contact for price
                  </Typography>
                )}
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Specifications */}
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  fontWeight: 900,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "text.secondary",
                  mb: 1.5,
                }}
              >
                Specifications
              </Typography>
              <Box
                component="dl"
                sx={{
                  m: 0,
                  border: `1px solid ${alpha(BRAND, 0.12)}`,
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                {specs.map(([label, value], i) => (
                  <Box
                    key={label}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "40% 1fr",
                      px: 2,
                      py: 1.25,
                      bgcolor: i % 2 === 0 ? "#fff" : alpha(BRAND, 0.02),
                      borderBottom: `1px solid ${alpha(BRAND, 0.08)}`,
                      "&:last-of-type": { borderBottom: "none" },
                    }}
                  >
                    <Typography
                      component="dt"
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        color: "text.secondary",
                        textTransform: "uppercase",
                        letterSpacing: "0.03em",
                        alignSelf: "center",
                      }}
                    >
                      {label}
                    </Typography>
                    <Typography component="dd" sx={{ m: 0, fontSize: "0.9rem", fontWeight: 600 }}>
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Action */}
              {hasPrice ? (
                <Button
                  variant="contained"
                  fullWidth
                  disableElevation
                  onClick={handleAddToCart}
                  disabled={adding}
                  startIcon={<AddShoppingCartOutlinedIcon />}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    bgcolor: BRAND,
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    borderRadius: "8px",
                    "&:hover": { bgcolor: BRAND_DARK },
                  }}
                >
                  {adding ? "Adding…" : "Add to cart"}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  fullWidth
                  disableElevation
                  component={NextLink}
                  href="/contact"
                  onClick={() => setQuote({ sku: skuLabel, product: data.name })}
                  startIcon={<RequestQuoteOutlinedIcon />}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    bgcolor: BRAND,
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    borderRadius: "8px",
                    "&:hover": { bgcolor: BRAND_DARK },
                  }}
                >
                  Request quote
                </Button>
              )}
            </Box>
          </Reveal>
        </Box>

        {/* Related products */}
        {related.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Divider sx={{ mb: 4 }} />
            <Typography component="h2" sx={{ fontSize: "1.15rem", fontWeight: 800, mb: 3 }}>
              Related products
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" },
                gap: 2.5,
              }}
            >
              {related.map((item: ProductVariant, i: number) => (
                <Reveal key={item.id} delay={Math.min(i * 50, 200)}>
                  <RelatedCard
                    item={item}
                    href={`/products/${id}/${productId}/variants/${item.id}`}
                    fallbackImage={data.thumbnailImage}
                  />
                </Reveal>
              ))}
            </Box>
          </Box>
        )}
      </Box>

      <Snackbar
        open={added}
        autoHideDuration={2500}
        onClose={() => setAdded(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled" sx={{ fontWeight: 600 }}>
          Added to cart
        </Alert>
      </Snackbar>
    </Box>
  );
}

function RelatedCard({
  item,
  href,
  fallbackImage,
}: {
  item: ProductVariant;
  href: string;
  fallbackImage: string;
}) {
  const image = safeImage(item.thumbnailImage || fallbackImage);
  const itemSku = item.specs["SKU"] ?? item.id;
  const itemPrice = item.specs["Price"];

  return (
    <NextLink href={href} style={{ textDecoration: "none", color: "inherit" }}>
      <Box
        sx={{
          border: `1px solid ${alpha(BRAND, 0.12)}`,
          borderRadius: "10px",
          p: 1.5,
          bgcolor: "#fff",
          height: "100%",
          transition: "all 0.15s",
          "&:hover": { borderColor: BRAND, boxShadow: `0 4px 16px ${alpha(BRAND, 0.12)}` },
        }}
      >
        <Box sx={{ position: "relative", aspectRatio: "1 / 1", bgcolor: alpha(BRAND, 0.03), borderRadius: "6px" }}>
          {image && (
            <Image
              src={image}
              alt={itemSku}
              fill
              sizes="(max-width: 600px) 50vw, 280px"
              style={{ objectFit: "contain", padding: 16 }}
            />
          )}
        </Box>
        <Typography noWrap sx={{ fontSize: "0.82rem", fontWeight: 700, mt: 1.25, fontFamily: "monospace" }}>
          {itemSku}
        </Typography>
        <Typography sx={{ fontSize: "0.85rem", fontWeight: 800, color: BRAND, mt: 0.25 }}>
          {itemPrice ? `£${itemPrice}` : "Contact for price"}
        </Typography>
      </Box>
    </NextLink>
  );
}

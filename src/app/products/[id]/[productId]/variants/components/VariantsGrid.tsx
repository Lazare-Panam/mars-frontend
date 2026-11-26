"use client";

import { useMemo, useState } from "react";
import { Box, Typography, Button, Pagination, Chip } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CheckIcon from "@mui/icons-material/Check";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import Image from "next/image";
import NextLink from "next/link";
import { ProductVariant } from "@/api/useProductVariants";
import Reveal from "@/Common/Reveal";
import { variantImageAlt } from "@/lib/variantTitle";
import { useQuoteStore } from "@/store/useQuoteStore";
import { useCartStore } from "@/store/useCartStore";
import { toAddToCartRequest } from "@/lib/cartRequest";

const BRAND = "#E0393E";
const PAGE_SIZE = 12;

const SORT_OPTIONS: { key: string; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "name-asc", label: "Product Name" },
  { key: "price-asc", label: "Lowest Price" },
  { key: "price-desc", label: "Highest Price" },
];

export function parsePrice(price?: string): number | null {
  if (!price) return null;
  const n = parseFloat(price);
  return Number.isNaN(n) ? null : n;
}

// Builds a short, spec-led title, e.g.
// `1/4", Full Port, WCB — Heavy Duty Fire-Safe Ball Valve`
export function buildTitle(
  productName: string,
  variant: ProductVariant,
): string {
  const parts = Object.entries(variant.specs)
    .filter(([k]) => k !== "SKU" && k !== "Price")
    .map(([, v]) => v);
  // Series-level rows (SKU like "Series 28") can share identical specs with a
  // sibling series, producing duplicate titles. Append the series id so each
  // stays unique.
  const sku = variant.specs["SKU"];
  if (sku && /^series\b/i.test(sku)) parts.push(sku);
  return parts.length ? `${parts.join(", ")} — ${productName}` : productName;
}

// The variant detail page lives at /products/[categoryId]/[productId]/variants/[sku]
export function variantHref(
  categoryId: string,
  productId: string,
  variant: ProductVariant,
): string {
  return `/products/${categoryId}/${productId}/variants/${variant.id}`;
}

// Adds one of this variant to the basket (same request as the table and the
// variant page; the server looks up the price). `added` flips on for a moment
// so the button can confirm.
function useAddVariantToCart(productId: string, variant: ProductVariant, image: string | null) {
  const addToCart = useCartStore((s) => s.addToCart);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const add = async () => {
    if (adding) return;
    setAdding(true);
    try {
      if (await addToCart(toAddToCartRequest(productId, variant, image))) {
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }
    } finally {
      setAdding(false);
    }
  };
  return { add, adding, added };
}

function PriceBlock({ price, onQuote }: { price?: string; onQuote: () => void }) {
  const router = useRouter();

  if (price) {
    return (
      <Typography
        sx={{ fontWeight: 800, fontSize: "1.05rem", color: "text.primary" }}
      >
        £{price}
      </Typography>
    );
  }
  return (
    <Button
      size="small"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onQuote();
        router.push("/contact");
      }}
      startIcon={<MailOutlinedIcon sx={{ fontSize: 13 }} />}
      sx={{
        textTransform: "none",
        fontWeight: 700,
        fontSize: "0.72rem",
        color: BRAND,
        px: 0,
        "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
      }}
    >
      Contact for price
    </Button>
  );
}

export function FeaturedCard({
  variant,
  productName,
  thumbnailImage,
  categoryId,
  productId,
}: {
  variant: ProductVariant;
  productName: string;
  thumbnailImage: string;
  categoryId: string;
  productId: string;
}) {
  const rawImage = variant.thumbnailImage || thumbnailImage;
  // Guard against non-URL placeholders from the backend (next/image throws on
  // a non-URL src and 500s the page).
  const image =
    rawImage && /^(https?:\/\/|\/)/.test(rawImage) ? rawImage : null;
  const price = variant.specs["Price"];
  const router = useRouter();
  const setQuote = useQuoteStore((s) => s.setRequest);
  const onQuote = () => setQuote({ sku: variant.specs["SKU"] ?? variant.id, product: productName });
  const cart = useAddVariantToCart(productId, variant, image);

  return (
    <Box
      component={NextLink}
      href={variantHref(categoryId, productId, variant)}
      sx={{
        display: "flex",
        gap: 5,
        p: { xs: 3, md: 5 },
        mb: 4,
        mx: "auto",
        maxWidth: 920,
        border: `1px solid ${alpha(BRAND, 0.2)}`,
        borderRadius: 0,
        bgcolor: "#fff",
        boxShadow: `0 4px 24px ${alpha("#000", 0.06)}`,
        flexWrap: { xs: "wrap", md: "nowrap" },
        justifyContent: "center",
        textDecoration: "none",
        color: "inherit",
        transition:
          "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          borderColor: "primary.main",
          transform: "translateY(-4px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        },
        "&:hover .product-thumb-img": {
          transform: "scale(1.06)",
        },
      }}
    >
      <Box sx={{ position: "relative", flexShrink: 0 }}>
        <Chip
          label="Best Price"
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            bgcolor: BRAND,
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.72rem",
            borderRadius: 0,
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            width: { xs: "100%", sm: 300 },
            height: 300,
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 0,
            bgcolor: "#fafafa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {image && (
            <Image
              src={image}
              alt={variantImageAlt(productName, variant)}
              width={260}
              height={260}
              className="product-thumb-img"
              style={{ objectFit: "contain", transition: "transform 0.5s ease" }}
            />
          )}
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          maxWidth: 420,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "0.78rem",
            fontWeight: 900,
            letterSpacing: "0.08em",
            color: BRAND,
            textTransform: "uppercase",
            mb: 1.5,
          }}
        >
          Featured Variant
        </Typography>
        <Typography
          sx={{ fontSize: "1.5rem", fontWeight: 800, mb: 2, lineHeight: 1.3 }}
        >
          {buildTitle(productName, variant)}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2.5 }}>
          {Object.entries(variant.specs)
            .filter(([k]) => k !== "SKU" && k !== "Price")
            .map(([k, v]) => (
              <Chip
                key={k}
                label={`${k}: ${v}`}
                size="small"
                sx={{
                  bgcolor: alpha(BRAND, 0.06),
                  color: "text.primary",
                  fontSize: "0.78rem",
                  py: 1.75,
                  borderRadius: 0,
                }}
              />
            ))}
        </Box>

        {variant.specs["SKU"] && (
          <Typography
            sx={{
              fontSize: "0.78rem",
              fontFamily: "monospace",
              color: "text.secondary",
              mb: 2.5,
            }}
          >
            Product Code: Kronox
          </Typography>
        )}

        <Box
          sx={{ display: "flex", alignItems: "center", gap: 2.5, mt: "auto" }}
        >
          {price ? (
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1.6rem",
                color: "text.primary",
              }}
            >
              £{price}
            </Typography>
          ) : (
            <PriceBlock price={price} onQuote={onQuote} />
          )}
          <Button
            variant="contained"
            size="medium"
            disabled={cart.adding}
            onClick={(e) => {
              // The card itself links to the variant page; the button adds to
              // the basket (priced) or opens the pre-filled quote form.
              e.preventDefault();
              e.stopPropagation();
              if (price) {
                cart.add();
                return;
              }
              onQuote();
              router.push("/contact");
            }}
            startIcon={
              price ? (
                cart.added ? <CheckIcon sx={{ fontSize: 17 }} /> : <ShoppingCartOutlinedIcon sx={{ fontSize: 17 }} />
              ) : (
                <RequestQuoteOutlinedIcon sx={{ fontSize: 17 }} />
              )
            }
            sx={{
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.9rem",
              borderRadius: 0,
              bgcolor: BRAND,
              boxShadow: "none",
              px: 3,
              py: 1,
              "&:hover": { bgcolor: "#B8262C", boxShadow: "none" },
            }}
          >
            {price ? (cart.added ? "Added" : "Add to Cart") : "Request Quote"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export function GridCard({
  variant,
  productName,
  thumbnailImage,
  categoryId,
  productId,
}: {
  variant: ProductVariant;
  productName: string;
  thumbnailImage: string;
  categoryId: string;
  productId: string;
}) {
  const rawImage = variant.thumbnailImage || thumbnailImage;
  // Guard against non-URL placeholders from the backend (next/image throws on
  // a non-URL src and 500s the page).
  const image =
    rawImage && /^(https?:\/\/|\/)/.test(rawImage) ? rawImage : null;
  const price = variant.specs["Price"];
  const router = useRouter();
  const setQuote = useQuoteStore((s) => s.setRequest);
  const onQuote = () => setQuote({ sku: variant.specs["SKU"] ?? variant.id, product: productName });
  const cart = useAddVariantToCart(productId, variant, image);

  return (
    <Box
      component={NextLink}
      href={variantHref(categoryId, productId, variant)}
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 0,
        bgcolor: "#fff",
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
        transition:
          "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          transform: "translateY(-2px)",
        },
        "&:hover .product-thumb-img": {
          transform: "scale(1.06)",
        },
      }}
    >
      <Box
        sx={{
          height: 160,
          bgcolor: "#fafafa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          borderRadius: 0,
          overflow: "hidden",
        }}
      >
        {image && (
          <Image
            src={image}
            alt={variantImageAlt(productName, variant)}
            width={130}
            height={130}
            className="product-thumb-img"
            style={{ objectFit: "contain", transition: "transform 0.5s ease" }}
          />
        )}
      </Box>

      <Box sx={{ p: 1.75, display: "flex", flexDirection: "column", flex: 1 }}>
        <Typography
          sx={{
            fontSize: "0.82rem",
            fontWeight: 600,
            lineHeight: 1.35,
            mb: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {buildTitle(productName, variant)}
        </Typography>

        <Box sx={{ mt: "auto" }}>
          <PriceBlock price={price} onQuote={onQuote} />
          {variant.specs["SKU"] && (
            <Typography
              sx={{
                fontSize: "0.68rem",
                fontFamily: "monospace",
                color: "text.secondary",
                mt: 0.5,
              }}
            >
              Code: Kronox
            </Typography>
          )}
          <Button
            fullWidth
            variant="outlined"
            size="small"
            disabled={cart.adding}
            onClick={(e) => {
              // The card itself links to the variant page; the button adds to
              // the basket (priced) or opens the pre-filled quote form.
              e.preventDefault();
              e.stopPropagation();
              if (price) {
                cart.add();
                return;
              }
              onQuote();
              router.push("/contact");
            }}
            startIcon={
              price ? (
                cart.added ? <CheckIcon sx={{ fontSize: 14 }} /> : <ShoppingCartOutlinedIcon sx={{ fontSize: 14 }} />
              ) : (
                <RequestQuoteOutlinedIcon sx={{ fontSize: 14 }} />
              )
            }
            sx={{
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.72rem",
              borderRadius: 0,
              borderColor: alpha(BRAND, 0.4),
              color: BRAND,
              mt: 1.25,
              "&:hover": { borderColor: BRAND, bgcolor: alpha(BRAND, 0.06) },
            }}
          >
            {price ? (cart.added ? "Added" : "Add to Cart") : "Request Quote"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

interface Props {
  variants: ProductVariant[];
  productName: string;
  thumbnailImage: string;
  sortKey: string;
  onSortChange: (key: string) => void;
  categoryId: string;
  productId: string;
}

export default function VariantsGrid({
  variants,
  productName,
  thumbnailImage,
  sortKey,
  onSortChange,
  categoryId,
  productId,
}: Props) {
  const [page, setPage] = useState(1);

  // Cheapest variant with an actual numeric price becomes the featured card.
  // If no variant has a price listed, fall back to
  // the first variant so the section still renders something sensible.
  const featured = useMemo(() => {
    const priced = variants
      .map((v) => ({ v, price: parsePrice(v.specs["Price"]) }))
      .filter(
        (x): x is { v: ProductVariant; price: number } => x.price !== null,
      );
    if (priced.length === 0) return variants[0];
    return priced.reduce((min, cur) => (cur.price < min.price ? cur : min)).v;
  }, [variants]);

  const rest = useMemo(
    () => variants.filter((v) => v.id !== featured?.id),
    [variants, featured],
  );

  const sorted = useMemo(() => {
    const list = [...rest];
    switch (sortKey) {
      case "price-asc":
        return list.sort(
          (a, b) =>
            (parsePrice(a.specs["Price"]) ?? Infinity) -
            (parsePrice(b.specs["Price"]) ?? Infinity),
        );
      case "price-desc":
        return list.sort(
          (a, b) =>
            (parsePrice(b.specs["Price"]) ?? -Infinity) -
            (parsePrice(a.specs["Price"]) ?? -Infinity),
        );
      case "name-asc":
        return list.sort((a, b) =>
          buildTitle(productName, a).localeCompare(buildTitle(productName, b)),
        );
      default:
        return list;
    }
  }, [rest, sortKey, productName]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageItems = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (!variants.length) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography sx={{ color: "text.secondary" }}>
          No variants found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Sort bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          mb: 3,
          pb: 1.5,
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          flexWrap: "wrap",
        }}
      >
        {SORT_OPTIONS.map((opt) => (
          <Button
            key={opt.key}
            onClick={() => {
              onSortChange(opt.key);
              setPage(1);
            }}
            size="small"
            sx={{
              textTransform: "none",
              fontWeight: sortKey === opt.key ? 800 : 500,
              fontSize: "0.8rem",
              color: sortKey === opt.key ? BRAND : "text.secondary",
              borderBottom:
                sortKey === opt.key
                  ? `2px solid ${BRAND}`
                  : "2px solid transparent",
              borderRadius: 0,
              px: 1.5,
              py: 0.75,
              "&:hover": { bgcolor: "transparent", color: BRAND },
            }}
          >
            {opt.label}
          </Button>
        ))}
        <Typography
          sx={{ ml: "auto", fontSize: "0.78rem", color: "text.secondary" }}
        >
          {variants.length} model{variants.length !== 1 ? "s" : ""}
        </Typography>
      </Box>

      {/* Featured (cheapest) */}
      {featured && (
        <Reveal>
          <FeaturedCard
            variant={featured}
            productName={productName}
            thumbnailImage={thumbnailImage}
            categoryId={categoryId}
            productId={productId}
          />
        </Reveal>
      )}

      {/* Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 2,
          mb: 4,
        }}
      >
        {pageItems.map((v, i) => (
          <Reveal key={v.id} delay={Math.min(i * 50, 400)}>
            <GridCard
              variant={v}
              productName={productName}
              thumbnailImage={thumbnailImage}
              categoryId={categoryId}
              productId={productId}
            />
          </Reveal>
        ))}
      </Box>

      {pageCount > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, p) => setPage(p)}
            shape="rounded"
            sx={{
              "& .Mui-selected": {
                bgcolor: `${BRAND} !important`,
                color: "#fff",
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}

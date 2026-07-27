"use client";

import { useMemo, useState } from "react";
import { Box, Typography, Button, Pagination, Chip } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Image from "next/image";
import NextLink from "next/link";
import { ProductVariant } from "@/api/useProductVariants";

const BRAND = "#E7390F";
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

// Builds a readable title out of the non-reference spec values, prefixed
// with the Mars brand name, e.g.
// `Mars Heavy Duty Fire-Safe Ball Valve — 1/4", Full Port, WCB, 2000 PSI, PTFE/RTFE`
export function buildTitle(
  productName: string,
  variant: ProductVariant,
): string {
  const parts = Object.entries(variant.specs)
    .filter(([k]) => k !== "SKU" && k !== "Price")
    .map(([, v]) => v);
  const name = `Mars ${productName}`;
  return parts.length ? `${name} — ${parts.join(", ")}` : name;
}

// The variant detail page lives at /products/[categoryId]/[productId]/variants/[sku]
export function variantHref(
  categoryId: string,
  productId: string,
  variant: ProductVariant,
): string {
  return `/products/${categoryId}/${productId}/variants/${variant.id}`;
}

function PriceBlock({ price }: { price?: string }) {
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
        router.push("/login");
      }}
      startIcon={<LockOutlinedIcon sx={{ fontSize: 13 }} />}
      sx={{
        textTransform: "none",
        fontWeight: 700,
        fontSize: "0.72rem",
        color: BRAND,
        px: 0,
        "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
      }}
    >
      Login to view price
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
  const image = variant.thumbnailImage || thumbnailImage;
  const price = variant.specs["Price"];

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
              alt={variant.id}
              width={260}
              height={260}
              style={{ objectFit: "contain" }}
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
            Product Code: Mars
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
            <PriceBlock price={price} />
          )}
          <Button
            variant="contained"
            size="medium"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            startIcon={<RequestQuoteOutlinedIcon sx={{ fontSize: 17 }} />}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.9rem",
              borderRadius: 0,
              bgcolor: BRAND,
              boxShadow: "none",
              px: 3,
              py: 1,
              "&:hover": { bgcolor: "#A8270A", boxShadow: "none" },
            }}
          >
            Request Quote
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
  const image = variant.thumbnailImage || thumbnailImage;
  const price = variant.specs["Price"];

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
        transition: "box-shadow 0.15s ease, transform 0.15s ease",
        "&:hover": {
          boxShadow: `0 4px 16px ${alpha("#000", 0.08)}`,
          transform: "translateY(-2px)",
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
        }}
      >
        {image && (
          <Image
            src={image}
            alt={variant.id}
            width={130}
            height={130}
            style={{ objectFit: "contain" }}
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
          <PriceBlock price={price} />
          {variant.specs["SKU"] && (
            <Typography
              sx={{
                fontSize: "0.68rem",
                fontFamily: "monospace",
                color: "text.secondary",
                mt: 0.5,
              }}
            >
              Code: Mars
            </Typography>
          )}
          <Button
            fullWidth
            variant="outlined"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            startIcon={<RequestQuoteOutlinedIcon sx={{ fontSize: 14 }} />}
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
            Request Quote
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
  // If nothing has a visible price (all gated behind login), fall back to
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
        <FeaturedCard
          variant={featured}
          productName={productName}
          thumbnailImage={thumbnailImage}
          categoryId={categoryId}
          productId={productId}
        />
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
        {pageItems.map((v) => (
          <GridCard
            key={v.id}
            variant={v}
            productName={productName}
            thumbnailImage={thumbnailImage}
            categoryId={categoryId}
            productId={productId}
          />
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

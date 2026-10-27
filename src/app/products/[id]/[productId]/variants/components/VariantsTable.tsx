"use client";

import { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  TablePagination,
  Typography,
  Chip,
  Button,
  IconButton,
  Snackbar,
  Alert,
  Collapse,
  InputBase,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Image from "next/image";
import NextLink from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ProductVariant } from "@/api/useProductVariants";
import { useCartStore } from "@/store/useCartStore";
import { toAddToCartRequest } from "@/lib/cartRequest";
import { variantImageAlt } from "@/lib/variantTitle";
import { useQuoteStore } from "@/store/useQuoteStore";

const BRAND = "#E7390F";

// Price + action columns stay pinned to the right edge while wide spec tables
// scroll sideways, so the price and cart button are always visible. Pinned
// cells need an opaque background (row tints are translucent), so these are
// the row colours pre-blended onto white.
const ACTION_WIDTH = 140;
const PRICE_WIDTH = 110;
const ROW_BG = "#fff";
const ROW_BG_ZEBRA = "#f5f6f8";
const ROW_BG_OPEN = "#fef9f8";
const ROW_BORDER = "1px solid rgba(0,0,0,0.1)";

// Spec keys that read as reference/lookup data rather than a shoppable
// attribute — styled smaller and muted instead of like a normal spec.
const REFERENCE_KEYS = new Set(["SKU"]);

// Columns shown INLINE in the desktop table, in this order. Every other spec
// still appears in the expandable row's full "Specifications" grid, so nothing
// is hidden — this just keeps the table from overflowing under the pinned
// Price / Add-to-Cart columns. Edit this list to change what shows inline.
const PRIMARY_KEYS = [
  "SKU",
  "Size",
  "Port",
  "Pressure Rating",
  "Operating Pressure",
  "End Connection",
  "Body",
  "Seats",
  "Ends",
  "Design",
  "Locking Device",
  "Lock",
];

// Prices arrive as display strings (e.g. "1,234.50"); strip everything but
// digits and the decimal point so they can be compared as numbers. Returns
// null when there is no usable price, so those rows can be pushed to the end.
function parsePrice(raw?: string): number | null {
  if (!raw) return null;
  const n = parseFloat(raw.replace(/[^0-9.]/g, ""));
  return Number.isNaN(n) ? null : n;
}

function PriceCell({ price, onQuote }: { price?: string; onQuote: () => void }) {
  if (price) {
    return (
      <Typography
        sx={{ fontWeight: 800, fontSize: "1rem", color: "text.primary" }}
      >
        £{price}
      </Typography>
    );
  }

  return (
    <Button
      component={NextLink}
      href="/contact"
      onClick={onQuote}
      size="small"
      startIcon={<MailOutlinedIcon sx={{ fontSize: 14 }} />}
      sx={{
        textTransform: "none",
        fontWeight: 700,
        fontSize: "0.75rem",
        color: BRAND,
        borderRadius: "6px",
        px: 1,
        "&:hover": { bgcolor: alpha(BRAND, 0.06) },
      }}
    >
      Contact for price
    </Button>
  );
}

interface RowProps {
  variant: ProductVariant;
  seriesId: string;
  productName: string;
  specKeys: string[];
  thumbnailImage: string;
  zebra: boolean;
  detailBasePath?: string;
  onAddedToCart: () => void;
}

function VariantRow({
  variant,
  seriesId,
  productName,
  specKeys,
  thumbnailImage,
  zebra,
  detailBasePath,
  onAddedToCart,
}: RowProps) {
  const addToCart = useCartStore((s) => s.addToCart);
  const [adding, setAdding] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  // Route is /products/[id]/... but can also be reused under /series/[seriesId]/...
  const routeParams = useParams<{ id?: string; seriesId?: string }>();
  const id = routeParams.id ?? routeParams.seriesId ?? seriesId;

  const image = variant.thumbnailImage || thumbnailImage;
  const price = variant.specs["Price"];
  const detailHref = detailBasePath
    ? `${detailBasePath}/${variant.id}`
    : `/products/${id}/${seriesId}/variants/${variant.id}`;
  const setQuote = useQuoteStore((s) => s.setRequest);
  const onQuote = () => setQuote({ sku: variant.specs["SKU"] ?? variant.id, product: productName });
  const rowBg = open ? ROW_BG_OPEN : zebra ? ROW_BG_ZEBRA : ROW_BG;
  const goToDetail = () => router.push(detailHref);

  const handleAddToCart = async () => {
    if (adding) return;

    setAdding(true);
    try {
      // seriesId + variantId must match Mars.API.Models.Basket.AddToCartRequest
      // (backend looks up price via GetPriceAsync(SeriesId, VariantId) —
      // unitPrice is not sent, the server is the source of truth for price)
      if (await addToCart(toAddToCartRequest(seriesId, variant, image))) {
        onAddedToCart();
      }
    } finally {
      setAdding(false);
    }
  };

  return (
    <>
    <TableRow
      onClick={goToDetail}
      sx={{
        cursor: "pointer",
        bgcolor: rowBg,
        // Hover (like Hiflux): light red tint, a red bar on the left edge and
        // the SKU turning red. Only colours change, so it stays smooth; no
        // position/z-index/shadow changes that make the row re-layer.
        "& > td": {
          borderBottom: open ? "none" : ROW_BORDER,
          transition: "background-color 0.2s ease, box-shadow 0.2s ease",
        },
        "& > td:first-of-type": { boxShadow: "inset 3px 0 0 transparent" },
        "&:hover > td": { bgcolor: "#fdf1ee" },
        "&:hover > td:first-of-type": { boxShadow: `inset 3px 0 0 ${BRAND}` },
        "&:hover .variant-sku": { color: BRAND, textDecoration: "underline" },
      }}
    >
      <TableCell sx={{ width: 48, py: 1.5, pr: 0 }}>
        <IconButton
          size="small"
          aria-label={open ? "Hide specifications" : "Show specifications"}
          aria-expanded={open}
          onClick={(e) => {
            e.stopPropagation();
            setOpen((o) => !o);
          }}
        >
          {open ? (
            <KeyboardArrowUpIcon fontSize="small" />
          ) : (
            <KeyboardArrowDownIcon fontSize="small" />
          )}
        </IconButton>
      </TableCell>

      <TableCell sx={{ width: 72, py: 1.5 }}>
        {image && (
          <Box
            sx={{
              width: 56,
              height: 56,
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: "8px",
              bgcolor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              boxShadow: `0 1px 3px ${alpha("#000", 0.06)}`,
            }}
          >
            <Image
              src={image}
              alt={variantImageAlt(productName, variant)}
              width={46}
              height={46}
              style={{ objectFit: "contain" }}
            />
          </Box>
        )}
      </TableCell>

      {specKeys.map((key) => {
        const value = variant.specs[key];
        const isReference = REFERENCE_KEYS.has(key);

        return (
          <TableCell
            key={key}
            sx={{
              py: 2.75,
              fontSize: "0.875rem",
              whiteSpace: "nowrap",
              verticalAlign: "middle",
              ...(isReference ? { minWidth: 160 } : {}),
            }}
          >
            {!value ? (
              <Typography sx={{ fontSize: "0.875rem", color: "text.disabled" }}>
                —
              </Typography>
            ) : isReference ? (
              // Real <a href> so search engines can discover each variant
              // page; the row's onClick handles click-anywhere for people.
              <NextLink
                href={detailHref}
                onClick={(e) => e.stopPropagation()}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Typography
                  className="variant-sku"
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    fontFamily: "monospace",
                    transition: "color 0.2s ease",
                    letterSpacing: "0.01em",
                    color: "#444",
                    // Long SKUs (e.g. Series 88) wrap at their hyphens instead
                    // of stretching the table past the screen.
                    maxWidth: 260,
                    whiteSpace: "normal",
                    overflowWrap: "anywhere",
                  }}
                >
                  {value}
                </Typography>
              </NextLink>
            ) : key === "End Connection" || key === "Port Type" ? (
              <Chip
                label={value}
                size="small"
                sx={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  bgcolor: "#f3f3f5",
                  color: "#333",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "6px",
                }}
              />
            ) : (
              <Typography sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
                {value}
              </Typography>
            )}
          </TableCell>
        );
      })}

      <TableCell
        sx={{
          py: 1.5,
          width: PRICE_WIDTH,
          minWidth: PRICE_WIDTH,
          bgcolor: rowBg,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            justifyContent: "center",
          }}
        >
          <PriceCell price={price} onQuote={onQuote} />
        </Box>
      </TableCell>

      <TableCell
        sx={{
          py: 1.5,
          width: ACTION_WIDTH,
          minWidth: ACTION_WIDTH,
          bgcolor: rowBg,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
          {price ? (
            <Button
              variant="outlined"
              size="small"
              onClick={handleAddToCart}
              disabled={adding}
              startIcon={<AddShoppingCartOutlinedIcon sx={{ fontSize: 16 }} />}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.78rem",
                borderRadius: "6px",
                borderColor: alpha(BRAND, 0.4),
                color: BRAND,
                whiteSpace: "nowrap",
                "&:hover": { borderColor: BRAND, bgcolor: alpha(BRAND, 0.06) },
              }}
            >
              Add to Cart
            </Button>
          ) : (
            <Button
              variant="outlined"
              size="small"
              component={NextLink}
              href={detailHref}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.78rem",
                borderRadius: "6px",
                borderColor: alpha(BRAND, 0.4),
                color: BRAND,
                whiteSpace: "nowrap",
                "&:hover": { borderColor: BRAND, bgcolor: alpha(BRAND, 0.06) },
              }}
            >
              View details
            </Button>
          )}
        </Box>
      </TableCell>
    </TableRow>

    <TableRow>
      <TableCell
        colSpan={specKeys.length + 4}
        sx={{ p: 0, borderBottom: open ? "1px solid rgba(0,0,0,0.08)" : "none" }}
      >
        <Collapse in={open} unmountOnExit>
          <Box
            sx={{
              p: 3,
              bgcolor: alpha(BRAND, 0.02),
              borderLeft: `4px solid ${BRAND}`,
              display: "flex",
              gap: 4,
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {image && (
              <Box
                sx={{
                  width: 140,
                  height: 140,
                  flexShrink: 0,
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "8px",
                  bgcolor: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={image}
                  alt={variant.id}
                  width={120}
                  height={120}
                  style={{ objectFit: "contain" }}
                />
              </Box>
            )}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  fontWeight: 900,
                  letterSpacing: "0.1em",
                  color: BRAND,
                  mb: 2,
                  textTransform: "uppercase",
                }}
              >
                Specifications
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 4, rowGap: 2, mb: 3 }}>
                {Object.entries(variant.specs).map(([k, v]) => (
                  <Box key={k}>
                    <Typography
                      sx={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        color: "text.secondary",
                        mb: 0.25,
                      }}
                    >
                      {k}
                    </Typography>
                    <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
                      {k === "Price" ? `£${v}` : v}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                {price ? (
                  <Button
                    variant="contained"
                    size="small"
                    disableElevation
                    onClick={handleAddToCart}
                    disabled={adding}
                    startIcon={<AddShoppingCartOutlinedIcon sx={{ fontSize: 16 }} />}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: "6px",
                      bgcolor: BRAND,
                      px: 3,
                      "&:hover": { bgcolor: "#A8270A" },
                    }}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="small"
                    disableElevation
                    component={NextLink}
                    href="/contact"
                    onClick={onQuote}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: "6px",
                      bgcolor: BRAND,
                      px: 3,
                      "&:hover": { bgcolor: "#A8270A" },
                    }}
                  >
                    Request quote
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
    </>
  );
}

interface Props {
  variants: ProductVariant[];
  seriesId: string;
  productName: string;
  specKeys: string[];
  thumbnailImage: string;
  detailBasePath?: string;
}


/**
 * Phone layout: one card per variant instead of a wide table, so the product
 * (photo, SKU, key specs) is visible next to its price and Add to Cart button.
 */
function VariantCard({
  variant,
  seriesId,
  productName,
  specKeys,
  thumbnailImage,
  detailBasePath,
  onAddedToCart,
}: Omit<RowProps, "zebra">) {
  const addToCart = useCartStore((s) => s.addToCart);
  const [adding, setAdding] = useState(false);
  const routeParams = useParams<{ id?: string; seriesId?: string }>();
  const id = routeParams.id ?? routeParams.seriesId ?? seriesId;
  const setQuote = useQuoteStore((s) => s.setRequest);

  const image = variant.thumbnailImage || thumbnailImage;
  const price = variant.specs["Price"];
  const sku = variant.specs["SKU"] ?? variant.id;
  const detailHref = detailBasePath
    ? `${detailBasePath}/${variant.id}`
    : `/products/${id}/${seriesId}/variants/${variant.id}`;
  const onQuote = () => setQuote({ sku, product: productName });
  const specs = specKeys.filter((k) => k !== "SKU" && variant.specs[k]);

  const handleAddToCart = async () => {
    if (adding) return;
    setAdding(true);
    try {
      if (await addToCart(toAddToCartRequest(seriesId, variant, image))) {
        onAddedToCart();
      }
    } finally {
      setAdding(false);
    }
  };

  return (
    <Box sx={{ p: 2, borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <Box
        component={NextLink}
        href={detailHref}
        sx={{ display: "flex", gap: 1.5, textDecoration: "none", color: "inherit" }}
      >
        {image && (
          <Box
            sx={{
              width: 64,
              height: 64,
              flexShrink: 0,
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: "8px",
              bgcolor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Image
              src={image}
              alt={variantImageAlt(productName, variant)}
              width={54}
              height={54}
              style={{ objectFit: "contain" }}
            />
          </Box>
        )}
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontSize: "0.72rem", fontFamily: "monospace", color: BRAND, wordBreak: "break-all" }}>
            {sku}
          </Typography>
          <Typography sx={{ fontSize: "0.82rem", color: "text.secondary", lineHeight: 1.5, mt: 0.25 }}>
            {specs.map((k) => variant.specs[k]).join(" · ")}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, mt: 1.5 }}>
        <PriceCell price={price} onQuote={onQuote} />
        {price ? (
          <Button
            variant="outlined"
            size="small"
            onClick={handleAddToCart}
            disabled={adding}
            startIcon={<AddShoppingCartOutlinedIcon sx={{ fontSize: 16 }} />}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.8rem",
              borderRadius: "6px",
              borderColor: alpha(BRAND, 0.4),
              color: BRAND,
              whiteSpace: "nowrap",
            }}
          >
            Add to Cart
          </Button>
        ) : (
          <Button
            variant="outlined"
            size="small"
            component={NextLink}
            href={detailHref}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.8rem",
              borderRadius: "6px",
              borderColor: alpha(BRAND, 0.4),
              color: BRAND,
            }}
          >
            View details
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default function VariantsTable({
  variants,
  seriesId,
  productName,
  specKeys,
  thumbnailImage,
  detailBasePath,
}: Props) {
  // Default view: cheapest priced items first. The Price comparator pushes
  // rows with no price ("Contact for price") to the bottom, so priced models
  // always lead. Clicking any header switches to that column's sort.
  const [sortKey, setSortKey] = useState<string>("Price");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [query, setQuery] = useState("");

  const displayKeys = specKeys.filter((key) => key !== "Price");
  // Inline columns = the primary set that this series actually has, in order.
  // Fall back to all columns if a series shares none of the primary keys.
  const primaryInline = PRIMARY_KEYS.filter((k) => displayKeys.includes(k));
  // Every spec column is shown (the expand arrow repeats them per model).
  const inlineKeys = primaryInline.length ? primaryInline : displayKeys;

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  // SKU search: every word must appear in the SKU (case-insensitive), so
  // "1/2 lock" or "V10-10-1-2" both narrow the list.
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const searched = words.length
    ? variants.filter((v) => {
        const sku = (v.specs["SKU"] ?? v.id).toLowerCase();
        return words.every((w) => sku.includes(w));
      })
    : variants;

  const sorted = sortKey
    ? [...searched].sort((a, b) => {
        // Price is money: compare it numerically, not as text. A string sort
        // would put "100" before "90". Rows with no price ("Contact for price")
        // sink to the bottom in both directions so the real prices stay together.
        if (sortKey === "Price") {
          const ap = parsePrice(a.specs["Price"]);
          const bp = parsePrice(b.specs["Price"]);
          if (ap === null && bp === null) return 0;
          if (ap === null) return 1;
          if (bp === null) return -1;
          return sortDir === "asc" ? ap - bp : bp - ap;
        }
        const av = a.specs[sortKey] ?? "";
        const bv = b.specs[sortKey] ?? "";
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      })
    : searched;

  const paginated = sorted.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const headerSx = {
    bgcolor: "#fff",
    borderBottom: "2px solid rgba(0,0,0,0.1)",
    fontWeight: 700,
    fontSize: "0.7rem",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    color: "#111",
    py: 2,
  };

  return (
    <Paper
      elevation={0}
      sx={{ flex: 1, minWidth: 0, borderRadius: 0, overflow: "hidden" }}
    >
      {/* Header: "All Models", a live count, and the SKU search. */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1.5,
          px: { xs: 2, md: 3 },
          py: 1.75,
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, flexWrap: "wrap", minWidth: 0 }}>
          <Typography sx={{ fontWeight: 800, fontSize: "1.05rem", color: "text.primary" }}>
            All Models
          </Typography>
          <Box
            component="span"
            sx={{
              fontSize: "0.72rem",
              fontWeight: 700,
              color: BRAND,
              bgcolor: alpha(BRAND, 0.08),
              px: 1,
              py: 0.25,
              borderRadius: "4px",
            }}
          >
            {searched.length} of {variants.length}
          </Box>
        </Box>
        <Box
          component="label"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            // Grows with the screen: full width on phones, ~30% on desktop.
            width: { xs: "100%", sm: "45%", md: "35%", lg: "30%" },
            minWidth: { sm: 260 },
            maxWidth: 520,
            px: 1.5,
            py: 0.6,
            border: "1px solid rgba(0,0,0,0.15)",
            borderRadius: "6px",
            bgcolor: "#fff",
            transition: "border-color 0.15s ease, box-shadow 0.15s ease",
            "&:focus-within": { borderColor: BRAND, boxShadow: `0 0 0 3px ${alpha(BRAND, 0.12)}` },
          }}
        >
          <SearchIcon sx={{ fontSize: 18, color: "text.disabled" }} />
          <InputBase
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
            placeholder="Search SKU…"
            inputProps={{ "aria-label": "Search by SKU" }}
            sx={{ flex: 1, fontSize: "0.875rem" }}
          />
        </Box>
      </Box>

      {/* Phones: card list. Desktop: the full spec table. */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        {paginated.length === 0 ? (
          <Typography sx={{ color: "text.secondary", fontSize: "0.875rem", textAlign: "center", py: 6 }}>
            {query ? `No models match "${query.trim()}".` : "No variants found."}
          </Typography>
        ) : (
          paginated.map((v) => (
            <VariantCard
              key={v.id}
              variant={v}
              seriesId={seriesId}
              productName={productName}
              specKeys={displayKeys}
              thumbnailImage={thumbnailImage}
              detailBasePath={detailBasePath}
              onAddedToCart={() => setSnackbarOpen(true)}
            />
          ))
        )}
      </Box>

      <Box sx={{ overflowX: "auto", display: { xs: "none", md: "block" } }}>
      {/* Narrower cell padding on smaller desktops so the table fits. */}
      <Table stickyHeader sx={{ "& th, & td": { px: { md: 1.25, xl: 2 } } }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ ...headerSx, width: 48 }} />
            <TableCell sx={{ ...headerSx, width: 72 }} />
            {inlineKeys.map((key) => (
              <TableCell key={key} sx={headerSx}>
                <TableSortLabel
                  active={sortKey === key}
                  direction={sortKey === key ? sortDir : "asc"}
                  onClick={() => handleSort(key)}
                >
                  {key}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell
              sx={{
                ...headerSx,
                width: PRICE_WIDTH,
                minWidth: PRICE_WIDTH,
                textAlign: "center",
              }}
            >
              <TableSortLabel
                active={sortKey === "Price"}
                direction={sortKey === "Price" ? sortDir : "asc"}
                onClick={() => handleSort("Price")}
              >
                Price
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{ ...headerSx, width: ACTION_WIDTH, minWidth: ACTION_WIDTH }}
            />
          </TableRow>
        </TableHead>
        <TableBody>
          {paginated.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={inlineKeys.length + 4}
                align="center"
                sx={{ py: 8 }}
              >
                <Typography
                  sx={{ color: "text.secondary", fontSize: "0.875rem" }}
                >
                  {query ? `No models match "${query.trim()}".` : "No variants found."}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            paginated.map((v, i) => (
              <VariantRow
                key={v.id}
                variant={v}
                seriesId={seriesId}
                productName={productName}
                specKeys={inlineKeys}
                thumbnailImage={thumbnailImage}
                zebra={i % 2 === 1}
                detailBasePath={detailBasePath}
                onAddedToCart={() => setSnackbarOpen(true)}
              />
            ))
          )}
        </TableBody>
      </Table>
      </Box>
      <TablePagination
        component="div"
        count={sorted.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, p) => setPage(p)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value));
          setPage(0);
        }}
        rowsPerPageOptions={[10, 25, 50]}
        sx={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled" sx={{ fontWeight: 600 }}>
          Added to cart
        </Alert>
      </Snackbar>
    </Paper>
  );
}

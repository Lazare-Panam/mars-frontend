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
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Image from "next/image";
import NextLink from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ProductVariant } from "@/api/useProductVariants";
import { useCartStore } from "@/store/useCartStore";
import { variantImageAlt } from "@/lib/variantTitle";
import { useQuoteStore } from "@/store/useQuoteStore";

const BRAND = "#E7390F";

// Price + action columns stay pinned to the right edge while wide spec tables
// scroll sideways, so the price and cart button are always visible. Pinned
// cells need an opaque background (row tints are translucent), so these are
// the row colours pre-blended onto white.
const ACTION_WIDTH = 150;
const PRICE_WIDTH = 140;
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
  "Body",
  "Seats",
  "Ends",
  "Design",
  "Locking Device",
];

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
  onAddedToCart: () => void;
}

function VariantRow({
  variant,
  seriesId,
  productName,
  specKeys,
  thumbnailImage,
  zebra,
  onAddedToCart,
}: RowProps) {
  const addToCart = useCartStore((s) => s.addToCart);
  const [adding, setAdding] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const image = variant.thumbnailImage || thumbnailImage;
  const price = variant.specs["Price"];
  const detailHref = `/products/${id}/${seriesId}/variants/${variant.id}`;
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
      await addToCart({
        seriesId,
        variantId: variant.id,
        productDescription: variant.specs["SKU"] ?? variant.id,
        quantity: 1,
        pictureUrl: image ?? "",
      });
      onAddedToCart();
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
        transition: "box-shadow 0.15s ease",
        "& > td": { borderBottom: open ? "none" : ROW_BORDER },
        "&:hover": {
          boxShadow: `inset 3px 0 0 ${BRAND}, 0 1px 6px ${alpha("#000", 0.05)}`,
          position: "relative",
          zIndex: 1,
        },
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
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    fontFamily: "monospace",
                    letterSpacing: "0.01em",
                    color: "#444",
                    "&:hover": { color: BRAND, textDecoration: "underline" },
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
  onAddedToCart,
}: Omit<RowProps, "zebra">) {
  const addToCart = useCartStore((s) => s.addToCart);
  const [adding, setAdding] = useState(false);
  const { id } = useParams<{ id: string }>();
  const setQuote = useQuoteStore((s) => s.setRequest);

  const image = variant.thumbnailImage || thumbnailImage;
  const price = variant.specs["Price"];
  const sku = variant.specs["SKU"] ?? variant.id;
  const detailHref = `/products/${id}/${seriesId}/variants/${variant.id}`;
  const onQuote = () => setQuote({ sku, product: productName });
  const specs = specKeys.filter((k) => k !== "SKU" && variant.specs[k]);

  const handleAddToCart = async () => {
    if (adding) return;
    setAdding(true);
    try {
      await addToCart({
        seriesId,
        variantId: variant.id,
        productDescription: sku,
        quantity: 1,
        pictureUrl: image ?? "",
      });
      onAddedToCart();
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
}: Props) {
  const [sortKey, setSortKey] = useState<string>("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const displayKeys = specKeys.filter((key) => key !== "Price");
  // Inline columns = the primary set that this series actually has, in order.
  // Fall back to all columns if a series shares none of the primary keys.
  const primaryInline = PRIMARY_KEYS.filter((k) => displayKeys.includes(k));
  const inlineKeys = primaryInline.length ? primaryInline : displayKeys;

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = sortKey
    ? [...variants].sort((a, b) => {
        const av = a.specs[sortKey] ?? "";
        const bv = b.specs[sortKey] ?? "";
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      })
    : variants;

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
    whiteSpace: "nowrap" as const,
  };

  return (
    <Paper
      elevation={0}
      sx={{ flex: 1, minWidth: 0, borderRadius: 0, overflow: "hidden" }}
    >
      {/* Phones: card list. Desktop: the full spec table. */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        {paginated.length === 0 ? (
          <Typography sx={{ color: "text.secondary", fontSize: "0.875rem", textAlign: "center", py: 6 }}>
            No variants found.
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
              onAddedToCart={() => setSnackbarOpen(true)}
            />
          ))
        )}
      </Box>

      <Box sx={{ overflowX: "auto", display: { xs: "none", md: "block" } }}>
      <Table stickyHeader>
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
              Price
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
                  No variants found.
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

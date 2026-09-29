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

const BRAND = "#E7390F";

// Spec keys that read as reference/lookup data rather than a shoppable
// attribute — styled smaller and muted instead of like a normal spec.
const REFERENCE_KEYS = new Set(["SKU"]);

function PriceCell({ price }: { price?: string }) {
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
  specKeys: string[];
  thumbnailImage: string;
  zebra: boolean;
  onAddedToCart: () => void;
}

function VariantRow({
  variant,
  seriesId,
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
        bgcolor: open
          ? alpha(BRAND, 0.03)
          : zebra
            ? alpha("#000", 0.012)
            : "transparent",
        transition: "box-shadow 0.15s ease, transform 0.15s ease",
        "& > td": { borderBottom: open ? "none" : undefined },
        "&:hover": {
          boxShadow: `0 2px 12px ${alpha("#000", 0.08)}`,
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
              alt={variant.id}
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
          <TableCell key={key} sx={{ py: 1.75, fontSize: "0.875rem" }}>
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
                    fontSize: "0.72rem",
                    fontFamily: "monospace",
                    color: BRAND,
                    "&:hover": { textDecoration: "underline" },
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
                  fontWeight: 700,
                  bgcolor: alpha(BRAND, 0.08),
                  color: BRAND,
                  borderRadius: "4px",
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
        sx={{ py: 1.5, width: 190 }}
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
          <PriceCell price={price} />
        </Box>
      </TableCell>

      <TableCell
        sx={{ py: 1.5, width: 220 }}
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
  specKeys: string[];
  thumbnailImage: string;
}

export default function VariantsTable({
  variants,
  seriesId,
  specKeys,
  thumbnailImage,
}: Props) {
  const [sortKey, setSortKey] = useState<string>("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const displayKeys = specKeys.filter((key) => key !== "Price");

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
    bgcolor: "#fafafa",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
    fontWeight: 600,
    fontSize: "0.72rem",
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
    color: "text.secondary",
    py: 1.75,
  };

  return (
    <Paper
      elevation={0}
      sx={{ flex: 1, minWidth: 0, borderRadius: "8px", overflow: "hidden" }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ ...headerSx, width: 48 }} />
            <TableCell sx={{ ...headerSx, width: 72 }} />
            {displayKeys.map((key) => (
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
            <TableCell sx={{ ...headerSx, width: 190, textAlign: "center" }}>
              Price
            </TableCell>
            <TableCell sx={{ ...headerSx, width: 220 }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {paginated.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={displayKeys.length + 4}
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
                specKeys={displayKeys}
                thumbnailImage={thumbnailImage}
                zebra={i % 2 === 1}
                onAddedToCart={() => setSnackbarOpen(true)}
              />
            ))
          )}
        </TableBody>
      </Table>
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

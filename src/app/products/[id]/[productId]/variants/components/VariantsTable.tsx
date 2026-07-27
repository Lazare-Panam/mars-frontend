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
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import Image from "next/image";
import NextLink from "next/link";
import { ProductVariant } from "@/api/useProductVariants";

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
      href="/login"
      size="small"
      startIcon={<LockOutlinedIcon sx={{ fontSize: 14 }} />}
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
      Login to view price
    </Button>
  );
}

interface RowProps {
  variant: ProductVariant;
  specKeys: string[];
  thumbnailImage: string;
  zebra: boolean;
}

function VariantRow({ variant, specKeys, thumbnailImage, zebra }: RowProps) {
  const image = variant.thumbnailImage || thumbnailImage;
  const price = variant.specs["Price"];

  return (
    <TableRow
      sx={{
        bgcolor: zebra ? alpha("#000", 0.012) : "transparent",
        transition: "box-shadow 0.15s ease, transform 0.15s ease",
        "&:hover": {
          boxShadow: `0 2px 12px ${alpha("#000", 0.08)}`,
          position: "relative",
          zIndex: 1,
        },
      }}
    >
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
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  fontFamily: "monospace",
                  color: "text.secondary",
                }}
              >
                {value}
              </Typography>
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

      <TableCell sx={{ py: 1.5, width: 190 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, justifyContent: "flex-end" }}>
          <PriceCell price={price} />
        </Box>
      </TableCell>

      <TableCell sx={{ py: 1.5, width: 150 }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<RequestQuoteOutlinedIcon sx={{ fontSize: 15 }} />}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.78rem",
            borderRadius: "6px",
            borderColor: alpha(BRAND, 0.4),
            color: BRAND,
            whiteSpace: "nowrap",
            "&:hover": {
              borderColor: BRAND,
              bgcolor: alpha(BRAND, 0.06),
            },
          }}
        >
          Request Quote
        </Button>
      </TableCell>
    </TableRow>
  );
}

interface Props {
  variants: ProductVariant[];
  specKeys: string[];
  thumbnailImage: string;
}

export default function VariantsTable({
  variants,
  specKeys,
  thumbnailImage,
}: Props) {
  const [sortKey, setSortKey] = useState<string>("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

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
    <Paper elevation={0} sx={{ flex: 1, minWidth: 0, borderRadius: "8px", overflow: "hidden" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
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
            <TableCell sx={{ ...headerSx, width: 190, textAlign: "right" }}>
              Price
            </TableCell>
            <TableCell sx={{ ...headerSx, width: 150 }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {paginated.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={specKeys.length + 2}
                align="center"
                sx={{ py: 8 }}
              >
                <Typography sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
                  No variants found.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            paginated.map((v, i) => (
              <VariantRow
                key={v.id}
                variant={v}
                specKeys={displayKeys}
                thumbnailImage={thumbnailImage}
                zebra={i % 2 === 1}
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
    </Paper>
  );
}
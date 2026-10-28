"use client";

import { use } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NextLink from "next/link";
import Image from "next/image";
import { useSeriesProduct, useSeriesCategory } from "@/api/useSeriesCatalog";
import { useQuoteStore } from "@/store/useQuoteStore";
import Reveal from "@/Common/Reveal";
import PageBreadcrumbs from "@/Common/PageBreadcrumbs";
import { variantHeading } from "@/lib/seriesHeadings";

const BRAND = "#E7390F";
const MAXW = 1160;

export default function SeriesVariantDetailPage({
  params,
}: {
  params: Promise<{ seriesId: string; sku: string }>;
}) {
  const { seriesId, sku } = use(params);
  const { data: product, isLoading, isError } = useSeriesProduct(sku);
  const { data: category } = useSeriesCategory(seriesId);
  const setQuote = useQuoteStore((s) => s.setRequest);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (isError || !product) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <Typography sx={{ color: "text.secondary" }}>This model could not be found.</Typography>
      </Box>
    );
  }

  const seriesName = category?.name ?? `Series ${seriesId}`;
  const onRequestQuote = () =>
    setQuote({ sku: product.partNumber, product: seriesName });

  return (
    <Box sx={{ bgcolor: "#f4f5f7", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ bgcolor: "#fff", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <Box sx={{ maxWidth: MAXW, mx: "auto", px: { xs: 3, md: 6 }, py: { xs: 3, md: 3.5 } }}>
          <PageBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: seriesName, href: `/series/${seriesId}` },
              { label: "All models", href: `/series/${seriesId}/variants` },
              { label: product.partNumber },
            ]}
            sx={{ mb: 2 }}
          />
          <Typography
            sx={{ color: BRAND, letterSpacing: "0.18em", fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", mb: 0.75 }}
          >
            {seriesName}
          </Typography>
          <Typography
            component="h1"
            sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, fontWeight: 800, lineHeight: 1.2, maxWidth: 900 }}
          >
            {variantHeading(seriesName, category?.design, product.specs)}
          </Typography>
          <Typography
            sx={{ fontFamily: "monospace", fontSize: { xs: "0.95rem", md: "1.05rem" }, fontWeight: 700, color: "text.secondary", mt: 0.75, wordBreak: "break-all" }}
          >
            {product.partNumber}
          </Typography>
          {product.detailDescription && (
            <Typography sx={{ color: "text.secondary", fontSize: "0.95rem", mt: 1, maxWidth: 820 }}>
              {product.detailDescription}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Body */}
      <Box sx={{ maxWidth: MAXW, mx: "auto", px: { xs: 3, md: 6 }, py: { xs: 4, md: 5 } }}>
        <Reveal>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "minmax(0, 420px) 1fr" },
              gap: { xs: 3, md: 5 },
              alignItems: "stretch",
            }}
          >
            {/* Image */}
            {product.imageUrl && (
              <Box
                sx={{
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "14px",
                  bgcolor: "#fff",
                  p: { xs: 3, md: 4 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: { xs: 300, md: 0 },
                }}
              >
                <Image
                  src={product.imageUrl}
                  alt={`${seriesName} — ${product.partNumber}`}
                  width={420}
                  height={420}
                  style={{ objectFit: "contain", width: "100%", height: "auto" }}
                />
              </Box>
            )}

            {/* Info */}
            <Box
              sx={{
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "14px",
                bgcolor: "#fff",
                p: { xs: 2.5, md: 3.5 },
                display: "flex",
                flexDirection: "column",
              }}
            >
              {product.price != null ? (
                <Typography sx={{ fontWeight: 800, fontSize: "1.6rem", mb: 2 }}>
                  £{product.price.toFixed(2)}
                </Typography>
              ) : (
                <Typography sx={{ color: "text.secondary", fontSize: "0.9rem", mb: 2 }}>
                  Contact us for pricing on this model.
                </Typography>
              )}

              {/* Specifications */}
              <Typography sx={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "text.secondary", mb: 1.5 }}>
                Specifications
              </Typography>
              <Box sx={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: "10px", overflow: "hidden", mb: 3 }}>
                {product.specs.map((s, i) => (
                  <Box key={`${s.filter}-${s.value}-${i}`} sx={{ display: "flex", bgcolor: i % 2 ? "#fafbfc" : "#fff", borderTop: i === 0 ? "none" : "1px solid rgba(0,0,0,0.06)" }}>
                    <Box sx={{ width: { xs: 140, sm: 200 }, flexShrink: 0, px: 2, py: 1.25, fontWeight: 700, fontSize: "0.85rem", borderRight: "1px solid rgba(0,0,0,0.06)" }}>
                      {s.filter}
                    </Box>
                    <Box sx={{ px: 2, py: 1.25, fontSize: "0.85rem", color: "text.secondary" }}>{s.value}</Box>
                  </Box>
                ))}
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: "auto" }}>
                <Button
                  component={NextLink}
                  href="/contact"
                  onClick={onRequestQuote}
                  variant="contained"
                  disableElevation
                  startIcon={<MailOutlinedIcon />}
                  sx={{ textTransform: "none", fontWeight: 800, borderRadius: "8px", bgcolor: BRAND, px: 3, py: 1, "&:hover": { bgcolor: "#A8270A" } }}
                >
                  Request a Quote
                </Button>
                <Button
                  component={NextLink}
                  href={`/series/${seriesId}/variants`}
                  startIcon={<ArrowBackIcon />}
                  sx={{ textTransform: "none", fontWeight: 700, color: "text.secondary" }}
                >
                  Back to all models
                </Button>
              </Box>
            </Box>
          </Box>
        </Reveal>
      </Box>
    </Box>
  );
}

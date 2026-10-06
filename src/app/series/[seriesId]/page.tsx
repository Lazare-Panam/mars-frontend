"use client";

import { use, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  ButtonBase,
  CircularProgress,
  Divider,
  Dialog,
  IconButton,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import NextLink from "next/link";
import Image from "next/image";
import {
  useSeriesVariants,
  useSeriesCategory,
  useSeriesFilters,
} from "@/api/useSeriesCatalog";
import { useQuoteStore } from "@/store/useQuoteStore";
import Reveal from "@/Common/Reveal";
import PageBreadcrumbs from "@/Common/PageBreadcrumbs";
import { BANNER_GRADIENT } from "@/theme/brand";

const BRAND = "#E7390F";

export default function SeriesConfiguratorPage({
  params,
}: {
  params: Promise<{ seriesId: string }>;
}) {
  const { seriesId } = use(params);
  const { data: series, isLoading, isError } = useSeriesVariants(seriesId);
  const { data: category } = useSeriesCategory(seriesId);
  const { data: filters } = useSeriesFilters(seriesId);
  const setQuote = useQuoteStore((s) => s.setRequest);

  const [selection, setSelection] = useState<Record<string, string>>({});
  const [zoomOpen, setZoomOpen] = useState(false);

  const variants = series?.variants ?? [];

  // Products matching every option selected so far.
  const matches = useMemo(
    () =>
      variants.filter((v) =>
        Object.entries(selection).every(([k, val]) => v.specs[k] === val),
      ),
    [variants, selection],
  );
  const resolved = matches.length === 1 ? matches[0] : null;

  // A value is pickable if it keeps at least one product alive given the OTHER
  // selected options (so impossible combinations are greyed out as you go).
  const isAvailable = (filterName: string, value: string) =>
    variants.some(
      (v) =>
        v.specs[filterName] === value &&
        Object.entries(selection).every(
          ([k, sv]) => k === filterName || v.specs[k] === sv,
        ),
    );

  const toggle = (filterName: string, value: string) =>
    setSelection((prev) =>
      prev[filterName] === value
        ? Object.fromEntries(
            Object.entries(prev).filter(([k]) => k !== filterName),
          )
        : { ...prev, [filterName]: value },
    );

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (isError || !series) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Typography sx={{ color: "text.secondary" }}>
          Failed to load this series.
        </Typography>
      </Box>
    );
  }

  const image = resolved?.thumbnailImage || series.thumbnailImage;
  const resolvedSku = resolved
    ? (resolved.specs["SKU"] ?? resolved.id)
    : null;

  const onRequestQuote = () => {
    if (resolvedSku) setQuote({ sku: resolvedSku, product: series.name });
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero */}
      <Box sx={{ background: BANNER_GRADIENT, px: { xs: 3, md: 8 }, py: { xs: 4, md: 5 } }}>
        <Reveal>
          <Box sx={{ maxWidth: "1280px", mx: "auto" }}>
            <PageBreadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: series.name },
              ]}
              tone="onDark"
              sx={{ mb: 2.5 }}
            />
            <Typography
              sx={{
                color: "primary.light",
                letterSpacing: "0.2em",
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                mb: 1,
              }}
            >
              Ball Valves
            </Typography>
            <Typography
              component="h1"
              sx={{
                color: "#fff",
                fontSize: { xs: "1.9rem", md: "2.6rem" },
                fontWeight: 800,
                lineHeight: 1.1,
              }}
            >
              {series.name}
            </Typography>
          </Box>
        </Reveal>
      </Box>

      {/* Body: image + configurator */}
      <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 3, md: 8 }, py: { xs: 4, md: 6 } }}>
        <Reveal delay={80}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 4, md: 6 },
              alignItems: "flex-start",
            }}
          >
            {/* Magnifiable image */}
            {image && (
              <Box sx={{ width: { xs: "100%", md: 420 }, flexShrink: 0 }}>
                <Box
                  onClick={() => setZoomOpen(true)}
                  role="button"
                  aria-label="Zoom image"
                  sx={{
                    position: "relative",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: "12px",
                    bgcolor: "#fff",
                    p: 3,
                    cursor: "zoom-in",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover .zoom-hint": { opacity: 1 },
                  }}
                >
                  <Image
                    src={image}
                    alt={resolvedSku ? `${series.name} — ${resolvedSku}` : series.name}
                    width={360}
                    height={360}
                    style={{ objectFit: "contain", width: "100%", height: "auto" }}
                  />
                  <Box
                    className="zoom-hint"
                    sx={{
                      position: "absolute",
                      bottom: 12,
                      right: 12,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      px: 1,
                      py: 0.5,
                      borderRadius: "6px",
                      bgcolor: "rgba(0,0,0,0.55)",
                      color: "#fff",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      opacity: 0.7,
                      transition: "opacity 0.2s ease",
                    }}
                  >
                    <ZoomInIcon sx={{ fontSize: 16 }} /> Click to zoom
                  </Box>
                </Box>
              </Box>
            )}

            {/* Configurator */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography component="h2" sx={{ fontSize: "1.25rem", fontWeight: 800, mb: 0.5 }}>
                Configure your valve
              </Typography>
              <Typography sx={{ color: "text.secondary", fontSize: "0.9rem", mb: 3 }}>
                Choose your options — we&apos;ll build the exact part number.
              </Typography>

              {(filters ?? []).map((f) => (
                <Box key={f.filterId} sx={{ mb: 2.5 }}>
                  <Typography
                    sx={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "text.secondary",
                      mb: 1,
                    }}
                  >
                    {f.name}
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.25 }}>
                    {f.values.map((v) => {
                      const selected = selection[f.name] === v;
                      const available = isAvailable(f.name, v);
                      return (
                        <ButtonBase
                          key={v}
                          focusRipple
                          disabled={!available}
                          onClick={available ? () => toggle(f.name, v) : undefined}
                          sx={{
                            minWidth: 68,
                            px: 2.25,
                            py: 1.25,
                            borderRadius: "10px",
                            fontSize: "0.92rem",
                            fontWeight: 600,
                            lineHeight: 1.2,
                            justifyContent: "center",
                            border: "1.5px solid",
                            borderColor: selected ? BRAND : "rgba(0,0,0,0.14)",
                            bgcolor: selected ? BRAND : "#fff",
                            color: selected ? "#fff" : "text.primary",
                            boxShadow: selected
                              ? "0 3px 10px rgba(231,57,15,0.28)"
                              : "0 1px 2px rgba(0,0,0,0.05)",
                            transition: "all 0.15s ease",
                            opacity: available ? 1 : 0.38,
                            textDecoration: available ? "none" : "line-through",
                            "&:hover": available
                              ? {
                                  borderColor: BRAND,
                                  bgcolor: selected ? "#A8270A" : "#fdf1ee",
                                  transform: "translateY(-1px)",
                                }
                              : {},
                          }}
                        >
                          {selected && <CheckIcon sx={{ fontSize: 17, mr: 0.6 }} />}
                          {v}
                        </ButtonBase>
                      );
                    })}
                  </Box>
                </Box>
              ))}

              <Divider sx={{ my: 3 }} />

              {/* Result */}
              <Box
                sx={{
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "12px",
                  p: 2.5,
                  bgcolor: resolved ? "#fff7f5" : "#fafafa",
                }}
              >
                {resolved ? (
                  <>
                    <Typography
                      sx={{
                        fontSize: "0.68rem",
                        fontWeight: 800,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: BRAND,
                        mb: 0.5,
                      }}
                    >
                      Your part number
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "monospace",
                        fontSize: { xs: "1.1rem", md: "1.4rem" },
                        fontWeight: 700,
                        color: "text.primary",
                        wordBreak: "break-all",
                        mb: 1.5,
                      }}
                    >
                      {resolvedSku}
                    </Typography>
                    {resolved.specs["Price"] ? (
                      <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", mb: 1.5 }}>
                        £{resolved.specs["Price"]}
                      </Typography>
                    ) : (
                      <Typography sx={{ color: "text.secondary", fontSize: "0.85rem", mb: 1.5 }}>
                        Contact us for pricing on this configuration.
                      </Typography>
                    )}
                    <Button
                      component={NextLink}
                      href="/contact"
                      onClick={onRequestQuote}
                      variant="contained"
                      disableElevation
                      startIcon={<MailOutlinedIcon />}
                      sx={{
                        textTransform: "none",
                        fontWeight: 800,
                        borderRadius: "8px",
                        bgcolor: BRAND,
                        px: 3,
                        py: 1,
                        "&:hover": { bgcolor: "#A8270A" },
                      }}
                    >
                      Request a Quote
                    </Button>
                  </>
                ) : (
                  <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
                    {Object.keys(selection).length === 0
                      ? "Select your options above to build a part number."
                      : `${matches.length} models match — keep selecting to narrow to one.`}
                  </Typography>
                )}
              </Box>

              {/* Downloads + all models */}
              {(category?.catalogUrl || category?.cadUrl) && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 3 }}>
                  {category?.catalogUrl && (
                    <Button
                      component="a"
                      href={category.catalogUrl}
                      target="_blank"
                      rel="noopener"
                      variant="outlined"
                      startIcon={<PictureAsPdfOutlinedIcon />}
                      sx={{ textTransform: "none", fontWeight: 700, borderRadius: "8px", borderColor: "rgba(0,0,0,0.2)", color: "text.primary" }}
                    >
                      Catalogue (PDF)
                    </Button>
                  )}
                  {category?.cadUrl && (
                    <Button
                      component="a"
                      href={category.cadUrl}
                      target="_blank"
                      rel="noopener"
                      variant="outlined"
                      startIcon={<ViewInArOutlinedIcon />}
                      sx={{ textTransform: "none", fontWeight: 700, borderRadius: "8px", borderColor: "rgba(0,0,0,0.2)", color: "text.primary" }}
                    >
                      CAD files
                    </Button>
                  )}
                </Box>
              )}

              <Box sx={{ mt: 3 }}>
                <Button
                  component={NextLink}
                  href={`/series/${seriesId}/variants`}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ textTransform: "none", fontWeight: 700, color: BRAND }}
                >
                  Or browse all {series.variants.length} models
                </Button>
              </Box>
            </Box>
          </Box>
        </Reveal>
      </Box>

      {/* Zoom lightbox */}
      <Dialog open={zoomOpen} onClose={() => setZoomOpen(false)} maxWidth="lg">
        <Box sx={{ position: "relative", p: 2, bgcolor: "#fff" }}>
          <IconButton
            onClick={() => setZoomOpen(false)}
            aria-label="Close"
            sx={{ position: "absolute", top: 8, right: 8, bgcolor: "rgba(0,0,0,0.05)" }}
          >
            <CloseIcon />
          </IconButton>
          {image && (
            <Image
              src={image}
              alt={resolvedSku ? `${series.name} — ${resolvedSku}` : series.name}
              width={900}
              height={900}
              style={{ objectFit: "contain", width: "100%", height: "auto", maxHeight: "80vh" }}
            />
          )}
        </Box>
      </Dialog>
    </Box>
  );
}

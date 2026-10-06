"use client";

import { use, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  ButtonBase,
  CircularProgress,
  Dialog,
  IconButton,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import CloseIcon from "@mui/icons-material/Close";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import CheckIcon from "@mui/icons-material/Check";
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

const BRAND = "#E7390F";
const MAXW = 1160;

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      component="h2"
      sx={{
        fontSize: "1.2rem",
        fontWeight: 800,
        mb: 2.5,
        pl: 1.75,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: 3,
          bottom: 3,
          width: 4,
          borderRadius: 2,
          bgcolor: BRAND,
        },
      }}
    >
      {children}
    </Typography>
  );
}

// Turn a value like 1/4", 1 1/4", 2" or "1500 PSI" into a sortable number so
// option chips read small-to-large instead of string-sorted.
function magnitude(s: string): number {
  const str = s.replace(/["”]/g, "").trim();
  const mixed = str.match(/^(\d+)\s+(\d+)\/(\d+)/);
  if (mixed) return +mixed[1] + +mixed[2] / +mixed[3];
  const frac = str.match(/^(\d+)\/(\d+)/);
  if (frac) return +frac[1] / +frac[2];
  const num = str.match(/^(\d+(?:\.\d+)?)/);
  if (num) return +num[1];
  return NaN;
}

function sortValues(values: string[]): string[] {
  const nums = values.map(magnitude);
  return nums.every((n) => !Number.isNaN(n))
    ? [...values].sort((a, b) => magnitude(a) - magnitude(b))
    : [...values].sort((a, b) => a.localeCompare(b));
}

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
  const [hovering, setHovering] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState("center");

  const handleZoomMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
  };

  const variants = series?.variants ?? [];

  const matches = useMemo(
    () =>
      variants.filter((v) =>
        Object.entries(selection).every(([k, val]) => v.specs[k] === val),
      ),
    [variants, selection],
  );
  const resolved = matches.length === 1 ? matches[0] : null;

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
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (isError || !series) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <Typography sx={{ color: "text.secondary" }}>Failed to load this series.</Typography>
      </Box>
    );
  }

  const image = resolved?.thumbnailImage || series.thumbnailImage;
  const resolvedSku = resolved ? (resolved.specs["SKU"] ?? resolved.id) : null;

  const onRequestQuote = () => {
    if (resolvedSku) setQuote({ sku: resolvedSku, product: series.name });
  };

  const techAttrs = (
    [
      ["Design", category?.design],
      ["Body Material", category?.bodyMaterial],
      ["Seat Material", category?.seatMaterial],
      ["Temperature Range", category?.temperatureRange],
      ["Approvals", category?.approvals],
      ...(filters ?? []).map((f) => [f.name, sortValues(f.values).join(", ")]),
    ] as [string, string | null | undefined][]
  ).filter((e): e is [string, string] => Boolean(e[1]));

  return (
    <Box sx={{ bgcolor: "#f4f5f7", minHeight: "100vh" }}>
      {/* Light header */}
      <Box sx={{ bgcolor: "#fff", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <Box sx={{ maxWidth: MAXW, mx: "auto", px: { xs: 3, md: 6 }, py: { xs: 3, md: 3.5 } }}>
          <PageBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: series.name },
            ]}
            sx={{ mb: 2 }}
          />
          <Typography
            sx={{
              color: BRAND,
              letterSpacing: "0.18em",
              fontSize: "0.7rem",
              fontWeight: 800,
              textTransform: "uppercase",
              mb: 0.75,
            }}
          >
            Mars Ball Valves
          </Typography>
          <Typography
            component="h1"
            sx={{ fontSize: { xs: "1.7rem", md: "2.2rem" }, fontWeight: 800, lineHeight: 1.1, color: "text.primary" }}
          >
            {series.name}
          </Typography>
          {category?.design && (
            <Typography sx={{ color: "text.secondary", fontSize: "0.95rem", mt: 1 }}>
              {category.design}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Product top: image + buy box */}
      <Box sx={{ maxWidth: MAXW, mx: "auto", px: { xs: 3, md: 6 }, py: { xs: 4, md: 5 } }}>
        <Reveal>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "minmax(0, 440px) 1fr" },
              gap: { xs: 3, md: 5 },
              alignItems: "stretch",
            }}
          >
            {/* Image card — hover to magnify, click for full lightbox */}
            {image && (
              <Box
                onClick={() => setZoomOpen(true)}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                onMouseMove={handleZoomMove}
                role="button"
                aria-label="Zoom image"
                sx={{
                  position: "relative",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "14px",
                  bgcolor: "#fff",
                  minHeight: { xs: 320, md: 0 },
                  overflow: "hidden",
                  cursor: "zoom-in",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: { xs: 3, md: 4 },
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                  "&:hover .zoom-hint": { opacity: 1 },
                }}
              >
                <Image
                  src={image}
                  alt={resolvedSku ? `${series.name} — ${resolvedSku}` : series.name}
                  width={500}
                  height={500}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                    transformOrigin: zoomOrigin,
                    transform: hovering ? "scale(2)" : "scale(1)",
                    transition: hovering ? "transform 0.08s ease-out" : "transform 0.25s ease",
                  }}
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
                    pointerEvents: "none",
                  }}
                >
                  <ZoomInIcon sx={{ fontSize: 16 }} /> Hover to zoom
                </Box>
              </Box>
            )}

            {/* Buy box */}
            <Box
              sx={{
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "14px",
                bgcolor: "#fff",
                p: { xs: 2.5, md: 3.5 },
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
              }}
            >
              <Typography component="h2" sx={{ fontSize: "1.15rem", fontWeight: 800, mb: 0.25 }}>
                Configure your valve
              </Typography>
              <Typography sx={{ color: "text.secondary", fontSize: "0.88rem", mb: 3 }}>
                Choose your options — we&apos;ll build the exact part number.
              </Typography>

              {(filters ?? []).map((f) => (
                <Box key={f.filterId} sx={{ mb: 2.5 }}>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "text.secondary",
                      mb: 1,
                    }}
                  >
                    {f.name}
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {sortValues(f.values).map((v) => {
                      const selected = selection[f.name] === v;
                      const available = isAvailable(f.name, v);
                      return (
                        <ButtonBase
                          key={v}
                          focusRipple
                          disabled={!available}
                          onClick={available ? () => toggle(f.name, v) : undefined}
                          sx={{
                            minWidth: 60,
                            px: 2,
                            py: 1.1,
                            borderRadius: "9px",
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            lineHeight: 1.2,
                            justifyContent: "center",
                            border: "1.5px solid",
                            borderColor: selected ? BRAND : "rgba(0,0,0,0.14)",
                            bgcolor: selected ? BRAND : "#fff",
                            color: selected ? "#fff" : "text.primary",
                            boxShadow: selected ? "0 3px 10px rgba(231,57,15,0.25)" : "none",
                            transition: "all 0.15s ease",
                            opacity: available ? 1 : 0.35,
                            textDecoration: available ? "none" : "line-through",
                            "&:hover": available
                              ? { borderColor: BRAND, bgcolor: selected ? "#A8270A" : "#fdf1ee" }
                              : {},
                          }}
                        >
                          {v}
                        </ButtonBase>
                      );
                    })}
                  </Box>
                </Box>
              ))}

              {/* Result */}
              <Box
                sx={{
                  mt: 3,
                  pt: 3,
                  borderTop: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                {resolved ? (
                  <>
                    <Typography sx={{ fontSize: "0.66rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "text.secondary", mb: 0.5 }}>
                      Your part number
                    </Typography>
                    <Typography sx={{ fontFamily: "monospace", fontSize: { xs: "1.15rem", md: "1.4rem" }, fontWeight: 700, wordBreak: "break-all", mb: 1 }}>
                      {resolvedSku}
                    </Typography>
                    {resolved.specs["Price"] ? (
                      <Typography sx={{ fontWeight: 800, fontSize: "1.3rem", mb: 2 }}>
                        £{resolved.specs["Price"]}
                      </Typography>
                    ) : (
                      <Typography sx={{ color: "text.secondary", fontSize: "0.85rem", mb: 2 }}>
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
                      sx={{ textTransform: "none", fontWeight: 800, borderRadius: "8px", bgcolor: BRAND, px: 3, py: 1, "&:hover": { bgcolor: "#A8270A" } }}
                    >
                      Request a Quote
                    </Button>
                  </>
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary" }}>
                    <Box
                      sx={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: BRAND,
                        bgcolor: "rgba(231,57,15,0.08)",
                        px: 1,
                        py: 0.4,
                        borderRadius: "5px",
                      }}
                    >
                      {matches.length}
                    </Box>
                    <Typography sx={{ fontSize: "0.9rem" }}>
                      {Object.keys(selection).length === 0
                        ? "options — select above to build a part number"
                        : "models match — keep selecting"}
                    </Typography>
                  </Box>
                )}
              </Box>

              <Button
                component={NextLink}
                href={`/series/${seriesId}/variants`}
                endIcon={<ArrowForwardIcon />}
                sx={{ mt: 2, textTransform: "none", fontWeight: 700, color: BRAND, px: 0 }}
              >
                Or browse all {series.variants.length} models
              </Button>
            </Box>
          </Box>
        </Reveal>

        {/* Content sections */}
        <Box sx={{ mt: { xs: 6, md: 8 }, display: "grid", gap: { xs: 5, md: 7 } }}>
          {category?.description && (
            <Reveal delay={60}>
              <Box>
                <SectionTitle>Overview</SectionTitle>
                <Typography sx={{ color: "text.secondary", fontSize: "0.98rem", lineHeight: 1.75, maxWidth: 820 }}>
                  {category.description}
                </Typography>
              </Box>
            </Reveal>
          )}

          {category?.keyFeatures && category.keyFeatures.length > 0 && (
            <Reveal delay={80}>
              <Box>
                <SectionTitle>Key features</SectionTitle>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 1.5,
                    maxWidth: 820,
                  }}
                >
                  {category.keyFeatures.map((feat, i) => (
                    <Box key={i} sx={{ display: "flex", gap: 1.25, alignItems: "flex-start" }}>
                      <CheckIcon sx={{ fontSize: 18, color: BRAND, mt: "1px", flexShrink: 0 }} />
                      <Typography sx={{ color: "text.secondary", fontSize: "0.92rem", lineHeight: 1.55 }}>
                        {feat}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Reveal>
          )}

          {techAttrs.length > 0 && (
            <Reveal delay={100}>
              <Box>
                <SectionTitle>Technical attributes</SectionTitle>
                <Box
                  sx={{
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: "12px",
                    overflow: "hidden",
                    bgcolor: "#fff",
                    maxWidth: 820,
                  }}
                >
                  {techAttrs.map(([label, value], i) => (
                    <Box
                      key={label}
                      sx={{
                        display: "flex",
                        bgcolor: i % 2 ? "#fafbfc" : "#fff",
                        borderTop: i === 0 ? "none" : "1px solid rgba(0,0,0,0.06)",
                      }}
                    >
                      <Box sx={{ width: { xs: 140, sm: 220 }, flexShrink: 0, px: 2, py: 1.5, fontWeight: 700, fontSize: "0.85rem", borderRight: "1px solid rgba(0,0,0,0.06)" }}>
                        {label}
                      </Box>
                      <Box sx={{ px: 2, py: 1.5, fontSize: "0.85rem", color: "text.secondary" }}>
                        {value}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Reveal>
          )}

          {(category?.datasheetUrl ||
            category?.cadUrl ||
            (category?.certificates && category.certificates.length > 0)) && (
            <Reveal delay={120}>
              <Box>
                <SectionTitle>Documents</SectionTitle>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                  {category?.datasheetUrl && (
                    <Button component="a" href={category.datasheetUrl} target="_blank" rel="noopener" variant="outlined" startIcon={<PictureAsPdfOutlinedIcon />} sx={{ textTransform: "none", fontWeight: 700, borderRadius: "8px", borderColor: "rgba(0,0,0,0.2)", color: "text.primary", bgcolor: "#fff" }}>
                      Datasheet
                    </Button>
                  )}
                  {category?.cadUrl && (
                    <Button component="a" href={category.cadUrl} target="_blank" rel="noopener" variant="outlined" startIcon={<ViewInArOutlinedIcon />} sx={{ textTransform: "none", fontWeight: 700, borderRadius: "8px", borderColor: "rgba(0,0,0,0.2)", color: "text.primary", bgcolor: "#fff" }}>
                      CAD files
                    </Button>
                  )}
                  {(category?.certificates ?? []).map((cert) => (
                    <Button key={cert.label} component="a" href={cert.url} target="_blank" rel="noopener" variant="outlined" startIcon={<VerifiedOutlinedIcon />} sx={{ textTransform: "none", fontWeight: 700, borderRadius: "8px", borderColor: "rgba(0,0,0,0.2)", color: "text.primary", bgcolor: "#fff" }}>
                      {cert.label}
                    </Button>
                  ))}
                </Box>
              </Box>
            </Reveal>
          )}
        </Box>
      </Box>

      {/* Zoom lightbox */}
      <Dialog open={zoomOpen} onClose={() => setZoomOpen(false)} maxWidth="lg">
        <Box sx={{ position: "relative", p: 2, bgcolor: "#fff" }}>
          <IconButton onClick={() => setZoomOpen(false)} aria-label="Close" sx={{ position: "absolute", top: 8, right: 8, bgcolor: "rgba(0,0,0,0.05)" }}>
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

"use client";

import { use, useState } from "react";
import {
  Box,
  Typography,
  Button,
  ButtonBase,
  CircularProgress,
  Dialog,
  IconButton,
  Skeleton,
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
  useSeriesCategory,
  useSeriesConfigurator,
  type ConfiguratorValue,
} from "@/api/useSeriesCatalog";
import { useQuoteStore } from "@/store/useQuoteStore";
import Reveal from "@/Common/Reveal";
import { PRODUCT_MAXW, ProductSectionTitle } from "@/Common/product/ProductPageHero";
import PageBreadcrumbs from "@/Common/PageBreadcrumbs";
import { seriesHeading, seriesSubheading } from "@/lib/seriesHeadings";

const BRAND = "#E0393E";
const MAXW = PRODUCT_MAXW;

const docLinkSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.75,
  fontSize: "0.88rem",
  fontWeight: 700,
  color: "text.primary",
  textDecoration: "none",
  "& svg": { color: BRAND },
  "&:hover": { color: BRAND },
} as const;

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

function sortOptionValues(values: ConfiguratorValue[]): ConfiguratorValue[] {
  return [...values].sort((a, b) => {
    const ma = magnitude(a.value);
    const mb = magnitude(b.value);
    if (!Number.isNaN(ma) && !Number.isNaN(mb)) return ma - mb;
    return a.value.localeCompare(b.value);
  });
}

// Isolated so the hover-zoom's per-mousemove state updates only re-render the image.
function ZoomImage({
  src,
  alt,
  onOpen,
}: {
  src: string;
  alt: string;
  onOpen: () => void;
}) {
  const [hovering, setHovering] = useState(false);
  const [origin, setOrigin] = useState("center");

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <Box
      onClick={onOpen}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={onMove}
      role="button"
      aria-label="Zoom image"
      sx={{
        position: "relative",
        borderRadius: "28px",
        background: "radial-gradient(120% 90% at 50% 35%, #FFFFFF 0%, #ECEDEE 70%, #E6E7E9 100%)",
        aspectRatio: "1 / 1",
        overflow: "hidden",
        cursor: "zoom-in",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 4, md: 7 },
        "&:hover .zoom-hint": { opacity: 1 },
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={500}
        height={500}
        style={{
          objectFit: "contain",
          width: "100%",
          height: "100%",
          mixBlendMode: "multiply",
          transformOrigin: origin,
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
  );
}

export default function SeriesConfiguratorPage({
  params,
}: {
  params: Promise<{ seriesId: string }>;
}) {
  const { seriesId } = use(params);
  const { data: category } = useSeriesCategory(seriesId);
  const setQuote = useQuoteStore((s) => s.setRequest);

  const [selection, setSelection] = useState<Record<string, string>>({});
  const [zoomOpen, setZoomOpen] = useState(false);

  const { data: config, isLoading, isError, isFetching } = useSeriesConfigurator(seriesId, selection);

  const toggle = (filterName: string, value: string) =>
    setSelection((prev) =>
      prev[filterName] === value
        ? Object.fromEntries(Object.entries(prev).filter(([k]) => k !== filterName))
        : { ...prev, [filterName]: value },
    );

  // No data yet and no error = still loading. The server render has no data
  // when its prefetch failed (failed queries aren't sent to the browser), so
  // it must show the same spinner the browser shows, or hydration fails.
  if (isLoading || (!config && !isError)) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (isError || !config) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <Typography sx={{ color: "text.secondary" }}>Failed to load this series.</Typography>
      </Box>
    );
  }

  const name = category?.name ?? `Series ${seriesId}`;
  const options = config.options;
  const endConnections =
    options.find((o) => o.name.toLowerCase() === "end connection")?.values.map((v) => v.value) ?? [];
  const subheading = seriesSubheading(category?.design, endConnections);
  const resolved = config.resolved;
  const resolvedSku = resolved?.partNumber ?? null;
  const image = resolved?.imageUrl || config.imageUrl || undefined;

  const onRequestQuote = () => {
    if (resolvedSku) setQuote({ sku: resolvedSku, product: name });
  };

  const techAttrs = (
    [
      ["Design", category?.design],
      ["Body Material", category?.bodyMaterial],
      ["Seat Material", category?.seatMaterial],
      ["Temperature Range", category?.temperatureRange],
      ["Approvals", category?.approvals],
      ...options.map((o) => [o.name, sortOptionValues(o.values).map((v) => v.value).join(", ")]),
    ] as [string, string | null | undefined][]
  )
    .filter((e): e is [string, string] => Boolean(e[1]))
    // Some series also list e.g. "Seat Material" as a configurator option:
    // keep the first row for each label so it isn't shown twice.
    .filter(([label], i, arr) => arr.findIndex(([l]) => l.toLowerCase() === label.toLowerCase()) === i);

  // Headline numbers for the spec strip: each option's range (smallest–largest).
  const rangeOf = (optName: string) => {
    const o = options.find((x) => x.name.toLowerCase() === optName.toLowerCase());
    if (!o || o.values.length === 0) return null;
    const v = sortOptionValues(o.values).map((x) => x.value);
    return v.length === 1 ? v[0] : `${v[0]} – ${v[v.length - 1]}`;
  };
  const stats = (
    [
      ["Sizes", rangeOf("Size")],
      ["Pressure", rangeOf("Operating Pressure")],
      ["Body", category?.bodyMaterial],
      ["Seat", category?.seatMaterial],
    ] as [string, string | null | undefined][]
  ).filter((e): e is [string, string] => Boolean(e[1]));
  const selectedCount = Object.keys(selection).length;

  return (
    <Box sx={{ bgcolor: "#fff", minHeight: "100vh" }}>
      {/* Breadcrumb strip */}
      <Box sx={{ borderBottom: "1px solid rgba(58,61,66,0.07)" }}>
        <Box sx={{ maxWidth: MAXW, mx: "auto", px: { xs: 3, md: 6 }, py: 1.75 }}>
          <PageBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: name }]} />
        </Box>
      </Box>

      {/* Product: gallery + details/configurator */}
      <Box sx={{ maxWidth: MAXW, mx: "auto", px: { xs: 3, md: 6 }, pt: { xs: 3, md: 5 }, pb: { xs: 6, md: 9 } }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1fr)" }, gap: { xs: 4, md: 7 }, alignItems: "start" }}>
          {/* Gallery, then overview and features under it */}
          <Box>
            {image && <ZoomImage src={image} alt={resolvedSku ? `${name} — ${resolvedSku}` : name} onOpen={() => setZoomOpen(true)} />}
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1.5, mt: 2 }}>
              {[
                { icon: VerifiedOutlinedIcon, t: "Genuine Kronox", d: "Made by Kronox" },
                { icon: PictureAsPdfOutlinedIcon, t: "Documented", d: "Certificates with your order" },
                { icon: MailOutlinedIcon, t: "UK support", d: "Help choosing a spec" },
              ].map(({ icon: Icon, t, d }) => (
                <Box key={t} sx={{ p: 1.75, borderRadius: "16px", bgcolor: "#F5F5F6", textAlign: "center" }}>
                  <Icon sx={{ color: BRAND, fontSize: 22, mb: 0.5 }} />
                  <Typography sx={{ fontSize: "0.82rem", fontWeight: 800 }}>{t}</Typography>
                  <Typography sx={{ fontSize: "0.72rem", color: "text.secondary", lineHeight: 1.35 }}>{d}</Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{ mt: { xs: 5, md: 6 } }}>
            {category?.description && (
              <Reveal>
                <ProductSectionTitle>Overview</ProductSectionTitle>
                <Typography sx={{ color: "text.secondary", fontSize: "1.02rem", lineHeight: 1.8, mb: 4 }}>{category.description}</Typography>
              </Reveal>
            )}
            {category?.keyFeatures && category.keyFeatures.length > 0 && (
              <Reveal delay={60}>
                <ProductSectionTitle>Key features</ProductSectionTitle>
                <Box sx={{ display: "grid", gap: 1.25 }}>
                  {category.keyFeatures.map((feat, i) => (
                    <Box key={i} sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                      <Box sx={{ width: 26, height: 26, borderRadius: "50%", bgcolor: BRAND, display: "grid", placeItems: "center", flexShrink: 0 }}>
                        <CheckIcon sx={{ fontSize: 15, color: "#fff" }} />
                      </Box>
                      <Typography sx={{ fontSize: "0.95rem", fontWeight: 500 }}>{feat}</Typography>
                    </Box>
                  ))}
                </Box>
              </Reveal>
            )}
            </Box>
          </Box>

          {/* Details */}
          <Box>
            <Typography sx={{ color: BRAND, letterSpacing: "0.16em", fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", mb: 1 }}>
              Kronox Ball Valves
            </Typography>
            <Typography component="h1" sx={{ fontSize: { xs: "2.3rem", md: "3.2rem" }, fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.03em" }}>
              {seriesHeading(name, category?.design)}
            </Typography>
            {subheading && (
              <Typography sx={{ color: "text.secondary", fontSize: "1.05rem", mt: 1.25, lineHeight: 1.55 }}>{subheading}</Typography>
            )}

            {/* Spec strip */}
            {stats.length > 0 && (
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: `repeat(${stats.length}, 1fr)` }, mt: 3.5, border: "1px solid rgba(58,61,66,0.09)", borderRadius: "16px", overflow: "hidden" }}>
                {stats.map(([k, v], i) => (
                  <Box key={k} sx={{ px: 2, py: 1.75, borderLeft: { sm: i === 0 ? "none" : "1px solid rgba(58,61,66,0.09)" }, borderTop: { xs: i > 1 ? "1px solid rgba(58,61,66,0.09)" : "none", sm: "none" } }}>
                    <Typography sx={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "text.secondary" }}>{k}</Typography>
                    <Typography sx={{ fontWeight: 800, fontSize: "0.98rem", mt: 0.25 }}>{v}</Typography>
                  </Box>
                ))}
              </Box>
            )}

            {/* Configurator */}
            <Box sx={{ mt: 4.5 }}>
              <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", mb: 2.5 }}>
                <Typography component="h2" sx={{ fontSize: "1.2rem", fontWeight: 800 }}>Configure your valve</Typography>
                <Typography sx={{ fontSize: "0.82rem", color: "text.secondary" }}>
                  {selectedCount} of {options.length} chosen
                </Typography>
              </Box>
              {/* progress bar */}
              <Box sx={{ height: 4, borderRadius: 2, bgcolor: "rgba(58,61,66,0.07)", mb: 3, overflow: "hidden" }}>
                <Box sx={{ height: "100%", width: `${options.length ? (selectedCount / options.length) * 100 : 0}%`, bgcolor: BRAND, transition: "width 0.3s ease" }} />
              </Box>

              {options.map((o) => (
                <Box key={o.filterId} sx={{ mb: 3 }}>
                  <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, mb: 1.25 }}>
                    {o.name}
                    {selection[o.name] && (
                      <Box component="span" sx={{ color: "text.secondary", fontWeight: 500 }}> · {selection[o.name]}</Box>
                    )}
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {sortOptionValues(o.values).map((v) => {
                      const selected = selection[o.name] === v.value;
                      const available = v.available;
                      return (
                        <ButtonBase
                          key={v.value}
                          focusRipple
                          disabled={!available}
                          onClick={available ? () => toggle(o.name, v.value) : undefined}
                          sx={{
                            minWidth: 64,
                            px: 2.25,
                            py: 1.15,
                            borderRadius: "999px",
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            border: "1.5px solid",
                            borderColor: selected ? "#3A3D42" : "rgba(58,61,66,0.14)",
                            bgcolor: selected ? "#3A3D42" : "#fff",
                            color: selected ? "#fff" : "text.primary",
                            transition: "all 0.15s ease",
                            opacity: available ? 1 : 0.35,
                            textDecoration: available ? "none" : "line-through",
                            "&:hover": available ? { borderColor: selected ? "#3A3D42" : BRAND } : {},
                          }}
                        >
                          {v.value}
                        </ButtonBase>
                      );
                    })}
                  </Box>
                </Box>
              ))}

              {/* Result + actions */}
              <Box sx={{ mt: 1, p: { xs: 2.5, md: 3 }, borderRadius: "20px", bgcolor: "#F5F5F6" }}>
                {isFetching ? (
                  <Box>
                    <Skeleton animation="wave" variant="text" width={110} height={14} />
                    <Skeleton animation="wave" variant="text" width={220} sx={{ fontSize: "1.4rem" }} />
                    <Skeleton animation="wave" variant="rounded" height={48} sx={{ mt: 1.5 }} />
                  </Box>
                ) : (
                  <>
                    <Typography sx={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "text.secondary", mb: 0.5 }}>
                      {resolved ? "Your part number" : "Matching models"}
                    </Typography>
                    {resolved ? (
                      <>
                        <Typography sx={{ fontFamily: "monospace", fontSize: { xs: "1.2rem", md: "1.45rem" }, fontWeight: 700, wordBreak: "break-all" }}>{resolvedSku}</Typography>
                        <Typography sx={{ color: "text.secondary", fontSize: "0.82rem", mt: 0.5 }}>{resolved.specs.map((sp) => sp.value).join(" · ")}</Typography>
                        <Typography sx={{ fontWeight: 800, fontSize: "1.5rem", mt: 1.5 }}>
                          {resolved.price != null ? `£${resolved.price.toFixed(2)}` : <Box component="span" sx={{ fontSize: "0.9rem", fontWeight: 500, color: "text.secondary" }}>Price on request</Box>}
                        </Typography>
                      </>
                    ) : (
                      <Typography sx={{ fontSize: "1.45rem", fontWeight: 800 }}>
                        {config.matchCount}
                        <Box component="span" sx={{ fontSize: "0.9rem", fontWeight: 500, color: "text.secondary", ml: 1 }}>
                          {selectedCount === 0 ? "options — choose above to build a part number" : "models match — keep choosing"}
                        </Box>
                      </Typography>
                    )}
                  </>
                )}
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1.25, mt: 2.5 }}>
                  <Button
                    component={NextLink}
                    href="/contact#enquiry"
                    onClick={onRequestQuote}
                    variant="contained"
                    disableElevation
                    endIcon={<ArrowForwardIcon />}
                    sx={{ textTransform: "none", fontWeight: 800, borderRadius: "999px", bgcolor: BRAND, py: 1.4, "&:hover": { bgcolor: "#B8262C" } }}
                  >
                    Request a Quote
                  </Button>
                  <Button
                    component={NextLink}
                    href={`/series/${seriesId}/variants`}
                    variant="outlined"
                    sx={{ textTransform: "none", fontWeight: 700, borderRadius: "999px", py: 1.4, borderColor: "rgba(58,61,66,0.2)", color: "text.primary", bgcolor: "#fff", "&:hover": { borderColor: BRAND, bgcolor: "#fff" } }}
                  >
                    View all {config.totalCount} models
                  </Button>
                </Box>
              </Box>

              {(category?.datasheetUrl || category?.cadUrl || (category?.certificates?.length ?? 0) > 0) && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2.5, mt: 2.5 }}>
                  {category?.datasheetUrl && (
                    <Box component="a" href={category.datasheetUrl} target="_blank" rel="noopener" sx={docLinkSx}>
                      <PictureAsPdfOutlinedIcon sx={{ fontSize: 18 }} /> Datasheet
                    </Box>
                  )}
                  {category?.cadUrl && (
                    <Box component="a" href={category.cadUrl} target="_blank" rel="noopener" sx={docLinkSx}>
                      <ViewInArOutlinedIcon sx={{ fontSize: 18 }} /> CAD files
                    </Box>
                  )}
                  {(category?.certificates ?? []).map((cert) => (
                    <Box key={cert.label} component="a" href={cert.url} target="_blank" rel="noopener" sx={docLinkSx}>
                      <VerifiedOutlinedIcon sx={{ fontSize: 18 }} /> {cert.label}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Details band */}
      <Box sx={{ bgcolor: "#F5F5F6", py: { xs: 7, md: 10 } }}>
        <Box sx={{ maxWidth: MAXW, mx: "auto", px: { xs: 3, md: 6 }, }}>
          {techAttrs.length > 0 && (
            <Reveal delay={100}>
              <Box>
                <ProductSectionTitle>Technical attributes</ProductSectionTitle>
                <Box sx={{ borderRadius: "20px", overflow: "hidden", bgcolor: "#fff", boxShadow: "0 12px 40px rgba(58,61,66,0.06)", display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, columnGap: 4, px: { xs: 0, md: 2 } }}>
                  {techAttrs.map(([label, value]) => (
                    <Box key={label} sx={{ display: "flex", gap: 2, px: { xs: 2.5, md: 1.5 }, py: 1.75, borderBottom: "1px solid rgba(58,61,66,0.06)" }}>
                      <Box sx={{ width: { xs: 120, sm: 190 }, flexShrink: 0, fontSize: "0.85rem", color: "text.secondary" }}>{label}</Box>
                      <Box sx={{ fontSize: "0.88rem", fontWeight: 600 }}>{value}</Box>
                    </Box>
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
              alt={resolvedSku ? `${name} — ${resolvedSku}` : name}
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

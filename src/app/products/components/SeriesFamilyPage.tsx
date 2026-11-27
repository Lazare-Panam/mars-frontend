"use client";

import Link from "next/link";
import { Box, Container, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PageBreadcrumbs from "@/Common/PageBreadcrumbs";
import CtaBand from "@/Common/CtaBand";
import { KRONOX, LIGHT_BANNER } from "@/theme/brand";
import { CATEGORIES } from "../data/categories";
import { familyModelsHref, type FamilySeries, type SeriesFamily } from "../data/seriesFamilies";

// One page layout for every "by category" range (one-piece, economical
// 2-piece, high performance 3-piece...). The content comes from
// data/seriesFamilies.ts, so ranges are edited there, not here.

const WIDE = 1440;
const CARD_BORDER = "1px solid rgba(58,61,66,0.09)";

const TAG_LABELS: Record<string, string> = { DM: "Direct mount", FS: "Fire safe" };

/** "KX-F21-70, 3000PSI, FS" → title "KX-F21-70", tags ["3000 PSI", "Fire safe"]. */
function splitName(name: string): { title: string; tags: string[] } {
  const [title, ...rest] = name.split(",").map((s) => s.trim());
  const tags = rest.map((t) => TAG_LABELS[t] ?? t.replace(/(\d)PSI$/i, "$1 PSI"));
  return { title, tags };
}

const ACTION_LABEL: Record<FamilySeries["action"], string> = {
  configure: "Configure & price",
  view: "View details",
  models: "View models",
  quote: "Request a quote",
};

function facts(family: SeriesFamily): [string, string][] {
  // An explicit override wins (e.g. cryogenic uses -196°C / ISO 5211, not a PSI max).
  if (family.heroFacts?.length) return family.heroFacts.slice(0, 4);
  const out: [string, string][] = [[String(family.series.length), `${family.kind} series`]];
  const psi = family.series
    .map((s) => {
      const p = s.specs?.find(([k]) => k === "Pressure")?.[1] ?? s.name;
      return Number(p.match(/(\d{3,5})\s?PSI/i)?.[1] ?? 0);
    })
    .filter((n) => n > 0);
  if (psi.length) out.push([`${Math.max(...psi).toLocaleString("en-GB")} PSI`, "highest rating"]);
  const all = family.series.map((s) => s.name).join(" ");
  if (/fire safe|\bFS\b/i.test(all)) out.push(["Fire safe", "options available"]);
  if (/\bDM\b|direct mount/i.test(all)) out.push(["Direct mount", "options available"]);
  if (/SIL3/i.test(all)) out.push(["SIL 3", "capable series"]);
  if (out.length < 3) out.push(["CF8M", "stainless steel body"]);
  return out.slice(0, 4);
}

// Rows for the "Compare the range" table. Derived from each series' specs, so
// it stays in step with the cards. Fire safe shows the certified standard ONLY
// where the series actually lists one — series without a standard read "—"
// rather than being counted as fire-safe.
type CompRow = { series: string; port: string; pressure: string; mounting: string; fireSafe: string };
function comparisonRows(family: SeriesFamily): CompRow[] {
  return family.series.map((s) => {
    const spec = (k: string) => s.specs?.find(([key]) => key === k)?.[1];
    const fs = spec("Fire safe");
    return {
      series: splitName(s.name).title,
      port: spec("Port") ?? "—",
      pressure: spec("Pressure") ?? "—",
      mounting: /direct mount|\bDM\b/i.test(`${s.name} ${spec("Design") ?? ""}`) ? "Direct mount" : "Standard",
      fireSafe: fs ? (/api\s*607/i.test(fs) ? "API 607" : fs) : "—",
    };
  });
}

function SeriesCard({ s, title, quoteOnly }: { s: FamilySeries; title: string; quoteOnly?: boolean }) {
  const { title: seriesTitle, tags } = splitName(s.name);
  // Quote-only ranges have no online price, so the configure CTA says "quote".
  const actionLabel =
    s.action === "configure" && quoteOnly ? "Configure & quote" : ACTION_LABEL[s.action];
  const href = s.href ?? "/contact#enquiry";
  // Shorter labels and values so the rows fit a card.
  const LABEL: Record<string, string> = { Pressure: "Pressure Rating" };
  const specs = (s.specs ?? []).map(([k, v]): [string, string] => [
    LABEL[k] ?? k,
    k === "Design" ? v.replace(/\s*(design\s*)?ball valve/i, "").replace(/^./, (c) => c.toUpperCase()) : v,
  ]);
  return (
    <Box
      component={Link}
      href={href}
      aria-label={`${seriesTitle}, ${title}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        color: "inherit",
        border: CARD_BORDER,
        borderRadius: "18px",
        overflow: "hidden",
        bgcolor: "#fff",
        transition: "box-shadow .25s ease, transform .25s ease, border-color .25s ease",
        "& img": { transition: "transform .4s ease" },
        "&:hover": { boxShadow: "0 18px 44px rgba(58,61,66,0.10)", transform: "translateY(-4px)", borderColor: "rgba(224,57,62,0.45)" },
        "&:hover img": { transform: "scale(1.05)" },
        "&:hover .card-cta": { gap: 1 },
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: 210,
          p: 2,
          background: "radial-gradient(120% 90% at 50% 40%, #FFFFFF 0%, #ECEDEE 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s.image} alt={s.imageAlt ?? `Kronox ${seriesTitle} ball valve`} loading="lazy" style={{ width: "82%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }} />
        {s.action === "configure" && (
          <Box component="span" sx={{ position: "absolute", top: 12, left: 12, px: 1.25, py: 0.4, borderRadius: "999px", bgcolor: "primary.main", color: "#fff", fontSize: "0.72rem", fontWeight: 700 }}>
            Configure online
          </Box>
        )}
      </Box>
      <Box sx={{ p: 2.75, display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Typography sx={{ fontWeight: 800, fontSize: "1.15rem" }} className="no-capitalize">
          {seriesTitle}
        </Typography>
        {tags.length > 0 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 1 }}>
            {tags.map((t) => (
              <Box key={t} component="span" sx={{ px: 1, py: 0.25, borderRadius: "999px", bgcolor: "rgba(224,57,62,0.08)", color: "primary.dark", fontSize: "0.72rem", fontWeight: 700 }}>
                {t}
              </Box>
            ))}
          </Box>
        )}
        {specs.length > 0 && (
          <Box sx={{ mt: 1.5 }}>
            {specs.map(([k, v], i) => (
              <Box key={k} sx={{ display: "flex", justifyContent: "space-between", gap: 2, py: 0.85, borderTop: i === 0 ? "none" : "1px solid rgba(58,61,66,0.06)" }}>
                <Typography sx={{ fontSize: "0.85rem", color: "text.secondary", flexShrink: 0 }}>{k}</Typography>
                <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, textAlign: "right" }} className="no-capitalize">{v}</Typography>
              </Box>
            ))}
          </Box>
        )}
        <Box className="card-cta" sx={{ mt: "auto", pt: 2, display: "flex", alignItems: "center", gap: 0.5, color: "primary.main", fontWeight: 700, fontSize: "0.92rem", transition: "gap .2s ease" }}>
          {actionLabel} <ArrowForwardIcon fontSize="small" />
        </Box>
      </Box>
    </Box>
  );
}

export default function SeriesFamilyPage({ family }: { family: SeriesFamily }) {
  const category = CATEGORIES.find((c) => c.id === family.categoryId);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    ...(family.productId && category ? [{ label: category.label, href: `/products/${category.id}` }] : []),
    { label: family.title },
  ];
  const showcase = family.series.slice(0, 3);
  const configurable = family.series.find((s) => s.action === "configure" && s.href);
  const modelsHref = familyModelsHref(family);

  return (
    <Box sx={{ bgcolor: "#fff" }}>
      {/* Hero: copy + facts on the left, a showcase of the range on the right */}
      <Box sx={{ ...LIGHT_BANNER, overflow: "hidden" }}>
        <Box
          sx={{
            maxWidth: WIDE,
            mx: "auto",
            px: { xs: 3, md: 6 },
            py: { xs: 5, md: 7 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: showcase.length > 1 ? "minmax(0, 1.1fr) minmax(0, 1fr)" : "1fr" },
            gap: { xs: 4, md: 6 },
            alignItems: "center",
          }}
        >
          <Box>
            <PageBreadcrumbs items={crumbs} sx={{ mb: 3 }} />
            <Typography sx={{ color: KRONOX.steel, letterSpacing: "0.16em", fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", mb: 1 }}>
              Kronox Ball Valves
            </Typography>
            <Typography component="h1" sx={{ fontSize: { xs: "2.2rem", md: "3.2rem" }, fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.03em" }}>
              {family.title}
            </Typography>
            <Typography sx={{ color: KRONOX.steel, fontSize: { xs: "1rem", md: "1.1rem" }, mt: 2, maxWidth: 560, lineHeight: 1.6 }}>
              {family.intro}
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", mt: 3.5, rowGap: 2 }}>
              {facts(family).map(([v, l], i, arr) => (
                <Box
                  key={`${v}-${l}`}
                  sx={{ pr: 3, mr: 3, minWidth: { xs: "40%", md: 0 }, borderRight: { md: i < arr.length - 1 ? "1px solid rgba(110,113,117,0.28)" : "none" } }}
                >
                  <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.2rem", md: "1.4rem" }, lineHeight: 1.1 }} className="no-capitalize">{v}</Typography>
                  <Typography sx={{ color: KRONOX.steel, fontSize: "0.8rem", mt: 0.25 }}>{l}</Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mt: 4 }}>
              {configurable?.href && (
                <Box component={Link} href={configurable.href} sx={{ display: "inline-flex", alignItems: "center", gap: 1, px: 3, py: 1.4, borderRadius: "999px", bgcolor: "primary.main", color: "#fff", fontWeight: 700, textDecoration: "none", "&:hover": { bgcolor: "primary.dark" } }}>
                  Configure {splitName(configurable.name).title} <ArrowForwardIcon fontSize="small" />
                </Box>
              )}
              <Box
                component={Link}
                href="/contact#enquiry"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  px: 3,
                  py: 1.4,
                  borderRadius: "999px",
                  fontWeight: 700,
                  textDecoration: "none",
                  ...(configurable
                    ? { border: `1.5px solid ${KRONOX.steel}`, color: KRONOX.text, bgcolor: "#fff", "&:hover": { borderColor: "#E0393E", color: "#E0393E" } }
                    : { bgcolor: "primary.main", color: "#fff", "&:hover": { bgcolor: "primary.dark" } }),
                }}
              >
                Request a Quote {!configurable && <ArrowForwardIcon fontSize="small" />}
              </Box>
            </Box>
          </Box>

          {showcase.length > 1 && (
            <Box sx={{ display: { xs: "none", md: "grid" }, gridTemplateColumns: "1fr 1fr", gridTemplateRows: "repeat(2, 170px)", gap: 2 }}>
              {showcase.map((s, i) => (
                <Box
                  key={s.name}
                  component={Link}
                  href={s.href ?? "/contact#enquiry"}
                  sx={{
                    gridRow: i === 0 ? "span 2" : "auto",
                    gridColumn: showcase.length === 2 ? "span 1" : "auto",
                    bgcolor: "#fff",
                    border: `1px solid ${KRONOX.line}`,
                    borderRadius: "24px",
                    p: 2.5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
                    transition: "transform 0.25s ease",
                    "&:hover": { transform: "translateY(-4px)" },
                    ...(showcase.length === 2 && { gridRow: "span 2" }),
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.image} alt={s.imageAlt ?? ""} style={{ width: "100%", height: i === 0 ? "75%" : "70%", objectFit: "contain" }} />
                  <Typography sx={{ mt: 1, fontWeight: 800, fontSize: "0.9rem", color: "text.primary" }} className="no-capitalize">
                    {splitName(s.name).title}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {family.features && (
        <Container maxWidth={false} sx={{ maxWidth: WIDE, px: { xs: 3, md: 6 }, pt: { xs: 5, md: 7 } }}>
          <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.4rem", md: "1.7rem" }, mb: family.features.intro ? 1 : 3 }}>
            {family.features.heading}
          </Typography>
          {family.features.intro && (
            <Typography sx={{ color: "text.secondary", mb: 3, fontSize: "1rem" }}>{family.features.intro}</Typography>
          )}
          <Box sx={{ display: "grid", gap: 2.5, gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" } }}>
            {family.features.items.map((f) => (
              <Box key={f.title} sx={{ p: 3, borderRadius: "16px", bgcolor: "#fff", border: CARD_BORDER }}>
                <Typography component="h3" sx={{ fontWeight: 800, fontSize: "1.05rem", mb: 0.75 }}>{f.title}</Typography>
                <Typography sx={{ color: "text.secondary", fontSize: "0.92rem", lineHeight: 1.6 }}>{f.text}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      )}

      <Container maxWidth={false} sx={{ maxWidth: WIDE, px: { xs: 3, md: 6 }, py: { xs: 5, md: 7 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 1, mb: 3 }}>
          <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.4rem", md: "1.7rem" } }}>Choose a series</Typography>
          {modelsHref ? (
            <Box
              component={Link}
              href={modelsHref}
              sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, color: "primary.main", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
            >
              Compare all models &amp; prices <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </Box>
          ) : (
            <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
              {configurable ? "Configure online where marked, or ask us for any series." : "Ask us for sizes, materials and a price on any series."}
            </Typography>
          )}
        </Box>
        {family.types && family.types.length > 0 && (
          <Box component="nav" aria-label="Browse by type" sx={{ display: "flex", flexWrap: "wrap", gap: 1.25, mb: 3.5 }}>
            {family.types.map((t) => (
              <Box
                key={t.href}
                component={Link}
                href={t.href}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.75,
                  px: 2,
                  py: 1,
                  borderRadius: "999px",
                  bgcolor: "#fff",
                  border: CARD_BORDER,
                  color: "text.primary",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  transition: "border-color .15s ease, color .15s ease",
                  "&:hover": { borderColor: "primary.main", color: "primary.main" },
                }}
              >
                {t.label} <ArrowForwardIcon sx={{ fontSize: 16 }} />
              </Box>
            ))}
          </Box>
        )}
        <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" } }}>
          {family.series.map((s) => (
            <SeriesCard key={s.name} s={s} title={family.title} quoteOnly={family.quoteOnly} />
          ))}
        </Box>
        {family.extraSections?.map((sec) => (
          <Box key={sec.heading} sx={{ mt: 6 }}>
            <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.4rem", md: "1.7rem" }, mb: 3 }}>
              {sec.heading}
            </Typography>
            <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" } }}>
              {sec.series.map((s) => (
                <SeriesCard key={s.name} s={s} title={sec.heading} />
              ))}
            </Box>
          </Box>
        ))}
      </Container>

      {/* Compare the range — scannable table of the series' key differences */}
      <Container maxWidth={false} sx={{ maxWidth: WIDE, px: { xs: 3, md: 6 }, pb: { xs: 5, md: 7 } }}>
        <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.4rem", md: "1.7rem" }, mb: 2.5 }}>
          Compare the range
        </Typography>
        <Box sx={{ overflowX: "auto", border: CARD_BORDER, borderRadius: "14px", bgcolor: "#fff" }}>
          <Box
            component="table"
            sx={{
              width: "100%",
              minWidth: 640,
              borderCollapse: "collapse",
              "& th, & td": { textAlign: "left", px: { xs: 2, md: 2.5 }, py: 1.5, fontSize: "0.9rem", borderBottom: "1px solid rgba(58,61,66,0.08)" },
              "& thead th": { fontWeight: 800, fontSize: "0.78rem", letterSpacing: "0.04em", textTransform: "uppercase", color: "text.secondary", bgcolor: "#F5F5F6" },
              "& tbody tr:last-of-type td": { borderBottom: "none" },
              "& tbody td:first-of-type": { fontWeight: 800 },
            }}
          >
            <thead>
              <tr>
                <th>Series</th>
                <th>Port</th>
                <th>Pressure</th>
                <th>Mounting</th>
                <th>Fire safe</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows(family).map((r) => (
                <Box component="tr" key={r.series}>
                  <td className="no-capitalize">{r.series}</td>
                  <td className="no-capitalize">{r.port}</td>
                  <td className="no-capitalize">{r.pressure}</td>
                  <td className="no-capitalize">{r.mounting}</td>
                  <td
                    className="no-capitalize"
                    style={r.fireSafe !== "—" ? { color: "#B8262C", fontWeight: 700 } : undefined}
                  >
                    {r.fireSafe}
                  </td>
                </Box>
              ))}
            </tbody>
          </Box>
        </Box>
      </Container>

      {family.faqs && family.faqs.length > 0 && (
        <Container maxWidth={false} sx={{ maxWidth: WIDE, px: { xs: 3, md: 6 }, pb: { xs: 5, md: 7 } }}>
          <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.4rem", md: "1.7rem" }, mb: 2.5 }}>
            Frequently asked questions
          </Typography>
          <Box sx={{ display: "grid", gap: 2 }}>
            {family.faqs.map((f) => (
              <Box key={f.q} sx={{ p: { xs: 2.5, md: 3 }, borderRadius: "14px", bgcolor: "#fff", border: CARD_BORDER }}>
                <Typography component="h3" sx={{ fontWeight: 800, fontSize: "1.02rem", mb: 0.75 }}>{f.q}</Typography>
                <Typography sx={{ color: "text.secondary", fontSize: "0.92rem", lineHeight: 1.6 }}>{f.a}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      )}

      <CtaBand
        maxWidth={WIDE}
        title={family.cta?.title ?? "Not sure which series you need?"}
        text={family.cta?.text ?? "Send us the size, pressure, end connection and media and we'll recommend the right valve, with a price."}
        primary={{ label: "Ask Our Team", href: "/contact#enquiry" }}
        secondary={modelsHref ? { label: "Compare All Models", href: modelsHref } : { label: "Browse All Products", href: "/products" }}
      />
    </Box>
  );
}

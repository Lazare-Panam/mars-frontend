"use client";

import Link from "next/link";
import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import { CARD_BORDER } from "@/Common/product/ProductPageHero";
import PageBreadcrumbs from "@/Common/PageBreadcrumbs";
import { BANNER_GRADIENT } from "@/theme/brand";

// Wider than other product pages so a 4-up grid fills the screen.
const WIDE = 1440;

const FACTS = (count: number): [string, string][] => [
  [String(count), "one-piece series"],
  ['1/8" – 2"', "size range"],
  ["2000 PSI", "max pressure"],
  ["Fire safe", "option (F10-60)"],
];
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  ProductVariant,
  useProductVariants,
} from "@/api/useProductVariants";

// Landing page for the One-Piece family: one card per series. Series 10-10 has
// its own SQL-backed configurator (/series/4); the remaining series link to
// their existing catalog pages. Data comes from the same /variants endpoint the
// Mongo grid uses, so new series added there appear here automatically.

const ONE_PIECE_ID = "one-piece-ball-valves";
const FALLBACK_IMAGE =
  "https://pblol2.blob.core.windows.net/mars-valves/ball-valves/one-piece/10-10.png";

// Specs worth surfacing on a card, in display order.
const SPEC_KEYS = ["Size", "Pressure Rating", "Body", "Seats", "Design"];

type SeriesCard = {
  key: string;
  title: string;
  image: string;
  specs: [string, string][];
  href: string;
  highlight?: string;
};

function pickSpecs(specs: Record<string, string>): [string, string][] {
  return SPEC_KEYS.filter((k) => specs[k]).map((k) => [k, specs[k]]);
}

function buildCards(variants: ProductVariant[]): SeriesCard[] {
  // The 10-10 series is represented by its individual V10-10-* SKUs; every
  // other series is a single "series-*" entry.
  const subSeries = variants.filter((v) => v.id.startsWith("series-"));
  const tenTen = variants.find((v) => !v.id.startsWith("series-"));

  const tenTenCard: SeriesCard = {
    key: "series-10-10",
    title: "Series 10-10",
    image: tenTen?.thumbnailImage ?? FALLBACK_IMAGE,
    specs: [
      ["Size", '1/4" - 2"'],
      ["Pressure Rating", "800 PSI"],
      ["Body", "SS316"],
      ["Design", "1-piece"],
    ],
    href: "/series/4",
    highlight: "Configure & view prices",
  };

  // The other one-piece series have no standalone Mongo detail page
  // (/api/product/series-10-30/detail is 404); they only exist as rows in the
  // Mongo models table. So every non-10-10 card points at that table.
  const rest: SeriesCard[] = subSeries.map((v) => ({
    key: v.id,
    title: v.specs.SKU ?? v.id,
    image: v.thumbnailImage ?? FALLBACK_IMAGE,
    specs: pickSpecs(v.specs),
    href: `/products/${ONE_PIECE_ID}/variants`,
  }));

  return [tenTenCard, ...rest];
}

export default function OnePieceSeriesCards() {
  const { data } = useProductVariants(ONE_PIECE_ID);
  const cards = buildCards(data?.variants ?? []);
  const title = data?.name ?? "One-Piece Ball Valves";

  return (
    <Box sx={{ bgcolor: "#FAF6F4" }}>
      {/* Hero: copy + facts on the left, a showcase of the range on the right */}
      <Box sx={{ background: BANNER_GRADIENT, color: "#fff", overflow: "hidden" }}>
        <Box
          sx={{
            maxWidth: WIDE,
            mx: "auto",
            px: { xs: 3, md: 6 },
            py: { xs: 5, md: 7 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.1fr) minmax(0, 1fr)" },
            gap: { xs: 4, md: 6 },
            alignItems: "center",
          }}
        >
          <Box>
            <PageBreadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: title }]}
              tone="onDark"
              sx={{ mb: 3 }}
            />
            <Typography sx={{ color: "rgba(255,255,255,0.75)", letterSpacing: "0.16em", fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", mb: 1 }}>
              MARS Ball Valves
            </Typography>
            <Typography component="h1" sx={{ fontSize: { xs: "2.3rem", md: "3.4rem" }, fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.03em" }}>
              {title}
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.88)", fontSize: { xs: "1rem", md: "1.1rem" }, mt: 2, maxWidth: 560, lineHeight: 1.6 }}>
              Compact, high-pressure stainless steel one-piece ball valves. Choose a series to configure sizes, ends and options.
            </Typography>

            {/* Key facts, inline */}
            <Box sx={{ display: "flex", flexWrap: "wrap", mt: 3.5, rowGap: 2 }}>
              {FACTS(cards.length).map(([v, l], i) => (
                <Box key={l} sx={{ pr: 3, mr: 3, minWidth: { xs: "40%", md: 0 }, borderRight: { md: i < 3 ? "1px solid rgba(255,255,255,0.3)" : "none" } }}>
                  <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.2rem", md: "1.45rem" }, lineHeight: 1.1 }} className="no-capitalize">{v}</Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.75)", fontSize: "0.8rem", mt: 0.25 }}>{l}</Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mt: 4 }}>
              <Box component={Link} href="/series/4" sx={{ display: "inline-flex", alignItems: "center", gap: 1, px: 3, py: 1.4, borderRadius: "999px", bgcolor: "#fff", color: "primary.main", fontWeight: 700, textDecoration: "none", "&:hover": { bgcolor: "rgba(255,255,255,0.92)" } }}>
                Configure Series 10-10 <ArrowForwardIcon fontSize="small" />
              </Box>
              <Box component={Link} href="/contact#enquiry" sx={{ px: 3, py: 1.4, borderRadius: "999px", border: "1.5px solid rgba(255,255,255,0.55)", color: "#fff", fontWeight: 700, textDecoration: "none", "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}>
                Request a Quote
              </Box>
            </Box>
          </Box>

          {/* Showcase: three series photos in staggered white tiles */}
          <Box sx={{ display: { xs: "none", md: "grid" }, gridTemplateColumns: "1fr 1fr", gridTemplateRows: "repeat(2, 170px)", gap: 2 }}>
            {cards.slice(0, 3).map((c, i) => (
              <Box
                key={c.key}
                component={Link}
                href={c.href}
                sx={{
                  gridRow: i === 0 ? "span 2" : "auto",
                  bgcolor: "#fff",
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
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt={c.title} style={{ width: "100%", height: i === 0 ? "75%" : "70%", objectFit: "contain" }} />
                <Typography sx={{ mt: 1, fontWeight: 800, fontSize: "0.9rem", color: "text.primary" }} className="no-capitalize">{c.title}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

    <Container maxWidth={false} sx={{ maxWidth: WIDE, px: { xs: 3, md: 6 }, py: { xs: 5, md: 7 } }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 1, mb: 3 }}>
        <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.4rem", md: "1.7rem" } }}>Choose a series</Typography>
        <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>Series 10-10 can be configured online; the rest open the models table.</Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
        }}
      >
        {cards.map((card) => (
          <Box
            key={card.key}
            component={Link}
            href={card.href}
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
              "&:hover": {
                boxShadow: "0 18px 44px rgba(43,27,20,0.10)",
                transform: "translateY(-4px)",
                borderColor: "rgba(231,57,15,0.45)",
              },
              "&:hover img": { transform: "scale(1.05)" },
              "&:hover .card-cta": { gap: 1 },
            }}
          >
            <Box
              sx={{
                position: "relative",
                height: 200,
                p: 2,
                background: "radial-gradient(120% 90% at 50% 40%, #FFFFFF 0%, #F4EEEA 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                style={{
                  width: "78%",
                  height: "100%",
                  objectFit: "contain",
                  mixBlendMode: "multiply",
                }}
              />
              {card.highlight && (
                <Chip
                  label={card.highlight}
                  color="primary"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    fontWeight: 600,
                  }}
                />
              )}
            </Box>

            <Box
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                bgcolor: "#fff",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, fontSize: "1.2rem", mb: 1.5 }}
                className="no-capitalize"
              >
                {card.title}
              </Typography>

              <Stack sx={{ mb: 2.5 }}>
                {card.specs.map(([label, value], i) => (
                  <Box
                    key={label}
                    sx={{ display: "flex", justifyContent: "space-between", gap: 2, py: 0.9, borderTop: i === 0 ? "none" : "1px solid rgba(43,27,20,0.06)" }}
                  >
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {label}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, textAlign: "right" }}
                      className="no-capitalize"
                    >
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              <Box
                className="card-cta"
                sx={{
                  mt: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: "primary.main",
                  fontWeight: 700,
                  transition: "gap .2s ease",
                }}
              >
                {card.highlight ? "Configure" : "View models"}
                <ArrowForwardIcon fontSize="small" />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Help choosing */}
      <Box
        sx={{
          mt: { xs: 5, md: 7 },
          p: { xs: 3, md: 4.5 },
          borderRadius: "24px",
          bgcolor: "#2B1B14",
          color: "#fff",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { md: "center" },
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.3rem", md: "1.6rem" } }}>Not sure which series you need?</Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.75)", mt: 0.75, maxWidth: 560 }}>
            Send us the size, pressure, end connection and media and we&apos;ll recommend the right one-piece valve, with a price.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
          <Box component={Link} href="/contact#enquiry" sx={{ px: 3, py: 1.4, borderRadius: "999px", bgcolor: "primary.main", color: "#fff", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 1, "&:hover": { bgcolor: "primary.dark" } }}>
            Ask our team <ArrowForwardIcon fontSize="small" />
          </Box>
          <Box component={Link} href="/products/one-piece-ball-valves/variants" sx={{ px: 3, py: 1.4, borderRadius: "999px", border: "1.5px solid rgba(255,255,255,0.35)", color: "#fff", fontWeight: 700, textDecoration: "none", "&:hover": { bgcolor: "rgba(255,255,255,0.08)" } }}>
            Compare all models
          </Box>
        </Box>
      </Box>
    </Container>
    </Box>
  );
}

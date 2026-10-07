"use client";

import Link from "next/link";
import { Box, Chip, Container, Stack, Typography } from "@mui/material";
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

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: 700, mb: 1 }}
        className="no-capitalize"
      >
        {data?.name ?? "One-Piece Ball Valves"}
      </Typography>
      <Typography sx={{ color: "text.secondary", mb: 4, maxWidth: 680 }}>
        Compact, high-pressure stainless steel one-piece ball valves. Choose a
        series to configure sizes, ends and options.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
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
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              overflow: "hidden",
              bgcolor: "background.paper",
              transition: "box-shadow .2s ease, transform .2s ease, border-color .2s ease",
              "&:hover": {
                boxShadow: 6,
                transform: "translateY(-4px)",
                borderColor: "primary.main",
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                height: 200,
                p: 2.5,
                bgcolor: "#fff",
                borderBottom: "1px solid",
                borderColor: "divider",
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
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
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
                p: 2.5,
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                bgcolor: "#f5f5f5",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, mb: 1 }}
                className="no-capitalize"
              >
                {card.title}
              </Typography>

              <Stack spacing={0.5} sx={{ mb: 2 }}>
                {card.specs.map(([label, value]) => (
                  <Box
                    key={label}
                    sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
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
                sx={{
                  mt: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: "primary.main",
                  fontWeight: 600,
                }}
              >
                {card.highlight ? "Configure" : "View models"}
                <ArrowForwardIcon fontSize="small" />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

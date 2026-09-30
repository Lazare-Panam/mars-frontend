"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Reveal from "@/Common/Reveal";

const IMG = "https://pblol2.blob.core.windows.net/mars-valves/ball-valves";

// Links go to the category pages, which otherwise are only linked from the
// footer and nav (homepage build sheet, block 7). Images are the products'
// own photos from the catalog.
const TYPES = [
  {
    label: "Two-piece ball valves",
    line: "Economical isolation, threaded ends",
    href: "/products/two-piece-ball-valves",
    image: `${IMG}/two-piece/eco-2.jpg`,
    alt: "MARS two-piece stainless steel ball valve",
  },
  {
    label: "Three-piece ball valves",
    line: "In-line maintenance, weld or thread",
    href: "/products/three-piece-ball-valves",
    image: `${IMG}/three-piece/hp-3.png`,
    alt: "MARS three-piece stainless steel ball valve",
  },
  {
    label: "Flanged ball valves",
    line: "ANSI / DIN flanged, fire-safe options",
    href: "/products/flanged-ball-valves",
    image: `${IMG}/flanged/hp-flanged.png`,
    alt: "MARS flanged ball valve",
  },
  {
    label: "Multi-port ball valves",
    line: "3-, 4- and 5-way, T- or L-port",
    href: "/products/multi-port-ball-valves",
    image: `${IMG}/multi-port-valve/3-way-multi.jpg`,
    alt: "MARS 3-way multi-port ball valve",
  },
  {
    label: "Sanitary ball valves",
    line: "Tri-clamp and tube OD, CF3M",
    href: "/products/sanitary-ball-valves",
    image: `${IMG}/sanitary-ball-valves/hp-san.png`,
    alt: "MARS sanitary ball valve with tri-clamp ends",
  },
  {
    label: "Metal seated ball valves",
    line: "Abrasive and high-temperature service",
    href: "/products/metal-seated-ball-valves",
    image: `${IMG}/meta-seat/3-p.jpg`,
    alt: "MARS metal seated three-piece ball valve",
  },
];

export default function ShopByType() {
  return (
    <Box component="section" id="shop-by-type" sx={{ py: { xs: 8, md: 12 }, bgcolor: "#fff" }}>
      <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 3, md: 8 } }}>
        <Reveal>
          <Box sx={{ mb: { xs: 5, md: 6 } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <Box sx={{ width: 32, height: 1, bgcolor: "primary.main" }} />
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: "primary.main",
                  textTransform: "uppercase",
                }}
              >
                The Range
              </Typography>
            </Box>
            <Typography
              component="h2"
              sx={{ fontSize: { xs: "1.75rem", md: "2.5rem" }, fontWeight: 800, color: "text.primary" }}
            >
              Shop by valve type
            </Typography>
          </Box>
        </Reveal>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
            gap: 3,
          }}
        >
          {TYPES.map((t, i) => (
            <Reveal key={t.href} delay={Math.min(i * 60, 300)}>
              <Box
                component={Link}
                href={t.href}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2.5,
                  p: 2.5,
                  height: "100%",
                  bgcolor: "background.default",
                  border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: "4px",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
                  "&:hover": {
                    borderColor: "primary.main",
                    boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
                    transform: "translateY(-2px)",
                  },
                  "&:hover .type-arrow": { transform: "translateX(4px)" },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: 88,
                    height: 88,
                    flexShrink: 0,
                    bgcolor: "#fff",
                    borderRadius: "4px",
                  }}
                >
                  <Image
                    src={t.image}
                    alt={t.alt}
                    fill
                    draggable={false}
                    style={{ objectFit: "contain", padding: "8px" }}
                    sizes="88px"
                  />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography component="h3" sx={{ fontWeight: 700, fontSize: "1.05rem", color: "text.primary" }}>
                    {t.label}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", fontSize: "0.88rem", lineHeight: 1.5, mt: 0.5 }}>
                    {t.line}
                  </Typography>
                </Box>
                <ArrowForwardIcon
                  className="type-arrow"
                  sx={{ color: "primary.main", fontSize: 20, transition: "transform 0.2s ease" }}
                />
              </Box>
            </Reveal>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

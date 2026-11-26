"use client";

import Link from "next/link";
import { Box, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PageBreadcrumbs from "@/Common/PageBreadcrumbs";
import type { Crumb } from "@/lib/breadcrumbs";
import { KRONOX, LIGHT_BANNER } from "@/theme/brand";

// Shared look for product, series and category pages: the same red banner as
// the rest of the site (Certifications, Applications, Actuated Packages) over a
// white page, so every product page reads as one family.

export const PRODUCT_MAXW = 1200;
export const PANEL_BG = "#fff";
export const CARD_BORDER = "1px solid rgba(58,61,66,0.09)";

export type HeroAction = { label: string; href: string; external?: boolean };

export default function ProductPageHero({
  title,
  eyebrow = "Kronox Ball Valves",
  subtitle,
  breadcrumbs,
  pills,
  actions,
}: {
  title: string;
  eyebrow?: string;
  subtitle?: string | null;
  breadcrumbs?: Crumb[];
  /** Short key facts shown as pills under the title (e.g. "SS316", "800 PSI"). */
  pills?: string[];
  /** Buttons under the title; the first is the main action. */
  actions?: HeroAction[];
}) {
  return (
    <Box sx={{ ...LIGHT_BANNER, position: "relative", overflow: "hidden" }}>
      <Box
        sx={{
          position: "relative",
          maxWidth: PRODUCT_MAXW,
          mx: "auto",
          px: { xs: 3, md: 6 },
          py: { xs: 4.5, md: 6 },
        }}
      >
        <Box>
          {breadcrumbs && <PageBreadcrumbs items={breadcrumbs} sx={{ mb: { xs: 2.5, md: 3 } }} />}
          <Typography
            sx={{
              color: KRONOX.steel,
              letterSpacing: "0.16em",
              fontSize: "0.72rem",
              fontWeight: 800,
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            {eyebrow}
          </Typography>
          <Typography
            component="h1"
            sx={{ fontSize: { xs: "2.1rem", md: "3rem" }, fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em", color: KRONOX.text }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography sx={{ color: KRONOX.steel, fontSize: { xs: "1rem", md: "1.08rem" }, mt: 1.75, maxWidth: 640, lineHeight: 1.6 }}>
              {subtitle}
            </Typography>
          )}
          {pills && pills.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 3 }}>
              {pills.map((p) => (
                <Box
                  key={p}
                  component="span"
                  sx={{
                    px: 1.5,
                    py: 0.6,
                    borderRadius: "999px",
                    bgcolor: "#fff",
                    border: "1px solid rgba(110,113,117,0.28)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: KRONOX.text,
                  }}
                >
                  {p}
                </Box>
              ))}
            </Box>
          )}
          {actions && actions.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 3.5 }}>
              {actions.map((a, i) => (
                <Box
                  key={a.label}
                  component={a.external ? "a" : Link}
                  href={a.href}
                  {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    px: 2.75,
                    py: 1.25,
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: "0.92rem",
                    textDecoration: "none",
                    transition: "background-color 0.15s ease, transform 0.15s ease",
                    ...(i === 0
                      ? { bgcolor: "primary.main", color: "#fff", "&:hover": { bgcolor: "primary.dark", transform: "translateY(-1px)" } }
                      : { color: KRONOX.text, bgcolor: "#fff", border: `1.5px solid ${KRONOX.steel}`, "&:hover": { borderColor: "#E0393E", color: "#E0393E", transform: "translateY(-1px)" } }),
                  }}
                >
                  {a.label}
                  {i === 0 && <ArrowForwardIcon sx={{ fontSize: 18 }} />}
                </Box>
              ))}
            </Box>
          )}
        </Box>

      </Box>
    </Box>
  );
}

/** Section heading used below the fold on product pages. */
export function ProductSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      component="h2"
      sx={{
        fontSize: { xs: "1.25rem", md: "1.45rem" },
        fontWeight: 800,
        letterSpacing: "-0.01em",
        mb: 2.5,
        color: "text.primary",
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        "&::before": { content: '""', width: 4, height: "1.1em", borderRadius: 2, bgcolor: "primary.main" },
      }}
    >
      {children}
    </Typography>
  );
}

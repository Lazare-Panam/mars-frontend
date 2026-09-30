"use client";

import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/Common/Reveal";
import { INDUSTRIES, type IndustryId } from "@/app/applications/industries";

type Application = {
  label: string;
  /** Section on /applications this tile jumps to. */
  anchor: IndustryId;
  /** "large" = 2×2, "wide" = 2×1 on desktop; together the 7 tiles fill 4×3. */
  size?: "large" | "wide";
};

const APPLICATIONS: Application[] = [
  { label: "Oil & gas and refining", anchor: "oil-gas", size: "large" },
  { label: "Chemical processing", anchor: "chemical" },
  { label: "Food, beverage & pharmaceutical", anchor: "food-pharma" },
  { label: "Power generation", anchor: "power" },
  { label: "Water supply", anchor: "water" },
  { label: "Marine & shipbuilding", anchor: "marine", size: "wide" },
  { label: "General machinery", anchor: "machinery", size: "wide" },
];

// Same photos and alt text as the /applications sections.
function industryFor(anchor: IndustryId) {
  const industry = INDUSTRIES.find((i) => i.id === anchor);
  if (!industry) throw new Error(`No /applications section "${anchor}"`);
  return industry;
}

function ApplicationTile({ app }: { app: Application }) {
  const { image, imageAlt } = industryFor(app.anchor);
  return (
    <Box
      component={Link}
      href={`/applications#${app.anchor}`}
      aria-label={`${app.label} applications`}
      sx={{
        textDecoration: "none",
        position: "relative",
        height: "100%",
        minHeight: 200,
        gridColumn: app.size ? "span 2" : "span 1",
        gridRow: app.size === "large" ? { xs: "span 1", md: "span 2" } : "span 1",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        cursor: "pointer",
        "&:hover .app-tile-img": { transform: "scale(1.08)" },
        "&:hover .app-tile-veil": { background: "rgba(0,0,0,0.15)" },
      }}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="app-tile-img"
        style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
        sizes="(max-width: 768px) 50vw, 25vw"
      />
      <Box
        className="app-tile-veil"
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.7) 100%)",
          transition: "background 0.3s ease",
        }}
      />
      <Typography
        sx={{
          position: "relative",
          color: "#fff",
          fontWeight: 700,
          fontSize: "0.95rem",
          textTransform: "uppercase",
          letterSpacing: "0.03em",
          p: 2,
          zIndex: 1,
        }}
      >
        {app.label}
      </Typography>
    </Box>
  );
}

export default function IndustriesSection() {
  return (
    <Box component="section" id="applications" sx={{ bgcolor: "#fff" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
        }}
      >
        {/* left: intro copy */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
            px: { xs: 4, md: 6 },
            py: { xs: 6, md: 0 },
          }}
        >
          <Reveal>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2, justifyContent: { xs: "center", md: "flex-start" } }}>
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
                Applications
              </Typography>
            </Box>

            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 800,
                color: "text.primary",
                mb: 3,
              }}
            >
              Where MARS valves are used
            </Typography>

            <Button
              component={Link}
              href="/applications"
              variant="outlined"
              sx={{
                px: 3,
                py: 1,
                fontWeight: 700,
                fontSize: "0.8rem",
                letterSpacing: "0.05em",
                borderRadius: "2px",
                borderColor: "primary.main",
                color: "primary.main",
                transition: "background-color 0.2s ease, color 0.2s ease, transform 0.2s ease",
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "#fff",
                  borderColor: "primary.main",
                  transform: "translateY(-2px)",
                },
              }}
            >
              See all applications
            </Button>
          </Reveal>
        </Box>

        {/* right: photo mosaic */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gridAutoRows: 200,
          }}
        >
          {APPLICATIONS.map((app) => (
            <ApplicationTile key={app.label} app={app} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

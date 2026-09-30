"use client";

import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/Common/Reveal";
import type { IndustryId } from "@/app/applications/industries";

type Application = {
  label: string;
  /** Section on /applications this tile jumps to. */
  anchor: IndustryId;
  image: string;
  large?: boolean;
};

const APPLICATIONS: Application[] = [
  {
    label: "Chemical Industry",
    anchor: "chemical",
    image:
      "https://images.unsplash.com/photo-1726731782158-fcf6822b6ca4?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    large: true,
  },
  {
    label: "General Machinery",
    anchor: "machinery",
    image:
      "https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  },
  {
    label: "Power Generation",
    anchor: "power",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  },
  {
    label: "Water Supply Industry",
    anchor: "water",
    image:
      "https://images.unsplash.com/photo-1767274714714-dda4c25c6376?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  },
  {
    label: "Marine & Shipbuilding",
    anchor: "marine",
    image:
      "https://images.unsplash.com/photo-1670121180530-cfcba4438038?fm=jpg&q=80&w=1200&auto=format&fit=crop",
  },
];

function ApplicationTile({ app }: { app: Application }) {
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
        gridColumn: app.large ? { xs: "span 2", md: "span 2" } : "span 1",
        gridRow: app.large ? { xs: "span 1", md: "span 2" } : "span 1",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        cursor: "pointer",
        "&:hover .app-tile-img": { transform: "scale(1.08)" },
        "&:hover .app-tile-veil": { background: "rgba(0,0,0,0.15)" },
      }}
    >
      <Image
        src={app.image}
        alt={app.label}
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
    <Box component="section" sx={{ bgcolor: "#fff" }}>
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
                Valves, Controls &amp; Accessories
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
              Applications
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
              Explore More
            </Button>
          </Reveal>
        </Box>

        {/* right: photo mosaic */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
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

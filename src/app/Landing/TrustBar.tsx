"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import VerifiedIcon from "@mui/icons-material/Verified";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ScienceIcon from "@mui/icons-material/Science";
import Reveal from "@/Common/Reveal";

// Only badges backed by a manufacturer certificate (see /certifications).
const CREDENTIALS = [
  {
    icon: <LocalFireDepartmentIcon fontSize="small" />,
    label: "API 607 fire-safe",
    desc: "Selected series: 28, 83, 88, 90, 90D, 91D",
    href: "/certifications#fire-safe",
  },
  {
    icon: <ScienceIcon fontSize="small" />,
    label: "SIL 3 capable",
    desc: "exida · IEC 61508, selected series",
    href: "/certifications#sil-3",
  },
  {
    icon: <WorkspacePremiumIcon fontSize="small" />,
    label: "ISO 9001 manufacturer",
    desc: "Quality management system, LRQA",
    href: "/certifications#iso-9001",
  },
  {
    icon: <VerifiedIcon fontSize="small" />,
    label: "Genuine Kronox product",
    desc: "Authentic valves, UK stock",
    href: "/mars-brand",
  },
];

export default function TrustBar() {
  return (
    <Box
      component="section"
      id="certifications"
      sx={{
        position: "relative",
        bgcolor: "#fff",
        py: { xs: 7, md: 10 },
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        overflow: "hidden",
      }}
    >
      {/* blueprint grid texture — echoes the hero's engineered feel */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(circle at 30% 40%, #000 0%, transparent 75%)",
        }}
      />

      <Box
        sx={{
          position: "relative",
          maxWidth: 760,
          mx: "auto",
          px: { xs: 3, md: 8 },
          alignItems: "center",
        }}
      >
        {/* left: heading + credential badges */}
        <Reveal>
          <Box>
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
                Documented and traceable
              </Typography>
            </Box>

            <Typography
              component="h2"
              sx={{
                color: "text.primary",
                fontWeight: 800,
                fontSize: { xs: "1.75rem", md: "2.25rem" },
                lineHeight: 1.15,
                mb: 2,
              }}
            >
              The paperwork your compliance team needs, from the manufacturer
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                mb: 4,
                maxWidth: 480,
                lineHeight: 1.7,
              }}
            >
              As the manufacturer, we supply full certificates and datasheets
              for the series you order, so your procurement and compliance teams
              don&apos;t have to chase them.
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: { xs: 3, md: 4 },
              }}
            >
              {CREDENTIALS.map((c) => (
                <Box
                  key={c.label}
                  component={Link}
                  href={c.href}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    textDecoration: "none",
                    "&:hover .cred-label": { color: "primary.main" },
                    "&:hover .cred-icon": {
                      bgcolor: "primary.main",
                      color: "#fff",
                      transform: "scale(1.08) rotate(-4deg)",
                    },
                  }}
                >
                  <Box
                    className="cred-icon"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 36,
                      height: 36,
                      flexShrink: 0,
                      border: "1px solid rgba(231,57,15,0.3)",
                      color: "primary.dark",
                      bgcolor: "rgba(231,57,15,0.06)",
                      transition: "background-color 0.25s ease, color 0.25s ease, transform 0.25s ease",
                    }}
                  >
                    {c.icon}
                  </Box>
                  <Box>
                    <Typography
                      className="cred-label"
                      sx={{
                        color: "text.primary",
                        transition: "color 0.2s ease",
                        fontWeight: 800,
                        fontSize: "0.9rem",
                        letterSpacing: "0.02em",
                        lineHeight: 1.2,
                      }}
                    >
                      {c.label}
                    </Typography>
                    <Typography
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.7rem",
                        letterSpacing: "0.03em",
                        lineHeight: 1.2,
                      }}
                    >
                      {c.desc}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box
              component={Link}
              href="/certifications"
              sx={{
                display: "inline-flex",
                mt: 4,
                color: "primary.main",
                fontWeight: 700,
                fontSize: "0.92rem",
                textDecoration: "none",
                borderBottom: "2px solid",
                borderColor: "primary.main",
                pb: 0.25,
                "&:hover": { color: "primary.dark", borderColor: "primary.dark" },
              }}
            >
              View all certifications &amp; downloads →
            </Box>
          </Box>
        </Reveal>
      </Box>

    </Box>
  );
}

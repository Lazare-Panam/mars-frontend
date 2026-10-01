"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ScienceIcon from "@mui/icons-material/Science";
import Reveal from "@/Common/Reveal";

// Only badges backed by a document on file. ATEX and SIL 3 are series-specific
// and stay off until those certificates are held (homepage build sheet, block 2).
const CREDENTIALS = [
  {
    icon: <LocalFireDepartmentIcon fontSize="small" />,
    label: "API 607 fire-safe",
    desc: "Selected series: 28, 83, 88, 90, 90D, 91D",
  },
  {
    icon: <ScienceIcon fontSize="small" />,
    label: "SS316 (CF8M) / CF3M",
    desc: "Standard across the stainless range",
  },
  {
    icon: <VerifiedIcon fontSize="small" />,
    label: "Authorised by Mars Valve Co.",
    desc: "Letter of authorisation on file",
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
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: 3, md: 8 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
          gap: { xs: 6, md: 8 },
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
              MARS valves are manufactured by Mars Valve Co., Ltd. in Taiwan.
              We supply the manufacturer&apos;s certificates and datasheets for
              the series you order, so your procurement and compliance teams
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
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    cursor: "default",
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
                      sx={{
                        color: "text.primary",
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
          </Box>
        </Reveal>

        {/* right: real certificate document */}
        <Reveal delay={150} y={32}>
          <Link
            href="https://pblol2.blob.core.windows.net/mars-valves/home/Trust-Certfilicate.jpeg"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block", textDecoration: "none" }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                pt: "70%",
                borderRadius: "6px",
                overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
                bgcolor: "#fff",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 20px 44px rgba(0,0,0,0.16)",
                },
              }}
            >
              <Image
                src="https://pblol2.blob.core.windows.net/mars-valves/home/Trust-Certfilicate.jpeg"
                alt="Letter of authorisation from Mars Valve Co., Ltd. naming Valvenok as an authorised UK distributor"
                fill
                style={{ objectFit: "contain", padding: "16px" }}
                sizes="(max-width: 768px) 100vw, 45vw"
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  bgcolor: "rgba(74,18,6,0.85)",
                  color: "#fff",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  py: 1.1,
                  textAlign: "center",
                }}
              >
                VIEW LETTER OF AUTHORISATION ↗
              </Box>
            </Box>
          </Link>
        </Reveal>
      </Box>
    </Box>
  );
}

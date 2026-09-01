"use client";

import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Reveal from "@/Common/Reveal";

const POINTS = [
  {
    good: "Full manufacturer documentation with every order",
    bad: "Documentation missing, incomplete, or unverifiable",
  },
  {
    good: "Genuine API 607 / ATEX / SIL 3 test certificates",
    bad: "No traceable certification — pass-off risk on hazardous sites",
  },
  {
    good: "Full Mars Valve Co. manufacturer warranty honoured",
    bad: "Warranty void — no manufacturer relationship to fall back on",
  },
  {
    good: "Direct technical support from a Mars-trained team",
    bad: "No manufacturer support if something goes wrong on-site",
  },
  {
    good: "Full batch and serial traceability on every valve",
    bad: "No traceability — origin and test history unknown",
  },
  {
    good: "Consistent SS316 (CF8M) construction as standard",
    bad: "Material grade unverified, sometimes substituted",
  },
];

export default function DistributorComparison() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
      <Reveal>
        <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 3, md: 8 }, mb: { xs: 5, md: 7 }, textAlign: "center" }}>
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1.5, mb: 2 }}>
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
              Why It Matters
            </Typography>
            <Box sx={{ width: 32, height: 1, bgcolor: "primary.main" }} />
          </Box>
          <Typography
            component="h2"
            sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, fontWeight: 800, color: "text.primary", mb: 2 }}
          >
            Authorised distributor vs. grey market.
          </Typography>
          <Typography sx={{ color: "text.secondary", maxWidth: 600, mx: "auto", lineHeight: 1.7 }}>
            Unauthorised resellers can undercut on price — but on hazardous or
            fire-safe applications, missing paperwork is the difference
            between a valid safety case and a liability.
          </Typography>
        </Box>
      </Reveal>

      <Box
        sx={{
          maxWidth: 1000,
          mx: "auto",
          px: { xs: 3, md: 8 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: { xs: 3, md: 0 },
        }}
      >
        {/* Authorised column */}
        <Reveal>
          <Box
            sx={{
              border: "2px solid",
              borderColor: "primary.main",
              borderRadius: { xs: "6px", md: "6px 0 0 6px" },
              p: { xs: 3, md: 4 },
              height: "100%",
              bgcolor: "rgba(231,57,15,0.03)",
            }}
          >
            <Typography
              sx={{
                display: "inline-block",
                bgcolor: "primary.main",
                color: "#fff",
                fontWeight: 800,
                fontSize: "0.72rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                px: 1.5,
                py: 0.5,
                borderRadius: "2px",
                mb: 2.5,
              }}
            >
              Authorised Mars Distributor
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              {POINTS.map((p) => (
                <Box
                  key={p.good}
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    alignItems: "flex-start",
                    p: 1,
                    mx: -1,
                    borderRadius: "4px",
                    transition: "background-color 0.2s ease, transform 0.2s ease",
                    "&:hover": {
                      bgcolor: "rgba(231,57,15,0.06)",
                      transform: "translateX(3px)",
                    },
                  }}
                >
                  <CheckCircleIcon sx={{ color: "primary.main", fontSize: 20, mt: "1px", flexShrink: 0 }} />
                  <Typography sx={{ color: "text.primary", fontSize: "0.92rem", lineHeight: 1.5 }}>
                    {p.good}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Reveal>

        {/* Grey market column */}
        <Reveal delay={120}>
          <Box
            sx={{
              border: "2px solid",
              borderColor: "rgba(0,0,0,0.1)",
              borderRadius: { xs: "6px", md: "0 6px 6px 0" },
              borderLeft: { xs: "2px solid rgba(0,0,0,0.1)", md: "none" },
              p: { xs: 3, md: 4 },
              height: "100%",
              bgcolor: "rgba(0,0,0,0.02)",
            }}
          >
            <Typography
              sx={{
                display: "inline-block",
                bgcolor: "rgba(0,0,0,0.08)",
                color: "text.secondary",
                fontWeight: 800,
                fontSize: "0.72rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                px: 1.5,
                py: 0.5,
                borderRadius: "2px",
                mb: 2.5,
              }}
            >
              Grey Market / Unauthorised Reseller
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              {POINTS.map((p) => (
                <Box
                  key={p.bad}
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    alignItems: "flex-start",
                    p: 1,
                    mx: -1,
                    borderRadius: "4px",
                    transition: "background-color 0.2s ease",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
                  }}
                >
                  <CancelIcon sx={{ color: "rgba(0,0,0,0.3)", fontSize: 20, mt: "1px", flexShrink: 0 }} />
                  <Typography sx={{ color: "text.secondary", fontSize: "0.92rem", lineHeight: 1.5 }}>
                    {p.bad}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Reveal>
      </Box>
    </Box>
  );
}

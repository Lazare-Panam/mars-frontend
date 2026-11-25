"use client";

import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Reveal from "@/Common/Reveal";

const POINTS = [
  "Genuine Kronox product",
  "Prices online for standard items",
  "Quotes for project and non-standard orders",
];

export default function ValuePropBanner() {
  return (
    <Box component="section" id="pricing" sx={{
        background: "linear-gradient(120deg, #E0393E 0%, #C42E33 100%)",
        // Angled top and bottom edges, cut like the K and X in the logo.
        clipPath: { xs: "polygon(0 4%, 100% 0, 100% 96%, 0 100%)", md: "polygon(0 14%, 100% 0, 100% 86%, 0 100%)" },
        my: { xs: -1, md: -3 },
        position: "relative",
        zIndex: 1,
        py: { xs: 6, md: 9 },
      }}>
      <Reveal>
        <Box
          sx={{
            maxWidth: "1280px",
            mx: "auto",
            px: { xs: 3, md: 8 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: { xs: 3, md: 4 },
          }}
        >
          <Box>
            <Typography
              component="h2"
              sx={{
                color: "#fff",
                fontWeight: 800,
                fontSize: { xs: "1.5rem", md: "1.9rem" },
                lineHeight: 1.2,
                mb: 0.5,
              }}
            >
              Clear prices on genuine Kronox valves
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.9)", fontSize: "0.95rem", maxWidth: 520 }}>
              We hold Kronox valves in UK stock and publish prices for standard
              items online, so you can compare before you enquire.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2, flexShrink: 0 }}>
            {POINTS.map((p) => (
              <Box key={p} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CheckCircleIcon sx={{ color: "#fff", fontSize: 20 }} />
                <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>
                  {p}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Reveal>
    </Box>
  );
}

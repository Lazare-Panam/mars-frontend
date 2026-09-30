"use client";

import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Reveal from "@/Common/Reveal";

const POINTS = [
  "Supplied direct from Mars Valve Co.",
  "Prices online for standard items",
  "Quotes for project and non-standard orders",
];

export default function ValuePropBanner() {
  return (
    <Box component="section" id="pricing" sx={{ bgcolor: "primary.main", py: { xs: 5, md: 6 } }}>
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
              Clear prices, supplied direct from the manufacturer
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: "0.95rem", maxWidth: 520 }}>
              We buy directly from Mars Valve Co. in Taiwan and publish prices
              for standard items online, so you can compare before you
              enquire.
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

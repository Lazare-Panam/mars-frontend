"use client";

import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const PHONE = "+44 7368 137917";
const EMAIL = "sales@kronoxvalve.com";

// Rotating messages on the right of the bar (desktop). All taken from claims
// already made elsewhere on the site.
const MESSAGES = [
  "Dispatching from UK stock",
  "API 607 fire-safe series",
  "Prices online for standard items",
  "Factory lead time 4–5 weeks",
];

/**
 * Red utility bar above the header: call or email on the left, a rotating
 * "live" message on the right. Moving diagonal slashes in the background echo
 * the cuts in the Kronox logo. Scrolls away; the header below stays sticky.
 */
export default function TopBar() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % MESSAGES.length), 3200);
    return () => clearInterval(t);
  }, []);

  const linkSx = {
    display: "inline-flex",
    alignItems: "center",
    gap: 0.75,
    color: "#fff",
    textDecoration: "none",
    fontSize: { xs: "0.72rem", sm: "0.78rem" },
    whiteSpace: "nowrap",
    fontWeight: 600,
    "&:hover": { textDecoration: "underline" },
  } as const;

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        color: "#fff",
        background: "linear-gradient(90deg, #C42E33 0%, #E0393E 45%, #E0393E 100%)",
        // moving diagonal slashes
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          bottom: 0,
          left: -80,
          width: "calc(100% + 160px)",
          // Stripes every 34px at 120°, i.e. a 39.26px horizontal period;
          // sliding the layer by exactly that keeps the loop seamless.
          backgroundImage:
            "repeating-linear-gradient(120deg, rgba(255,255,255,0.08) 0 10px, transparent 10px 34px)",
          animation: "kxSlashes 1.6s linear infinite",
          pointerEvents: "none",
        },
        "@keyframes kxSlashes": { from: { transform: "translateX(0)" }, to: { transform: "translateX(39.26px)" } },
        "@keyframes kxPulse": {
          "0%": { boxShadow: "0 0 0 0 rgba(255,255,255,0.7)" },
          "70%": { boxShadow: "0 0 0 7px rgba(255,255,255,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(255,255,255,0)" },
        },
        "@keyframes kxMsgIn": {
          from: { opacity: 0, transform: "translateY(8px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "@media (prefers-reduced-motion: reduce)": {
          "&::before, & *": { animation: "none !important" },
        },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: "center",
          gap: 2,
          py: 0.85,
        }}
      >
        <Box sx={{ display: "flex", gap: { xs: 2.5, md: 3 } }}>
          <Box component="a" href={`tel:${PHONE.replace(/\s/g, "")}`} sx={linkSx}>
            <PhoneOutlinedIcon sx={{ fontSize: 16 }} />
            {PHONE}
          </Box>
          <Box component="a" href={`mailto:${EMAIL}`} sx={linkSx}>
            <EmailOutlinedIcon sx={{ fontSize: 16 }} />
            {EMAIL}
          </Box>
        </Box>

        {/* rotating live message */}
        <Box
          aria-hidden
          sx={{
            display: { xs: "none", md: "inline-flex" },
            alignItems: "center",
            gap: 1.25,
            pl: 1.75,
            pr: 2,
            py: 0.4,
            bgcolor: "rgba(255,255,255,0.14)",
            clipPath: "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
            fontSize: "0.74rem",
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            minWidth: 300,
          }}
        >
          <Box
            component="span"
            sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "#fff", flexShrink: 0, animation: "kxPulse 1.8s ease-out infinite" }}
          />
          <Box component="span" key={i} sx={{ animation: "kxMsgIn 0.45s ease both" }}>
            {MESSAGES[i]}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StockNotifyDialog from "./StockNotifyDialog";
import { KRONOX } from "@/theme/brand";

// Code-built stock-update banner: light engineering-grid background, a headline
// block, an animated conveyor of Kronox crates, and two CTAs.
const ARTICLE = "/news/mars-valve-stock-uk-november";
const ENQUIRY = "/contact#enquiry";

// One crate stack (top box over two base boxes) with a gentle belt-bob.
function Crate({ i }: { i: number }) {
  const box = {
    border: `1.5px solid ${KRONOX.steel}`,
    borderRadius: "2px",
    px: 0.9,
    py: 0.4,
    fontSize: "0.55rem",
    fontWeight: 800,
    letterSpacing: "0.06em",
    lineHeight: 1,
    color: KRONOX.steel,
    bgcolor: KRONOX.white,
  } as const;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0.5,
        "@keyframes sb-bob": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-2px)" },
        },
        animation: "sb-bob 1.6s ease-in-out infinite",
        animationDelay: `${(i % 6) * 0.22}s`,
      }}
    >
      <Box sx={box}>Kronox</Box>
      <Box sx={{ display: "flex", gap: 0.5 }}>
        <Box sx={box}>VALVE</Box>
        <Box sx={box}>Kronox</Box>
      </Box>
    </Box>
  );
}

export default function StockBanner() {
  const [notifyOpen, setNotifyOpen] = useState(false);
  const btnBase = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 0.6,
    px: 2.25,
    py: 1,
    borderRadius: "7px",
    fontWeight: 800,
    fontSize: "0.78rem",
    whiteSpace: "nowrap",
    textDecoration: "none",
    transition: "transform .15s ease, background-color .15s ease, box-shadow .15s ease",
  } as const;

  return (
    <>
    <Box
      component="section"
      aria-label="Stock update: a big Kronox valve shipment is on its way to our UK warehouse"
      sx={{
        position: "relative",
        overflow: "hidden",
        color: KRONOX.text,
        // light: white to pale grey with a red bottom edge (Kronox direction C)
        background: "linear-gradient(120deg, #FFFFFF 0%, #ECEDEF 100%)",
        borderBottom: `3px solid ${KRONOX.red}`,
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(110,113,117,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(110,113,117,0.07) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
          pointerEvents: "none",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          maxWidth: 1440,
          mx: "auto",
          px: { xs: 2, md: 3 },
          py: { xs: 2, md: 2.5 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: { xs: 2.5, md: 5 },
        }}
      >
        {/* Left: headline block */}
        <Box sx={{ flexShrink: 1, minWidth: 0 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              fontSize: { xs: "0.55rem", md: "0.65rem" },
              fontWeight: 800,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: KRONOX.red,
              mb: 1.25,
            }}
          >
            <Box
              component="span"
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: KRONOX.red,
                flexShrink: 0,
                "@keyframes sb-pulse": {
                  "0%": { boxShadow: "0 0 0 0 rgba(224,57,62,0.45)" },
                  "70%": { boxShadow: "0 0 0 7px rgba(224,57,62,0)" },
                  "100%": { boxShadow: "0 0 0 0 rgba(224,57,62,0)" },
                },
                animation: "sb-pulse 2s ease-out infinite",
              }}
            />
            Stock Update · Inbound Shipment
          </Box>
          <Box
            component={Link}
            href={ARTICLE}
            sx={{
              "&:hover": { textDecoration: "underline" },
              display: "block",
              color: KRONOX.text,
              textDecoration: "none",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.85rem" },
            }}
          >
            A Big Order Is Coming Soon
          </Box>
          <Box
            sx={{
              mt: 1.25,
              maxWidth: { xs: 460, lg: "none" },
              whiteSpace: { lg: "nowrap" },
              fontSize: { xs: "0.72rem", md: "0.82rem" },
              color: KRONOX.steel,
              lineHeight: 1.5,
              display: { xs: "none", sm: "block" },
            }}
          >
            A large shipment of Kronox valves is on its way to our UK warehouse.
          </Box>
        </Box>

        {/* Middle: animated conveyor (large screens only) */}
        <Box
          aria-hidden
          sx={{ display: { xs: "none", lg: "block" }, position: "relative", width: 460, flexShrink: 0, alignSelf: "center", mt: 2 }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -16,
              right: 0,
              display: "inline-flex",
              alignItems: "center",
              gap: 0.6,
              fontSize: "0.7rem",
              fontWeight: 800,
              letterSpacing: "0.1em",
              color: KRONOX.steel,
            }}
          >
            <LocalShippingOutlinedIcon sx={{ fontSize: 15 }} /> INBOUND · UK STOCK
          </Box>
          {/* belt window: crates slide across, soft-faded at both edges */}
          <Box
            sx={{
              overflow: "hidden",
              pt: 1.25,
              pb: 0.9,
              WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
              maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 3.5,
                width: "max-content",
                "@keyframes sb-conveyor": {
                  from: { transform: "translateX(0)" },
                  to: { transform: "translateX(-50%)" },
                },
                animation: "sb-conveyor 10s linear infinite",
              }}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <Crate key={i} i={i} />
              ))}
            </Box>
          </Box>
          {/* belt line + rollers */}
          <Box sx={{ borderTop: `2px solid ${KRONOX.steel}`, borderRadius: 1 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
            {Array.from({ length: 16 }).map((_, i) => (
              <Box key={i} sx={{ width: 6, height: 6, borderRadius: "50%", border: `1.5px solid ${KRONOX.steel}` }} />
            ))}
          </Box>
        </Box>

        {/* Right: CTAs */}
        <Box sx={{ display: "flex", gap: 1.25, flexShrink: 0 }}>
          <Box
            component="button"
            type="button"
            onClick={() => setNotifyOpen(true)}
            sx={{
              ...btnBase,
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              bgcolor: "primary.main",
              color: "#fff",
              boxShadow: "0 6px 18px rgba(224,57,62,0.22)",
              "&:hover": { bgcolor: "primary.dark", transform: "translateY(-1px)", boxShadow: "0 9px 24px rgba(224,57,62,0.3)" },
            }}
          >
            <NotificationsNoneRoundedIcon sx={{ fontSize: 17 }} /> Get Notified
          </Box>
          <Box
            component={Link}
            href={ENQUIRY}
            sx={{
              ...btnBase,
              border: `1.5px solid ${KRONOX.steel}`,
              color: KRONOX.text,
              display: { xs: "none", sm: "inline-flex" },
              "&:hover": { borderColor: KRONOX.red, color: KRONOX.red, transform: "translateY(-1px)" },
            }}
          >
            Request a Quote <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Box>
        </Box>
      </Box>
    </Box>
    <StockNotifyDialog open={notifyOpen} onClose={() => setNotifyOpen(false)} />
    </>
  );
}

"use client";

import Link from "next/link";
import { Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

// Code-built stock-update banner: red engineering-grid background, a headline
// block, an animated conveyor of MARS crates, and two CTAs.
const ARTICLE = "/news/mars-valve-stock-uk-november";
const ENQUIRY = "/contact#enquiry";

// One crate stack (top box over two base boxes) with a gentle belt-bob.
function Crate({ i }: { i: number }) {
  const box = {
    border: "1.5px solid rgba(255,255,255,0.92)",
    borderRadius: "2px",
    px: 0.9,
    py: 0.4,
    fontSize: "0.55rem",
    fontWeight: 800,
    letterSpacing: "0.06em",
    lineHeight: 1,
    color: "#fff",
    bgcolor: "rgba(255,255,255,0.06)",
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
      <Box sx={box}>MARS</Box>
      <Box sx={{ display: "flex", gap: 0.5 }}>
        <Box sx={box}>VALVE</Box>
        <Box sx={box}>MARS</Box>
      </Box>
    </Box>
  );
}

export default function StockBanner() {
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
    <Box
      component="section"
      aria-label="Stock update: a big MARS valve shipment is inbound from Taiwan to the UK"
      sx={{
        position: "relative",
        overflow: "hidden",
        color: "#fff",
        // depth: brand red with a darker corner + a soft top-left glow
        background:
          "radial-gradient(120% 180% at 12% -40%, rgba(255,255,255,0.18), transparent 55%), linear-gradient(120deg, #e7390f 0%, #cf310c 60%, #b62b0b 100%)",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
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
              color: "rgba(255,255,255,0.88)",
              mb: 1.25,
            }}
          >
            <Box
              component="span"
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "#fff",
                flexShrink: 0,
                "@keyframes sb-pulse": {
                  "0%": { boxShadow: "0 0 0 0 rgba(255,255,255,0.55)" },
                  "70%": { boxShadow: "0 0 0 7px rgba(255,255,255,0)" },
                  "100%": { boxShadow: "0 0 0 0 rgba(255,255,255,0)" },
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
              display: "block",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.85rem" },
              textShadow: "0 1px 10px rgba(0,0,0,0.12)",
              "&:hover": { textDecoration: "underline" },
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
              color: "rgba(255,255,255,0.92)",
              lineHeight: 1.5,
              display: { xs: "none", sm: "block" },
            }}
          >
            A large shipment of MARS® valves is on its way from Taiwan to our UK warehouse.
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
              color: "rgba(255,255,255,0.95)",
            }}
          >
            <LocalShippingOutlinedIcon sx={{ fontSize: 15 }} /> TW → UK
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
          <Box sx={{ borderTop: "2px solid rgba(255,255,255,0.9)", borderRadius: 1 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
            {Array.from({ length: 16 }).map((_, i) => (
              <Box key={i} sx={{ width: 6, height: 6, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.75)" }} />
            ))}
          </Box>
        </Box>

        {/* Right: CTAs */}
        <Box sx={{ display: "flex", gap: 1.25, flexShrink: 0 }}>
          <Box
            component={Link}
            href={ARTICLE}
            sx={{
              ...btnBase,
              bgcolor: "#fff",
              color: "primary.main",
              boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
              "&:hover": { bgcolor: "#fff", transform: "translateY(-1px)", boxShadow: "0 9px 24px rgba(0,0,0,0.26)" },
            }}
          >
            <NotificationsNoneRoundedIcon sx={{ fontSize: 17 }} /> Get Notified
          </Box>
          <Box
            component={Link}
            href={ENQUIRY}
            sx={{
              ...btnBase,
              border: "1.5px solid rgba(255,255,255,0.9)",
              color: "#fff",
              display: { xs: "none", sm: "inline-flex" },
              "&:hover": { bgcolor: "rgba(255,255,255,0.14)", transform: "translateY(-1px)" },
            }}
          >
            Request a Quote <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

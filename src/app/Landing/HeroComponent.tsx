"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Box, Typography, Stack, Button } from "@mui/material";
import MagneticWrap from "@/Common/MagneticWrap";
import ProductFinder from "./ProductFinder";
// "…" is part of the uploaded file's real name.
const HERO_VIDEO =
  "https://pblol2.blob.core.windows.net/kronox/Hero%20video/Hero%20video/kronox-hero-video.mp4";
import { KRONOX } from "@/theme/brand";

const fadeUp = (visible: boolean, delayMs: number) => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(18px)",
  transition: `opacity 0.7s ease ${delayMs}ms, transform 0.7s ease ${delayMs}ms`,
});

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallax = Math.min(scrollY, 800) * 0.15;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = glowRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(224,57,62,0.10), transparent 45%)`;
  };

  const handleMouseLeave = () => {
    const el = glowRef.current;
    if (!el) return;
    el.style.background = "transparent";
  };

  return (
    <Box
      component="section"
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: "relative",
        // Fill the screen below the top bar, header and benefits strip (~161px),
        // so the whole hero, finder included, fits without scrolling.
        minHeight: { xs: "90vh", md: "calc(100svh - 161px)" },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        bgcolor: KRONOX.mist,
        borderBottom: `3px solid ${KRONOX.red}`,
      }}
    >
      {/* Logo-style red slashes (the cut of the K and X), sitting behind
          the drawing on the right. */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          zIndex: 0,
          top: 0,
          bottom: 0,
          right: { xs: "-40%", lg: "-6%" },
          width: { xs: "90%", lg: "46%" },
          background: "linear-gradient(135deg, rgba(224,57,62,0.10), rgba(224,57,62,0.03))",
          clipPath: "polygon(38% 0, 100% 0, 100% 100%, 0 100%)",
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          zIndex: 0,
          top: 0,
          bottom: 0,
          right: { xs: "-10%", lg: "1.5%" },
          width: { xs: 60, lg: 90 },
          bgcolor: KRONOX.red,
          clipPath: "polygon(70% 0, 100% 0, 30% 100%, 0 100%)",
          opacity: 0.9,
          display: { xs: "none", lg: "block" },
        }}
      />

      {/* Giant outlined wordmark along the bottom edge, drifting on scroll. */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          zIndex: 0,
          left: "-1vw",
          bottom: { xs: "-3vw", lg: "-4.2vw" },
          fontSize: "21vw",
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          whiteSpace: "nowrap",
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(110,113,117,0.16)",
          transform: `translateX(${-parallax}px)`,
          willChange: "transform",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        KRONOX
      </Box>

      {/* blueprint grid texture — technical/engineered feel */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          // Drawing-paper grid: fine 12px minor lines, stronger 60px major.
          backgroundImage:
            "linear-gradient(rgba(110,113,117,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(110,113,117,0.10) 1px, transparent 1px), linear-gradient(rgba(110,113,117,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(110,113,117,0.045) 1px, transparent 1px)",
          backgroundSize: "60px 60px, 60px 60px, 12px 12px, 12px 12px",
        }}
      />

      {/* Full-width background video, anchored to the right */}
      <Box
        component="video"
        src={HERO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        sx={{
          position: "absolute",
          zIndex: 0,
          top: 0,
          bottom: 0,
          right: 0,
          height: "100%",
          width: { xs: "100%", md: "66%" },
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      {/* Light fade over the left so the text reads (light site, no dark band) */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: {
            xs: "linear-gradient(0deg, rgba(237,238,240,0.97) 0%, rgba(237,238,240,0.9) 55%, rgba(237,238,240,0.55) 100%)",
            md: "linear-gradient(90deg, rgba(237,238,240,1) 0%, rgba(237,238,240,1) 34%, rgba(237,238,240,0.8) 42%, rgba(237,238,240,0.2) 52%, rgba(237,238,240,0) 58%)",
          },
        }}
      />

      {/* cursor-tracking glow */}
      <Box
        ref={glowRef}
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          transition: "background 0.2s ease",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          // Wider than the header on big screens, so the column sits closer
          // to the left edge and leaves more room for the video.
          maxWidth: { xs: "1280px", lg: "1536px", xl: "1800px" },
          mx: "auto",
          px: { xs: 3, md: 8, lg: 3, xl: 6 },
          py: { xs: 6, md: 3 },
          // Left: headline, then the product finder. Right: the animated
          // valve drawing, spanning both rows.
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 600px) minmax(0, 1fr)", xl: "minmax(0, 680px) minmax(0, 1fr)" },
          columnGap: { lg: 6, xl: 10 },
          rowGap: { xs: 4, lg: 3 },
          alignItems: "center",
        }}
      >
        <Stack
          spacing={{ xs: 3, lg: 3.5 }}
          sx={{
            // Wide text block on desktop, so the copy runs in long lines.
            maxWidth: { xs: 720, lg: 600, xl: 680 },
            gridColumn: { lg: 1 },
            gridRow: { lg: 1 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, ...fadeUp(mounted, 0) }}>
            <Box
              aria-hidden
              sx={{ width: 28, height: 14, flexShrink: 0, bgcolor: "primary.main", clipPath: "polygon(45% 0, 100% 0, 55% 100%, 0 100%)" }}
            />
            <Typography
              component="span"
              sx={{
                color: "primary.main",
                letterSpacing: "0.16em",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              Kronox Valves · Industrial ball valve manufacturer
            </Typography>
          </Box>

          <Typography
            component="h1"
            sx={{
              color: KRONOX.text,
              // Fits on two lines in the desktop column above the finder.
              fontSize: { xs: "2rem", sm: "2.6rem", md: "3.1rem", lg: "2.7rem", xl: "3.1rem" },
              fontWeight: 800,
              lineHeight: 1.14,
              letterSpacing: "-0.02em",
              textWrap: "balance",
              maxWidth: { lg: 560, xl: 640 },
              ...fadeUp(mounted, 120),
            }}
          >
            Genuine{" "}
            <Box component="span" sx={{ color: "primary.main", position: "relative", whiteSpace: "nowrap" }}>
              Kronox
              <Box
                component="span"
                aria-hidden
                sx={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: "0.02em",
                  height: "0.14em",
                  bgcolor: "primary.main",
                  clipPath: "polygon(2% 0, 100% 0, 98% 100%, 0 100%)",
                  transformOrigin: "left",
                  transform: mounted ? "scaleX(1)" : "scaleX(0)",
                  transition: "transform 0.7s cubic-bezier(.6,.05,.3,1) 700ms",
                }}
              />
            </Box>{" "}
            ball valves, UK stock and fast delivery
          </Typography>

          <Typography
            sx={{
              color: KRONOX.steel,
              fontSize: { xs: "1rem", md: "1.08rem", lg: "1.02rem" },
              lineHeight: 1.75,
              textTransform: "none",
              // On short desktop screens, drop the sentence so the finder fits.
              "@media (min-width: 1200px) and (max-height: 960px)": { display: "none" },
              // Two lines on wide screens.
              maxWidth: { xs: 560, lg: 520, xl: 580 },
              ...fadeUp(mounted, 240),
            }}
          >
            We supply the full Kronox range, from 2- and 3-piece to flanged,
            sanitary and API 607 fire-safe series, with full documentation and
            prices for standard items online. Project and non-standard orders
            are quoted with lead times confirmed up front.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ pt: 1.5, ...fadeUp(mounted, 360) }}
          >
            <MagneticWrap>
              <Button
                component={Link}
                href="/shop"
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "1rem",
                  borderRadius: "2px",
                  transition: "background-color 0.2s ease, transform 0.2s ease",
                  "&:hover": { transform: "translateY(-2px)" },
                }}
              >
                Shop the Range
              </Button>
            </MagneticWrap>
            <MagneticWrap>
              <Button
                component={Link}
                href="/contact#enquiry"
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "1rem",
                  borderRadius: "2px",
                  color: KRONOX.text,
                  borderColor: KRONOX.steel,
                  transition: "border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease",
                  "&:hover": {
                    borderColor: KRONOX.red,
                    color: KRONOX.red,
                    bgcolor: "rgba(224,57,62,0.04)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Request a Quote
              </Button>
            </MagneticWrap>
          </Stack>
        </Stack>


        <Box sx={{ maxWidth: 440, width: "100%", gridColumn: { lg: 1 }, gridRow: { lg: 2 }, position: "relative", zIndex: 2, ...fadeUp(mounted, 480) }}>
          <ProductFinder />
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          left: "50%",
          bottom: 32,
          zIndex: 3,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          opacity: mounted ? 1 : 0,
          transform: mounted
            ? "translateX(-50%) translateY(0)"
            : "translateX(-50%) translateY(18px)",
          transition: "opacity 0.7s ease 500ms, transform 0.7s ease 500ms",
        }}
      >
        <Typography
          sx={{
            color: KRONOX.steel,
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </Typography>
        <Box
          sx={{
            width: "1px",
            height: 36,
            bgcolor: KRONOX.line,
            position: "relative",
            overflow: "hidden",
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "40%",
              bgcolor: "primary.main",
              animation: "marsScrollLine 1.8s ease-in-out infinite",
            },
            "@keyframes marsScrollLine": {
              "0%": { transform: "translateY(-100%)" },
              "100%": { transform: "translateY(250%)" },
            },
          }}
        />
      </Box>
    </Box>
  );
}

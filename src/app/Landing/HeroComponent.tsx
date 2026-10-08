"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Box, Typography, Stack, Button } from "@mui/material";
import MagneticWrap from "@/Common/MagneticWrap";
import ProductFinder from "./ProductFinder";
import { BANNER_DARK } from "@/theme/brand";

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
    el.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(231,57,15,0.22), transparent 45%)`;
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
        bgcolor: BANNER_DARK,
      }}
    >
      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline
        src="https://pblol2.blob.core.windows.net/mars-valves/MARS_ball_valve_3D_video_20261001121052.mp4"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          // Fill the hero (no black bands). Anchored bottom-right: the valve
          // stays in view, and the video's own black band and "3-PIECE DESIGN"
          // title at its top edge are cropped off so they don't compete with
          // the headline.
          objectFit: "cover",
          objectPosition: "right bottom",
          zIndex: 0,
          transform: `translateY(${parallax}px) scale(1.08)`,
          willChange: "transform",
        }}
      />

      {/* Steel-blue fade to match the video's tones: solid behind the text,
          clear over the valve. On phones the text spans the full width, so
          the fade runs bottom-to-top instead. */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: {
            xs: "linear-gradient(0deg, rgba(8,16,28,0.92) 0%, rgba(8,16,28,0.75) 55%, rgba(8,16,28,0.45) 100%)",
            // Two layers: a top fade that hides the video's black band and
            // burned-in title, and the left-to-right fade behind the text.
            md: "linear-gradient(180deg, rgba(8,16,28,0.97) 0%, rgba(8,16,28,0.85) 12%, rgba(8,16,28,0) 30%), linear-gradient(90deg, rgba(8,16,28,0.94) 0%, rgba(8,16,28,0.85) 42%, rgba(8,16,28,0.3) 62%, rgba(8,16,28,0) 74%)",
          },
        }}
      />

      {/* blueprint grid texture — technical/engineered feel */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          opacity: 0.5,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
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
          // One column on the left: headline, then the product finder below it.
          // The right side is left empty so the valve video stays visible.
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 840px) 1fr", xl: "minmax(0, 1000px) 1fr" },
          rowGap: { xs: 5, lg: 3 },
          alignItems: "start",
        }}
      >
        <Stack
          spacing={{ xs: 3, lg: 2 }}
          sx={{
            // Wide text block on desktop, so the copy runs in long lines.
            maxWidth: { xs: 720, lg: 840, xl: 1000 },
            gridColumn: { lg: 1 },
          }}
        >
          <Typography
            component="span"
            sx={{
              color: "primary.light",
              letterSpacing: "0.3em",
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              ...fadeUp(mounted, 0),
            }}
          >
            Authorised UK distributor · Mars Valve Co., Ltd., Taiwan
          </Typography>

          <Typography
            component="h1"
            sx={{
              color: "#fff",
              // Fits on two lines in the desktop column above the finder.
              fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3.5rem", lg: "2.6rem" },
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              ...fadeUp(mounted, 120),
            }}
          >
            Ball valve solutions for certified industrial applications
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.75)",
              fontSize: { xs: "1rem", md: "1.15rem", lg: "1.05rem" },
              // On short desktop screens, drop the sentence so the finder fits.
              "@media (min-width: 1200px) and (max-height: 960px)": { display: "none" },
              // Two lines on wide screens.
              maxWidth: { xs: 560, lg: 840, xl: 920 },
              ...fadeUp(mounted, 240),
            }}
          >
            Stainless steel 2-piece, 3-piece, flanged, multi-port and sanitary
            ball valves, with fire-safe series tested to API 607. Genuine MARS
            valves, manufacturer documentation, and prices you can see online.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ pt: 1, ...fadeUp(mounted, 360) }}
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
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.4)",
                  transition: "border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease",
                  "&:hover": {
                    borderColor: "#fff",
                    bgcolor: "rgba(255,255,255,0.05)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Request a Quote
              </Button>
            </MagneticWrap>
          </Stack>
        </Stack>

        <Box sx={{ maxWidth: 440, width: "100%", gridColumn: { lg: 1 }, position: "relative", zIndex: 2, ...fadeUp(mounted, 480) }}>
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
            color: "rgba(255,255,255,0.5)",
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
            bgcolor: "rgba(255,255,255,0.3)",
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

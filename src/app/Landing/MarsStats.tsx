"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import VerifiedIcon from "@mui/icons-material/Verified";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import SpeedIcon from "@mui/icons-material/Speed";
import CategoryIcon from "@mui/icons-material/Category";
import Reveal from "@/Common/Reveal";

function CountUp({ target }: { target: string }) {
  const numericPart = parseFloat(target.replace(/[^0-9.]/g, ""));
  const prefix = target.match(/^[^0-9]*/)?.[0] ?? "";
  const suffix = target.match(/[^0-9.]*$/)?.[0] ?? "";
  // Start at the real target so the server-rendered HTML (and non-JS crawlers)
  // show "2000", "100", etc. — never "0". The client-side count-up animation
  // resets to 0 in the effect below, after hydration, so there's no mismatch.
  const [value, setValue] = useState(numericPart);
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!ref.current || Number.isNaN(numericPart)) return;

    // Client only: drop to 0 so the scroll-triggered animation can count up.
    setValue(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const duration = 1500;
          const start = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * numericPart));
            if (progress < 1) requestAnimationFrame(tick);
            else setValue(numericPart);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericPart]);

  if (Number.isNaN(numericPart)) return <span ref={ref}>{target}</span>;

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

const STATS = [
  { num: "2000", unit: "PSI", label: "MAX PRESSURE RATING" },
  { num: "11", unit: "", label: "BALL VALVE SERIES" },
  { num: "316", unit: "", label: "STAINLESS GRADE (CF8M)" },
  { num: "100", unit: "%", label: "API 607 FIRE-SAFE TESTED" },
];

const FEATURES = [
  {
    icon: <VerifiedIcon fontSize="small" />,
    title: "API 607 Certified",
    desc: "Every fire-safe series independently tested for shut-off integrity under fire conditions.",
  },
  {
    icon: <PrecisionManufacturingIcon fontSize="small" />,
    title: "SS316 (CF8M) Construction",
    desc: "Corrosion-resistant body material as standard across the range, not an upcharge option.",
  },
  {
    icon: <SpeedIcon fontSize="small" />,
    title: "Tight Shut-Off, Every Time",
    desc: "Consistent tolerances from single fittings to full pipeline orders.",
  },
  {
    icon: <CategoryIcon fontSize="small" />,
    title: "Built By Hand, Tested By Hand",
    desc: "Every series carries the weight of the people who built it — not a stamp, a standard.",
  },
];

export default function MarsStats() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        py: { xs: 8, md: 12 },
        color: "#fff",
        background:
          "linear-gradient(135deg, #E7390F 0%, #A8270A 60%, #6b1a08 100%)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(circle at 75% 30%, #000 0%, transparent 70%)",
        }}
      />

      <Box
        sx={{
          position: "relative",
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: 3, md: 8 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" },
          gap: 6,
          alignItems: "center",
        }}
      >
        {/* left: copy + features + CTAs */}
        <Reveal>
        <Box>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.15)",
              px: 1.5,
              py: 0.5,
              mb: 3,
            }}
          >
            <Typography
              sx={{
                fontWeight: 900,
                fontSize: "0.7rem",
                letterSpacing: "0.05em",
                color: "primary.light",
              }}
            >
              THE ROLLS-ROYCE OF VALVES
            </Typography>
          </Box>

          <Typography
            component="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: "2.25rem", md: "3.2rem" },
              lineHeight: 1.1,
              color: "#fff",
            }}
          >
            Built by hand,
            <br />
            <Box
              component="span"
              sx={{ color: "rgba(255,255,255,0.55)", fontStyle: "italic" }}
            >
              proven by pressure.
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.7)",
              mb: 5,
              maxWidth: 550,
              lineHeight: 1.7,
            }}
          >
            MARS exists because of the people behind it — engineers, machinists,
            and inspectors who refused to let anything less than their best
            leave the factory floor. That's not a slogan. It's the only standard
            we've ever known how to work to.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 3,
              mb: 5,
            }}
          >
            {FEATURES.map((feat) => (
              <Box key={feat.title} sx={{ display: "flex", gap: 1.5 }}>
                <Box sx={{ mt: 0.3, color: "primary.light" }}>{feat.icon}</Box>
                <Box>
                  <Typography
                    sx={{ fontWeight: 700, fontSize: "0.9rem", color: "#fff" }}
                  >
                    {feat.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.6)",
                      fontSize: "0.8rem",
                      lineHeight: 1.4,
                      mt: 0.5,
                    }}
                  >
                    {feat.desc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              component={Link}
              href="/products"
              variant="contained"
              disableElevation
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: "primary.main",
                color: "#fff",
                fontWeight: 800,
                borderRadius: 0,
                px: 3,
                py: 1.2,
                transition: "background-color 0.2s ease, transform 0.2s ease",
                "&:hover": { bgcolor: "primary.dark", transform: "translateY(-2px)" },
              }}
            >
              VIEW FULL RANGE
            </Button>
            <Button
              component={Link}
              href="https://pblol2.blob.core.windows.net/mars-valves/home/Trust-Certfilicate.jpeg"
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              startIcon={<MenuBookIcon />}
              sx={{
                color: "#fff",
                borderColor: "rgba(255,255,255,0.25)",
                borderRadius: 0,
                px: 3,
                transition: "border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease",
                "&:hover": {
                  borderColor: "#fff",
                  bgcolor: "rgba(255,255,255,0.06)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              CERTIFICATION GUIDE
            </Button>
          </Box>
        </Box>
        </Reveal>

        {/* right: stat grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {STATS.map((stat) => (
            <Box
              key={stat.label}
              sx={{
                p: 4,
                textAlign: "center",
                border: "1px solid rgba(255,255,255,0.1)",
                bgcolor: "rgba(255,255,255,0.03)",
                transition: "0.3s",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.06)",
                  transform: "translateY(-5px)",
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.8rem", md: "2.2rem" },
                  color: "#fff",
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "center",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <CountUp target={stat.num} />
                {stat.unit && (
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "1rem",
                      ml: 0.5,
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {stat.unit}
                  </Typography>
                )}
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.65)",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  letterSpacing: "0.05em",
                  mt: 1,
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

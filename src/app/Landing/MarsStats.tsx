"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { LETTER_OF_AUTHORISATION_URL } from "@/lib/links";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import VerifiedIcon from "@mui/icons-material/Verified";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import BuildCircleOutlinedIcon from "@mui/icons-material/BuildCircleOutlined";
import TuneIcon from "@mui/icons-material/Tune";
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

// Each stat is checked against the product catalog (mars-api): the metal
// seated high-pressure valve is rated 6,000 PSI (most series 1,000–2,000),
// fire-safe series 28/83/88/90/90D/91D, sizes run 1/8" to 12".
const STATS = [
  { num: "6000", unit: "PSI", label: "MAX PRESSURE, DEPENDING ON SERIES" },
  { num: "6", unit: "", label: "API 607 FIRE-SAFE SERIES" },
  { num: "12", unit: "″", label: "LARGEST SIZE (RANGE STARTS AT ⅛″)" },
  { num: "316", unit: "", label: "STAINLESS GRADE (CF8M / CF3M)" },
];

const FEATURES = [
  {
    icon: <VerifiedIcon fontSize="small" />,
    title: "Fire-Safe Series",
    desc: "Selected series tested to API 607: Series 28, 83, 88, 90, 90D and 91D.",
  },
  {
    icon: <PrecisionManufacturingIcon fontSize="small" />,
    title: "Stainless As Standard",
    desc: "CF8M (316) and CF3M (316L) bodies across the stainless range.",
  },
  {
    icon: <BuildCircleOutlinedIcon fontSize="small" />,
    title: "Direct Mount Design",
    desc: "Actuators bolt straight to selected series, with no bracket or coupling.",
  },
  {
    icon: <TuneIcon fontSize="small" />,
    title: "Seat Options",
    desc: "PTFE, RPTFE, PEEK, metal seats and more, matched to your media.",
  },
];

export default function MarsStats() {
  return (
    <Box
      component="section"
      id="mars-brand"
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
              THE MARS® BRAND
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
            Made by Mars Valve Co.
            <br />
            <Box
              component="span"
              sx={{ color: "rgba(255,255,255,0.55)", fontStyle: "italic" }}
            >
              in Taiwan.
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
            MARS valves are designed and manufactured by Mars Valve Co., Ltd.
            in Taichung, Taiwan, with casting, machining, finishing and assembly
            under one roof. Mars Valvenok supplies the range in the UK as an
            authorised distributor.
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
              VIEW THE FULL RANGE
            </Button>
            <Button
              component={Link}
              href={LETTER_OF_AUTHORISATION_URL}
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
              LETTER OF AUTHORISATION
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

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ForumOutlined";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Reveal from "@/Common/Reveal";

const STEPS = [
  {
    icon: <ChatBubbleOutlineIcon />,
    num: "01",
    title: "Send Your Spec",
    desc: (
      <>
        Tell us size, pressure rating, and application — one message or a full
        BOM. <Link href="/contact" style={{ color: "inherit", fontWeight: 600 }}>Send us your spec</Link>.
      </>
    ),
  },
  {
    icon: <FactCheckIcon />,
    num: "02",
    title: "Pricing and Datasheets",
    desc: "We reply with datasheets, certificates for the series and pricing, usually same day.",
  },
  {
    icon: <TaskAltIcon />,
    num: "03",
    title: "Confirm & Order",
    desc: "A simple PO or online checkout, backed by full traceability documentation.",
  },
  {
    icon: <LocalShippingIcon />,
    num: "04",
    title: "Fast, Tracked Dispatch",
    desc: "Every order ships with the paperwork engineers actually need on-site.",
  },
];

export default function ProcessSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineVisible, setLineVisible] = useState(false);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLineVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Box component="section" id="how-it-works" sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
      <Reveal>
        <Box
          sx={{
            maxWidth: "1280px",
            mx: "auto",
            px: { xs: 3, md: 8 },
            mb: { xs: 6, md: 8 },
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.5,
              mb: 2,
            }}
          >
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
              How It Works
            </Typography>
            <Box sx={{ width: 32, height: 1, bgcolor: "primary.main" }} />
          </Box>

          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 800,
              color: "text.primary",
            }}
          >
            From enquiry to your dock, in four steps.
          </Typography>
        </Box>
      </Reveal>

      <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 3, md: 8 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: { xs: 5, md: 4 },
            position: "relative",
          }}
        >
          <Box
            ref={lineRef}
            sx={{
              display: { xs: "none", md: "block" },
              position: "absolute",
              top: 28,
              left: "12.5%",
              right: "12.5%",
              height: "1px",
              bgcolor: "rgba(0,0,0,0.1)",
              zIndex: 0,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: lineVisible ? "100%" : "0%",
                bgcolor: "primary.main",
                transition: "width 1.4s ease 0.2s",
              }}
            />
          </Box>

          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 120}>
              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                  textAlign: { xs: "left", md: "center" },
                  "&:hover .step-icon": {
                    transform: "scale(1.1) rotate(-6deg)",
                    boxShadow: "0 12px 28px rgba(231,57,15,0.4)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "row", md: "column" },
                    alignItems: "center",
                    gap: { xs: 2, md: 0 },
                    mb: 2,
                  }}
                >
                  <Box
                    className="step-icon"
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "2px",
                      bgcolor: "primary.main",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: "0 8px 20px rgba(231,57,15,0.25)",
                      mx: { xs: 0, md: "auto" },
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography
                    sx={{
                      display: { xs: "block", md: "none" },
                      fontWeight: 800,
                      fontSize: "1.5rem",
                      color: "rgba(0,0,0,0.1)",
                    }}
                  >
                    {step.num}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    display: { xs: "none", md: "block" },
                    fontWeight: 800,
                    fontSize: "0.72rem",
                    color: "primary.main",
                    letterSpacing: "0.1em",
                    mb: 1,
                  }}
                >
                  STEP {step.num}
                </Typography>

                <Typography
                  component="h3"
                  sx={{ fontWeight: 700, fontSize: "1.1rem", color: "text.primary", mb: 1 }}
                >
                  {step.title}
                </Typography>

                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                    maxWidth: 260,
                    mx: { xs: 0, md: "auto" },
                  }}
                >
                  {step.desc}
                </Typography>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

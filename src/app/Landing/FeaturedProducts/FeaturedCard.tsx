"use client";

import { useRef } from "react";
import { Box, Typography, Chip, Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FeaturedValve } from "./featuredValveData";

export default function FeaturedCard({ valve }: { valve: FeaturedValve }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) translateY(-6px)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "";
  };

  return (
    <Box
      component={Link}
      href={valve.href}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        flex: "0 0 auto",
        // Sized by the track (see cardsPerView in FeaturedProducts).
        width: "100%",
        // min, not fixed: a two-line title must not push the price out of view.
        // The row stretches every card to the tallest one.
        minHeight: 480,
        display: "flex",
        flexDirection: "column",
        bgcolor: "#fff",
        border: "1px solid",
        borderColor: "rgba(0,0,0,0.08)",
        borderRadius: "4px",
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
        transition: "border-color 0.2s ease, transform 0.15s ease, box-shadow 0.3s ease",
        willChange: "transform",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: "0 24px 48px rgba(0,0,0,0.16)",
        },
        "&:hover .mars-card-divider": {
          borderColor: "primary.main",
        },
        "&:hover .mars-card-cta": {
          textDecoration: "underline",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 220,
          flexShrink: 0,
          bgcolor: "#fff",
        }}
      >
        <Image
          src={valve.image}
          alt={valve.alt}
          fill
          draggable={false}
          style={{ objectFit: "contain", padding: "12px" }}
          sizes="300px"
        />
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            bgcolor: "primary.main",
            color: "#fff",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.05em",
            px: 1,
            py: 0.4,
            borderRadius: "2px",
          }}
        >
          {valve.code}
        </Box>
      </Box>

      <Box
        className="mars-card-divider"
        sx={{
          p: 2.5,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderTop: "1px solid",
          borderColor: "rgba(0,0,0,0.08)",
          transition: "border-color 0.2s ease",
        }}
      >
        <Typography
          sx={{
            color: "primary.dark",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            mb: 0.5,
          }}
        >
          {valve.subtitle}
        </Typography>

        <Typography
          component="h3"
          sx={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "text.primary",
            mb: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {valve.title}
        </Typography>

        <Typography
          sx={{
            fontSize: "0.85rem",
            color: "text.secondary",
            mb: 1.5,
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {valve.description}
        </Typography>

        <Stack
          direction="row"
          spacing={0.75}
          useFlexGap
          sx={{ flexWrap: "wrap", mb: 2 }}
        >
          {valve.specs.map((spec) => (
            <Chip
              key={spec}
              label={spec}
              size="small"
              sx={{
                bgcolor: "primary.light",
                color: "primary.dark",
                fontWeight: 600,
                fontSize: "0.7rem",
                height: 22,
              }}
            />
          ))}
        </Stack>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pt: 1.5,
            mt: "auto",
            borderTop: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "0.65rem",
                color: "text.secondary",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              From
            </Typography>
            <Typography
              sx={{ fontSize: "1.15rem", fontWeight: 800, color: "text.primary" }}
            >
              £{valve.price}
            </Typography>
          </Box>

          <Typography
            className="mars-card-cta"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              fontSize: "0.85rem",
            }}
          >
            View &amp; Buy →
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

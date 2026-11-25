"use client";

import Link from "next/link";
import { Box, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Reveal from "@/Common/Reveal";

// The one call-to-action band used across the site (category, certifications,
// Kronox Brand, About...), so every "talk to us" section looks the same.

export type CtaAction = { label: string; href: string; external?: boolean };

export default function CtaBand({
  title,
  text,
  primary,
  secondary,
  maxWidth = 1200,
}: {
  title: string;
  text: React.ReactNode;
  primary: CtaAction;
  secondary?: CtaAction;
  maxWidth?: number;
}) {
  const btn = (a: CtaAction, main: boolean) => {
    const sx = {
      display: "inline-flex",
      alignItems: "center",
      gap: 1,
      px: 3,
      py: 1.4,
      borderRadius: "999px",
      fontWeight: 700,
      textDecoration: "none",
      whiteSpace: "nowrap",
      transition: "background-color 0.15s ease, transform 0.15s ease",
      ...(main
        ? { bgcolor: "primary.main", color: "#fff", boxShadow: "0 8px 20px rgba(231,57,15,0.25)", "&:hover": { bgcolor: "primary.dark", transform: "translateY(-1px)" } }
        : { border: "1.5px solid", borderColor: "primary.main", color: "primary.main", bgcolor: "#fff", "&:hover": { bgcolor: "#FFF5F1", transform: "translateY(-1px)" } }),
    } as const;
    const inner = (
      <>
        {a.label}
        {main && <ArrowForwardIcon fontSize="small" />}
      </>
    );
    return a.external ? (
      <Box component="a" href={a.href} target={a.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" sx={sx}>
        {inner}
      </Box>
    ) : (
      <Box component={Link} href={a.href} sx={sx}>
        {inner}
      </Box>
    );
  };

  return (
    <Box sx={{ maxWidth, mx: "auto", px: { xs: 3, md: 6 }, py: { xs: 6, md: 8 } }}>
      <Reveal>
        <Box
          sx={{
            p: { xs: 3, md: 4.5 },
            borderRadius: "24px",
            // Soft brand-red tint that blends with the cream page, with a
            // fine red edge and a faint glow in the corner.
            background: "linear-gradient(120deg, #FDEDE7 0%, #FFF6F2 55%, #FDE8E0 100%)",
            border: "1px solid rgba(231,57,15,0.18)",
            position: "relative",
            overflow: "hidden",
            "&::after": {
              content: '""',
              position: "absolute",
              right: -80,
              top: -80,
              width: 260,
              height: 260,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(231,57,15,0.14) 0%, rgba(231,57,15,0) 70%)",
              pointerEvents: "none",
            },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { md: "center" },
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <Box>
            <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.3rem", md: "1.6rem" }, color: "text.primary" }}>
              {title}
            </Typography>
            <Typography
              component="div"
              sx={{ color: "text.secondary", mt: 0.75, maxWidth: 580, lineHeight: 1.6, "& a": { color: "primary.main", fontWeight: 600 } }}
            >
              {text}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", flexShrink: 0, position: "relative", zIndex: 1 }}>
            {btn(primary, true)}
            {secondary && btn(secondary, false)}
          </Box>
        </Box>
      </Reveal>
    </Box>
  );
}

import * as React from "react";
import Link from "next/link";
import { Box, Chip, Container, Stack, Typography } from "@mui/material";

const SEO_LINKS = [
  { href: "/products/one-piece-ball-valves", label: "One-Piece Ball Valves" },
  { href: "/products/two-piece-ball-valves", label: "Two-Piece Ball Valves" },
  { href: "/products/three-piece-ball-valves", label: "Three-Piece Ball Valves" },
  { href: "/products/flanged-ball-valves", label: "Flanged Ball Valves" },
  { href: "/products/multi-port-ball-valves", label: "Multi-Port Ball Valves" },
  { href: "/products/metal-seated-ball-valves", label: "Metal-Seated Ball Valves" },
  { href: "/news/fire-safe-ball-valves", label: "Fire-Safe Ball Valves" },
  {
    href: "/products/ball-valves/economical-two-piece-ball-valve/variants/V20-20-1-4IN-W-O-LOCK",
    label: 'Economical 2-Piece Ball Valve – 1/4"',
  },
  {
    href: "/products/ball-valves/economical-two-piece-ball-valve/variants/V20-20-1-2IN-W-O-LOCK",
    label: 'Economical 2-Piece Ball Valve – 1/2"',
  },
  {
    href: "/products/ball-valves/three-four-five-way-ball-valve/variants/v33-123-1-4into1-2in-t-port-bare-shaft",
    label: '3/4/5-Way Ball Valve – 1/4"–1/2" T-Port',
  },
  {
    href: "/products/ball-valves/three-four-five-way-ball-valve/variants/v33-123-3-4in-t-port-bare-shaft",
    label: '3/4/5-Way Ball Valve – 3/4" T-Port',
  },
  {
    href: "/products/ball-valves/high-performance-three-piece-ball-valve/variants/v77-1-4in-w-o-handle",
    label: 'High Performance 3-Piece Ball Valve – 1/4"',
  },
  {
    href: "/products/ball-valves/high-performance-three-piece-ball-valve/variants/v77-1-2in-w-handle",
    label: 'High Performance 3-Piece Ball Valve – 1/2"',
  },
  {
    href: "/products/ball-valves/high-performance-sanitary-ball-valve/variants/v77sn-10-2a-1-2in-t-clamp-std-ptfe-seat",
    label: 'High Performance Sanitary Ball Valve – 1/2"',
  },
  {
    href: "/products/ball-valves/high-performance-sanitary-ball-valve/variants/v77sn-10-2a-3-4in-t-clamp-std-ptfe-seat",
    label: 'High Performance Sanitary Ball Valve – 3/4"',
  },
  {
    href: "/products/ball-valves/sanitary-multi-port-ball-valve/variants/v36sn-1020-1-2in-cavity-filler-seat-w-handle",
    label: 'Sanitary Multi-Port Ball Valve – 1/2"',
  },
  {
    href: "/products/ball-valves/sanitary-multi-port-ball-valve/variants/v36sn-1020-1-1-2in-cavity-filler-seat-w-handle",
    label: 'Sanitary Multi-Port Ball Valve – 1-1/2"',
  },
  {
    href: "/products/ball-valves/sanitary-multi-port-ball-valve/variants/v36sn-1020-2in-cavity-filler-seat-w-handle",
    label: 'Sanitary Multi-Port Ball Valve – 2"',
  },
  {
    href: "/products/ball-valves/sanitary-multi-port-ball-valve/variants/v36sn-1020-2-1-2in-cavity-filler-seat-w-handle",
    label: 'Sanitary Multi-Port Ball Valve – 2-1/2"',
  },
];

export default function SeoButtons() {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        borderTop: "1px solid",
        borderColor: "divider",
        py: { xs: 5, md: 7 },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="overline"
          sx={{
            color: "primary.main",
            letterSpacing: 2,
            fontWeight: 700,
            display: "block",
            mb: 2,
          }}
        >
          Explore More
        </Typography>
        <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: "wrap" }}>
          {SEO_LINKS.map((item) => (
            <Chip
              key={item.href}
              component={Link}
              href={item.href}
              clickable
              label={item.label}
              variant="outlined"
              sx={{
                borderColor: "primary.main",
                color: "primary.main",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                },
              }}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
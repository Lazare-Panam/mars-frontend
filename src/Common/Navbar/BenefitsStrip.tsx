"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Box, Container } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";

// Benefits strip under the header. Trade-first wording (per the Oct 2026
// marketing plan): prices for standard items, quotes for projects, trade
// accounts, and dispatch promised only for stock items. The authorised-distributor
// claim sits here (packages and certifications are in the main menu); trade accounts are covered by
// the Credit button in the header. Lead time: factory items 4–5 weeks.
const BENEFITS = [
  { label: "Prices Online For Standard Items", href: "/shop", icon: SellOutlinedIcon },
  { label: "Quotes For Projects", href: "/contact#enquiry", icon: RequestQuoteOutlinedIcon },
  { label: "Genuine Kronox Valves", href: "/mars-brand", icon: VerifiedOutlinedIcon },
  { label: "Factory Lead Time 4–5 Weeks", href: "/delivery-information", icon: LocalShippingOutlinedIcon },
];

/** Phones: one benefit at a time, centred, changing every few seconds. */
function MobileTicker() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % BENEFITS.length), 3500);
    return () => clearInterval(id);
  }, []);
  const { label, href, icon: Icon } = BENEFITS[index];
  return (
    <Box
      component={Link}
      href={href}
      key={label}
      aria-live="polite"
      sx={{
        display: { xs: "flex", md: "none" },
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        px: 2,
        py: 1.1,
        color: "primary.main",
        textDecoration: "none",
        fontSize: "0.82rem",
        fontWeight: 500,
        textAlign: "center",
        animation: "benefitIn 0.4s ease",
        "@keyframes benefitIn": { from: { opacity: 0, transform: "translateY(4px)" }, to: { opacity: 1, transform: "none" } },
      }}
    >
      {label}
      <Icon sx={{ fontSize: 18, flexShrink: 0 }} />
    </Box>
  );
}

export default function BenefitsStrip() {
  return (
    <Box
      component="nav"
      aria-label="Why buy from us"
      sx={{ bgcolor: "#fff", borderBottom: "1px solid", borderColor: "divider" }}
    >
      <MobileTicker />
      <Container maxWidth="xl" disableGutters sx={{ display: { xs: "none", md: "block" } }}>
        <Box
          component="ul"
          sx={{
            m: 0,
            p: 0,
            listStyle: "none",
            display: "flex",
            // Scrolls sideways on phones instead of wrapping.
            overflowX: { xs: "auto", lg: "visible" },
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {BENEFITS.map(({ label, href, icon: Icon }, i) => (
            <Box
              component="li"
              key={label}
              sx={{
                flex: { lg: 1 },
                flexShrink: 0,
                borderLeft: i === 0 ? "none" : "1px solid",
                borderColor: "divider",
              }}
            >
              <Box
                component={Link}
                href={href}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  px: 2.5,
                  py: 1.25,
                  color: "text.primary",
                  textDecoration: "none",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  "& svg": { color: "primary.main" },
                  whiteSpace: "nowrap",
                  transition: "background-color 0.15s ease",
                  "&:hover": { bgcolor: "rgba(224,57,62,0.05)" },
                }}
              >
                <Icon sx={{ fontSize: 18 }} />
                {label}
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

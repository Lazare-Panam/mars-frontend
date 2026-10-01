"use client";

import Link from "next/link";
import { Box, Container } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";

// Benefits strip under the header (modelled on marsselect.co.uk). Every claim
// matches a page on this site: free delivery over £50 and 1–2 day dispatch are
// from /delivery-information; trade credit is /credit-application; prices are
// published on /shop.
const BENEFITS = [
  { label: "Free Delivery Over £50 · Dispatch In 1–2 Days", href: "/delivery-information", icon: LocalShippingOutlinedIcon },
  { label: "Trade Credit Accounts", href: "/credit-application", icon: CreditCardOutlinedIcon },
  { label: "Authorised MARS Distributor", href: "/about", icon: VerifiedOutlinedIcon },
  { label: "Prices Online For Standard Items", href: "/shop", icon: SellOutlinedIcon },
];

export default function BenefitsStrip() {
  return (
    <Box
      component="nav"
      aria-label="Why buy from us"
      sx={{ bgcolor: "#fff", borderBottom: "1px solid", borderColor: "divider" }}
    >
      <Container maxWidth="xl" disableGutters>
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
                  color: "primary.main",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  transition: "background-color 0.15s ease",
                  "&:hover": { bgcolor: "rgba(231,57,15,0.05)" },
                }}
              >
                {label}
                <Icon sx={{ fontSize: 18 }} />
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

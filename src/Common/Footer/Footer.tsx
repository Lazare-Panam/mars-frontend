"use client";
import { ADDRESS } from "@/lib/address";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const FOOTER_COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "MARS® Brand", href: "/mars-brand" },
      { label: "Certifications", href: "/certifications" },
      { label: "News", href: "/news" },
    ],
  },
  {
    heading: "Products",
    links: [
      { label: "Two-Piece Ball Valves", href: "/products/two-piece-ball-valves" },
      { label: "Three-Piece Ball Valves", href: "/products/three-piece-ball-valves" },
      { label: "Flanged Ball Valves", href: "/products/flanged-ball-valves" },
      { label: "Multi-Port Ball Valves", href: "/products/multi-port-ball-valves" },
      { label: "Sanitary Ball Valves", href: "/products/sanitary-ball-valves" },
      { label: "Fire Safe Ball Valves", href: "/products/fire-safe-ball-valves" },
      { label: "Actuated Packages", href: "/actuated-packages" },
      { label: "V-Port Ball Valves", href: "/products/v-port-ball-valves" },
      { label: "Product Index", href: "/product-index" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Returns Policy", href: "/return-policy" },
      { label: "Delivery Information", href: "/delivery-information" },
      {
        label: "Download E-Catalogue (PDF)",
        href: "https://pblol2.blob.core.windows.net/mars-valves/catalogs/mars-e-catalog.pdf",
        newTab: true,
      },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      id="footer"
      sx={{
        background:
          "linear-gradient(135deg, #E7390F 0%, #A8270A 60%, #6b1a08 100%)",
        color: "rgba(255,255,255,0.7)",
      }}
    >
      <Box
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: 3, md: 8 },
          py: { xs: 6, md: 8 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr 1fr" },
          gap: { xs: 5, md: 4 },
        }}
      >
        {/* brand + contact */}
        <Box>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}
          >
            <Box sx={{ position: "relative", width: 40, height: 40 }}>
              <Image
                src="https://pblol2.blob.core.windows.net/mars-valves/logo.jpg"
                alt="MARS Valvenok UK logo"
                fill
                style={{ objectFit: "contain" }}
                sizes="40px"
              />
            </Box>
            <Typography
              sx={{
                fontFamily: "serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "#fff",
              }}
            >
              MARS Valvenok
            </Typography>
          </Box>

          <Typography
            sx={{ fontSize: "0.85rem", lineHeight: 1.7, mb: 3, maxWidth: 320 }}
          >
            Authorised UK distributor of MARS ball valves from Mars Valve Co.,
            Ltd., Taiwan.
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: "0.85rem",
              }}
            >
              <EmailOutlinedIcon
                sx={{ fontSize: 16, color: "primary.light" }}
              />
              <Typography
                className="no-capitalize"
                sx={{ fontSize: "0.85rem" }}
              >
                sales@marsvalvenok.com
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: "0.85rem",
              }}
            >
              <PhoneOutlinedIcon
                sx={{ fontSize: 16, color: "primary.light" }}
              />
              <Typography sx={{ fontSize: "0.85rem" }}>
                +44 7368 137917
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1,
                fontSize: "0.85rem",
              }}
            >
              <LocationOnOutlinedIcon
                sx={{ fontSize: 16, color: "primary.light", mt: 0.2 }}
              />
              <Typography component="address" sx={{ fontSize: "0.85rem", fontStyle: "normal", lineHeight: 1.6 }}>
                {ADDRESS.name}
                <br />
                {ADDRESS.street}
                <br />
                {ADDRESS.locality}, {ADDRESS.postcode}
                <br />
                {ADDRESS.country}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* link columns */}
        {FOOTER_COLUMNS.map((col) => (
          <Box key={col.heading}>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              {col.heading}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
              {col.links.map((link) => (
                <Typography
                  key={link.label}
                  component={Link}
                  href={link.href}
                  target={link.newTab ? "_blank" : undefined}
                  rel={link.newTab ? "noopener noreferrer" : undefined}
                  sx={{
                    position: "relative",
                    display: "inline-block",
                    width: "fit-content",
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.65)",
                    textDecoration: "none",
                    transition: "color 0.2s ease, transform 0.2s ease",
                    "&:hover": { color: "primary.light", transform: "translateX(3px)" },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      {/* bottom bar */}
      <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <Box
          sx={{
            maxWidth: "1280px",
            mx: "auto",
            px: { xs: 3, md: 8 },
            py: 3,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography
            sx={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}
          >
            © {new Date().getFullYear()} MARS Valvenok All rights reserved.
          </Typography>

          {/* Google "Preferred sources" button. publisher.js (loaded in app/layout.tsx) injects the button
              into this div by its `google-add-preferred-source-btn` attribute. Plain <div>, NOT MUI <Box>:
              Box filters props through Emotion's is-prop-valid, which would strip this non-standard
              attribute. Attribute spread in (not in React's typed div props); suppressHydrationWarning
              because Google's async script may populate this node around hydration. */}
          <div suppressHydrationWarning {...({ "google-add-preferred-source-btn": "", "data-theme": "dark" } as Record<string, string>)} />
        </Box>
      </Box>
    </Box>
  );
}

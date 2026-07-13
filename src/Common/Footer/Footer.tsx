"use client";

import { Box, Typography, IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const FOOTER_COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "MARS® Brand", href: "#" },
      { label: "Certificate", href: "#" },
      { label: "News", href: "#" },
    ],
  },
  {
    heading: "Products",
    links: [
      { label: "Fire-Safe Ball Valve", href: "#" },
      { label: "High-Pressure Ball Valve", href: "#" },
      { label: "Flanged Ball Valve", href: "#" },
      { label: "Gate Valve", href: "#" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Delivery Information", href: "/delivery-information" },
      { label: "Download", href: "#" },
      { label: "E-catalog", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <Box
      component="footer"
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
                alt="MARS Valve UK logo"
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
              MARS Valve UK
            </Typography>
          </Box>

          <Typography
            sx={{ fontSize: "0.85rem", lineHeight: 1.7, mb: 3, maxWidth: 320 }}
          >
            API 607 fire-safe certified ball valves, gate valves, and process
            valves — engineered and certified to one standard, every time.
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
              <Typography sx={{ fontSize: "0.85rem" }}>
                sales@marsvalveuk.com
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
                +44 7368 1379917
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
              <Typography sx={{ fontSize: "0.85rem" }}>
                United Kingdom
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
                  sx={{
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.65)",
                    textDecoration: "none",
                    "&:hover": { color: "primary.light" },
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
            © {new Date().getFullYear()} MARS Valve UK. All rights reserved.
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              component={Link}
              href="#"
              size="small"
              sx={{
                color: "rgba(255,255,255,0.6)",
                "&:hover": { color: "primary.light" },
              }}
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>
            <IconButton
              component={Link}
              href="#"
              size="small"
              sx={{
                color: "rgba(255,255,255,0.6)",
                "&:hover": { color: "primary.light" },
              }}
            >
              <FacebookIcon fontSize="small" />
            </IconButton>
            <IconButton
              component={Link}
              href="#"
              size="small"
              sx={{
                color: "rgba(255,255,255,0.6)",
                "&:hover": { color: "primary.light" },
              }}
            >
              <XIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

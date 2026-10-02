"use client";

import { Box, Container } from "@mui/material";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

const PHONE = "+44 7368 137917";
const EMAIL = "sales@marsvalvenok.com";
const CATALOGUE = "https://pblol2.blob.core.windows.net/mars-valves/catalogs/mars-e-catalog.pdf";

/**
 * Thin red utility bar above the header (modelled on marsselect.co.uk): a
 * quick way to call or email, plus the e-catalogue download (moved here from
 * the header, which had it twice). Scrolls away; the header
 * below stays sticky.
 */
export default function TopBar() {
  const linkSx = {
    display: "inline-flex",
    alignItems: "center",
    gap: 0.75,
    color: "#fff",
    textDecoration: "none",
    fontSize: { xs: "0.72rem", sm: "0.78rem" },
    whiteSpace: "nowrap",
    fontWeight: 500,
    "&:hover": { textDecoration: "underline" },
  } as const;

  return (
    <Box sx={{ bgcolor: "primary.main", color: "#fff" }}>
      <Container
        maxWidth="xl"
        // Phones: phone + email centred on one line. Desktop: contact left,
        // catalogue right.
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: "center",
          gap: 2,
          py: 0.75,
        }}
      >
        {/* Left: call or email. Right: the e-catalogue download. */}
        <Box sx={{ display: "flex", gap: { xs: 2.5, md: 3 } }}>
          <Box component="a" href={`tel:${PHONE.replace(/\s/g, "")}`} sx={linkSx}>
            <PhoneOutlinedIcon sx={{ fontSize: 16 }} />
            {PHONE}
          </Box>
          <Box component="a" href={`mailto:${EMAIL}`} sx={linkSx}>
            <EmailOutlinedIcon sx={{ fontSize: 16 }} />
            {EMAIL}
          </Box>
        </Box>
        <Box
          component="a"
          href={CATALOGUE}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ ...linkSx, display: { xs: "none", md: "inline-flex" }, fontWeight: 700 }}
        >
          <FileDownloadOutlinedIcon sx={{ fontSize: 16 }} />
          Download E-Catalogue (PDF)
        </Box>
      </Container>
    </Box>
  );
}

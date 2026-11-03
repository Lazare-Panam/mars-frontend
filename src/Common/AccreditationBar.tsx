import Image from "next/image";
import { Box, Typography } from "@mui/material";
import Reveal from "@/Common/Reveal";
import { JOSCAR_CERT, JOSCAR_LOGO } from "@/lib/joscar";
import { LETTER_OF_AUTHORISATION_URL } from "@/lib/links";

// Accreditation logo bar (Certifications page). Only logos we hold the right
// to show; add more (e.g. BVAA) here when they're in place.
const LETTER = LETTER_OF_AUTHORISATION_URL;
const ACCREDITATIONS = [
  { src: "https://pblol2.blob.core.windows.net/mars-valves/logo.jpg", alt: "MARS Valve logo", caption: "Authorised MARS distributor", href: LETTER, w: 130, h: 130 },
  { src: JOSCAR_LOGO, alt: "JOSCAR registered logo", caption: "View JOSCAR certificate", href: JOSCAR_CERT, w: 160, h: 130 },
];

export default function AccreditationBar() {
  return (
      <Reveal>
        <Box
          sx={{
            position: "relative",
            maxWidth: "1280px",
            mx: "auto",
            px: { xs: 3, md: 8 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            {ACCREDITATIONS.map((a, i) => (
              <Box
                key={a.alt}
                component="a"
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={a.caption}
                sx={{
                  flex: { sm: "0 1 320px" },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1.5,
                  py: 2,
                  px: 4,
                  textDecoration: "none",
                  borderLeft: { sm: i === 0 ? "none" : "1px solid rgba(0,0,0,0.1)" },
                  borderTop: { xs: i === 0 ? "none" : "1px solid rgba(0,0,0,0.1)", sm: "none" },
                  "& img": { transition: "transform 0.25s ease" },
                  "&:hover img": { transform: "scale(1.05)" },
                  "&:hover .acc-caption": { color: "primary.main" },
                }}
              >
                <Box sx={{ position: "relative", width: a.w, height: a.h }}>
                  <Image src={a.src} alt={a.alt} fill sizes={`${a.w}px`} style={{ objectFit: "contain" }} />
                </Box>
                <Typography
                  className="acc-caption"
                  sx={{ fontSize: "0.78rem", fontWeight: 600, color: "text.secondary", transition: "color 0.2s ease" }}
                >
                  {a.caption}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Reveal>
  );
}

"use client";

import { Box, Container, Typography, Divider, useTheme } from "@mui/material";
import Image from "next/image";
import VerifiedIcon from "@mui/icons-material/Verified";
import Reveal from "@/Common/Reveal";
import CtaBand from "@/Common/CtaBand";

export default function MarsBrandPage() {
  const theme = useTheme();
  const INK = theme.palette.text.primary;
  const RUST = theme.palette.text.secondary;
  const PAPER = theme.palette.background.default;
  const ACCENT = theme.palette.primary.main;
  const LINE = theme.palette.divider;

  return (
    <Box sx={{ bgcolor: PAPER }}>
      {/* HERO */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 420, md: 560 },
          overflow: "hidden",
        }}
      >
        <Image
          src="https://pblol2.blob.core.windows.net/mars-valves/Hero/mars-hero-3.jpg"
          alt="Kronox ball valve"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(15,15,15,0.35) 0%, rgba(15,15,15,0.75) 100%)",
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            pb: { xs: 5, md: 8 },
          }}
        >
          <Reveal>
            <Typography
              sx={{
                color: "#fff",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                mb: 2,
                opacity: 0.85,
              }}
            >
              The Kronox Brand
            </Typography>

            <Typography
              component="h1"
              sx={{
                color: "#fff",
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontWeight: 700,
                fontSize: { xs: "2.4rem", md: "4rem" },
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                maxWidth: 820,
              }}
            >
              Kronox valves: genuine, documented, UK-stocked
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.82)",
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                mt: 2.5,
                maxWidth: 600,
                lineHeight: 1.6,
              }}
            >
              Kronox Valves is the industrial ball valve brand of Valvenok Ltd.
              We manufacture genuine Kronox product, supplied from UK stock with
              full documentation — not an imitation.
            </Typography>
          </Reveal>
        </Container>
      </Box>

      <Divider sx={{ borderColor: LINE }} />

      {/* INTRO — own-brand positioning */}
      <Container maxWidth="md" sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 2, md: 4 } }}>
        <Reveal>
          <Typography
            component="h2"
            sx={{
              color: INK,
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontWeight: 700,
              fontSize: { xs: "1.6rem", md: "2rem" },
              mb: 2.5,
            }}
          >
            Genuine Kronox ball valves
          </Typography>
          <Typography sx={{ color: RUST, fontSize: { xs: "1rem", md: "1.05rem" }, lineHeight: 1.85, mb: 2 }}>
            Kronox Valves manufactures genuine Kronox ball valves — two-piece,
            three-piece, flanged, multi-port, sanitary, fire-safe and
            high-pressure ranges — held in UK stock and backed by full
            certification and traceability. Every valve we ship is an authentic
            Kronox product.
          </Typography>
          <Typography sx={{ color: RUST, fontSize: { xs: "1rem", md: "1.05rem" }, lineHeight: 1.85 }}>
            The notice below explains how to tell a genuine Kronox valve from a
            copy, and why it matters.
          </Typography>
        </Reveal>
      </Container>

      {/* THE STATEMENT */}
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
        <Reveal>
        <Box
          sx={{
            border: `1px solid ${LINE}`,
            bgcolor: theme.palette.background.paper,
            px: { xs: 3, md: 8 },
            py: { xs: 5, md: 7 },
            position: "relative",
            transition:
              "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              borderColor: "primary.main",
              transform: "translateY(-4px)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            },
            "&:hover .brand-icon": {
              transform: "scale(1.1) rotate(-6deg)",
            },
          }}
        >
          {/* corner mark, top-left */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 32,
              height: 32,
              borderTop: `3px solid ${ACCENT}`,
              borderLeft: `3px solid ${ACCENT}`,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 32,
              height: 32,
              borderBottom: `3px solid ${ACCENT}`,
              borderRight: `3px solid ${ACCENT}`,
            }}
          />

          <Typography
            sx={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: ACCENT,
              mb: 4,
            }}
          >
            To Whom It May Concern
          </Typography>

          <Typography
            sx={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: { xs: "1rem", md: "1.1rem" },
              lineHeight: 1.9,
              color: INK,
              mb: 3,
            }}
          >
            Some companies may claim that their ball valves are identical to
            Kronox
            <Box component="sup" sx={{ fontSize: "0.6em" }}>
              ®
            </Box>
            . They are not. Any claim that ball valves made by a third party are
            identical to Kronox
            <Box component="sup" sx={{ fontSize: "0.6em" }}>
              ®
            </Box>{" "}
            ball valves is false, and constitutes a misrepresentation of origin,
            design and performance.
          </Typography>

          <Typography
            sx={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: { xs: "1rem", md: "1.1rem" },
              lineHeight: 1.9,
              color: INK,
              mb: 3,
            }}
          >
            Kronox
            <Box component="sup" sx={{ fontSize: "0.6em" }}>
              ®
            </Box>{" "}
            ball valves are built to a proprietary specification under strict
            quality control. These elements define the true value of the brand —
            and cannot be replicated. Kronox
            <Box component="sup" sx={{ fontSize: "0.6em" }}>
              ®
            </Box>{" "}
            reserves all rights to protect its brand, its intellectual property,
            and its market reputation.
          </Typography>

          <Typography
            sx={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: { xs: "1rem", md: "1.1rem" },
              lineHeight: 1.9,
              color: INK,
              mb: 3,
            }}
          >
            Only products bearing the official Kronox
            <Box component="sup" sx={{ fontSize: "0.6em" }}>
              ®
            </Box>{" "}
            logo are genuine. Products that do not carry the logo are not
            authorised, not authentic, and do not represent Kronox
            <Box component="sup" sx={{ fontSize: "0.6em" }}>
              ®
            </Box>{" "}
            quality, origin, or performance. Any misleading representation of
            equivalence constitutes a violation of brand rights.
          </Typography>

          <Box
            sx={{
              borderTop: `1px solid ${LINE}`,
              pt: 4,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <VerifiedIcon
              className="brand-icon"
              sx={{
                color: ACCENT,
                fontSize: 22,
                transition: "transform 0.25s ease",
              }}
            />
            <Typography
              sx={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontStyle: "italic",
                fontSize: "1.05rem",
                color: INK,
              }}
            >
              Imitation can copy the valve. It can never copy the soul behind
              it.
            </Typography>
          </Box>
        </Box>
        </Reveal>
      </Container>

      <Divider sx={{ borderColor: LINE }} />

      {/* REPORT COUNTERFEIT CTA */}
      <CtaBand
        title="Seen a counterfeit Kronox valve?"
        text="We actively investigate and act against unauthorised use of the Kronox name and mark. Send us the details and photos."
        primary={{ label: "Report a Counterfeit", href: "mailto:sales@marsvalvenok.com", external: true }}
        secondary={{ label: "Contact Us", href: "/contact#enquiry" }}
      />
    </Box>
  );
}

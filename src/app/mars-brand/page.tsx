"use client";

import { Box, Container, Typography, Divider, useTheme } from "@mui/material";
import Image from "next/image";
import VerifiedIcon from "@mui/icons-material/Verified";
import Reveal from "@/Common/Reveal";
import CtaBand from "@/Common/CtaBand";
import { LETTER_OF_AUTHORISATION_URL } from "@/lib/links";

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
          alt="MARS® ball valve"
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
              Authorised UK MARS® Distributor
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
              MARS valves: your authorised UK distributor
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
              Mars Valvenok (Valvenok Ltd) is an authorised distributor of
              genuine MARS® ball valves in the UK — supplied with a letter of
              authorisation, not an imitation.
            </Typography>
          </Reveal>
        </Container>
      </Box>

      <Divider sx={{ borderColor: LINE }} />

      {/* INTRO — authorised distributor positioning */}
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
            An authorised MARS® valves distributor in the UK
          </Typography>
          <Typography sx={{ color: RUST, fontSize: { xs: "1rem", md: "1.05rem" }, lineHeight: 1.85, mb: 2 }}>
            Mars Valvenok supplies genuine MARS® ball valves — two-piece,
            three-piece, flanged, multi-port, sanitary, fire-safe and
            high-pressure ranges — direct from Mars Valve Co., Ltd. of Taiwan,
            under a formal letter of authorisation. As an authorised UK
            distributor, every valve we ship is an authentic MARS® product, held
            in UK stock and backed by full certification and traceability.
          </Typography>
          <Typography sx={{ color: RUST, fontSize: { xs: "1rem", md: "1.05rem" }, lineHeight: 1.85 }}>
            The notice below explains how to tell a genuine MARS® valve from a
            copy, and why buying from an authorised distributor matters.
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
            MARS
            <Box component="sup" sx={{ fontSize: "0.6em" }}>
              ®
            </Box>
            . They are not. Any claim that ball valves manufactured by a third
            party are identical to MARS
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
            MARS
            <Box component="sup" sx={{ fontSize: "0.6em" }}>
              ®
            </Box>{" "}
            ball valves are designed, engineered and manufactured under
            proprietary specification, strict quality control systems, and
            decades of proven application expertise. These elements define the
            true value of the brand — and cannot be replicated. MARS
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
            Only products bearing the official MARS
            <Box component="sup" sx={{ fontSize: "0.6em" }}>
              ®
            </Box>{" "}
            logo are genuine. Products that do not carry the logo are not
            authorized, not authentic, and do not represent MARS
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

      {/* LEADERSHIP / PARTNERSHIP */}
      <Box sx={{ bgcolor: PAPER, py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Reveal>
            <Typography
              sx={{
                color: RUST,
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textAlign: "center",
                mb: 1.5,
              }}
            >
              A Partnership Built on Trust
            </Typography>
            <Typography
              component="h2"
              sx={{
                color: INK,
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontWeight: 700,
                fontSize: { xs: "1.6rem", md: "2rem" },
                textAlign: "center",
                mb: { xs: 5, md: 7 },
              }}
            >
              Valvenok &amp; MARS
            </Typography>
          </Reveal>

          <Reveal delay={150}>
            <Box
              sx={{
                position: "relative",
                maxWidth: 620,
                mx: "auto",
                border: `1px solid ${LINE}`,
                p: { xs: 1.5, md: 2 },
                bgcolor: theme.palette.background.paper,
                transition:
                  "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  borderColor: "primary.main",
                  transform: "translateY(-4px)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                },
                "&:hover .brand-photo": {
                  transform: "scale(1.06)",
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4/3",
                  overflow: "hidden",
                }}
              >
                <Image
                  src="https://pblol2.blob.core.windows.net/mars-valves/Hero/max-lazare.jpg"
                  alt="Lazare Kassi, CEO of Valvenok Ltd, and Max Hsu, co-founder of MARS®"
                  fill
                  className="brand-photo"
                  style={{ objectFit: "contain", transition: "transform 0.5s ease" }}
                />
              </Box>

              <Typography
                sx={{
                  color: RUST,
                  fontSize: "0.8rem",
                  textAlign: "center",
                  mt: 2,
                  pb: 1,
                }}
              >
                Lazare Kassi, CEO of Valvenok Ltd, and Max Hsu, co-founder of
                MARS®, representing the agreement between our companies.
              </Typography>
            </Box>
          </Reveal>
        </Container>
      </Box>

      <Divider sx={{ borderColor: LINE }} />

      {/* CERTIFICATE */}
      <Box sx={{ bgcolor: PAPER, py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Reveal>
            <Typography
              sx={{
                color: RUST,
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textAlign: "center",
                mb: 1.5,
              }}
            >
              Official Trust Certificate
            </Typography>
            <Typography
              component="h2"
              sx={{
                color: INK,
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontWeight: 700,
                fontSize: { xs: "1.6rem", md: "2rem" },
                textAlign: "center",
                mb: { xs: 5, md: 7 },
              }}
            >
              Verified. Authorized. Genuine.
            </Typography>
          </Reveal>

          <Reveal delay={150}>
          <Box
            sx={{
              position: "relative",
              maxWidth: 620,
              mx: "auto",
              border: `1px solid ${LINE}`,
              p: { xs: 1.5, md: 2 },
              bgcolor: theme.palette.background.paper,
              transition:
                "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                borderColor: "primary.main",
                transform: "translateY(-4px)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              },
              "&:hover .brand-photo": {
                transform: "scale(1.06)",
              },
            }}
          >
            {/* rotated stamp */}
            <Box
              sx={{
                position: "absolute",
                top: { xs: 12, md: 24 },
                right: { xs: 12, md: 24 },
                zIndex: 2,
                transform: "rotate(-14deg)",
                border: `2.5px solid ${ACCENT}`,
                color: ACCENT,
                borderRadius: "50%",
                width: { xs: 66, md: 88 },
                height: { xs: 66, md: 88 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontWeight: 800,
                fontSize: { xs: "0.55rem", md: "0.65rem" },
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                bgcolor: PAPER,
                lineHeight: 1.2,
                px: 1,
              }}
            >
              Genuine
              <br />
              MARS®
            </Box>

            <Box
              sx={{
                position: "relative",
                width: "100%",
                aspectRatio: "4/3",
                overflow: "hidden",
              }}
            >
              <Image
                src={LETTER_OF_AUTHORISATION_URL}
                alt="MARS® official trust certificate"
                fill
                className="brand-photo"
                style={{ objectFit: "contain", transition: "transform 0.5s ease" }}
              />
            </Box>

            <Typography
              sx={{
                color: RUST,
                fontSize: "0.8rem",
                textAlign: "center",
                mt: 2,
                pb: 1,
              }}
            >
              Our official authorization to sell genuine MARS
              <Box component="sup" sx={{ fontSize: "0.6em" }}>
                ®
              </Box>{" "}
              ball valves.
            </Typography>
          </Box>
          </Reveal>
        </Container>
      </Box>

      <Divider sx={{ borderColor: LINE }} />

      {/* REPORT COUNTERFEIT CTA */}
      <CtaBand
        title="Seen a counterfeit MARS® valve?"
        text="We actively investigate and act against unauthorised use of the MARS® name and mark. Send us the details and photos."
        primary={{ label: "Report a Counterfeit", href: "mailto:sales@marsvalvenok.com", external: true }}
        secondary={{ label: "Contact Us", href: "/contact#enquiry" }}
      />
    </Box>
  );
}

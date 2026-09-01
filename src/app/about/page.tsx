"use client";

import {
  Box,
  Container,
  Typography,
  Divider,
  Grid,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import Reveal from "@/Common/Reveal";
import MagneticWrap from "@/Common/MagneticWrap";

const VALUES = [
  {
    icon: EngineeringOutlinedIcon,
    title: "Spec-Driven",
    body: "Every valve is selected, tested, and documented against the actual operating conditions of the application — pressure, media, temperature, cycle life.",
  },
  {
    icon: VerifiedIcon,
    title: "Proprietary Manufacturing",
    body: "MARS® ball valves are designed and quality-controlled in-house by MarsValvenok, built to a specification we own — not a relabeled catalog product.",
  },
  {
    icon: HandshakeOutlinedIcon,
    title: "Direct Supply Chain",
    body: "No re-sellers between design and delivery. We control the specification, the QC process, and the documentation from source to shipment.",
  },
  {
    icon: PublicOutlinedIcon,
    title: "Field-Proven",
    body: "Deployed across oil & gas, water treatment, chemical processing, and power generation — environments with no tolerance for valve failure.",
  },
];

export default function AboutUsPage() {
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
          alt="MarsValvenok engineering and manufacturing"
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
              About Us
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
                maxWidth: 780,
              }}
            >
              Valves Specified,
              <br />
              Tested, Verified.
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.82)",
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                mt: 2.5,
                maxWidth: 560,
                lineHeight: 1.6,
              }}
            >
              MarsValvenok supplies ball valves manufactured, quality-controlled,
              and documented to the standards industrial systems require.
            </Typography>
          </Reveal>
        </Container>
      </Box>

      <Divider sx={{ borderColor: LINE }} />

      {/* OUR STORY */}
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
        <Reveal>
        <Box
          sx={{
            border: `1px solid ${LINE}`,
            bgcolor: theme.palette.background.paper,
            px: { xs: 3, md: 8 },
            py: { xs: 5, md: 7 },
            position: "relative",
            transition: "box-shadow 0.3s ease",
            "&:hover": { boxShadow: "0 20px 48px rgba(0,0,0,0.08)" },
          }}
        >
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
            Our Story
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
            MarsValvenok supplies ball valves for oil & gas, water treatment,
            chemical processing, and power generation — systems where a
            component has to perform exactly as specified, every cycle. We
            work directly with manufacturers, hold a strict chain of custody on
            every product line, and back each valve with documentation our
            customers can verify against the actual spec, not a sales sheet.
          </Typography>

          <Typography
            sx={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: { xs: "1rem", md: "1.1rem" },
              lineHeight: 1.9,
              color: INK,
              mb: 0,
            }}
          >
            That standard is built into MARS
            <Box component="sup" sx={{ fontSize: "0.6em" }}>
              ®
            </Box>
            , our own ball valve brand — designed, quality-controlled, and
            manufactured in-house by MarsValvenok.
          </Typography>
        </Box>
        </Reveal>
      </Container>

      <Divider sx={{ borderColor: LINE }} />

      {/* VALUES GRID */}
      <Box sx={{ bgcolor: PAPER, py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
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
              What Drives Us
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
              Our Values
            </Typography>
          </Reveal>

          <Grid container spacing={3}>
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              return (
                <Grid size={{ xs: 12, sm: 6 }} key={value.title}>
                  <Reveal delay={i * 100}>
                    <Box
                      sx={{
                        height: "100%",
                        border: `1px solid ${LINE}`,
                        bgcolor: theme.palette.background.paper,
                        p: { xs: 3, md: 4 },
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        transition: "border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
                        "&:hover": {
                          borderColor: ACCENT,
                          transform: "translateY(-4px)",
                          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                        },
                        "&:hover .value-icon": { transform: "scale(1.1) rotate(-6deg)" },
                      }}
                    >
                      <Icon
                        className="value-icon"
                        sx={{ color: ACCENT, fontSize: 30, transition: "transform 0.25s ease", width: "fit-content" }}
                      />
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: "1.05rem",
                          color: INK,
                        }}
                      >
                        {value.title}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "0.92rem", color: RUST, lineHeight: 1.7 }}
                      >
                        {value.body}
                      </Typography>
                    </Box>
                  </Reveal>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      <Divider sx={{ borderColor: LINE }} />

      {/* BRAND HERITAGE */}
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
              Our Brand
            </Typography>
            <Typography
              component="h2"
              sx={{
                color: INK,
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontWeight: 700,
                fontSize: { xs: "1.6rem", md: "2rem" },
                textAlign: "center",
                mb: { xs: 3, md: 4 },
              }}
            >
              The Home of MARS
              <Box component="sup" sx={{ fontSize: "0.55em" }}>
                ®
              </Box>
            </Typography>

            <Typography
              sx={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: { xs: "1rem", md: "1.1rem" },
                lineHeight: 1.9,
                color: INK,
                textAlign: "center",
                maxWidth: 640,
                mx: "auto",
              }}
            >
              MARS
              <Box component="sup" sx={{ fontSize: "0.6em" }}>
                ®
              </Box>{" "}
              is MarsValvenok's own ball valve brand — designed and
              quality-controlled in-house, sold only through us and our
              authorized distributors. When you buy MARS
              <Box component="sup" sx={{ fontSize: "0.6em" }}>
                ®
              </Box>
              , you're buying directly from the people who engineered it.
            </Typography>
          </Reveal>
        </Container>
      </Box>

      <Divider sx={{ borderColor: LINE }} />

      {/* MANUFACTURING / CAPABILITY STRIP */}
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 10 } }}>
        <Reveal>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: 3,
            border: `1px solid ${LINE}`,
            px: { xs: 3, md: 5 },
            py: { xs: 4, md: 5 },
            transition: "border-color 0.25s ease, box-shadow 0.25s ease",
            "&:hover": { borderColor: ACCENT, boxShadow: "0 16px 36px rgba(0,0,0,0.08)" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
            <PrecisionManufacturingOutlinedIcon
              sx={{ color: ACCENT, fontSize: 30, mt: 0.5 }}
            />
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  color: INK,
                  mb: 0.5,
                }}
              >
                Want to work with us?
              </Typography>
              <Typography
                sx={{ fontSize: "0.9rem", color: RUST, maxWidth: 440 }}
              >
                Reach out to our technical sales team to discuss specifications,
                lead times, or authorized distribution.
              </Typography>
            </Box>
          </Box>

          <MagneticWrap strength={0.2}>
            <Box
              component={Link}
              href="/contact"
              sx={{
                flexShrink: 0,
                display: "inline-block",
                textDecoration: "none",
                border: `1.5px solid ${ACCENT}`,
                color: ACCENT,
                fontWeight: 700,
                fontSize: "0.78rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                px: 3,
                py: 1.5,
                transition: "all 0.15s ease",
                whiteSpace: "nowrap",
                "&:hover": {
                  bgcolor: ACCENT,
                  color: theme.palette.primary.contrastText,
                },
              }}
            >
              Contact Sales
            </Box>
          </MagneticWrap>
        </Box>
        </Reveal>
      </Container>
    </Box>
  );
}

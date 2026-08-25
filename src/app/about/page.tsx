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

const VALUES = [
  {
    icon: EngineeringOutlinedIcon,
    title: "Engineering Integrity",
    body: "Every valve we supply is specified, tested, and documented to the standard the application actually demands — not the standard that's cheapest to claim.",
  },
  {
    icon: VerifiedIcon,
    title: "Genuine, Always",
    body: "Every MARS® valve is our own — designed, quality-controlled, and manufactured to a proprietary specification, and carrying the official mark to prove it.",
  },
  {
    icon: HandshakeOutlinedIcon,
    title: "Long-Term Partnerships",
    body: "Our relationships with manufacturers and customers are built to last years, not one order. That's what lets us stand behind what we sell.",
  },
  {
    icon: PublicOutlinedIcon,
    title: "Built for the Field",
    body: "Oil & gas, water treatment, chemical processing, power — our valves are chosen by engineers who can't afford a failure in the field.",
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
          alt="Valvenok engineering and manufacturing"
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
            Engineered Trust,
            <br />
            Delivered Every Day.
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
            We supply genuine, authorized valve solutions to industries that
            cannot afford to compromise on quality.
          </Typography>
        </Container>
      </Box>

      <Divider sx={{ borderColor: LINE }} />

      {/* OUR STORY */}
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
        <Box
          sx={{
            border: `1px solid ${LINE}`,
            bgcolor: theme.palette.background.paper,
            px: { xs: 3, md: 8 },
            py: { xs: 5, md: 7 },
            position: "relative",
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
            MarsValvenok was founded on a simple premise: the industries we
            serve — oil & gas, water treatment, chemical processing, power
            generation — depend on components that perform exactly as specified,
            every single time. A valve that fails quietly in the field is never
            just an inconvenience. It's a safety risk, a production loss, and a
            broken promise to the people relying on it.
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
            That premise shaped everything about how we operate. We work
            directly with authorized manufacturers, maintain strict chain-of
            custody on every product line we carry, and back what we sell with
            documentation our customers can actually verify — not just a promise
            on a spec sheet.
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
            Today, that same standard lives on in MARS
            <Box component="sup" sx={{ fontSize: "0.6em" }}>
              ®
            </Box>
            , our own ball valve brand — engineered, quality-controlled, and
            backed by Valvenok Ltd, and the clearest expression of the standard
            we hold ourselves to.
          </Typography>
        </Box>
      </Container>

      <Divider sx={{ borderColor: LINE }} />

      {/* VALUES GRID */}
      <Box sx={{ bgcolor: PAPER, py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
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

          <Grid container spacing={3}>
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <Grid size={{ xs: 12, sm: 6 }} key={value.title}>
                  <Box
                    sx={{
                      height: "100%",
                      border: `1px solid ${LINE}`,
                      bgcolor: theme.palette.background.paper,
                      p: { xs: 3, md: 4 },
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Icon sx={{ color: ACCENT, fontSize: 30 }} />
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
            is Valvenok's own ball valve brand — designed and quality controlled
            in-house, and sold only through us and our authorized distributors.
            When you buy MARS
            <Box component="sup" sx={{ fontSize: "0.6em" }}>
              ®
            </Box>
            , you're buying directly from the people who engineered it.
          </Typography>
        </Container>
      </Box>

      <Divider sx={{ borderColor: LINE }} />

      {/* MANUFACTURING / CAPABILITY STRIP */}
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 10 } }}>
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

          <Box
            component={Link}
            href="/contact"
            sx={{
              flexShrink: 0,
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
        </Box>
      </Container>
    </Box>
  );
}

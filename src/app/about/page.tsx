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
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import Reveal from "@/Common/Reveal";
import CtaBand from "@/Common/CtaBand";

const VALUES = [
  {
    icon: VerifiedIcon,
    title: "Genuine Kronox Product",
    body: "Every Kronox valve we supply is genuine, with full documentation and a Kronox warranty.",
  },
  {
    icon: HandshakeOutlinedIcon,
    title: "UK Stock",
    body: "We hold Kronox valves in UK stock and supply certificates and datasheets for the series you order.",
  },
  {
    icon: EngineeringOutlinedIcon,
    title: "Technical Help",
    body: "We help you choose the right series, body and seat material, and end connection for your pressure, temperature and media.",
  },
  {
    icon: SellOutlinedIcon,
    title: "Prices Online",
    body: "Prices for standard items are published online, so you can compare before you enquire. We quote for project and non-standard orders.",
  },
];

// Who's who: the names people confuse.
const ENTITIES = [
  {
    role: "The company",
    name: "Valvenok Ltd",
    detail: "The UK company behind the Kronox Valves brand.",
  },
  {
    role: "The brand",
    name: "Kronox Valves",
    detail: "The ball valve range we design and manufacture: specifications, prices, datasheets and quotes.",
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
          alt="Kronox industrial ball valves supplied by Kronox Valves"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(74,18,6,0.35) 0%, rgba(74,18,6,0.75) 100%)",
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
              About Kronox Valves
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
              Genuine Kronox
              <Box component="sup" sx={{ fontSize: "0.45em" }}>
                ®
              </Box>{" "}
              ball valves,
              <br />
              UK stock &amp; delivery
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
              Kronox Valves designs and manufactures industrial ball valves —
              the Kronox brand of Valvenok Ltd — supplied from UK stock across
              the United Kingdom.
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
            Kronox Valves is the industrial ball valve brand of Valvenok Ltd. We
            design and manufacture the Kronox range, and this website is where we
            publish it: specifications, prices for standard items, datasheets and
            quotes.
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
            That standard starts with Kronox
            <Box component="sup" sx={{ fontSize: "0.6em" }}>
              ®
            </Box>{" "}
            — our own industrial ball valve range, designed and manufactured to
            recognised international standards. We supply genuine Kronox valves
            from UK stock with full documentation and a manufacturer&apos;s
            warranty.
          </Typography>

          <Box
            component="dl"
            sx={{
              mt: 5,
              mb: 0,
              borderTop: `1px solid ${LINE}`,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "180px 1fr" },
            }}
          >
            {ENTITIES.map((entity) => (
              <Box key={entity.role} sx={{ display: "contents" }}>
                <Typography
                  component="dt"
                  sx={{
                    pt: 2.5,
                    pb: { xs: 0, sm: 2.5 },
                    borderBottom: { xs: "none", sm: `1px solid ${LINE}` },
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: ACCENT,
                  }}
                >
                  {entity.role}
                </Typography>
                <Box
                  component="dd"
                  sx={{ m: 0, pt: { xs: 0.5, sm: 2.5 }, pb: 2.5, borderBottom: `1px solid ${LINE}` }}
                >
                  <Typography sx={{ fontWeight: 700, color: INK }}>{entity.name}</Typography>
                  <Typography sx={{ color: RUST, fontSize: "0.95rem", lineHeight: 1.6 }}>
                    {entity.detail}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
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
              The Home of Kronox
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
              Kronox
              <Box component="sup" sx={{ fontSize: "0.6em" }}>
                ®
              </Box>{" "}
              is our own industrial ball valve range, designed and manufactured
              to recognised international standards. When you buy Kronox
              <Box component="sup" sx={{ fontSize: "0.6em" }}>
                ®
              </Box>{" "}
              from us you get genuine Kronox valves from UK stock with full
              documentation and a manufacturer&apos;s warranty. For help choosing
              a series,{" "}
              <Link href="/contact" style={{ color: ACCENT }}>
                get in touch with our team
              </Link>
              .
            </Typography>
          </Reveal>
        </Container>
      </Box>

      <Divider sx={{ borderColor: LINE }} />

      <CtaBand
        title="Want to work with us?"
        text="Reach out to our technical sales team to discuss specifications, lead times or a quote for your project."
        primary={{ label: "Contact Sales", href: "/contact#enquiry" }}
        secondary={{ label: "Browse Products", href: "/products" }}
      />
    </Box>
  );
}

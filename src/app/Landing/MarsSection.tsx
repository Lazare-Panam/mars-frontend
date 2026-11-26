"use client";

import { Box, Typography } from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import Reveal from "@/Common/Reveal";
import { KRONOX } from "@/theme/brand";

// "Who we are" + "Why buy from us?". Left: the statement and a title block in
// the same style as the hero drawing. Right: the reasons as four cards with a
// red corner slash (the cut from the logo's X).

const REASONS = [
  {
    icon: <Inventory2OutlinedIcon />,
    title: "Single valves or full projects",
    text: "Order one valve for a repair or a full schedule for a new line.",
  },
  {
    icon: <SellOutlinedIcon />,
    title: "Prices shown online",
    text: "Standard items are priced on the site, so you can compare before you enquire.",
  },
  {
    icon: <DescriptionOutlinedIcon />,
    title: "Datasheets and certificates",
    text: "Supplied on request for the series you order, straight from the manufacturer.",
  },
  {
    icon: <EngineeringOutlinedIcon />,
    title: "Answers with specifications",
    text: "A team that replies with the right series, material and end connection, not just a price.",
  },
];

const mono = "ui-monospace, SFMono-Regular, Menlo, monospace";

export default function MarsSection() {
  return (
    <Box
      component="section"
      id="who-we-are"
      sx={{
        position: "relative",
        overflow: "hidden",
        py: { xs: 8, md: 12 },
        bgcolor: "#FBEBEC", // faded Kronox red, same as the page banners
      }}
    >
      {/* faint drawing grid, fading out towards the left */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(224,57,62,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(224,57,62,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "linear-gradient(90deg, transparent 0%, #000 60%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 60%)",
        }}
      />

      <Box
        sx={{
          position: "relative",
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: 3, md: 8 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "5fr 7fr" },
          gap: { xs: 6, md: 8 },
          alignItems: "center",
        }}
      >
        {/* left: statement */}
        <Reveal>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
              <Box
                aria-hidden
                sx={{ width: 28, height: 14, bgcolor: "primary.main", clipPath: "polygon(45% 0, 100% 0, 55% 100%, 0 100%)" }}
              />
              <Typography
                component="span"
                sx={{ fontFamily: mono, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", color: "primary.main", textTransform: "uppercase" }}
              >
                Who we are
              </Typography>
            </Box>

            <Typography
              component="h2"
              className="no-capitalize"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2rem", md: "2.75rem" },
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: KRONOX.text,
                mb: 3,
              }}
            >
              The manufacturer behind every{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                Kronox
              </Box>{" "}
              valve.
            </Typography>

            <Typography sx={{ color: "text.secondary", fontSize: "1.05rem", lineHeight: 1.75, mb: 2 }}>
              Kronox Valves is a{" "}
              <Box component="span" sx={{ fontWeight: 700, color: "text.primary" }}>
                manufacturer of industrial ball valves
              </Box>
              , the Kronox brand of Valvenok Ltd.
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: "1.05rem", lineHeight: 1.75, mb: 4 }}>
              We supply genuine Kronox valves with the manufacturer&apos;s
              documentation, pricing online for standard items, and technical
              help choosing the right series, material and end connection.
            </Typography>

            {/* title block, as on the hero drawing */}
            <Box
              sx={{
                display: "inline-grid",
                gridTemplateColumns: "auto auto auto",
                border: `1.5px solid ${KRONOX.steel}`,
                bgcolor: KRONOX.white,
                fontFamily: mono,
                fontSize: { xs: "0.68rem", sm: "0.75rem" },
                letterSpacing: "0.08em",
                color: KRONOX.text,
                "& > *": { px: { xs: 1.25, sm: 2 }, py: 1.1, whiteSpace: "nowrap" },
                "& > * + *": { borderLeft: `1px solid ${KRONOX.steel}` },
              }}
            >
              <Box sx={{ bgcolor: "primary.main", color: "#fff", fontWeight: 800 }}>KRONOX</Box>
              <Box sx={{ fontWeight: 700 }}>VALVENOK LTD</Box>
              <Box>BICESTER · UK</Box>
            </Box>
          </Box>
        </Reveal>

        {/* right: why buy from us */}
        <Box>
          <Typography
            component="h3"
            sx={{ fontWeight: 800, fontSize: { xs: "1.25rem", md: "1.4rem" }, color: KRONOX.text, mb: 2.5 }}
          >
            Why buy from us?
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            {REASONS.map((r, i) => (
              <Reveal key={r.title} delay={i * 90} y={24}>
                <Box
                  sx={{
                    position: "relative",
                    height: "100%",
                    bgcolor: KRONOX.white,
                    border: `1px solid ${KRONOX.line}`,
                    borderRadius: "3px",
                    p: 3,
                    pr: 5,
                    overflow: "hidden",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: 56,
                      height: 22,
                      bgcolor: "primary.main",
                      clipPath: "polygon(40% 0, 100% 0, 100% 0, 60% 100%, 0 100%)",
                      transition: "width 0.3s ease",
                    },
                    "&:hover": {
                      transform: "translateY(-4px)",
                      borderColor: "rgba(224,57,62,0.4)",
                      boxShadow: "0 16px 32px rgba(58,61,66,0.10)",
                    },
                    "&:hover::after": { width: 88 },
                    "&:hover .reason-icon": { bgcolor: "primary.main", color: "#fff" },
                  }}
                >
                  <Box
                    className="reason-icon"
                    sx={{
                      width: 44,
                      height: 44,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: "3px",
                      bgcolor: KRONOX.redTint,
                      color: "primary.main",
                      mb: 2,
                      transition: "background-color 0.25s ease, color 0.25s ease",
                    }}
                  >
                    {r.icon}
                  </Box>
                  <Typography sx={{ fontWeight: 800, fontSize: "1.02rem", color: KRONOX.text, mb: 0.75 }}>
                    {r.title}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", fontSize: "0.9rem", lineHeight: 1.6 }}>
                    {r.text}
                  </Typography>
                </Box>
              </Reveal>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

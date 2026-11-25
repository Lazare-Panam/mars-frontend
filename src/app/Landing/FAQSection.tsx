"use client";

import { useState, type ReactElement, type ReactNode } from "react";
import Link from "next/link";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Reveal from "@/Common/Reveal";
import { KRONOX } from "@/theme/brand";

type Props = {
  faqs: { q: string; a: ReactNode; icon?: ReactElement }[];
  heading?: string;
  id?: string;
  bgcolor?: string;
};

const PHONE = "+44 7368 137917";
const mono = "ui-monospace, SFMono-Regular, Menlo, monospace";

// Picks an icon from the question's wording, so every page that uses this
// section gets icons without extra data. A question can still pass its own.
const ICON_RULES: [RegExp, ReactElement][] = [
  [/genuine|authentic/i, <VerifiedOutlinedIcon key="v" />],
  [/fire/i, <LocalFireDepartmentOutlinedIcon key="f" />],
  [/certif|document|datasheet/i, <WorkspacePremiumOutlinedIcon key="c" />],
  [/custom|non-standard|special/i, <TuneOutlinedIcon key="t" />],
  [/minimum|quantity|moq/i, <Inventory2OutlinedIcon key="i" />],
  [/ship|international|export/i, <PublicOutlinedIcon key="p" />],
  [/deliver|lead time|dispatch/i, <LocalShippingOutlinedIcon key="d" />],
  [/return|warranty/i, <AssignmentReturnOutlinedIcon key="r" />],
  [/price|cost|quote/i, <SellOutlinedIcon key="s" />],
  [/actuat|application|industr|series|material/i, <PrecisionManufacturingOutlinedIcon key="m" />],
];

function iconFor(q: string): ReactElement {
  return ICON_RULES.find(([re]) => re.test(q))?.[1] ?? <HelpOutlineOutlinedIcon />;
}

export default function FAQSection({
  faqs,
  heading = "Questions procurement teams ask",
  id,
  bgcolor = "#fff",
}: Props) {
  // First question open by default, so the section never looks like a wall
  // of closed bars.
  const [expanded, setExpanded] = useState<string | false>(faqs[0]?.q ?? false);

  return (
    <Box
      component="section"
      id={id}
      sx={{
        position: "relative",
        overflow: "hidden",
        py: { xs: 8, md: 12 },
        bgcolor,
        scrollMarginTop: 96,
      }}
    >
      {/* Big outlined "?" in the corner, in the same outline style as the
          KRONOX watermarks elsewhere on the page. */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          left: { xs: "-6vw", md: "-2vw" },
          bottom: { xs: "-8vw", md: "-6vw" },
          fontSize: { xs: "60vw", md: "34vw" },
          fontWeight: 900,
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(224,57,62,0.13)",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        ?
      </Box>

      <Box
        sx={{
          position: "relative",
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: 3, md: 8 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "4fr 7fr" },
          gap: { xs: 5, md: 8 },
          alignItems: "start",
        }}
      >
        {/* left: heading + help card (sticks while the list scrolls) */}
        <Box sx={{ position: { md: "sticky" }, top: { md: 140 } }}>
          <Reveal>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
              <Box
                aria-hidden
                sx={{ width: 28, height: 14, bgcolor: "primary.main", clipPath: "polygon(45% 0, 100% 0, 55% 100%, 0 100%)" }}
              />
              <Typography
                component="span"
                sx={{ fontFamily: mono, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", color: "primary.main" }}
              >
                FAQ
              </Typography>
            </Box>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.6rem" },
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: "text.primary",
                mb: 2,
              }}
            >
              {heading}
            </Typography>
            <Typography className="no-capitalize" sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.7, mb: 4, maxWidth: 380 }}>
              Straight answers on stock, certification and ordering. If yours
              isn&apos;t here, our team will answer it with specifications.
            </Typography>

            {/* help card */}
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "3px",
                p: 3.5,
                color: "#fff",
                background: "linear-gradient(135deg, #E0393E 0%, #C42E33 100%)",
                boxShadow: "0 18px 36px rgba(224,57,62,0.25)",
                maxWidth: 400,
              }}
            >
              <Box
                aria-hidden
                sx={{
                  position: "absolute",
                  top: 0,
                  right: -10,
                  width: 120,
                  height: "100%",
                  bgcolor: "rgba(255,255,255,0.12)",
                  clipPath: "polygon(60% 0, 100% 0, 40% 100%, 0 100%)",
                }}
              />
              <Typography sx={{ position: "relative", fontWeight: 800, fontSize: "1.2rem", mb: 0.75 }}>
                Still have a question?
              </Typography>
              <Typography className="no-capitalize" sx={{ position: "relative", fontSize: "0.9rem", opacity: 0.92, mb: 2.5, lineHeight: 1.6 }}>
                Send your size, pressure and media. We reply with the right series and a price.
              </Typography>
              <Box sx={{ position: "relative", display: "flex", gap: 1.5, flexWrap: "wrap", alignItems: "center" }}>
                <Button
                  component={Link}
                  href="/contact#enquiry"
                  variant="contained"
                  disableElevation
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    bgcolor: "#fff",
                    color: "primary.main",
                    fontWeight: 800,
                    borderRadius: "2px",
                    textTransform: "none",
                    "&:hover": { bgcolor: "#fff", transform: "translateY(-2px)" },
                    transition: "transform 0.2s ease",
                  }}
                >
                  Ask our team
                </Button>
                <Box
                  component="a"
                  href={`tel:${PHONE.replace(/\s/g, "")}`}
                  sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, color: "#fff", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                >
                  <PhoneOutlinedIcon sx={{ fontSize: 18 }} />
                  {PHONE}
                </Box>
              </Box>
            </Box>
          </Reveal>
        </Box>

        {/* right: questions */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {faqs.map((item, i) => {
            const open = expanded === item.q;
            return (
              <Reveal key={item.q} delay={Math.min(i * 60, 300)}>
                <Accordion
                  expanded={open}
                  onChange={() => setExpanded(open ? false : item.q)}
                  disableGutters
                  elevation={0}
                  square
                  sx={{
                    position: "relative",
                    bgcolor: KRONOX.white,
                    border: `1px solid ${KRONOX.line}`,
                    borderRadius: "3px !important",
                    overflow: "hidden",
                    transition: "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
                    "&:before": { display: "none" },
                    // red bar on the left edge, grows in when open
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 4,
                      bgcolor: "primary.main",
                      transform: open ? "scaleY(1)" : "scaleY(0)",
                      transformOrigin: "top",
                      transition: "transform 0.3s ease",
                    },
                    "&:hover": { borderColor: "rgba(224,57,62,0.45)", transform: "translateX(4px)" },
                    ...(open && {
                      borderColor: "rgba(224,57,62,0.45)",
                      boxShadow: "0 16px 32px rgba(58,61,66,0.09)",
                    }),
                  }}
                >
                  <AccordionSummary
                    sx={{
                      px: { xs: 2, sm: 2.5 },
                      py: 1,
                      "& .MuiAccordionSummary-content": { alignItems: "center", gap: 2, my: 0.5 },
                    }}
                  >
                    <Box
                      aria-hidden
                      sx={{
                        flexShrink: 0,
                        width: 44,
                        height: 44,
                        display: "grid",
                        placeItems: "center",
                        borderRadius: "3px",
                        bgcolor: open ? "primary.main" : KRONOX.redTint,
                        color: open ? "#fff" : "primary.main",
                        transition: "background-color 0.25s ease, color 0.25s ease",
                        "& svg": { fontSize: 22 },
                      }}
                    >
                      {item.icon ?? iconFor(item.q)}
                    </Box>
                    <Typography sx={{ flex: 1, fontWeight: 700, fontSize: { xs: "0.95rem", md: "1.02rem" }, color: "text.primary" }}>
                      {item.q}
                    </Typography>
                    <Box
                      aria-hidden
                      sx={{
                        flexShrink: 0,
                        width: 32,
                        height: 32,
                        display: "grid",
                        placeItems: "center",
                        borderRadius: "50%",
                        border: `1.5px solid ${open ? KRONOX.red : KRONOX.line}`,
                        color: open ? "#fff" : "primary.main",
                        bgcolor: open ? "primary.main" : "transparent",
                        transform: open ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease, background-color 0.25s ease, border-color 0.25s ease",
                      }}
                    >
                      <AddIcon sx={{ fontSize: 18 }} />
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: { xs: 2, sm: 2.5 }, pb: 2.75, pt: 0, pl: { xs: 2, sm: "92px" } }}>
                    <Typography component="div" className="no-capitalize" sx={{ color: "text.secondary", fontSize: "0.93rem", lineHeight: 1.75 }}>
                      {item.a}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Reveal>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

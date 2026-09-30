"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Reveal from "@/Common/Reveal";

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "Do you supply custom sizes or non-standard specs?",
    a: (
      <>
        Yes.{" "}
        <Link href="/contact" style={{ color: "inherit", fontWeight: 600 }}>
          Send us your requirements
        </Link>{" "}
        (size, pressure rating, end connection and material) and we&apos;ll work
        with Mars Valve Co. to confirm availability and pricing for non-standard
        configurations.
      </>
    ),
  },
  {
    q: "Is there a minimum order quantity?",
    a: "No minimum for standard catalog items — we supply single valves as well as full pipeline orders. Custom or non-stock configurations may carry a manufacturer MOQ, which we'll flag upfront.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship worldwide. Every order includes full documentation for customs clearance, plus certification paperwork for hazardous-area and fire-safe applications where required.",
  },
  {
    q: "What certifications come with each valve?",
    a: "Certification depends on the series — fire-safe ranges carry API 607 testing, hazardous-area actuated valves carry ATEX and SIL 3 documentation. Full manufacturer certificates are provided with every order.",
  },
  {
    q: "What's your returns and warranty policy?",
    a: "Unused valves in original packaging can be returned within 30 days. All products carry the full Mars Valve Co. manufacturer warranty — something only available through an authorised distributor.",
  },
];

export default function FAQSection() {
  const [expanded, setExpanded] = useState<string | false>(false);

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: "#fff" }}>
      <Reveal>
        <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 3, md: 8 }, mb: { xs: 5, md: 6 }, textAlign: "center" }}>
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Box sx={{ width: 32, height: 1, bgcolor: "primary.main" }} />
            <Typography
              sx={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "primary.main",
                textTransform: "uppercase",
              }}
            >
              FAQ
            </Typography>
            <Box sx={{ width: 32, height: 1, bgcolor: "primary.main" }} />
          </Box>
          <Typography
            component="h2"
            sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, fontWeight: 800, color: "text.primary" }}
          >
            Questions procurement teams actually ask.
          </Typography>
        </Box>
      </Reveal>

      <Box sx={{ maxWidth: 860, mx: "auto", px: { xs: 3, md: 8 } }}>
        {FAQS.map((item, i) => (
          <Reveal key={item.q} delay={Math.min(i * 60, 300)}>
            <Accordion
              expanded={expanded === item.q}
              onChange={() => setExpanded(expanded === item.q ? false : item.q)}
              disableGutters
              elevation={0}
              square
              sx={{
                bgcolor: "background.default",
                border: "1px solid",
                borderColor: "rgba(0,0,0,0.08)",
                borderRadius: "4px !important",
                mb: 1.5,
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                "&:before": { display: "none" },
                "&:hover": { borderColor: "primary.main", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" },
                "&.Mui-expanded": { borderColor: "primary.main" },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "primary.main" }} />}
                sx={{
                  px: 3,
                  py: 0.5,
                  transition: "background-color 0.2s ease",
                  "&:hover": { bgcolor: "rgba(231,57,15,0.03)" },
                }}
              >
                <Typography sx={{ fontWeight: 700, fontSize: "0.98rem", color: "text.primary" }}>
                  {item.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, pb: 2.5, pt: 0 }}>
                <Typography sx={{ color: "text.secondary", fontSize: "0.9rem", lineHeight: 1.7 }}>
                  {item.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Reveal>
        ))}
      </Box>
    </Box>
  );
}

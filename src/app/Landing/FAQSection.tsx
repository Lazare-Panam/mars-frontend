"use client";

import { useState, type ReactNode } from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Reveal from "@/Common/Reveal";

type Props = {
  faqs: { q: string; a: ReactNode }[];
  heading?: string;
  id?: string;
  bgcolor?: string;
};

export default function FAQSection({
  faqs,
  heading = "Questions procurement teams ask",
  id,
  bgcolor = "#fff",
}: Props) {
  const [expanded, setExpanded] = useState<string | false>(false);
  // Items sit on the opposite shade of the section so they stay visible.
  const itemBg = bgcolor === "#fff" ? "background.default" : "#fff";

  return (
    <Box component="section" id={id} sx={{ py: { xs: 8, md: 12 }, bgcolor, scrollMarginTop: 96 }}>
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
            {heading}
          </Typography>
        </Box>
      </Reveal>

      <Box sx={{ maxWidth: 860, mx: "auto", px: { xs: 3, md: 8 } }}>
        {faqs.map((item, i) => (
          <Reveal key={item.q} delay={Math.min(i * 60, 300)}>
            <Accordion
              expanded={expanded === item.q}
              onChange={() => setExpanded(expanded === item.q ? false : item.q)}
              disableGutters
              elevation={0}
              square
              sx={{
                bgcolor: itemBg,
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

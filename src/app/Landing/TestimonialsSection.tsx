"use client";

import { Box, Typography, Avatar } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Reveal from "@/Common/Reveal";

/**
 * NOT wired into page.tsx yet.
 *
 * Replace every entry below with a real customer — actual quote, name,
 * job title, and company. Do not ship placeholder/invented testimonials;
 * fabricated social proof on a commercial site is misleading to buyers.
 * Once real content is supplied, import and render <TestimonialsSection />
 * in src/app/page.tsx.
 */
const TESTIMONIALS: {
  quote: string;
  name: string;
  role: string;
  company: string;
}[] = [
  {
    quote: "REPLACE — real customer quote goes here.",
    name: "Client Name",
    role: "Job Title",
    company: "Company Name",
  },
  {
    quote: "REPLACE — real customer quote goes here.",
    name: "Client Name",
    role: "Job Title",
    company: "Company Name",
  },
  {
    quote: "REPLACE — real customer quote goes here.",
    name: "Client Name",
    role: "Job Title",
    company: "Company Name",
  },
];

export default function TestimonialsSection() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: "#fff" }}>
      <Reveal>
        <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 3, md: 8 }, mb: { xs: 5, md: 7 }, textAlign: "center" }}>
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
              Trusted By
            </Typography>
            <Box sx={{ width: 32, height: 1, bgcolor: "primary.main" }} />
          </Box>
          <Typography
            component="h2"
            sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, fontWeight: 800, color: "text.primary" }}
          >
            What our customers say.
          </Typography>
        </Box>
      </Reveal>

      <Box
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: 3, md: 8 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 3,
        }}
      >
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name + i} delay={i * 100}>
            <Box
              sx={{
                bgcolor: "background.default",
                border: "1px solid",
                borderColor: "rgba(0,0,0,0.08)",
                borderRadius: "4px",
                p: 3.5,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
                "&:hover": {
                  borderColor: "primary.main",
                  transform: "translateY(-4px)",
                  boxShadow: "0 16px 36px rgba(0,0,0,0.1)",
                },
                "&:hover .quote-icon": { transform: "scale(1.1) rotate(-6deg)" },
              }}
            >
              <FormatQuoteIcon
                className="quote-icon"
                sx={{ color: "primary.light", fontSize: 32, mb: 1.5, transition: "transform 0.25s ease" }}
              />
              <Typography sx={{ color: "text.primary", fontSize: "0.95rem", lineHeight: 1.7, mb: 3, flex: 1 }}>
                {t.quote}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40, fontWeight: 700 }}>
                  {t.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: "0.88rem", color: "text.primary" }}>
                    {t.name}
                  </Typography>
                  <Typography sx={{ fontSize: "0.78rem", color: "text.secondary" }}>
                    {t.role}, {t.company}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Box>
  );
}

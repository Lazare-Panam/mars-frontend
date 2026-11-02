"use client";

import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import Reveal from "@/Common/Reveal";

export type LegalSection = {
  heading: string;
  body: React.ReactNode;
};

/**
 * Shared presentational shell for long-form legal pages (Privacy, Terms,
 * Cookie Policy). Mirrors the header treatment of the Returns Policy page and
 * renders numbered prose sections. Content is passed in by each page so the
 * chrome stays in one place.
 */
export default function LegalDocument({
  overline,
  title,
  highlight,
  intro,
  lastUpdated,
  sections,
}: {
  overline: string;
  title: string;
  highlight: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
}) {
  return (
    <Box component="section" sx={{ bgcolor: "background.default" }}>
      {/* Header */}
      <Box
        sx={{
          bgcolor: "#fff",
          borderBottom: "1px solid",
          borderColor: "divider",
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: 2 }}>
            <Typography
              variant="overline"
              sx={{ fontWeight: 800, color: "primary.main", letterSpacing: 1.5 }}
            >
              {overline}
            </Typography>
            <Box sx={{ width: 40, height: "1px", bgcolor: "primary.main" }} />
          </Stack>
          <Reveal>
            <Typography
              variant="h2"
              component="h1"
              sx={{ fontWeight: 800, fontSize: { xs: "2.25rem", md: "3rem" } }}
            >
              {title}{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                {highlight}
              </Box>
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 640, mt: 2 }}>
              {intro}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 2 }}>
              Last updated: {lastUpdated}
            </Typography>
          </Reveal>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Stack spacing={5}>
          {sections.map((s, i) => (
            <Reveal key={s.heading} delay={Math.min(i * 40, 240)}>
              <Box
                component="article"
                sx={{
                  "& p": { color: "text.secondary", lineHeight: 1.8, mb: 2 },
                  "& ul": { color: "text.secondary", lineHeight: 1.8, pl: 3, mb: 2 },
                  "& li": { mb: 1 },
                  "& a": { color: "primary.main", fontWeight: 600 },
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: 800, color: "text.primary", mb: 2 }}
                >
                  {s.heading}
                </Typography>
                {s.body}
              </Box>
            </Reveal>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

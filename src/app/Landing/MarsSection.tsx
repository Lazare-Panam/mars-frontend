"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function MarsSection() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: "#fff" }}>
      <Box
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: 3, md: 8 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 5, md: 8 },
          alignItems: "flex-start",
        }}
      >
        {/* left: copy */}
        <Box sx={{ flex: 1 }}>
          <Typography
            component="span"
            sx={{
              color: "primary.main",
              letterSpacing: "0.2em",
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Who We Are
          </Typography>

          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.75rem" },
              fontWeight: 800,
              color: "text.primary",
              lineHeight: 1.15,
              mt: 1,
              mb: 3,
            }}
          >
            There's only one MARS.
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "1rem",
              lineHeight: 1.75,
              mb: 2.5,
            }}
          >
            We're{" "}
            <Box
              component="span"
              sx={{ fontWeight: 700, color: "text.primary" }}
            >
              MARS Valve UK
            </Box>{" "}
            — the original. The name has been imitated, copied, and stamped onto
            valves that have nothing to do with the engineering, materials, or
            standards we hold ourselves to. If it didn't come through us, it
            isn't MARS.
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "1rem",
              lineHeight: 1.75,
              mb: 2.5,
            }}
          >
            Every valve that leaves our facility carries the same
            certifications, the same fire-safe testing, the same tolerances —
            whether it's a single fitting or a full pipeline order. That
            consistency is what an imitator can't reproduce, because it isn't a
            logo. It's a process, built over years, that doesn't transfer with a
            name.
          </Typography>

          <Typography
            component="h3"
            sx={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "text.primary",
              mt: 4,
              mb: 1.5,
            }}
          >
            Buy from the source
          </Typography>

          <Typography
            sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.75 }}
          >
            If you're sourcing MARS valves, source them from us. Every series,
            every certificate, every batch is traceable back to one place — not
            a name licensed out, copied, or printed on a box that's never seen
            our factory floor.
          </Typography>
        </Box>

        {/* right: static image */}
        <Box sx={{ flex: 1, width: "100%" }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              pt: "75%",
              borderRadius: "6px",
              overflow: "hidden",
              boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
              bgcolor: "#fff",
              border: "1px solid",
              borderColor: "rgba(0,0,0,0.08)",
            }}
          >
            <Image
              src="https://pblol2.blob.core.windows.net/mars-valves/categories/fire-safe.jpg"
              alt="MARS fire-safe ball valve, API 607 certified"
              fill
              style={{ objectFit: "contain", padding: "32px" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

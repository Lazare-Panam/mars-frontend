"use client";

import { useEffect, useState } from "react";
import { Box, Fade } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Fade in={visible}>
      <Box
        component="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        sx={{
          position: "fixed",
          right: { xs: 16, md: 32 },
          bottom: { xs: 80, md: 100 }, // above WhatsAppButton
          zIndex: 1200,
          width: 48,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // White with a red arrow, so it stays visible over the red footer.
          border: "1.5px solid #E0393E",
          borderRadius: "2px",
          cursor: "pointer",
          bgcolor: "#fff",
          color: "primary.main",
          boxShadow: "0 8px 24px rgba(58,61,66,0.22)",
          transition: "background-color 0.2s ease, transform 0.2s ease",
          "&:hover": {
            bgcolor: "primary.main",
            color: "#fff",
            transform: "translateY(-3px)",
          },
        }}
      >
        <KeyboardArrowUpIcon />
      </Box>
    </Fade>
  );
}

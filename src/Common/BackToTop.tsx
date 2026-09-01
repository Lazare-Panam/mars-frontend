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
          bottom: { xs: 16, md: 32 },
          zIndex: 1200,
          width: 48,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          borderRadius: "2px",
          cursor: "pointer",
          bgcolor: "primary.main",
          color: "#fff",
          boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
          transition: "background-color 0.2s ease, transform 0.2s ease",
          "&:hover": {
            bgcolor: "primary.dark",
            transform: "translateY(-3px)",
          },
        }}
      >
        <KeyboardArrowUpIcon />
      </Box>
    </Fade>
  );
}

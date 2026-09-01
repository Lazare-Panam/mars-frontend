"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Box, Fade, Typography } from "@mui/material";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";

export default function QuickEnquiryButton() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const target = document.getElementById("contact");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push("/contact");
    }
  };

  // Already on the contact page — jumping there would be a no-op.
  if (pathname === "/contact") return null;

  return (
    <Fade in={visible}>
      <Box
        component="button"
        onClick={handleClick}
        aria-label="Jump to enquiry form"
        sx={{
          position: "fixed",
          left: { xs: 16, md: 32 },
          top: { xs: 80, md: 88 },
          zIndex: 1200,
          display: "flex",
          alignItems: "center",
          gap: 1,
          border: "none",
          borderRadius: "2px",
          cursor: "pointer",
          bgcolor: "primary.main",
          color: "#fff",
          px: 2.5,
          py: 1.5,
          boxShadow: "0 8px 24px rgba(231,57,15,0.35)",
          transition: "background-color 0.2s ease, transform 0.2s ease",
          "&:hover": {
            bgcolor: "primary.dark",
            transform: "translateY(-3px)",
          },
        }}
      >
        <RequestQuoteIcon sx={{ fontSize: 20 }} />
        <Typography sx={{ fontWeight: 700, fontSize: "0.85rem", whiteSpace: "nowrap" }}>
          Get a Quote
        </Typography>
      </Box>
    </Fade>
  );
}

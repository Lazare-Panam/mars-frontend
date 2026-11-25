"use client";

import { Box } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const WHATSAPP_NUMBER = "447368137917";
const MESSAGE = "Hi Kronox Valves, I have a question about Kronox valves.";

/**
 * Round green WhatsApp chat button, fixed bottom-right on every page.
 * Opens wa.me (the app on mobile, WhatsApp Web on desktop) with a pre-filled message.
 * BackToTop sits just above it.
 */
export default function WhatsAppButton() {
  return (
    <Box
      component="a"
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onClick={() => window.gtag?.("event", "whatsapp_click", { page_path: window.location.pathname })}
      sx={{
        position: "fixed",
        right: { xs: 16, md: 32 },
        bottom: { xs: 16, md: 32 },
        zIndex: 1200,
        width: { xs: 52, md: 56 },
        height: { xs: 52, md: 56 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        bgcolor: "#25D366",
        color: "#fff",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        transition: "background-color 0.2s ease, transform 0.2s ease",
        "&:hover": {
          bgcolor: "#1EBE5A",
          transform: "translateY(-3px)",
        },
      }}
    >
      <WhatsAppIcon sx={{ fontSize: { xs: 28, md: 30 } }} />
    </Box>
  );
}

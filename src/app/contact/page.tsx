import type { Metadata } from "next";
import { Box } from "@mui/material";
import ContactForm from "./ContactForm";
import Reveal from "@/Common/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the MarsValvenok technical sales team to discuss specifications, lead times, or authorized distribution.",
};

export default function ContactPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 6, md: 10 },
        px: 2,
        bgcolor: "background.default",
      }}
    >
      <Reveal>
        <ContactForm />
      </Reveal>
    </Box>
  );
}

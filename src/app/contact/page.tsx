import { Box } from "@mui/material";
import ContactForm from "./ContactForm";

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
      <ContactForm />
    </Box>
  );
}

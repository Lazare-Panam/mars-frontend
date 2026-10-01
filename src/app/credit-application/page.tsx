import { Box, Container, Typography } from "@mui/material";
import CreditApplicationForm from "./CreditApplicationForm";
import Reveal from "@/Common/Reveal";

export default function CreditApplicationPage() {
  return (
    <Box component="main" sx={{ bgcolor: "background.default", py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <Reveal>
          <Box sx={{ mb: { xs: 5, md: 6 } }}>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "2rem", md: "2.75rem" },
                fontWeight: 800,
                lineHeight: 1.15,
                color: "text.primary",
                mb: 2,
              }}
            >
              Apply for a credit line
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: "1.05rem", lineHeight: 1.75 }}>
              Set up trade credit terms with Mars Valvenok. Tell us about your
              business and credit requirements, and our team will review your
              application and get back to you.
            </Typography>
          </Box>
        </Reveal>

        <Reveal>
          <CreditApplicationForm />
        </Reveal>
      </Container>
    </Box>
  );
}

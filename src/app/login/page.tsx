"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import LoginForm from "./LoginForm";
import RegisterInfo from "./RegisterInfo";
import TermsModal from "./TermsModal";
import Reveal from "@/Common/Reveal";

export default function LoginPage() {
  const [showTerms, setShowTerms] = React.useState(false);
  const router = useRouter();

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        py: { xs: 6, md: 12 },
        minHeight: { md: "80vh" },
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 8, md: 10 },
            alignItems: "center",
          }}
        >
          {/* --- LEFT: LOGIN + LEGAL TEXT --- */}
          <Box sx={{ flex: 1, width: "100%", maxWidth: 480 }}>
            <Reveal>
              <LoginForm />
            </Reveal>

            <Typography
              variant="caption"
              sx={{
                display: "block",
                mt: 4,
                color: "text.secondary",
                lineHeight: 1.6,
              }}
            >
              By signing in or registering, you confirm that you are agreeing to
              our{" "}
              <Link
                component="button"
                onClick={() => setShowTerms(true)}
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  fontSize: "inherit",
                  textDecoration: "underline",
                  verticalAlign: "baseline",
                }}
              >
                Terms of Use
              </Link>{" "}
              and Privacy Notice.
            </Typography>

           
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{
              display: { xs: "none", md: "block" },
              borderColor: "primary.light",
              borderWidth: 1,
            }}
          />

          <RegisterInfo />
        </Box>
      </Container>

      <TermsModal open={showTerms} onClose={() => setShowTerms(false)} />
    </Box>
  );
}
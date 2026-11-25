"use client";

import * as React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Alert,
  CircularProgress,
  Grow,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useSubmitEnquiry } from "@/api/useSubmitEnquiry";
import Reveal from "@/Common/Reveal";
import MagneticWrap from "@/Common/MagneticWrap";

// Public Turnstile site key. Hardcoded fallback mirrors axiosClient/site.ts: the
// Static Web Apps build has no .env, so NEXT_PUBLIC_* vars need a default here or
// the widget won't render in prod. Safe to hardcode — the site key is public.
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "0x4AAAAAAFwfb1up9rSC3yQN";

interface EnquiryFormData {
  userName: string;
  userEmail: string;
  userCompany: string;
  userCountry: string;
  message: string;
}

const initialFormState: EnquiryFormData = {
  userName: "",
  userEmail: "",
  userCompany: "",
  userCountry: "",
  message: "",
};

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    transition: "box-shadow 0.2s ease",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "primary.main",
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
    boxShadow: "0 0 0 4px rgba(224,57,62,0.12)",
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "primary.main" },
};

export default function ContactCTA() {
  const [formData, setFormData] =
    React.useState<EnquiryFormData>(initialFormState);
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof EnquiryFormData, string>>
  >({});

  // Turnstile token + widget ref (tokens are single-use, so we reset after each submit).
  const [captchaToken, setCaptchaToken] = React.useState("");
  const turnstileRef = React.useRef<TurnstileInstance>(null);

  const { mutate, isPending, isSuccess, isError, reset } = useSubmitEnquiry();

  const handleChange =
    (field: keyof EnquiryFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof EnquiryFormData, string>> = {};

    if (!formData.userName.trim()) newErrors.userName = "Name is required";
    if (!formData.userEmail.trim()) {
      newErrors.userEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail)) {
      newErrors.userEmail = "Enter a valid email address";
    }
    if (!formData.userCompany.trim())
      newErrors.userCompany = "Company is required";
    if (!formData.message.trim())
      newErrors.message = "Please describe your enquiry";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!captchaToken) return; // Button is disabled without a token; guard anyway.

    mutate({ ...formData, captchaToken }, {
      onSuccess: () => {
        setFormData(initialFormState);
      },
      // A token is single-use; clear and refresh the widget after any attempt.
      onSettled: () => {
        setCaptchaToken("");
        turnstileRef.current?.reset();
      },
    });
  };

  return (
    <Box id="contact" component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: "#F5F5F6" }}>
      <Box
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: 3, md: 8 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" },
          gap: 6,
          alignItems: "center",
        }}
      >
        {/* left: copy */}
        <Reveal>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Box sx={{ width: 32, height: 1, bgcolor: "primary.main" }} />
            <Typography
              sx={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "primary.main",
                textTransform: "uppercase",
              }}
            >
              Get In Touch
            </Typography>
          </Box>

          <Typography
            component="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "2.75rem" },
              lineHeight: 1.15,
              color: "text.primary",
              mb: 2.5,
            }}
          >
            Talk to us about your application
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "1rem",
              lineHeight: 1.75,
              mb: 4,
              maxWidth: 480,
            }}
          >
            A single valve or a full project order: send your size, pressure,
            end connection and media, and we&apos;ll come back with the right
            series, datasheets and a price.
          </Typography>

          <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: "text.primary",
                  mb: 0.5,
                }}
              >
                Email
              </Typography>
              <Typography
                className="no-capitalize"
                sx={{ color: "text.secondary", fontSize: "0.9rem" }}
              >
                sales@marsvalvenok.com
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: "text.primary",
                  mb: 0.5,
                }}
              >
                Phone
              </Typography>
              <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
                +44 7368 137917
              </Typography>
            </Box>
          </Box>
        </Box>
        </Reveal>

        {/* right: contact form card */}
        <Reveal delay={150} y={32}>
        <Box
          sx={{
            bgcolor: "#fff",
            border: "1px solid",
            borderColor: "rgba(0,0,0,0.08)",
            borderRadius: "4px",
            p: { xs: 3, md: 4 },
            boxShadow: "0 12px 32px rgba(0,0,0,0.06)",
          }}
        >
          <Grow in={isSuccess} unmountOnExit>
            <Alert severity="success" sx={{ mb: 2.5 }} onClose={reset}>
              Thanks — your enquiry has been received.
            </Alert>
          </Grow>
          <Grow in={isError} unmountOnExit>
            <Alert severity="error" sx={{ mb: 2.5 }} onClose={reset}>
              Something went wrong. Please try again.
            </Alert>
          </Grow>

          <Box
            component="form"
            id="homepage-enquiry"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
          >
            <TextField
              label="Full Name"
              variant="outlined"
              size="small"
              fullWidth
              value={formData.userName}
              onChange={handleChange("userName")}
              error={!!errors.userName}
              helperText={errors.userName}
              disabled={isPending}
              sx={fieldSx}
            />
            <TextField
              label="Email Address"
              variant="outlined"
              size="small"
              fullWidth
              value={formData.userEmail}
              onChange={handleChange("userEmail")}
              error={!!errors.userEmail}
              helperText={errors.userEmail}
              disabled={isPending}
              sx={fieldSx}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Company"
                variant="outlined"
                size="small"
                fullWidth
                value={formData.userCompany}
                onChange={handleChange("userCompany")}
                error={!!errors.userCompany}
                helperText={errors.userCompany}
                disabled={isPending}
                sx={fieldSx}
              />
              <TextField
                label="Country"
                variant="outlined"
                size="small"
                fullWidth
                value={formData.userCountry}
                onChange={handleChange("userCountry")}
                disabled={isPending}
                sx={fieldSx}
              />
            </Box>
            <TextField
              label="What do you need?"
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange("message")}
              error={!!errors.message}
              helperText={errors.message}
              disabled={isPending}
              sx={fieldSx}
            />

            <Turnstile
              ref={turnstileRef}
              siteKey={TURNSTILE_SITE_KEY}
              onSuccess={setCaptchaToken}
              onExpire={() => setCaptchaToken("")}
              onError={() => setCaptchaToken("")}
            />

            <MagneticWrap strength={0.15}>
              <Button
                type="submit"
                variant="contained"
                disableElevation
                disabled={isPending || !captchaToken}
                endIcon={isPending ? undefined : <ArrowForwardIcon />}
                sx={{
                  bgcolor: "primary.main",
                  color: "#fff",
                  fontWeight: 700,
                  borderRadius: "2px",
                  py: 1.3,
                  textTransform: "none",
                  fontSize: "0.95rem",
                  transition: "background-color 0.2s ease, transform 0.2s ease",
                  "&:hover": { bgcolor: "primary.dark", transform: "translateY(-2px)" },
                }}
              >
                {isPending ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  "Send Enquiry"
                )}
              </Button>
            </MagneticWrap>
          </Box>
        </Box>
        </Reveal>
      </Box>
    </Box>
  );
}

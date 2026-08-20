"use client";

import * as React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSubmitEnquiry } from "@/api/useSubmitEnquiry";

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
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "primary.main",
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "primary.main" },
};

export default function ContactCTA() {
  const [formData, setFormData] =
    React.useState<EnquiryFormData>(initialFormState);
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof EnquiryFormData, string>>
  >({});

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

    mutate(formData, {
      onSuccess: () => {
        setFormData(initialFormState);
      },
    });
  };

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: "#FAF6F4" }}>
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
            Talk to us. We'll give you
            <br />
            the best price in the market.
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
            Whether it's a single valve or a full pipeline order, our team
            responds fast with specs, certifications, and pricing — no
            middlemen, no guesswork.
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
              <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
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
                +44 7368 1379917
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* right: contact form card */}
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
          {isSuccess && (
            <Alert severity="success" sx={{ mb: 2.5 }} onClose={reset}>
              Thanks — your enquiry has been received.
            </Alert>
          )}
          {isError && (
            <Alert severity="error" sx={{ mb: 2.5 }} onClose={reset}>
              Something went wrong. Please try again.
            </Alert>
          )}

          <Box
            component="form"
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

            <Button
              type="submit"
              variant="contained"
              disableElevation
              disabled={isPending}
              endIcon={isPending ? undefined : <ArrowForwardIcon />}
              sx={{
                bgcolor: "primary.main",
                color: "#fff",
                fontWeight: 700,
                borderRadius: "2px",
                py: 1.3,
                textTransform: "none",
                fontSize: "0.95rem",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              {isPending ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Send Enquiry"
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

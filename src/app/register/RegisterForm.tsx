"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MuiLink from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Grow from "@mui/material/Grow";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import NextLink from "next/link";
import TermsModal from "../login/TermsModal";
import MagneticWrap from "@/Common/MagneticWrap";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useRegister } from "@/api/useAuth";
import axios from "axios";

// Public Turnstile site key. Hardcoded fallback mirrors axiosClient/site.ts: the
// Static Web Apps build has no .env, so NEXT_PUBLIC_* vars need a default here or
// the widget won't render in prod. Safe to hardcode — the site key is public.
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "0x4AAAAAAFwfb1up9rSC3yQN";

const ERROR_SOFT = "#C42E33";
const ERROR_SOFT_BG = "rgba(196,46,51, 0.06)";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#F4F4F4",
    borderRadius: 0,
    transition: "box-shadow 0.2s ease",
    "& fieldset": { borderColor: "transparent" },
    "&.Mui-error": {
      backgroundColor: ERROR_SOFT_BG,
      "& fieldset": { borderColor: ERROR_SOFT },
    },
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
    boxShadow: "0 0 0 4px rgba(224,57,62,0.12)",
  },
  "& .MuiFormHelperText-root": { fontWeight: 600, ml: 0 },
  "& .MuiFormHelperText-root.Mui-error": { color: ERROR_SOFT },
};

const benefits = [
  { text: "Access to member pricing", icon: LocalOfferOutlinedIcon },
  { text: "Faster order delivery", icon: LocalShippingOutlinedIcon },
  { text: "Eligible for exclusive discounts", icon: PercentOutlinedIcon },
];

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  jobTitle: string;
  phoneNumber: string;
  country: string;
  password: string;
  confirmPassword: string;
}

// Your custom Problem(...) responses (code + optional errors array)
interface AppProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  code?: string;
  errors?: string[];
}

// ASP.NET Core's automatic [ApiController] model-validation failure shape
interface ValidationProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  instance?: string;
  errors?: Record<string, string[]>;
}

type ErrorResponse = AppProblemDetails | ValidationProblemDetails;

function isValidationErrors(
  errors: unknown,
): errors is Record<string, string[]> {
  return (
    typeof errors === "object" && errors !== null && !Array.isArray(errors)
  );
}

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [termsOpen, setTermsOpen] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [formError, setFormError] = React.useState("");

  const { mutate: register, isPending } = useRegister();

  // Turnstile token + widget ref (tokens are single-use, so we reset after each attempt).
  const [captchaToken, setCaptchaToken] = React.useState("");
  const turnstileRef = React.useRef<TurnstileInstance>(null);

  const [formData, setFormData] = React.useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    companyName: "",
    jobTitle: "",
    phoneNumber: "",
    country: "UK",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setFormError("");

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    if (!captchaToken) return; // Button is disabled without a token; guard anyway.

    register(
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        companyName: formData.companyName,
        jobTitle: formData.jobTitle,
        phoneNumber: formData.phoneNumber,
        country: formData.country,
        captchaToken,
      },
      {
        onSuccess: () => {
          router.push("/login");
        },
        // A token is single-use; clear and refresh the widget after any attempt.
        onSettled: () => {
          setCaptchaToken("");
          turnstileRef.current?.reset();
        },
        onError: (err) => {
          if (!axios.isAxiosError<ErrorResponse>(err)) return;
          const data = err.response?.data;
          if (!data) {
            setFormError("Something went wrong. Please try again.");
            return;
          }

          // Case 1: automatic model-validation failure (missing/invalid fields)
          if ("errors" in data && isValidationErrors(data.errors)) {
            const firstField = Object.keys(data.errors)[0];
            const firstMessage = data.errors[firstField]?.[0];
            setFormError(
              firstMessage ?? "Please check your form and try again.",
            );
            return;
          }

          // Case 2: your own Problem(...) responses with a `code`
          const appData = data as AppProblemDetails;
          switch (appData.code) {
            case "EMAIL_ALREADY_REGISTERED":
              setEmailError(
                appData.detail ??
                  appData.title ??
                  "Email is already registered.",
              );
              break;
            case "REGISTRATION_FAILED":
              setPasswordError(
                appData.errors?.join(" ") ??
                  appData.title ??
                  "Registration failed.",
              );
              break;
            default:
              setFormError("Something went wrong. Please try again.");
          }
        },
      },
    );
  };

  return (
    <Box
      sx={{
        flex: 1.5,
        backgroundColor: "background.paper",
        p: { xs: 3, md: 8 },
        display: "flex",
        justifyContent: "center",
        position: "relative",
        width: "100%",
        maxWidth: 1000,
      }}
    >
      {isPending && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(255,255,255,0.8)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <CircularProgress color="primary" />
          <Typography sx={{ fontWeight: 600, color: "text.primary" }}>
            Wait a few seconds, don&apos;t refresh...
          </Typography>
        </Box>
      )}

      <Box sx={{ width: "100%", maxWidth: "900px" }}>
        <Typography
          variant="h3"
          sx={{
            color: "primary.main",
            fontWeight: 800,
            mb: 2,
            fontSize: { xs: "2.2rem", md: "3rem" },
            textAlign: "center",
          }}
        >
          Register with Kronox Valves
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            fontSize: "1.1rem",
            mb: 1,
            textAlign: "center",
          }}
        >
          Create your account to access our collaborative engineering tools.
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", mb: 3, textAlign: "center" }}
        >
          Already have an account?{" "}
          <MuiLink
            component={NextLink}
            href="/login"
            sx={{ color: "primary.main", fontWeight: 600, textDecoration: "underline" }}
          >
            Log in
          </MuiLink>
        </Typography>

        {/* Benefits strip */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 1.5, sm: 4 },
            justifyContent: "center",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 6,
            py: 2.5,
            px: { xs: 2, sm: 4 },
            borderRadius: 1,
            border: "1px solid",
            borderColor: "primary.light",
            backgroundColor: "background.default",
          }}
        >
          {benefits.map(({ text, icon: Icon }) => (
            <Box
              key={text}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Icon sx={{ color: "primary.main", fontSize: 20 }} />
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontWeight: 500 }}
              >
                {text}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box component="form" id="register" onSubmit={handleRegister} noValidate>
          <Grow in={Boolean(formError)} unmountOnExit>
            <Typography
              variant="body2"
              sx={{
                mb: 4,
                p: 2,
                color: ERROR_SOFT,
                backgroundColor: ERROR_SOFT_BG,
                fontWeight: 600,
                borderRadius: 1,
              }}
            >
              {formError}
            </Typography>
          </Grow>

          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: "text.primary",
              letterSpacing: "0.05em",
            }}
          >
            USER ID / EMAIL ADDRESS
          </Typography>
          <TextField
            fullWidth
            required
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@company.com"
            error={Boolean(emailError)}
            helperText={emailError}
            sx={{ ...fieldSx, mb: 5 }}
          />

          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 700, mb: 2, color: "text.primary" }}
          >
            PERSONAL INFORMATION
          </Typography>
          <Grid container spacing={3} sx={{ mb: 5 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                required
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleChange}
                sx={fieldSx}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                required
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                sx={fieldSx}
              />
            </Grid>
          </Grid>

          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 700, mb: 2, color: "text.primary" }}
          >
            BUSINESS INFORMATION
          </Typography>
          <Grid container spacing={3} sx={{ mb: 5 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                required
                name="companyName"
                label="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                sx={fieldSx}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                required
                name="jobTitle"
                label="Job Title"
                value={formData.jobTitle}
                onChange={handleChange}
                sx={fieldSx}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                required
                name="phoneNumber"
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                sx={fieldSx}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                required
                name="country"
                label="Country"
                value={formData.country}
                onChange={handleChange}
                sx={fieldSx}
              />
            </Grid>
          </Grid>

          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 700, mb: 2, color: "text.primary" }}
          >
            ACCOUNT SECURITY
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                required
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(passwordError)}
                helperText={passwordError}
                sx={fieldSx}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((p) => !p)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                required
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={Boolean(passwordError)}
                sx={fieldSx}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword((p) => !p)}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Turnstile
              ref={turnstileRef}
              siteKey={TURNSTILE_SITE_KEY}
              onSuccess={setCaptchaToken}
              onExpire={() => setCaptchaToken("")}
              onError={() => setCaptchaToken("")}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              gap: 3,
              mt: 6,
            }}
          >
            <Button
              component={NextLink}
              href="/login"
              variant="outlined"
              color="primary"
              sx={{ borderRadius: 0, px: 8, py: 2, fontWeight: 700 }}
            >
              CANCEL
            </Button>
            <MagneticWrap>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isPending || !captchaToken}
                endIcon={!isPending && <ChevronRightIcon />}
                sx={{
                  borderRadius: 0,
                  px: 8,
                  py: 2,
                  fontWeight: 700,
                  boxShadow: "none",
                  transition: "transform 0.2s ease",
                  "&:hover": { transform: "translateY(-2px)" },
                }}
              >
                {isPending ? "CREATING..." : "CREATE ACCOUNT"}
              </Button>
            </MagneticWrap>
          </Box>

          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 6,
              color: "text.secondary",
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            By submitting, I agree to the{" "}
            <MuiLink
              component="button"
              type="button"
              onClick={() => setTermsOpen(true)}
              sx={{
                color: "primary.main",
                fontWeight: 600,
                cursor: "pointer",
                verticalAlign: "baseline",
                textDecoration: "underline",
              }}
            >
              Terms of Use
            </MuiLink>{" "}
            and Privacy Notice.
          </Typography>
        </Box>
      </Box>
      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
    </Box>
  );
}
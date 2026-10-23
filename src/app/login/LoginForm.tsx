"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Grow from "@mui/material/Grow";
import NextLink from "next/link";
import { useLogin } from "@/api/useAuth";
import axios from "axios";
import MagneticWrap from "@/Common/MagneticWrap";
import { useCartStore } from "@/store/useCartStore";

const ERROR_SOFT = "#B3453A";
const ERROR_SOFT_BG = "rgba(179, 69, 58, 0.06)";

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
    boxShadow: "0 0 0 4px rgba(231,57,15,0.12)",
  },
  "& .MuiFormHelperText-root": { fontWeight: 600, ml: 0 },
  "& .MuiFormHelperText-root.Mui-error": { color: ERROR_SOFT },
};

// Only paths on this site (e.g. "/dashboard/carts"), never "//other-site.com".
const safeRedirect = (redirect: string | null) =>
  redirect && redirect.startsWith("/") && !redirect.startsWith("//") ? redirect : "/dashboard/carts";

interface AppProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  code?: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [formError, setFormError] = React.useState("");

  const { mutate: login, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    login(
      { email, password },
      {
        onSuccess: async () => {
          // "Save Cart" was clicked while logged out: save the cart now.
          const cart = useCartStore.getState();
          if (cart.pendingSave && (await cart.saveCart()) === "error") {
            router.push("/cart");
            return;
          }
          router.push(safeRedirect(new URLSearchParams(window.location.search).get("redirect")));
        },
        onError: (err) => {
          if (!axios.isAxiosError<AppProblemDetails>(err)) {
            setFormError("Something went wrong. Please try again.");
            return;
          }
          const data = err.response?.data;

          switch (data?.code) {
            case "INVALID_CREDENTIALS":
              setFormError(
                data.detail ?? data.title ?? "Invalid email or password.",
              );
              break;
            case "ACCOUNT_LOCKED":
              setFormError(
                data.detail ?? data.title ?? "Account locked. Try again later.",
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
    <Box sx={{ position: "relative" }}>
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
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}

      <Typography
        variant="h4"
        component="h1"
        sx={{ color: "primary.main", fontWeight: 800, mb: 1 }}
      >
        Sign in to Mars Valves
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 4 }}>
        New here?{" "}
        <MuiLink
          component={NextLink}
          href="/register"
          sx={{
            color: "primary.main",
            fontWeight: 600,
            textDecoration: "underline",
          }}
        >
          Create an account
        </MuiLink>
      </Typography>

      <Box component="form" id="login" data-hs-do-not-collect="true" onSubmit={handleSubmit} noValidate>
        <Grow in={Boolean(formError)} unmountOnExit>
          <Typography
            variant="body2"
            sx={{
              mb: 3,
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

        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          sx={{ ...fieldSx, mb: 3 }}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          sx={{ ...fieldSx, mb: 1 }}
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

        {/* <Box sx={{ textAlign: "right", mb: 3 }}>
          <MuiLink
            component={NextLink}
            href="/forgot-password"
            sx={{ color: "text.secondary", fontSize: "0.875rem", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
          >
            Forgot password?
          </MuiLink>
        </Box> */}

        <Box sx={{ display: "grid" }}>
          <MagneticWrap strength={0.15}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={isPending}
              endIcon={!isPending && <ChevronRightIcon />}
              sx={{
                borderRadius: 0,
                py: 1.75,
                fontWeight: 700,
                boxShadow: "none",
                transition: "transform 0.2s ease",
                "&:hover": { transform: "translateY(-2px)" },
              }}
            >
              {isPending ? "SIGNING IN..." : "SIGN IN"}
            </Button>
          </MagneticWrap>
        </Box>
      </Box>
    </Box>
  );
}

"use client";

import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    // Kronox Valves palette, taken from the v6 logo. Light only: no black
    // or dark backgrounds anywhere on the site.
    primary: {
      main: "#E0393E", // Kronox red (logo accent)
      dark: "#B8262C",
      light: "#F09A9D",
      contrastText: "#fff",
    },
    secondary: {
      main: "#6E7175", // steel grey (logo letters)
      dark: "#575A5F",
      light: "#A3A6AB",
      contrastText: "#fff",
    },
    background: {
      default: "#EDEEF0",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#3A3D42", // charcoal grey, replaces pure black
      secondary: "#6E7175",
    },
    divider: "#DFE0E2",
  },
  typography: {
    fontFamily: "var(--font-body), sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: "smooth" },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          "&.no-capitalize": {
            textTransform: "none",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        label: {
          textTransform: "capitalize",
          "&.no-capitalize": {
            textTransform: "none",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
  },
});

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: false }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

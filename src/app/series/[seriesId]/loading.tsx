"use client";

import { Box, CircularProgress } from "@mui/material";

// Shown instantly on navigation (App Router Suspense fallback), before the page
// component mounts or any API call starts — so clicking a series feels immediate.
export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
}

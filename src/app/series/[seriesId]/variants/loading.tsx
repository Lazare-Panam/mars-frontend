"use client";

import { Box, CircularProgress } from "@mui/material";

// Instant spinner on navigation to the "all models" table.
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

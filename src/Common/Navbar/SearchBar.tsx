"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, InputBase, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// Example searches the big header search cycles through as its placeholder.
const EXAMPLES = [
  "Search by part number, series, size, thread…",
  "Try “KX-83 fire-safe”",
  "Try “DN50 3-piece 316”",
  "Try “½″ BSP 2-piece”",
  "Try “flanged PN40”",
  "Try “sanitary tri-clamp”",
];

// Search input for the header. On submit it routes to /search?q=…, where the full
// results page + facet sidebar live. `prominent` renders the big hero-row version.
export default function SearchBar({
  fullWidth,
  initial,
  prominent,
}: {
  fullWidth?: boolean;
  initial?: string;
  prominent?: boolean;
}) {
  const theme = useTheme();
  const router = useRouter();
  const [q, setQ] = useState(initial ?? "");
  const [focused, setFocused] = useState(false);
  const [ex, setEx] = useState(0);

  // Cycle the example placeholder while the box is empty and not in use.
  useEffect(() => {
    if (!prominent || focused || q) return;
    const t = setInterval(() => setEx((n) => (n + 1) % EXAMPLES.length), 2600);
    return () => clearInterval(t);
  }, [prominent, focused, q]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    if (term) router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <Box
      component="form"
      role="search"
      onSubmit={submit}
      sx={{
        display: "flex",
        alignItems: "center",
        width: fullWidth ? "100%" : { md: 180, lg: 230, xl: 290 },
        border: `1.5px solid ${prominent ? "rgba(58,61,66,0.18)" : theme.palette.divider}`,
        // Header version: square-cornered box with a slanted red button cut
        // into its right edge (the angle of the logo's K and X).
        borderRadius: prominent ? "3px" : "999px",
        overflow: prominent ? "hidden" : undefined,
        height: prominent ? 48 : undefined,
        pl: prominent ? 2 : 1.75,
        pr: prominent ? 0 : 1.75,
        py: prominent ? 0 : 0.5,
        bgcolor: "#fff",
        boxShadow: prominent ? "0 6px 20px rgba(58,61,66,0.07)" : "none",
        transition: "border-color .15s ease, box-shadow .15s ease",
        "&:hover": prominent ? { borderColor: "rgba(224,57,62,0.45)" } : undefined,
        "&:focus-within": {
          borderColor: theme.palette.primary.main,
          boxShadow: prominent
            ? "0 0 0 4px rgba(224,57,62,0.14), 0 12px 32px rgba(224,57,62,0.18)"
            : `0 0 0 3px ${theme.palette.primary.main}1f`,
        },
      }}
    >
      <SearchIcon
        sx={{
          fontSize: prominent ? 24 : 18,
          color: prominent ? theme.palette.primary.main : theme.palette.text.secondary,
          mr: prominent ? 1.25 : 1,
        }}
      />
      <InputBase
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={prominent ? EXAMPLES[focused ? 0 : ex] : "Search valves, part numbers…"}
        inputProps={{ "aria-label": "Search products" }}
        sx={{
          flex: 1,
          fontSize: prominent ? "1.02rem" : "0.85rem",
          color: theme.palette.text.primary,
        }}
      />
      {prominent && (
        <Box
          component="button"
          type="submit"
          aria-label="Search"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            border: "none",
            cursor: "pointer",
            bgcolor: theme.palette.primary.main,
            color: "#fff",
            fontWeight: 800,
            fontSize: "0.84rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            alignSelf: "stretch",
            pl: 3.5,
            pr: 2.75,
            ml: 1,
            background: "linear-gradient(135deg, #E0393E 0%, #C42E33 100%)",
            clipPath: "polygon(16px 0, 100% 0, 100% 100%, 0 100%)",
            transition: "filter .15s ease",
            "&:hover": { filter: "brightness(0.92)" },
          }}
        >
          <SearchIcon sx={{ fontSize: 18 }} />
          Search
        </Box>
      )}
    </Box>
  );
}

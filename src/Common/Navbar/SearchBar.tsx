"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, InputBase, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
        border: `1.5px solid ${prominent ? "rgba(43,27,20,0.18)" : theme.palette.divider}`,
        borderRadius: "999px",
        pl: prominent ? 2.5 : 1.75,
        pr: prominent ? 0.75 : 1.75,
        py: prominent ? 0.75 : 0.5,
        bgcolor: "#fff",
        boxShadow: prominent ? "0 6px 20px rgba(43,27,20,0.07)" : "none",
        transition: "border-color .15s ease, box-shadow .15s ease",
        "&:focus-within": {
          borderColor: theme.palette.primary.main,
          boxShadow: `0 0 0 3px ${theme.palette.primary.main}1f`,
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
        placeholder={
          prominent
            ? "Search by part number, series, size, thread…"
            : "Search valves, part numbers…"
        }
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
            fontWeight: 700,
            fontSize: "0.9rem",
            letterSpacing: "0.01em",
            px: 2.75,
            py: 1.1,
            borderRadius: "999px",
            transition: "background-color .15s ease",
            "&:hover": { bgcolor: theme.palette.primary.dark ?? "#A8270A" },
          }}
        >
          <SearchIcon sx={{ fontSize: 18 }} />
          Search
        </Box>
      )}
    </Box>
  );
}

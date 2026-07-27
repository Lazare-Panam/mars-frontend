"use client";

import { Box, Chip, Typography } from "@mui/material";

const BRAND = "#E7390F";

interface Props {
  activeFilters: Record<string, string[]>;
  setActiveFilters: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
}

export default function VariantsActiveFilters({
  activeFilters,
  setActiveFilters,
}: Props) {
  const chips: { key: string; val: string; label: string }[] = [];

  Object.entries(activeFilters).forEach(([key, vals]) => {
    vals.forEach((val) => chips.push({ key, val, label: `${key}: ${val}` }));
  });

  if (chips.length === 0) return null;

  const removeChip = (key: string, val: string) => {
    setActiveFilters((prev) => {
      const remaining = (prev[key] ?? []).filter((v) => v !== val);
      const next = { ...prev };
      if (remaining.length === 0) {
        delete next[key];
      } else {
        next[key] = remaining;
      }
      return next;
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 1,
        mb: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: "0.72rem",
          fontWeight: 700,
          color: "text.secondary",
          letterSpacing: "0.05em",
        }}
      >
        ACTIVE FILTERS ({chips.length})
      </Typography>
      {chips.map(({ key, val, label }) => (
        <Chip
          key={`${key}-${val}`}
          label={label}
          size="small"
          variant="outlined"
          onDelete={() => removeChip(key, val)}
          sx={{ borderColor: BRAND, color: BRAND, fontSize: "0.72rem" }}
        />
      ))}
      <Typography
        onClick={() => setActiveFilters({})}
        sx={{
          fontSize: "0.72rem",
          fontWeight: 700,
          color: "text.secondary",
          cursor: "pointer",
          ml: 1,
          textDecoration: "underline",
        }}
      >
        Clear all
      </Typography>
    </Box>
  );
}

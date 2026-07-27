"use client";

import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { ProductVariant } from "@/api/useProductVariants";

const BRAND = "#E7390F";

// Keys that are reference/pricing data, never rendered as a filter group.
const NON_FILTERABLE_KEYS = new Set(["SKU", "Price"]);

// Counts how many of the FULL variant set would match if `value` were
// selected for `key`, given the OTHER active filter groups (but ignoring
// this key's own current selection — that's what lets us show "what if
// I picked this option" rather than "what matches right now").
function countForOption(
  variants: ProductVariant[],
  activeFilters: Record<string, string[]>,
  key: string,
  value: string
): number {
  return variants.filter((v) => {
    const matchesOtherGroups = Object.entries(activeFilters).every(([k, vals]) => {
      if (k === key) return true;
      return vals.length === 0 || vals.includes(v.specs[k]);
    });
    return matchesOtherGroups && v.specs[key] === value;
  }).length;
}

interface Props {
  variants: ProductVariant[];
  specKeys: string[];
  filterOptions: Record<string, string[]>;
  activeFilters: Record<string, string[]>;
  setActiveFilters: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
}

export default function VariantsFilterBar({
  variants,
  specKeys,
  filterOptions,
  activeFilters,
  setActiveFilters,
}: Props) {
  const filterableKeys = specKeys.filter((k) => !NON_FILTERABLE_KEYS.has(k));

  const toggle = (key: string, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[key] ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      const updated = { ...prev };
      if (next.length === 0) {
        delete updated[key];
      } else {
        updated[key] = next;
      }
      return updated;
    });
  };

  return (
    <Box sx={{ mb: 3 }}>
      {filterableKeys.map((key) => {
        const options = filterOptions[key] ?? [];
        if (options.length <= 1) return null;
        const selected = activeFilters[key] ?? [];

        return (
          <Box
            key={key}
            sx={{
              border: "1px solid rgba(0,0,0,0.08)",
              p: 2,
              mb: 1.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
              <Box sx={{ width: 3, height: 14, bgcolor: BRAND }} />
              <Typography sx={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                By {key}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {options.map((opt) => {
                const count = countForOption(variants, activeFilters, key, opt);
                const isSelected = selected.includes(opt);
                const isDisabled = count === 0 && !isSelected;

                return (
                  <Box
                    key={opt}
                    onClick={() => !isDisabled && toggle(key, opt)}
                    sx={{
                      border: `1px solid ${isSelected ? BRAND : "rgba(0,0,0,0.15)"}`,
                      bgcolor: isSelected ? alpha(BRAND, 0.08) : "#fff",
                      color: isSelected ? BRAND : "text.primary",
                      px: 1.75,
                      py: 0.75,
                      fontSize: "0.82rem",
                      fontWeight: isSelected ? 700 : 500,
                      cursor: isDisabled ? "default" : "pointer",
                      opacity: isDisabled ? 0.35 : 1,
                      pointerEvents: isDisabled ? "none" : "auto",
                      userSelect: "none",
                      transition: "opacity 0.15s ease, background-color 0.15s ease",
                      "&:hover": isDisabled
                        ? {}
                        : { borderColor: BRAND, bgcolor: isSelected ? alpha(BRAND, 0.08) : alpha(BRAND, 0.03) },
                    }}
                  >
                    {opt}{" "}
                    <Box component="span" sx={{ color: "text.secondary", fontWeight: 400 }}>
                      ({count})
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
"use client";

import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const BRAND = "#E0393E"; // red checkbox outline
const NAVY = "#1b3a5c"; // chevron colour
const CARD_BG = "#f3f3f5"; // grey header bar

interface Props {
  specKeys: string[];
  filterOptions: Record<string, string[]>;
  activeFilters: Record<string, string[]>;
  setActiveFilters: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
}

export default function VariantsSidebar({
  specKeys,
  filterOptions,
  activeFilters,
  setActiveFilters,
}: Props) {
  const activeCount = Object.values(activeFilters).flat().length;

  // The keys that actually render as a filter card (skip reference/pricing
  // columns and any group with only one possible value).
  const renderKeys = specKeys.filter((key) => {
    if (key === "SKU" || key === "Price" || key === "price") return false;
    return (filterOptions[key] ?? []).length > 1;
  });

  const toggle = (key: string, val: string) => {
    setActiveFilters((prev) => {
      const current = prev[key] ?? [];
      return {
        ...prev,
        [key]: current.includes(val)
          ? current.filter((v) => v !== val)
          : [...current, val],
      };
    });
  };

  return (
    <Box
      sx={{
        // Phones: full width above the table. Desktop: a sticky column.
        width: { xs: "100%", md: 280 },
        flexShrink: 0,
        p: 2.5,
        position: { xs: "static", md: "sticky" },
        top: 0,
        alignSelf: { xs: "stretch", md: "flex-start" },
        maxHeight: { md: "100vh" },
        overflowY: { md: "auto" },
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          sx={{ fontSize: "1.15rem", fontWeight: 800, color: "#111" }}
        >
          Shop By
        </Typography>
        {activeCount > 0 && (
          <Typography
            onClick={() => setActiveFilters({})}
            sx={{
              fontSize: "0.8rem",
              fontWeight: 700,
              color: BRAND,
              cursor: "pointer",
            }}
          >
            Clear all
          </Typography>
        )}
      </Box>

      {renderKeys.map((key, idx) => {
        const options = filterOptions[key] ?? [];
        const selected = activeFilters[key] ?? [];

        return (
          <Accordion
            key={key}
            defaultExpanded
            disableGutters
            elevation={0}
            square={false}
            sx={{
              bgcolor: CARD_BG,
              borderRadius: "8px !important",
              mb: 1.5,
              overflow: "hidden",
              "&:before": { display: "none" },
              "&.Mui-expanded": {
                margin: "0 0 12px 0",
                bgcolor: "#fff",
                border: "1px solid rgba(0,0,0,0.12)",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandLessIcon sx={{ fontSize: 24, color: NAVY }} />}
              sx={{
                px: 2.5,
                minHeight: 56,
                "& .MuiAccordionSummary-content": { my: 1.25 },
              }}
            >
              <Typography
                sx={{ fontSize: "1rem", fontWeight: 800, color: "#111" }}
              >
                {key}
              </Typography>
            </AccordionSummary>

            <AccordionDetails sx={{ px: 2.5, pt: 0, pb: 2 }}>
              <Box
                sx={{
                  border: "1px solid rgba(0,0,0,0.15)",
                  borderRadius: "6px",
                  px: 1.5,
                  py: 1,
                }}
              >
                <FormGroup>
                  {options.map((opt) => (
                    <FormControlLabel
                      key={opt}
                      sx={{ mr: 0 }}
                      control={
                        <Checkbox
                          checked={selected.includes(opt)}
                          onChange={() => toggle(key, opt)}
                          sx={{
                            py: 0.5,
                            color: BRAND,
                            "&.Mui-checked": { color: BRAND },
                            "& .MuiSvgIcon-root": { fontSize: 24 },
                          }}
                        />
                      }
                      label={
                        <Typography
                          sx={{ fontSize: "0.95rem", color: "#333" }}
                        >
                          {opt}
                        </Typography>
                      }
                    />
                  ))}
                </FormGroup>
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}

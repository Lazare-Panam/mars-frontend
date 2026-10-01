"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Box, Container, Typography, useTheme } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { CATEGORY_BAR, type CategoryBarItem } from "./categoryBarData";

/**
 * Product category bar under the main header, with a dropdown per category
 * (like marsselect.co.uk). Desktop only; phones use the menu drawer.
 *
 * - Mouse: hovering a category opens its dropdown; no click needed.
 * - Touch: the first tap opens the dropdown, a second tap follows the link.
 * - Keyboard: focusing a category opens it; Escape closes it.
 * The dropdown is a box the width of the bar, not the full page.
 */
export default function CategoryBar() {
  // A different treatment from the cream main header: a white strip with
  // labels in the MARS signature red (the logo/button colour).
  const theme = useTheme();
  const INK = theme.palette.text.primary;
  const ACCENT = theme.palette.primary.main; // MARS red, #E7390F
  const LINE = theme.palette.divider;

  const [open, setOpen] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Recorded at pointerdown, before the hover and focus events a tap also
  // fires, so a click can tell "first tap" from "tap on an open menu".
  const tap = useRef<{ isTouch: boolean; wasOpen: boolean }>({ isTouch: false, wasOpen: false });

  const openItem = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  };
  // A short delay, so crossing the gap between the bar and the box doesn't close it.
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 150);
  };

  const handlePointerDown = (e: React.PointerEvent, item: CategoryBarItem) => {
    tap.current = { isTouch: e.pointerType !== "mouse", wasOpen: open === item.label };
  };

  const handleClick = (e: React.MouseEvent, item: CategoryBarItem) => {
    // Touch screens have no hover, so the first tap opens the dropdown and a
    // second tap on the same category follows its link.
    if (tap.current.isTouch && !tap.current.wasOpen) {
      e.preventDefault();
      openItem(item.label);
    } else {
      setOpen(null);
    }
  };

  const active = CATEGORY_BAR.find((item) => item.label === open);

  return (
    <Box
      component="nav"
      aria-label="Product categories"
      onMouseLeave={scheduleClose}
      onKeyDown={(e) => e.key === "Escape" && setOpen(null)}
      sx={{
        display: { xs: "none", md: "block" },
        position: "relative",
        bgcolor: "#fff",
        borderTop: `1px solid ${LINE}`,
        borderBottom: `1px solid ${LINE}`,
      }}
    >
      <Container maxWidth="lg">
        <Box component="ul" sx={{ display: "flex", m: 0, p: 0, listStyle: "none" }}>
          {CATEGORY_BAR.map((item, i) => {
            const isOpen = open === item.label;
            return (
              <Box
                component="li"
                key={item.label}
                sx={{
                  flex: 1,
                  display: "flex",
                  borderLeft: i === 0 ? "none" : `1px solid ${LINE}`,
                }}
              >
                <Box
                  component={Link}
                  href={item.href}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onPointerEnter={(e: React.PointerEvent) => e.pointerType === "mouse" && openItem(item.label)}
                  onFocus={() => openItem(item.label)}
                  onPointerDown={(e: React.PointerEvent) => handlePointerDown(e, item)}
                  onClick={(e: React.MouseEvent) => handleClick(e, item)}
                  // Red Title Case labels filling the cell; the open one gets a
                  // light red tint and a red line underneath.
                  sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0.75,
                    py: 1.25,
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    color: ACCENT,
                    bgcolor: isOpen ? "rgba(231,57,15,0.06)" : "transparent",
                    boxShadow: isOpen ? `inset 0 -2px 0 ${ACCENT}` : "none",
                    transition: "background-color 0.15s ease, box-shadow 0.15s ease",
                    "&:hover": { bgcolor: "rgba(231,57,15,0.06)" },
                  }}
                >
                  {item.label}
                  <KeyboardArrowDownIcon
                    sx={{
                      fontSize: 17,
                      transition: "transform 0.2s ease",
                      transform: isOpen ? "rotate(180deg)" : "none",
                      color: "inherit",
                    }}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>

      {active && (
        <Container
          maxWidth="lg"
          onMouseEnter={() => openItem(active.label)}
          sx={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 25 }}
        >
          {/* Same box as the Products dropdown (MegaMenuPanel). Single-column
              categories stay a sensible width instead of stretching. */}
          <Box
            sx={{
              bgcolor: "#fff",
              border: `1px solid ${LINE}`,
              borderTop: "none",
              boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
              px: 5,
              py: 4,
              display: "grid",
              gridTemplateColumns: `repeat(${Math.max(active.columns.length, 3)}, 1fr)`,
              columnGap: 6,
            }}
          >
            {active.columns.map((entry) => {
              // A column is one section or a stack of them; treat both as a list.
              const sections = Array.isArray(entry) ? entry : [entry];
              return (
              <Box
                key={sections[0].heading}
                sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}
              >
              {sections.map((column) => (
              <Box key={column.heading}>
                <Typography
                  component={Link}
                  href={column.href}
                  onClick={() => setOpen(null)}
                  // Small orange uppercase heading, as in the Products dropdown.
                  sx={{
                    display: "block",
                    color: ACCENT,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    pb: 1.25,
                    mb: 1.5,
                    borderBottom: `1px solid ${LINE}`,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {column.heading}
                </Typography>
                <Box
                  component="ul"
                  sx={{ m: 0, p: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 0.5 }}
                >
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Typography
                        component={Link}
                        href={link.href}
                        onClick={() => setOpen(null)}
                        sx={{
                          display: "block",
                          py: 0.6,
                          fontSize: "0.9rem",
                          fontWeight: 500,
                          color: INK,
                          textDecoration: "none",
                          transition: "color 0.15s ease",
                          "&:hover": { color: ACCENT },
                        }}
                      >
                        {link.label}
                      </Typography>
                    </li>
                  ))}
                </Box>
              </Box>
              ))}
              </Box>
              );
            })}
          </Box>
        </Container>
      )}
    </Box>
  );
}

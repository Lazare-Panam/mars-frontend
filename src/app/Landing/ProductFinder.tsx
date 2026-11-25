"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, IconButton, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { VALVE_TYPES } from "./valveTypes";

type ValveType = (typeof VALVE_TYPES)[number];

/**
 * "Quickly find what you need" card for the hero (modelled on marsselect.co.uk).
 * Browse valve ranges by type; clicking a range opens a details panel with that
 * range's products. Text search lives in the navbar (one search, no duplicate box).
 * Desktop: the panel opens beside the card. Phones: it replaces the list.
 */
export default function ProductFinder() {
  const [selected, setSelected] = useState<ValveType | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Close on Escape or a click outside the finder.
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setSelected(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [selected]);

  return (
    <Box ref={rootRef} sx={{ position: "relative", width: "100%" }}>
      <Box
        component="nav"
        aria-label="Product finder"
        sx={{
          bgcolor: "#fff",
          borderRadius: selected ? { xs: "6px", md: "6px 0 0 6px" } : "6px",
          overflow: "hidden",
          boxShadow: "0 18px 44px rgba(58,61,66,0.14)",
        }}
      >
        <Box sx={{ textAlign: "center", px: 3, pt: { xs: 3, md: 2 }, pb: { xs: 2.5, md: 1.75 }, borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
          <Typography sx={{ color: "text.primary", fontSize: "1rem" }}>Quickly find what you need</Typography>
          <Typography sx={{ color: "primary.main", fontWeight: 800, fontSize: "1.5rem", lineHeight: 1.25 }}>
            Browse by valve type
          </Typography>
        </Box>

        {/* On phones the details replace the list inside the card. */}
        <Box sx={{ display: { xs: selected ? "block" : "none", md: "none" } }}>
          {selected && <Details type={selected} onBack={() => setSelected(null)} />}
        </Box>

        <Box
          component="ul"
          sx={{
            m: 0,
            p: 0,
            listStyle: "none",
            display: { xs: selected ? "none" : "block", md: "block" },
          }}
        >
          {VALVE_TYPES.map((type, i) => {
            const isActive = selected?.href === type.href;
            return (
              <li key={type.href}>
                <Box
                  component="button"
                  type="button"
                  aria-expanded={isActive}
                  onClick={() => setSelected(isActive ? null : type)}
                  sx={{
                    all: "unset",
                    boxSizing: "border-box",
                    width: "100%",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    px: 2.5,
                    py: { xs: 1.25, md: 0.75 },
                    // Tighter rows on short desktop screens so the card fits.
                    "@media (min-width: 900px) and (max-height: 880px)": { py: 0.4 },
                    color: isActive ? "#fff" : "text.primary",
                    bgcolor: isActive ? "primary.main" : "transparent",
                    borderTop: i === 0 ? "none" : "1px solid rgba(0,0,0,0.06)",
                    transition: "background-color 0.15s ease, color 0.15s ease",
                    "&:hover": isActive ? undefined : { bgcolor: "rgba(224,57,62,0.05)", color: "primary.main" },
                    "&:focus-visible": { outline: "2px solid", outlineColor: "primary.main", outlineOffset: -2 },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: 44,
                      height: 44,
                      flexShrink: 0,
                      bgcolor: "#fff",
                      borderRadius: "4px",
                    }}
                  >
                    <Image src={type.image} alt={type.alt} fill draggable={false} style={{ objectFit: "contain" }} sizes="44px" />
                  </Box>
                  <Typography sx={{ flex: 1, fontSize: "0.95rem", fontWeight: isActive ? 700 : 500, color: "inherit" }}>
                    {type.label}
                  </Typography>
                  <ChevronRightIcon sx={{ fontSize: 22, color: isActive ? "#fff" : "text.disabled" }} />
                </Box>
              </li>
            );
          })}
        </Box>
      </Box>

      {/* Desktop: details panel opens beside the card. */}
      {selected && (
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "100%",
            width: { md: 420, xl: 480 },
            bgcolor: "#fff",
            borderLeft: "1px solid rgba(0,0,0,0.08)",
            borderRadius: "0 6px 6px 0",
            boxShadow: "0 18px 44px rgba(58,61,66,0.14)",
            overflowY: "auto",
            zIndex: 5,
            animation: "finderIn 0.18s ease",
            "@keyframes finderIn": { from: { opacity: 0, transform: "translateX(-8px)" }, to: { opacity: 1, transform: "none" } },
          }}
        >
          <Details type={selected} onBack={() => setSelected(null)} showClose />
        </Box>
      )}
    </Box>
  );
}

function Details({ type, onBack, showClose }: { type: ValveType; onBack: () => void; showClose?: boolean }) {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5 }}>
        <Typography component="h2" sx={{ fontWeight: 800, fontSize: "1.1rem", color: "text.primary" }}>
          {type.label}
        </Typography>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <IconButton size="small" aria-label="Back to all ranges" onClick={onBack}>
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          {showClose && (
            <IconButton size="small" aria-label="Close" onClick={onBack}>
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1.5 }}>
        {type.products.map((product) => (
          <Box
            key={product.href}
            component={Link}
            href={product.href}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              p: 1.25,
              textAlign: "center",
              textDecoration: "none",
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: "4px",
              transition: "border-color 0.15s ease, box-shadow 0.15s ease",
              cursor: "pointer",
              "&:hover": { borderColor: "primary.main", boxShadow: "0 6px 16px rgba(0,0,0,0.08)" },
              "&:hover .finder-details": { bgcolor: "primary.main", color: "#fff" },
            }}
          >
            <Box sx={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}>
              <Image src={product.image} alt={product.name} fill draggable={false} style={{ objectFit: "contain" }} sizes="120px" />
            </Box>
            <Typography sx={{ color: "primary.main", fontSize: "0.78rem", lineHeight: 1.3, fontWeight: 500, flex: 1 }}>
              {product.name}
            </Typography>
            {/* Part of the same link as the photo and name, so any of them opens the product. */}
            <Box
              component="span"
              className="finder-details"
              sx={{
                width: "100%",
                py: 0.6,
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "primary.main",
                border: "1px solid",
                borderColor: "primary.main",
                borderRadius: "3px",
                transition: "background-color 0.15s ease, color 0.15s ease",
              }}
            >
              View details
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

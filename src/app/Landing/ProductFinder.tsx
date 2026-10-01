"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Box, IconButton, InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { VALVE_TYPES, searchProducts } from "./valveTypes";

type ValveType = (typeof VALVE_TYPES)[number];

// Popular searches cycled through in the search box hint.
const POPULAR = ["Series 77", "Series 77SN", "Series 83", "Series 88", "Series 90D", "Flanged ball valves", "Sanitary valves"];

/**
 * Typewriter hint: types a popular search letter by letter, pauses, deletes
 * it, then moves to the next one. Paused while the user is typing.
 */
function useTypedHint(paused: boolean) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (paused) return;
    const word = POPULAR[index];
    let delay = deleting ? 45 : 90;
    if (!deleting && length === word.length) delay = 1600; // pause on the full word
    if (deleting && length === 0) delay = 300; // short gap before the next word
    const id = setTimeout(() => {
      if (!deleting && length === word.length) setDeleting(true);
      else if (deleting && length === 0) {
        setDeleting(false);
        setIndex((i) => (i + 1) % POPULAR.length);
      } else setLength((l) => l + (deleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(id);
  }, [paused, index, length, deleting]);

  return { full: POPULAR[index], typed: POPULAR[index].slice(0, length) };
}

/**
 * "Quickly find what you need" card for the hero (modelled on marsselect.co.uk).
 * Clicking a range highlights it and opens a details panel with that range's
 * products; clicking a product tile goes to that product's page.
 * Desktop: the panel opens beside the card. Phones: it replaces the list.
 */
export default function ProductFinder() {
  const [selected, setSelected] = useState<ValveType | null>(null);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // While typing, matching products replace the list of ranges.
  const searching = query.trim().length > 0;
  const hint = useTypedHint(query.length > 0);
  const results = searchProducts(query);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Enter opens the top result.
    if (results[0]) router.push(results[0].href);
  };

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
          boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
        }}
      >
        <Box sx={{ textAlign: "center", px: 3, pt: 3, pb: 2.5, borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
          <Typography sx={{ color: "text.primary", fontSize: "1rem" }}>Quickly find what you need</Typography>
          <Typography sx={{ color: "primary.main", fontWeight: 800, fontSize: "1.5rem", lineHeight: 1.25 }}>
            Use our product finder
          </Typography>

          <Box
            component="form"
            role="search"
            onSubmit={handleSearch}
            sx={{
              position: "relative",
              mt: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 1.5,
              py: 0.75,
              border: "1px solid rgba(0,0,0,0.15)",
              borderRadius: "4px",
              transition: "border-color 0.15s ease, box-shadow 0.15s ease",
              "&:focus-within": { borderColor: "primary.main", boxShadow: "0 0 0 3px rgba(231,57,15,0.12)" },
            }}
          >
            <SearchIcon sx={{ color: "text.disabled", fontSize: 20 }} />
            <InputBase
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelected(null);
              }}
              inputProps={{ "aria-label": "Search products, for example Series 77 or Series 88" }}
              sx={{ flex: 1, fontSize: "0.9rem" }}
            />
            {/* Animated hint, shown over the empty box: "Search for Series 77". */}
            {!query && (
              <Box
                aria-hidden
                data-testid="search-hint"
                sx={{
                  position: "absolute",
                  left: 44,
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  fontSize: "0.9rem",
                  color: "text.disabled",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "left",
                }}
              >
                Search for{" "}
                <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
                  {hint.typed}
                </Box>
                {/* Blinking cursor */}
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    width: "2px",
                    height: "1em",
                    ml: "1px",
                    verticalAlign: "-0.15em",
                    bgcolor: "primary.main",
                    animation: "hintBlink 1s steps(1) infinite",
                    "@keyframes hintBlink": { "50%": { opacity: 0 } },
                  }}
                />
              </Box>
            )}
            {searching && (
              <IconButton size="small" aria-label="Clear search" onClick={() => setQuery("")} sx={{ p: 0.25 }}>
                <CloseIcon sx={{ fontSize: 16 }} />
              </IconButton>
            )}
          </Box>
        </Box>

        {searching && (
          <Box component="ul" aria-label="Search results" sx={{ m: 0, p: 0, listStyle: "none", maxHeight: 390, overflowY: "auto" }}>
            {results.length === 0 && (
              <Box component="li" sx={{ px: 3, py: 3, textAlign: "center", color: "text.secondary", fontSize: "0.9rem" }}>
                No products match “{query.trim()}”.{" "}
                <Link href="/contact" style={{ color: "inherit", fontWeight: 600 }}>
                  Ask our team
                </Link>
              </Box>
            )}
            {results.map((item, i) => (
              <li key={item.href}>
                <Box
                  component={Link}
                  href={item.href}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    px: 2.5,
                    py: 1,
                    textDecoration: "none",
                    color: "text.primary",
                    borderTop: i === 0 ? "none" : "1px solid rgba(0,0,0,0.06)",
                    "&:hover": { bgcolor: "rgba(231,57,15,0.05)" },
                    "&:hover .result-name": { color: "primary.main" },
                  }}
                >
                  <Box sx={{ position: "relative", width: 40, height: 40, flexShrink: 0 }}>
                    <Image src={item.image} alt={item.name} fill draggable={false} style={{ objectFit: "contain" }} sizes="40px" />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography className="result-name" sx={{ fontSize: "0.92rem", fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                    <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>{item.group}</Typography>
                  </Box>
                  <ChevronRightIcon sx={{ color: "text.disabled", fontSize: 20 }} />
                </Box>
              </li>
            ))}
          </Box>
        )}

        {/* On phones the details replace the list inside the card. */}
        <Box sx={{ display: { xs: selected && !searching ? "block" : "none", md: "none" } }}>
          {selected && <Details type={selected} onBack={() => setSelected(null)} />}
        </Box>

        <Box
          component="ul"
          sx={{
            m: 0,
            p: 0,
            listStyle: "none",
            display: searching ? "none" : { xs: selected ? "none" : "block", md: "block" },
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
                    py: 1.25,
                    color: isActive ? "#fff" : "text.primary",
                    bgcolor: isActive ? "primary.main" : "transparent",
                    borderTop: i === 0 ? "none" : "1px solid rgba(0,0,0,0.06)",
                    transition: "background-color 0.15s ease, color 0.15s ease",
                    "&:hover": isActive ? undefined : { bgcolor: "rgba(231,57,15,0.05)", color: "primary.main" },
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
            boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
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

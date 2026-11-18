"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Checkbox,
  Chip,
  CircularProgress,
  Button,
} from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSearch, type ProductHit } from "@/api/useSearch";
import SearchBar from "@/Common/Navbar/SearchBar";

const WIDE = 1320;
const CARD_BORDER = "1px solid rgba(43,27,20,0.10)";

// Filter groups show in this order when present; anything else follows alphabetically.
const PREFERRED_ORDER = [
  "Series", "Size", "End Connection", "Ends", "Port", "Body", "Seat",
  "Ball Configuration", "Flange Rating", "Pressure Rating", "Lockable",
];

type Pair = { name: string; value: string };
type Selected = Record<string, Set<string>>;

// Every filter on a product, including its series as a "Series" facet.
function pairsOf(p: ProductHit): Pair[] {
  const out: Pair[] = [];
  if (p.seriesName) out.push({ name: "Series", value: p.seriesName });
  for (const a of p.attributes ?? []) if (a?.name && a?.value) out.push(a);
  return out;
}

function mapOf(p: ProductHit): Map<string, string> {
  return new Map(pairsOf(p).map((x) => [x.name, x.value]));
}

function matchesExcept(m: Map<string, string>, selected: Selected, exceptName?: string): boolean {
  for (const [name, vals] of Object.entries(selected)) {
    if (name === exceptName || vals.size === 0) continue;
    const v = m.get(name);
    if (!v || !vals.has(v)) return false;
  }
  return true;
}

function orderGroups(names: string[]): string[] {
  return names.sort((a, b) => {
    const ia = PREFERRED_ORDER.indexOf(a);
    const ib = PREFERRED_ORDER.indexOf(b);
    if (ia !== -1 || ib !== -1) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    return a.localeCompare(b);
  });
}

export default function SearchClient({ q }: { q: string }) {
  const { data, isFetching, isError } = useSearch(q);
  const [selected, setSelected] = useState<Selected>({});

  const products = data?.products ?? [];
  const series = data?.series ?? [];

  // Precompute each product's name→value map once.
  const maps = useMemo(() => products.map((p) => mapOf(p)), [products]);

  const filtered = useMemo(
    () => products.filter((_, i) => matchesExcept(maps[i], selected)),
    [products, maps, selected],
  );

  // Build a filter group for every attribute name present; each value's count reflects
  // the OTHER active filters, so counts narrow as you tick boxes.
  const facetGroups = useMemo(() => {
    const names = new Set<string>();
    for (const m of maps) for (const name of m.keys()) names.add(name);

    return orderGroups([...names]).map((name) => {
      const counts = new Map<string, number>();
      maps.forEach((m) => {
        if (!matchesExcept(m, selected, name)) return;
        const v = m.get(name);
        if (v) counts.set(v, (counts.get(v) ?? 0) + 1);
      });
      const values = [...counts.entries()].sort(
        (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
      );
      return { name, values };
    }).filter((g) => g.values.length > 0);
  }, [maps, selected]);

  const toggle = (name: string, value: string) =>
    setSelected((prev) => {
      const next: Selected = { ...prev };
      const set = new Set(next[name] ?? []);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      next[name] = set;
      return next;
    });

  const activeChips = Object.entries(selected).flatMap(([name, vals]) =>
    [...vals].map((v) => ({ name, value: v })),
  );
  const clearAll = () => setSelected({});
  const hasQuery = q.trim().length > 0;

  return (
    <Box sx={{ bgcolor: "#FAF6F4", minHeight: "70vh" }}>
      <Container maxWidth={false} sx={{ maxWidth: WIDE, px: { xs: 2.5, md: 5 }, py: { xs: 4, md: 5 } }}>
        <Box sx={{ maxWidth: 520, mb: 3 }}>
          <SearchBar fullWidth initial={q} />
        </Box>

        <Typography component="h1" sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, fontWeight: 800, letterSpacing: "-0.02em" }}>
          {hasQuery ? <>Results for &ldquo;{q}&rdquo;</> : "Search"}
        </Typography>
        {hasQuery && (
          <Typography sx={{ color: "text.secondary", mt: 0.5, fontSize: "0.95rem" }}>
            {isFetching ? "Searching…" : `${series.length} series · ${filtered.length} product${filtered.length === 1 ? "" : "s"}`}
          </Typography>
        )}

        {!hasQuery && (
          <Typography sx={{ color: "text.secondary", mt: 2 }}>
            Type a series, part number or spec in the search bar to begin.
          </Typography>
        )}

        {isError && (
          <Typography sx={{ color: "error.main", mt: 3 }}>
            Search is unavailable right now. Please try again shortly.
          </Typography>
        )}

        {hasQuery && !isError && (
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "250px 1fr" }, gap: { xs: 3, md: 4 }, mt: 3 }}>
            {/* ---------- Facet sidebar ---------- */}
            <Box component="aside" aria-label="Filters">
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: 1.5 }}>
                <Typography sx={{ fontWeight: 800, fontSize: "1rem" }}>Filters</Typography>
                {activeChips.length > 0 && (
                  <Button onClick={clearAll} size="small" sx={{ textTransform: "none", color: "primary.main", fontWeight: 700, minWidth: 0, p: 0 }}>
                    Clear all
                  </Button>
                )}
              </Box>

              {activeChips.length > 0 && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 2 }}>
                  {activeChips.map(({ name, value }) => (
                    <Chip
                      key={`${name}:${value}`}
                      label={value}
                      size="small"
                      onDelete={() => toggle(name, value)}
                      sx={{ bgcolor: "rgba(231,57,15,0.08)", color: "primary.dark", fontWeight: 600 }}
                    />
                  ))}
                </Box>
              )}

              {facetGroups.length === 0 ? (
                <Typography sx={{ color: "text.secondary", fontSize: "0.85rem" }}>
                  No filters for these results.
                </Typography>
              ) : (
                facetGroups.map((g) => (
                  <Box key={g.name} sx={{ mb: 2.5 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: "0.7rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "text.secondary", mb: 0.75 }}>
                      {g.name}
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      {g.values.map(([value, count]) => {
                        const checked = selected[g.name]?.has(value) ?? false;
                        return (
                          <Box
                            key={value}
                            component="label"
                            sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer", py: 0.1, "&:hover .facet-label": { color: "text.primary" } }}
                          >
                            <Checkbox
                              checked={checked}
                              onChange={() => toggle(g.name, value)}
                              size="small"
                              sx={{ p: 0.5, color: "rgba(43,27,20,0.3)", "&.Mui-checked": { color: "primary.main" } }}
                            />
                            <Typography className="facet-label no-capitalize" sx={{ flex: 1, fontSize: "0.85rem", color: checked ? "text.primary" : "text.secondary" }}>
                              {value}
                            </Typography>
                            <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>{count}</Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                ))
              )}
            </Box>

            {/* ---------- Results ---------- */}
            <Box>
              {isFetching && products.length === 0 ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                  <CircularProgress sx={{ color: "primary.main" }} />
                </Box>
              ) : series.length === 0 && filtered.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 8, color: "text.secondary" }}>
                  <SearchOffIcon sx={{ fontSize: 44, mb: 1, opacity: 0.5 }} />
                  <Typography sx={{ fontWeight: 700 }}>No results found</Typography>
                  <Typography sx={{ fontSize: "0.9rem", mt: 0.5 }}>Try a different term, or ask our team for a part.</Typography>
                </Box>
              ) : (
                <>
                  {series.length > 0 && (
                    <Box sx={{ mb: 4 }}>
                      <Typography component="h2" sx={{ fontWeight: 800, fontSize: "1.1rem", mb: 1.5 }}>Series</Typography>
                      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 2 }}>
                        {series.map((s) => (
                          <Box
                            key={s.id}
                            component={Link}
                            href={s.href}
                            sx={{ display: "flex", gap: 2, p: 2, bgcolor: "#fff", border: CARD_BORDER, borderRadius: "14px", textDecoration: "none", color: "inherit", transition: "border-color .15s ease, transform .15s ease", "&:hover": { borderColor: "rgba(231,57,15,0.45)", transform: "translateY(-2px)" } }}
                          >
                            {s.image && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={s.image} alt="" style={{ width: 64, height: 64, objectFit: "contain", flexShrink: 0, mixBlendMode: "multiply" } as React.CSSProperties} />
                            )}
                            <Box sx={{ minWidth: 0 }}>
                              <Typography className="no-capitalize" sx={{ fontWeight: 800, fontSize: "0.98rem" }}>{s.name}</Typography>
                              {s.design && <Typography className="no-capitalize" sx={{ fontSize: "0.8rem", color: "text.secondary", mt: 0.25 }}>{s.design}</Typography>}
                              <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, color: "primary.main", fontWeight: 700, fontSize: "0.82rem", mt: 0.75 }}>
                                View series <ArrowForwardIcon sx={{ fontSize: 15 }} />
                              </Box>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}

                  {filtered.length > 0 && (
                    <Box>
                      <Typography component="h2" sx={{ fontWeight: 800, fontSize: "1.1rem", mb: 1.5 }}>Products</Typography>
                      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }, gap: 2 }}>
                        {filtered.map((p) => (
                          <Box
                            key={p.id}
                            component={Link}
                            href={p.href}
                            sx={{ display: "flex", flexDirection: "column", bgcolor: "#fff", border: CARD_BORDER, borderRadius: "14px", overflow: "hidden", textDecoration: "none", color: "inherit", transition: "border-color .15s ease, transform .15s ease, box-shadow .15s ease", "&:hover": { borderColor: "rgba(231,57,15,0.45)", transform: "translateY(-3px)", boxShadow: "0 14px 32px rgba(43,27,20,0.10)" } }}
                          >
                            <Box sx={{ height: 130, display: "flex", alignItems: "center", justifyContent: "center", p: 1.5, background: "radial-gradient(120% 90% at 50% 40%, #FFFFFF 0%, #F4EEEA 100%)" }}>
                              {p.image && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={p.image} alt="" loading="lazy" style={{ maxWidth: "80%", maxHeight: "100%", objectFit: "contain", mixBlendMode: "multiply" } as React.CSSProperties} />
                              )}
                            </Box>
                            <Box sx={{ p: 1.75, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                              <Typography sx={{ fontWeight: 800, fontSize: "0.9rem", wordBreak: "break-word" }}>{p.partNumber}</Typography>
                              {p.seriesName && <Typography className="no-capitalize" sx={{ fontSize: "0.78rem", color: "text.secondary", mt: 0.25 }}>{p.seriesName}</Typography>}
                              {p.specs && (
                                <Typography className="no-capitalize" sx={{ fontSize: "0.78rem", color: "text.secondary", mt: 0.75, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                  {p.specs}
                                </Typography>
                              )}
                              <Box sx={{ mt: "auto", pt: 1.25, display: "inline-flex", alignItems: "center", gap: 0.5, color: "primary.main", fontWeight: 700, fontSize: "0.82rem" }}>
                                Configure &amp; quote <ArrowForwardIcon sx={{ fontSize: 15 }} />
                              </Box>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}

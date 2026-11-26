"use client";

import React, { useEffect, useMemo, useState } from "react";
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSearch, type ProductHit } from "@/api/useSearch";
import SearchBar from "@/Common/Navbar/SearchBar";

const WIDE = 1320;
const CARD_BORDER = "1px solid rgba(58,61,66,0.10)";
const PAGE_SIZE = 24;       // products per page
const VALUE_LIMIT = 6;      // values shown per filter before "Show all"
const DEFAULT_OPEN = 4;     // first N filter groups open by default

// Filter groups show in this order when present; anything else follows alphabetically.
const PREFERRED_ORDER = [
  "Series", "Size", "End Connection", "Ends", "Port", "Body", "Seat",
  "Seat Material", "Ball Configuration", "Operating Pressure",
  "Flange Rating", "Pressure Rating", "Lock", "Lockable", "Handle",
];

type Pair = { name: string; value: string };
type Selected = Record<string, Set<string>>;

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
// "1 1/4\"" -> 1.25, "3/8\"" -> 0.375, "2\"" -> 2. Non-numeric sort last.
function sizeRank(v: string): number {
  const s = v.replace(/["″]|in\b/gi, "").trim();
  let total = 0;
  let matched = false;
  for (const part of s.split(/\s+/)) {
    if (/^\d+\/\d+$/.test(part)) {
      const [a, b] = part.split("/").map(Number);
      if (b) { total += a / b; matched = true; }
    } else if (/^\d+(\.\d+)?$/.test(part)) {
      total += Number(part); matched = true;
    }
  }
  return matched ? total : Number.MAX_SAFE_INTEGER;
}
function sortValues(groupName: string, entries: [string, number][]): [string, number][] {
  const isSize = /size/i.test(groupName);
  return [...entries].sort((a, b) =>
    isSize ? sizeRank(a[0]) - sizeRank(b[0]) : b[1] - a[1] || a[0].localeCompare(b[0]),
  );
}
function pageWindow(current: number, total: number): number[] {
  const span = Math.min(5, total);
  let start = Math.max(1, current - 2);
  const end = Math.min(total, start + span - 1);
  start = Math.max(1, end - span + 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default function SearchClient({ q }: { q: string }) {
  const { data, isFetching, isError } = useSearch(q);
  const [selected, setSelected] = useState<Selected>({});
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [showAll, setShowAll] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState(1);

  const products = data?.products ?? [];
  const maps = useMemo(() => products.map((p) => mapOf(p)), [products]);

  const filtered = useMemo(
    () => products.filter((_, i) => matchesExcept(maps[i], selected)),
    [products, maps, selected],
  );

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
      return { name, values: sortValues(name, [...counts.entries()]) };
    }).filter((g) => g.values.length > 0);
  }, [maps, selected]);

  // Reset to page 1 whenever the active filters change.
  useEffect(() => { setPage(1); }, [selected]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSafe = Math.min(page, totalPages);
  const pageItems = filtered.slice((pageSafe - 1) * PAGE_SIZE, pageSafe * PAGE_SIZE);

  const toggle = (name: string, value: string) =>
    setSelected((prev) => {
      const next: Selected = { ...prev };
      const set = new Set(next[name] ?? []);
      if (set.has(value)) set.delete(value); else set.add(value);
      next[name] = set;
      return next;
    });

  const activeChips = Object.entries(selected).flatMap(([name, vals]) =>
    [...vals].map((v) => ({ name, value: v })),
  );
  const clearAll = () => setSelected({});
  const hasQuery = q.trim().length > 0;

  return (
    <Box sx={{ bgcolor: "#F5F5F6", minHeight: "70vh" }}>
      <Container maxWidth={false} sx={{ maxWidth: WIDE, px: { xs: 2.5, md: 5 }, py: { xs: 4, md: 5 } }}>
        <Box sx={{ maxWidth: 560, mb: 3 }}>
          <SearchBar fullWidth prominent initial={q} />
        </Box>

        <Typography component="h1" sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, fontWeight: 800, letterSpacing: "-0.02em" }}>
          {hasQuery ? <>Results for &ldquo;{q}&rdquo;</> : "Search"}
        </Typography>
        {hasQuery && (
          <Typography sx={{ color: "text.secondary", mt: 0.5, fontSize: "0.95rem" }}>
            {isFetching ? "Searching…" : `${filtered.length} product${filtered.length === 1 ? "" : "s"}`}
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
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "280px 1fr" }, gap: { xs: 3, md: 4 }, mt: 3, alignItems: "start" }}>
            {/* ---------- Facet sidebar ---------- */}
            <Box
              component="aside"
              aria-label="Filters"
              sx={{ bgcolor: "#fff", border: CARD_BORDER, borderRadius: "16px", p: { xs: 2, md: 2.5 }, position: { md: "sticky" }, top: { md: 16 } }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                <Typography sx={{ fontWeight: 800, fontSize: "1.1rem" }}>Filters</Typography>
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
                      sx={{ bgcolor: "rgba(224,57,62,0.08)", color: "primary.dark", fontWeight: 600, maxWidth: "100%" }}
                    />
                  ))}
                </Box>
              )}

              {facetGroups.length === 0 ? (
                <Typography sx={{ color: "text.secondary", fontSize: "0.85rem" }}>
                  No filters for these results.
                </Typography>
              ) : (
                facetGroups.map((g, idx) => {
                  const isCollapsed = collapsed[g.name] ?? idx >= DEFAULT_OPEN;
                  const expanded = showAll[g.name] ?? false;
                  const shown = expanded ? g.values : g.values.slice(0, VALUE_LIMIT);
                  return (
                    <Box key={g.name} sx={{ borderTop: idx === 0 ? "none" : "1px solid rgba(58,61,66,0.08)", py: 1.25 }}>
                      <Box
                        component="button"
                        type="button"
                        onClick={() => setCollapsed((c) => ({ ...c, [g.name]: !isCollapsed }))}
                        aria-expanded={!isCollapsed}
                        sx={{ all: "unset", display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", cursor: "pointer", py: 0.25 }}
                      >
                        <Typography sx={{ fontWeight: 800, fontSize: "0.82rem", letterSpacing: "0.04em", textTransform: "uppercase", color: "text.primary" }}>
                          {g.name}
                        </Typography>
                        <ExpandMoreIcon sx={{ fontSize: 20, color: "text.secondary", transition: "transform .2s ease", transform: isCollapsed ? "rotate(-90deg)" : "none" }} />
                      </Box>

                      {!isCollapsed && (
                        <Box sx={{ mt: 0.5, display: "flex", flexDirection: "column" }}>
                          {shown.map(([value, count]) => {
                            const checked = selected[g.name]?.has(value) ?? false;
                            return (
                              <Box
                                key={value}
                                component="label"
                                sx={{ display: "flex", alignItems: "center", gap: 0.75, cursor: "pointer", py: 0.4, borderRadius: "8px", px: 0.5, mx: -0.5, "&:hover": { bgcolor: "rgba(58,61,66,0.03)" } }}
                              >
                                <Checkbox
                                  checked={checked}
                                  onChange={() => toggle(g.name, value)}
                                  size="small"
                                  sx={{ p: 0.25, color: "rgba(58,61,66,0.3)", "&.Mui-checked": { color: "primary.main" } }}
                                />
                                <Typography className="no-capitalize" sx={{ flex: 1, fontSize: "0.9rem", fontWeight: checked ? 700 : 400, color: checked ? "text.primary" : "text.secondary" }}>
                                  {value}
                                </Typography>
                                <Typography sx={{ fontSize: "0.78rem", color: "text.disabled" }}>{count}</Typography>
                              </Box>
                            );
                          })}
                          {g.values.length > VALUE_LIMIT && (
                            <Button
                              onClick={() => setShowAll((s) => ({ ...s, [g.name]: !expanded }))}
                              size="small"
                              sx={{ alignSelf: "flex-start", textTransform: "none", color: "primary.main", fontWeight: 700, fontSize: "0.8rem", mt: 0.25, minWidth: 0, px: 0.5 }}
                            >
                              {expanded ? "Show less" : `Show all (${g.values.length})`}
                            </Button>
                          )}
                        </Box>
                      )}
                    </Box>
                  );
                })
              )}
            </Box>

            {/* ---------- Results ---------- */}
            <Box>
              {isFetching && products.length === 0 ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                  <CircularProgress sx={{ color: "primary.main" }} />
                </Box>
              ) : filtered.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 8, color: "text.secondary" }}>
                  <SearchOffIcon sx={{ fontSize: 44, mb: 1, opacity: 0.5 }} />
                  <Typography sx={{ fontWeight: 700 }}>No results found</Typography>
                  <Typography sx={{ fontSize: "0.9rem", mt: 0.5 }}>Try a different term, or ask our team for a part.</Typography>
                </Box>
              ) : (
                <>
                  {/* Live count + active chips row */}
                  <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1, mb: 2 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "0.95rem" }}>
                      {filtered.length} product{filtered.length === 1 ? "" : "s"}
                    </Typography>
                    {activeChips.map(({ name, value }) => (
                      <Chip
                        key={`top-${name}:${value}`}
                        label={value}
                        size="small"
                        onDelete={() => toggle(name, value)}
                        sx={{ bgcolor: "rgba(224,57,62,0.08)", color: "primary.dark", fontWeight: 600 }}
                      />
                    ))}
                    {activeChips.length > 0 && (
                      <Button onClick={clearAll} size="small" sx={{ textTransform: "none", color: "text.secondary", fontWeight: 600, minWidth: 0 }}>
                        Clear
                      </Button>
                    )}
                  </Box>

                  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }, gap: 2 }}>
                    {pageItems.map((p) => (
                      <Box
                        key={p.id}
                        component={Link}
                        href={p.href}
                        sx={{ display: "flex", flexDirection: "column", bgcolor: "#fff", border: CARD_BORDER, borderRadius: "14px", overflow: "hidden", textDecoration: "none", color: "inherit", transition: "border-color .15s ease, transform .15s ease, box-shadow .15s ease", "&:hover": { borderColor: "rgba(224,57,62,0.45)", transform: "translateY(-3px)", boxShadow: "0 14px 32px rgba(58,61,66,0.10)" } }}
                      >
                        <Box sx={{ height: 120, display: "flex", alignItems: "center", justifyContent: "center", p: 1.5, background: "radial-gradient(120% 90% at 50% 40%, #FFFFFF 0%, #ECEDEE 100%)" }}>
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

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0.5, mt: 4 }}>
                      <PageBtn onClick={() => setPage(pageSafe - 1)} disabled={pageSafe === 1} aria-label="Previous page">
                        <ChevronLeftIcon sx={{ fontSize: 20 }} />
                      </PageBtn>
                      {pageWindow(pageSafe, totalPages)[0] > 1 && (
                        <Typography sx={{ color: "text.disabled", px: 0.5 }}>…</Typography>
                      )}
                      {pageWindow(pageSafe, totalPages).map((n) => (
                        <PageBtn key={n} onClick={() => setPage(n)} active={n === pageSafe}>
                          {n}
                        </PageBtn>
                      ))}
                      {pageWindow(pageSafe, totalPages).slice(-1)[0] < totalPages && (
                        <Typography sx={{ color: "text.disabled", px: 0.5 }}>…</Typography>
                      )}
                      <PageBtn onClick={() => setPage(pageSafe + 1)} disabled={pageSafe === totalPages} aria-label="Next page">
                        <ChevronRightIcon sx={{ fontSize: 20 }} />
                      </PageBtn>
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

function PageBtn({
  children, onClick, active, disabled, ...rest
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  "aria-label"?: string;
}) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      disabled={disabled}
      {...rest}
      sx={{
        all: "unset",
        minWidth: 36,
        height: 36,
        px: 1,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
        cursor: disabled ? "default" : "pointer",
        fontWeight: 700,
        fontSize: "0.9rem",
        color: active ? "#fff" : disabled ? "text.disabled" : "text.primary",
        bgcolor: active ? "primary.main" : "transparent",
        border: active ? "none" : CARD_BORDER,
        opacity: disabled ? 0.5 : 1,
        transition: "background-color .15s ease, border-color .15s ease",
        "&:hover": disabled || active ? undefined : { borderColor: "primary.main", color: "primary.main" },
      }}
    >
      {children}
    </Box>
  );
}

"use client";

import { use, useCallback, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useProductVariants } from "@/api/useProductVariants";
import VariantsSidebar from "./components/VariantsSidebar";
import VariantsTable from "./components/VariantsTable";
import VariantsActiveFilters from "./components/VariantsActiveFilters";
import { alpha } from "@mui/material/styles";
import { BANNER_GRADIENT } from "@/theme/brand";

const BRAND = "#E7390F";

// Keys we manage ourselves in the query string that are NOT spec filters
// (add 'sort', 'minPrice', 'maxPrice' here later if/when you build those)
const RESERVED_PARAMS = new Set<string>([]);

// Turns a raw string like `1/4" ~ 4"` or `Port Type` into a clean, URL-safe
// slug like `1-4-4` or `port-type`. Used for BOTH filter keys and values.
function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/["']/g, "") // drop quote marks entirely
    .replace(/[^a-z0-9]+/g, "-") // everything else (space, /, ~, etc.) -> dash
    .replace(/^-+|-+$/g, ""); // trim leading/trailing dashes
}

export default function ProductVariantsPage({
  params,
}: {
  params: Promise<{ id: string; productId: string }>;
}) {
  const { id, productId } = use(params);
  const { data, isLoading, isError } = useProductVariants(productId);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const allSpecKeys = useMemo(() => {
    if (!data?.variants.length) return [];
    const keys = new Set<string>();
    data.variants.forEach((v) =>
      Object.keys(v.specs).forEach((k) => keys.add(k)),
    );
    return Array.from(keys);
  }, [data]);

  const filterOptions = useMemo(() => {
    if (!data?.variants.length) return {} as Record<string, string[]>;
    const opts: Record<string, Set<string>> = {};
    allSpecKeys.forEach((key) => {
      opts[key] = new Set();
    });
    data.variants.forEach((v) => {
      Object.entries(v.specs).forEach(([k, val]) => opts[k]?.add(val));
    });
    return Object.fromEntries(
      Object.entries(opts).map(([k, s]) => [k, Array.from(s)]),
    );
  }, [data, allSpecKeys]);

  // Map each real spec key ("Size", "Port Type") to a clean lowercase URL
  // param name ("size", "port-type"), and back again.
  const keyToParam = useMemo(() => {
    const map: Record<string, string> = {};
    allSpecKeys.forEach((key) => {
      map[key] = slugify(key);
    });
    return map;
  }, [allSpecKeys]);

  const paramToKey = useMemo(() => {
    const map: Record<string, string> = {};
    Object.entries(keyToParam).forEach(([key, param]) => {
      map[param] = key;
    });
    return map;
  }, [keyToParam]);

  // For each spec key, map slug -> real raw value (e.g. "1-4-4" -> `1/4" ~ 4"`).
  const slugToRawByKey = useMemo(() => {
    const map: Record<string, Record<string, string>> = {};
    Object.entries(filterOptions).forEach(([key, values]) => {
      map[key] = Object.fromEntries(values.map((v) => [slugify(v), v]));
    });
    return map;
  }, [filterOptions]);

  // Derive activeFilters FROM the URL, converting param names and slugs back
  // to real spec keys and raw values.
  const activeFilters = useMemo(() => {
    const result: Record<string, string[]> = {};
    searchParams.forEach((value, param) => {
      if (RESERVED_PARAMS.has(param)) return;
      const key = paramToKey[param] ?? param;
      const rawLookup = slugToRawByKey[key] ?? {};
      result[key] = value
        .split(",")
        .filter(Boolean)
        .map((slug) => rawLookup[slug] ?? slug);
    });
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString(), slugToRawByKey, paramToKey]);

  // setActiveFilters has the same shape as the old useState setter (supports
  // functional updates), so child components need zero changes.
  const setActiveFilters = useCallback(
    (updater: React.SetStateAction<Record<string, string[]>>) => {
      const next =
        typeof updater === "function" ? updater(activeFilters) : updater;

      const newParams = new URLSearchParams();
      searchParams.forEach((value, param) => {
        if (RESERVED_PARAMS.has(param)) newParams.set(param, value);
      });
      Object.entries(next).forEach(([key, vals]) => {
        if (vals && vals.length > 0) {
          const param = keyToParam[key] ?? slugify(key);
          newParams.set(param, vals.map(slugify).join(","));
        }
      });

      const query = newParams.toString();
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [activeFilters, pathname, router, searchParams, keyToParam],
  );

  const filtered = useMemo(() => {
    if (!data?.variants) return [];
    return data.variants.filter((v) =>
      Object.entries(activeFilters).every(
        ([key, vals]) => vals.length === 0 || vals.includes(v.specs[key]),
      ),
    );
  }, [data, activeFilters]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Typography sx={{ color: "text.secondary" }}>
          Failed to load variants.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero */}
      <Box
        sx={{ background: BANNER_GRADIENT, px: { xs: 3, md: 8 }, py: { xs: 4, md: 5 } }}
      >
        <Box sx={{ maxWidth: "1280px", mx: "auto" }}>
          <Typography
            sx={{
              color: "primary.light",
              letterSpacing: "0.2em",
              fontSize: "0.72rem",
              fontWeight: 700,
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            Ball Valves
          </Typography>
          <Typography
            component="h1"
            sx={{
              color: "#fff",
              fontSize: { xs: "1.8rem", md: "2.6rem" },
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            {data.name}
          </Typography>
          <Typography
            sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", mt: 1 }}
          >
            {filtered.length} model{filtered.length !== 1 ? "s" : ""} available
          </Typography>
        </Box>
      </Box>

      {/* Content */}
      <Box
        sx={{
          // Full width (as on the live site), so every spec column fits.
          maxWidth: "100%",
          mx: "auto",
          px: 0,
          py: 0,
        }}
      >
        <VariantsActiveFilters
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />

        {filtered.length === 0 && (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography sx={{ color: "text.secondary", mb: 1 }}>
              No variants match your filters.
            </Typography>
            <Typography
              onClick={() => setActiveFilters({})}
              sx={{
                color: BRAND,
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-block",
              }}
            >
              Clear all filters
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            // Stack the filters above the table on phones.
            flexDirection: { xs: "column", md: "row" },
            gap: 0,
            alignItems: { xs: "stretch", md: "flex-start" },
            bgcolor: "#fff",
          }}
        >
          <VariantsSidebar
            specKeys={allSpecKeys}
            filterOptions={filterOptions}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
          />
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              borderLeft: { md: "1px solid rgba(0,0,0,0.06)" },
                borderTop: { xs: "1px solid rgba(0,0,0,0.06)", md: "none" },
            }}
          >
            <VariantsTable
  variants={filtered}
  specKeys={allSpecKeys}
  productName={data.name}
                thumbnailImage={data.thumbnailImage}
  seriesId={id}
/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

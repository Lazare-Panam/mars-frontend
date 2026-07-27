"use client";

import { use, useCallback, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useProductVariants } from "@/api/useProductVariants";
import VariantsGrid from "./components/VariantsGrid";
import VariantsFilterBar from "./components/VariantsFilterbar";

// 'sort' is managed separately from spec filters — never treated as one.
const RESERVED_PARAMS = new Set<string>(["sort"]);

// Turns a raw string like `1/4" ~ 4"` or `Port Type` into a clean, URL-safe
// slug like `1-4-4` or `port-type`. Used for BOTH filter keys and values.
function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/["']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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

  const sortKey = searchParams.get("sort") ?? "featured";

  const setSortKey = useCallback(
    (key: string) => {
      const newParams = new URLSearchParams(searchParams.toString());
      if (key === "featured") {
        newParams.delete("sort");
      } else {
        newParams.set("sort", key);
      }
      const query = newParams.toString();
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [searchParams, pathname, router],
  );

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

  const slugToRawByKey = useMemo(() => {
    const map: Record<string, Record<string, string>> = {};
    Object.entries(filterOptions).forEach(([key, values]) => {
      map[key] = Object.fromEntries(values.map((v) => [slugify(v), v]));
    });
    return map;
  }, [filterOptions]);

  // Derive activeFilters FROM the URL, converting param names and slugs back
  // to real spec keys and raw values. 'sort' is skipped — it's reserved.
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

  const filteredVariants = useMemo(() => {
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
        sx={{
          bgcolor: "#fff",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          px: { xs: 3, md: 8 },
          py: { xs: 4, md: 5 },
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            bgcolor: "primary.main",
          }}
        />
        <Box sx={{ maxWidth: "1280px", mx: "auto" }}>
          <Typography
            sx={{
              color: "primary.main",
              letterSpacing: "0.2em",
              fontSize: "0.72rem",
              fontWeight: 700,
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            Ball Valves
          </Typography>
          <Typography
            component="h1"
            sx={{
              color: "text.primary",
              fontSize: { xs: "1.9rem", md: "2.6rem" },
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              mb: 1.5,
            }}
          >
            {data.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{ width: 28, height: 2, bgcolor: "primary.main" }} />
            <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
              {filteredVariants.length} model
              {filteredVariants.length !== 1 ? "s" : ""} available
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Content */}
      <Box
        sx={{
          maxWidth: "1600px",
          mx: "auto",
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 6 },
        }}
      >
        <VariantsFilterBar
          variants={data.variants}
          specKeys={allSpecKeys}
          filterOptions={filterOptions}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
        <VariantsGrid
          variants={filteredVariants}
          productName={data.name}
          thumbnailImage={data.thumbnailImage}
          sortKey={sortKey}
          onSortChange={setSortKey}
          categoryId={id}
          productId={productId}
        />
      </Box>
    </Box>
  );
}

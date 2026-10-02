"use client";

import { use, useState, useMemo } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useProductVariants } from "@/api/useProductVariants";
import VariantsTable from "../[productId]/variants/components/VariantsTable";
import VariantsSidebar from "../[productId]/variants/components/VariantsSidebar";

import { alpha } from "@mui/material/styles";
import VariantsActiveFilters from "../[productId]/variants/components/VariantsActiveFilters";
import Reveal from "@/Common/Reveal";
import PageBreadcrumbs from "@/Common/PageBreadcrumbs";
import { productCrumbs } from "@/lib/breadcrumbs";
import { CATEGORIES } from "../../data/categories";
import { BANNER_GRADIENT } from "@/theme/brand";

const BRAND = "#E7390F";

export default function ProductVariantsPage({
  params,
}: {
  params: Promise<{ id: string; productId: string }>;
}) {
  const { id, productId } = use(params);
  const { data, isLoading, isError } = useProductVariants(id);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>(
    {},
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
        <Reveal>
        <Box sx={{ maxWidth: "1280px", mx: "auto" }}>
          <PageBreadcrumbs
            items={
              CATEGORIES.some((c) => c.id === id)
                ? productCrumbs({ categoryId: id, extra: [{ label: "All models" }] })
                : [
                    { label: "Home", href: "/" },
                    { label: "Products", href: "/products" },
                    { label: data.name, href: `/products/${id}` },
                    { label: "All models" },
                  ]
            }
            tone="onDark"
            sx={{ mb: 2.5 }}
          />
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
        </Reveal>
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
        <VariantsActiveFilters
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />

        <Reveal delay={100}>
          <Box
            sx={{
              display: "flex",
              // Stack the filters above the table on phones.
              flexDirection: { xs: "column", md: "row" },
              gap: 0,
              alignItems: { xs: "stretch", md: "flex-start" },
              border: `1px solid ${alpha(BRAND, 0.15)}`,
              borderRadius: "8px",
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
        </Reveal>
      </Box>
    </Box>
  );
}

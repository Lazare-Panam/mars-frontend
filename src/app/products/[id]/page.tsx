import type { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchCatalog, ProductCatalog, ProductType } from "@/api/useProductCatalog";
import { fetchProductDetail } from "@/api/useProductDetail";
import ProductCatalogPageClient from "./components/ProductCatalogPageClient";
import SeriesFamilyPage from "../components/SeriesFamilyPage";
import { findFamily } from "../data/seriesFamilies";
import { CATEGORIES, SERIES } from "../data/categories";
import { SITE_URL } from "@/lib/site";
import { fitBrandTitle } from "@/lib/seoTitle";
import { CATEGORY_SEO } from "@/lib/categorySeo";
import { movedSeriesHref } from "@/lib/canonicalCategory";
import { fitDescription } from "@/lib/seoDescription";
import { makeQueryClient } from "@/lib/getQueryClient";
import Reveal from "@/Common/Reveal";
import { JsonLd, breadcrumbList } from "@/lib/jsonLd";
import Link from "next/link";
import { Container, Typography } from "@mui/material";
import { CATEGORY_INDUSTRIES, INDUSTRIES } from "@/app/applications/industries";

type Props = { params: Promise<{ id: string }> };

// Prerender one catalog page per category so every /products/{id} route is
// emitted at build time (and therefore picked up by next-sitemap).
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  let data: ProductCatalog | null = null;
  try {
    data = await fetchCatalog(id);
  } catch (err) {
    const status = (err as { response?: { status?: number } })?.response?.status;
    if (status !== 404) {
      console.error(
        `[generateMetadata] fetchCatalog(${id}) failed (status ${status ?? "?"})`,
      );
    }
  }

  if (!data) {
    // No catalogue record (e.g. a series that moved to /series/N): name the
    // page after the series/category and point Google at the live URL, so it
    // never ships the generic "Mars Valvenok" title twice.
    const moved = movedSeriesHref(id);
    const label = [...CATEGORIES, ...SERIES].find((c) => c.id === id)?.label;
    return {
      title: label ?? "MARS Ball Valves",
      ...(moved ? { alternates: { canonical: moved.page }, robots: { index: false, follow: true } } : {}),
    };
  }

  // The %s | Mars Valvenok template (see root layout) appends the brand suffix,
  // so strip any brand suffix the CMS already baked into the title — otherwise
  // it renders "…| Mars Valves | Mars Valvenok".
  const rawTitle = data.seo?.title ?? data.bannerTitle ?? "Mars Valvenok";
  const title = rawTitle.replace(/\s*\|\s*Mars Valve(nok)?s?\s*$/i, "").trim();
  // Marketing's SEO title wins over the CMS one (see lib/categorySeo).
  const seoTitle = CATEGORY_SEO[id]?.title;
  const description = fitDescription(data.seo?.description ?? data.bannerSubtitle ?? "");
  // Social-share image comes from the colocated opengraph-image.tsx (a branded,
  // consistent per-category card). We intentionally no longer pull the CMS
  // ogImage/bannerImage here — it was missing on most categories and a stray
  // ships photo on multi-port.

  // The CMS can return a canonical URL on a stale/retired domain (e.g. a
  // pre-rename host). Keep only the path it points to and always resolve it
  // against our own domain so a bad host in the CMS can't produce a 404
  // canonical.
  const canonicalPath = data.seo?.canonical
    ? (() => {
        try {
          return new URL(data.seo!.canonical!, SITE_URL).pathname;
        } catch {
          return `/products/${id}`;
        }
      })()
    : `/products/${id}`;
  const moved = movedSeriesHref(id);
  const canonical = `${SITE_URL}${moved ? moved.page : canonicalPath}`;

  return {
    title: seoTitle ? { absolute: seoTitle } : fitBrandTitle(title),
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: "Mars Valvenok",
      title,
      description,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProductCatalogPage({ params }: Props) {
  const { id } = await params;

  // Prefetch the catalog on the server and hand it to the client component via
  // HydrationBoundary, so the hero, product grid and copy render into the static
  // HTML (visible to non-JS/AI crawlers) instead of a loading spinner.
  const queryClient = makeQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["catalog", id],
    queryFn: () => fetchCatalog(id),
  });

  // Grid-type catalogs render <ProductDetailContent id={id} />, which reads
  // useProductDetail(id) (keyed on the *category* id). Prefetch that too so the
  // one-piece style catalog also server-renders instead of a spinner.
  const catalog = queryClient.getQueryData<ProductCatalog>(["catalog", id]);
  if (catalog?.type === ProductType.Grid) {
    await queryClient.prefetchQuery({
      queryKey: ["product-detail", id],
      queryFn: () => fetchProductDetail(id),
    });
  }

  // The One-Piece family renders a series-cards landing (one card per series)
  // instead of the flat variant grid, so prefetch its variants.
  // Ranges listed in data/seriesFamilies.ts get the series-grid page.
  const family = findFamily(id);

  const category = CATEGORIES.find((c) => c.id === id);
  const usedIn = (CATEGORY_INDUSTRIES[id] ?? [])
    .map((industryId) => INDUSTRIES.find((i) => i.id === industryId))
    .filter((i) => i !== undefined);
  const crumbs = breadcrumbList([
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: category?.label ?? catalog?.bannerTitle ?? id, path: `/products/${id}` },
  ]);

  return (
    <>
      <JsonLd data={crumbs} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Reveal y={12}>
          {family ? (
            <SeriesFamilyPage family={family} />
          ) : (
            <ProductCatalogPageClient id={id} />
          )}
        </Reveal>
      </HydrationBoundary>
      {usedIn.length > 0 && (
        <Container
          maxWidth="lg"
          sx={{
            py: 4,
            color: "text.secondary",
            "& a": { color: "primary.main", fontWeight: 600 },
          }}
        >
          <Typography className="no-capitalize">
            Used in:{" "}
            {usedIn.map((industry, i) => (
              <span key={industry.id}>
                {i > 0 && ", "}
                <Link href={`/applications#${industry.id}`}>{industry.label}</Link>
              </span>
            ))}
          </Typography>
        </Container>
      )}
    </>
  );
}

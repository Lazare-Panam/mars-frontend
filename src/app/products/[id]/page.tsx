import type { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchCatalog, ProductCatalog, ProductType } from "@/api/useProductCatalog";
import { fetchProductDetail } from "@/api/useProductDetail";
import ProductCatalogPageClient from "./components/ProductCatalogPageClient";
import { CATEGORIES } from "../data/categories";
import { SITE_URL } from "@/lib/site";
import { fitBrandTitle } from "@/lib/seoTitle";
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
    return { title: "Mars Valvenok" };
  }

  // The %s | Mars Valvenok template (see root layout) appends the brand suffix,
  // so strip any brand suffix the CMS already baked into the title — otherwise
  // it renders "…| Mars Valves | Mars Valvenok".
  const rawTitle = data.seo?.title ?? data.bannerTitle ?? "Mars Valvenok";
  const title = rawTitle.replace(/\s*\|\s*Mars Valve(nok)?s?\s*$/i, "").trim();
  const description = data.seo?.description ?? data.bannerSubtitle ?? "";
  const ogImage = data.seo?.ogImage ?? data.bannerImage;

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
  const canonical = `${SITE_URL}${canonicalPath}`;

  return {
    title: fitBrandTitle(title),
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: "Mars Valvenok",
      title,
      description,
      url: canonical,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
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
          <ProductCatalogPageClient id={id} />
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

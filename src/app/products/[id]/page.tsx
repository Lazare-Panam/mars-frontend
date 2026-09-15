import type { Metadata } from "next";
import { fetchCatalog, ProductCatalog } from "@/api/useProductCatalog";
import ProductCatalogPageClient from "./components/ProductCatalogPageClient";
import { CATEGORIES } from "../data/categories";
import { SITE_URL } from "@/lib/site";
import Reveal from "@/Common/Reveal";

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
    console.error(`[generateMetadata] fetchCatalog(${id}) failed:`, err);
  }

  if (!data) {
    return { title: "Mars Valves" };
  }

  const title = data.seo?.title ?? data.bannerTitle ?? "Mars Valves";
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
    : undefined;
  const canonical = canonicalPath ? `${SITE_URL}${canonicalPath}` : undefined;

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      type: "website",
      siteName: "Mars Valves",
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
  return (
    <Reveal y={12}>
      <ProductCatalogPageClient id={id} />
    </Reveal>
  );
}

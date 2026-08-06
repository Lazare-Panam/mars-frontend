import type { Metadata } from "next";
import { fetchCatalog, ProductCatalog } from "@/api/useProductCatalog";
import ProductCatalogPageClient from "./components/ProductCatalogPageClient";

type Props = { params: Promise<{ id: string }> };

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
  const canonical = data.seo?.canonical;

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
  return <ProductCatalogPageClient id={id} />;
}

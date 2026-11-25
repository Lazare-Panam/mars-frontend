import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchCatalog } from "@/api/useProductCatalog";
import { fetchProductDetail, ProductDetail } from "@/api/useProductDetail";
import { CATEGORIES } from "../../data/categories";
import { makeQueryClient } from "@/lib/getQueryClient";
import { JsonLd, breadcrumbList } from "@/lib/jsonLd";
import ProductDetailClient from "./ProductDetailClient";
import SeriesFamilyPage from "../../components/SeriesFamilyPage";
import { findFamily } from "../../data/seriesFamilies";

type Props = { params: Promise<{ id: string; productId: string }> };

// Per-page SEO: a "by category" family can carry its own title/description/
// canonical (data/seriesFamilies.ts). Families without `seo` fall back to the
// site default, so nothing else changes.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, productId } = await params;
  const family = findFamily(id, productId);
  if (family?.seo) {
    return {
      title: family.seo.title,
      description: family.seo.description,
      ...(family.seo.canonical
        ? { alternates: { canonical: family.seo.canonical } }
        : {}),
    };
  }
  return {};
}

// Prerender every product under every catalog. Self-contained (bottom-up): we
// walk CATEGORIES and fetch each catalog's products ourselves rather than
// relying on the parent [id] segment to hand down its `id`, because that param
// is generated in [id]/page.tsx (a leaf) and does not propagate to this branch.
// A failed catalog fetch just yields no products for that catalog.
export async function generateStaticParams() {
  const perCatalog = await Promise.all(
    CATEGORIES.map(async (cat) => {
      let products: { id: string }[] = [];
      try {
        const catalog = await fetchCatalog(cat.id);
        products = catalog.products ?? [];
      } catch {
        return [];
      }
      // Only emit a product-detail route when the product actually has a detail
      // record. Grid-style series (e.g. the one-piece range) are presented via
      // the category's /variants page and have no standalone detail page — so
      // generating them here would just produce 404s in the build and sitemap.
      const checked = await Promise.all(
        products.map(async (p) => {
          try {
            await fetchProductDetail(p.id);
            return { id: cat.id, productId: p.id };
          } catch {
            return null;
          }
        })
      );
      return checked.filter(
        (x): x is { id: string; productId: string } => x !== null
      );
    })
  );
  return perCatalog.flat();
}

export default async function ProductDetailPage({ params }: Props) {
  const { id, productId } = await params;

  // A "product" that is really a whole category (the backend's umbrella
  // "Ball Valves" catalogue lists one-piece / two-piece / three-piece as its
  // products) lives at /products/{category}: send this nested URL there
  // instead of serving a duplicate or a 404.
  if (id !== productId && CATEGORIES.some((c) => c.id === productId)) {
    permanentRedirect(`/products/${productId}`);
  }

  // "By category" ranges (economical 2-piece, high performance 3-piece...)
  // show the series grid from data/seriesFamilies.ts.
  const family = findFamily(id, productId);
  if (family) {
    return (
      <>
        {family.faqs && family.faqs.length > 0 && (
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: family.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }}
          />
        )}
        <SeriesFamilyPage family={family} />
      </>
    );
  }

  // Prefetch the product detail server-side so the name, description, specs,
  // features and applications render into the static HTML for crawlers.
  const queryClient = makeQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["product-detail", productId],
    queryFn: () => fetchProductDetail(productId),
  });

  // No detail record for this product (the API 404s, e.g. the one-piece series):
  // return a real 404 instead of a page stuck on a loading spinner.
  const detail = queryClient.getQueryData<ProductDetail>([
    "product-detail",
    productId,
  ]);
  if (!detail) notFound();

  const category = CATEGORIES.find((c) => c.id === id);
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: detail.name,
    ...(detail.description ? { description: detail.description } : {}),
    ...(detail.image ? { image: detail.image } : {}),
    brand: { "@type": "Brand", name: "Kronox" },
  };
  const crumbs = breadcrumbList([
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    ...(category ? [{ name: category.label, path: `/products/${id}` }] : []),
    { name: detail.name, path: `/products/${id}/${productId}` },
  ]);

  return (
    <>
      <JsonLd data={productLd} />
      <JsonLd data={crumbs} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductDetailClient id={id} productId={productId} />
      </HydrationBoundary>
    </>
  );
}

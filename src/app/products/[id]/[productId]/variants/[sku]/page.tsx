import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchCatalog } from "@/api/useProductCatalog";
import { fetchVariants, ProductSeriesVariants } from "@/api/useProductVariants";
import { CATEGORIES } from "../../../../data/categories";
import { makeQueryClient } from "@/lib/getQueryClient";
import { JsonLd, breadcrumbList } from "@/lib/jsonLd";
import { SITE_URL } from "@/lib/site";
import VariantDetailClient from "./VariantDetailClient";

type Props = {
  params: Promise<{ id: string; productId: string; sku: string }>;
};

// Prerender every variant SKU across the whole catalog tree. Self-contained
// (bottom-up): walk CATEGORIES -> products -> variants ourselves rather than
// relying on inherited params. Products with no variants return 404, so a
// failed fetch just yields no SKUs instead of failing the build.
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
      const perProduct = await Promise.all(
        products.map(async (p) => {
          try {
            const data = await fetchVariants(p.id);
            return (data.variants ?? []).map((v) => ({
              id: cat.id,
              productId: p.id,
              sku: v.id,
            }));
          } catch {
            return [];
          }
        })
      );
      return perProduct.flat();
    })
  );
  return perCatalog.flat();
}

export default async function VariantDetailPage({ params }: Props) {
  const { id, productId, sku } = await params;

  // Prefetch the variant series server-side so the SKU spec table and price
  // render into the static HTML for crawlers (the client component picks the
  // right variant out of the hydrated series by sku).
  const queryClient = makeQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["variants", productId],
    queryFn: () => fetchVariants(productId),
  });

  // Build Product/Offer + breadcrumb JSON-LD from the prefetched data so it's in
  // the static HTML (rich results). Offer is included only when a real price is
  // published on the variant.
  const series = queryClient.getQueryData<ProductSeriesVariants>([
    "variants",
    productId,
  ]);
  const variant = series?.variants.find((v) => v.id === sku);
  const category = CATEGORIES.find((c) => c.id === id);

  const specParts = variant
    ? Object.entries(variant.specs)
        .filter(([k]) => k !== "SKU" && k !== "Price")
        .map(([, v]) => v)
    : [];
  const name =
    variant && series
      ? specParts.length
        ? `${specParts.join(", ")} — ${series.name}`
        : series.name
      : "";
  const priceRaw = variant?.specs["Price"];
  const numericPrice = priceRaw
    ? parseFloat(priceRaw.replace(/[^0-9.]/g, ""))
    : NaN;
  const image = variant?.thumbnailImage || series?.thumbnailImage;

  const productLd =
    variant && series
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name,
          sku: variant.id,
          ...(image ? { image } : {}),
          brand: { "@type": "Brand", name: "MARS" },
          ...(Number.isFinite(numericPrice)
            ? {
                offers: {
                  "@type": "Offer",
                  priceCurrency: "GBP",
                  price: numericPrice.toFixed(2),
                  availability: "https://schema.org/InStock",
                  url: `${SITE_URL}/products/${id}/${productId}/variants/${sku}`,
                },
              }
            : {}),
        }
      : null;

  const crumbs = breadcrumbList([
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    ...(category ? [{ name: category.label, path: `/products/${id}` }] : []),
    ...(series
      ? [{ name: series.name, path: `/products/${id}/${productId}` }]
      : []),
    ...(variant
      ? [{ name, path: `/products/${id}/${productId}/variants/${sku}` }]
      : []),
  ]);

  return (
    <>
      {productLd && <JsonLd data={productLd} />}
      <JsonLd data={crumbs} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <VariantDetailClient id={id} productId={productId} sku={sku} />
      </HydrationBoundary>
    </>
  );
}

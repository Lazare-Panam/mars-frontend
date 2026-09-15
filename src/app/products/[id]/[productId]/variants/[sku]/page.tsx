import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchCatalog } from "@/api/useProductCatalog";
import { fetchVariants } from "@/api/useProductVariants";
import { CATEGORIES } from "../../../../data/categories";
import { makeQueryClient } from "@/lib/getQueryClient";
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VariantDetailClient id={id} productId={productId} sku={sku} />
    </HydrationBoundary>
  );
}

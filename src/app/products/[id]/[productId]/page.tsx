import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchCatalog } from "@/api/useProductCatalog";
import { fetchProductDetail } from "@/api/useProductDetail";
import { CATEGORIES } from "../../data/categories";
import { makeQueryClient } from "@/lib/getQueryClient";
import ProductDetailClient from "./ProductDetailClient";

type Props = { params: Promise<{ id: string; productId: string }> };

// Prerender every product under every catalog. Self-contained (bottom-up): we
// walk CATEGORIES and fetch each catalog's products ourselves rather than
// relying on the parent [id] segment to hand down its `id`, because that param
// is generated in [id]/page.tsx (a leaf) and does not propagate to this branch.
// A failed catalog fetch just yields no products for that catalog.
export async function generateStaticParams() {
  const perCatalog = await Promise.all(
    CATEGORIES.map(async (cat) => {
      try {
        const catalog = await fetchCatalog(cat.id);
        return (catalog.products ?? []).map((p) => ({
          id: cat.id,
          productId: p.id,
        }));
      } catch {
        return [];
      }
    })
  );
  return perCatalog.flat();
}

export default async function ProductDetailPage({ params }: Props) {
  const { id, productId } = await params;

  // Prefetch the product detail server-side so the name, description, specs,
  // features and applications render into the static HTML for crawlers.
  const queryClient = makeQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["product-detail", productId],
    queryFn: () => fetchProductDetail(productId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailClient id={id} productId={productId} />
    </HydrationBoundary>
  );
}

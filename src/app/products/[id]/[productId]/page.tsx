import { fetchCatalog } from "@/api/useProductCatalog";
import { CATEGORIES } from "../../data/categories";
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
  return <ProductDetailClient id={id} productId={productId} />;
}

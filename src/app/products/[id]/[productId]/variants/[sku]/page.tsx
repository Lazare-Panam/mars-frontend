import { fetchCatalog } from "@/api/useProductCatalog";
import { fetchVariants } from "@/api/useProductVariants";
import { CATEGORIES } from "../../../../data/categories";
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
  return <VariantDetailClient id={id} productId={productId} sku={sku} />;
}

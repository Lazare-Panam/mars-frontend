import { fetchCatalog } from "@/api/useProductCatalog";
import { CATEGORIES, SERIES } from "@/app/products/data/categories";
import SavedCartClient from "./SavedCartClient";

// Saved items only store their series and variant, but the variant page also
// needs the category (/products/{category}/{series}/variants/{variant}). This
// map is built on the server from each category's catalog, like the product
// pages themselves; a series it doesn't know just isn't linked.
//
// Items added from a "Ball Valves by Series" page (e.g. /products/series-20-20/variants)
// are saved under that series id, which no category lists. Those pages use the
// series id in both places (/products/series-20-20/series-20-20/variants/...),
// so the series is its own "category" here.
async function buildCategoryBySeries(): Promise<Record<string, string>> {
  const map: Record<string, string> = {};
  await Promise.all(
    CATEGORIES.map(async (cat) => {
      try {
        const catalog = await fetchCatalog(cat.id);
        for (const product of catalog.products ?? []) {
          map[product.id] ??= cat.id;
        }
      } catch {
        // Catalog unavailable: those items show without a link.
      }
    }),
  );
  for (const series of SERIES) {
    map[series.id] ??= series.id;
  }
  return map;
}

export default async function SavedCartPage() {
  return <SavedCartClient categoryBySeries={await buildCategoryBySeries()} />;
}

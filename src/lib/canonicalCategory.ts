import { CATEGORIES } from "@/app/products/data/categories";
import { fetchCatalog } from "@/api/useProductCatalog";

// The /products/[id]/[productId]/... routes never validate [id] against the
// product, so the same product is reachable under an umbrella slug like
// "ball-valves" AND under its real subcategory (e.g. "multi-port-ball-valves").
// That produces duplicate URLs with identical titles. We treat the subcategory
// actually listed in CATEGORIES as the canonical home for the product, and
// resolve it here so pages can emit a <link rel="canonical"> pointing at it.
//
// The map is built once per process and reused: generateMetadata runs for every
// variant at build time, so we must not re-fetch all catalogs on each call.
let cache: Promise<Map<string, string>> | null = null;

function buildMap(): Promise<Map<string, string>> {
  return Promise.all(
    CATEGORIES.map(async (cat) => {
      try {
        const catalog = await fetchCatalog(cat.id);
        return (catalog.products ?? []).map(
          (p) => [p.id, cat.id] as [string, string],
        );
      } catch {
        // A category that fails to load just contributes no mappings.
        return [] as [string, string][];
      }
    }),
  ).then((pairs) => new Map(pairs.flat()));
}

// Returns the canonical category id for a product, or null if the product isn't
// in any real category (e.g. sanitary valves that only live under the umbrella
// slug — those have a single URL, so the caller falls back to the visited id).
export function canonicalCategoryFor(
  productId: string,
): Promise<string | null> {
  if (!cache) cache = buildMap();
  return cache.then((m) => m.get(productId) ?? null);
}

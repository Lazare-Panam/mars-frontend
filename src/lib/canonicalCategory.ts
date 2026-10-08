import { CATEGORIES, SERIES } from "@/app/products/data/categories";

// Ranges that have their own category page but aren't in CATEGORIES (the
// /products grid). Checked after CATEGORIES, so a product listed in both keeps
// its CATEGORIES home. Without these, e.g. sanitary products had two
// self-canonical URLs (/products/ball-valves/... and /products/sanitary-ball-valves/...)
// and SE Ranking flagged them as duplicate titles.
const EXTRA_CATEGORY_IDS = ["sanitary-ball-valves", "fire-safe-ball-valves", "v-port-ball-valves"];

const SERIES_IDS = new Set(SERIES.map((s) => s.id));

// Series whose page moved to the catalogue route (/series/N). Their old
// /products/{id} pages point Google at the new URL instead of competing with it.
export function movedSeriesHref(productId: string): { page: string; variants: string } | null {
  const s = SERIES.find((x) => x.id === productId && x.href.startsWith("/series/"));
  return s ? { page: s.href, variants: s.pricesHref ?? `${s.href}/variants` } : null;
}
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
    [...CATEGORIES.map((c) => c.id), ...EXTRA_CATEGORY_IDS].map(async (catId) => {
      try {
        const catalog = await fetchCatalog(catId);
        return (catalog.products ?? []).map(
          (p) => [p.id, catId] as [string, string],
        );
      } catch {
        // A category that fails to load just contributes no mappings.
        return [] as [string, string][];
      }
    }),
  ).then((pairs) => {
    // First category wins, so CATEGORIES take priority over the extras.
    const map = new Map<string, string>();
    for (const [productId, catId] of pairs.flat()) {
      if (!map.has(productId)) map.set(productId, catId);
    }
    return map;
  });
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

/**
 * The one official URL for a product page. Series with their own page
 * (/products/series-10-10) use that, instead of their copy under a category
 * (/products/one-piece-ball-valves/series-10-10); everything else uses its
 * real category, falling back to the visited one.
 */
export async function canonicalProductPath(
  visitedCategoryId: string,
  productId: string,
): Promise<string> {
  if (SERIES_IDS.has(productId)) return `/products/${productId}`;
  const category = (await canonicalCategoryFor(productId)) ?? visitedCategoryId;
  return `/products/${category}/${productId}`;
}

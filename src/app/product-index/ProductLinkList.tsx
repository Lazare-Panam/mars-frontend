import Link from "next/link";
import { CATEGORIES } from "@/app/products/data/categories";
import { fetchCatalog } from "@/api/useProductCatalog";
import { fetchVariants, ProductVariant } from "@/api/useProductVariants";
import { fetchProductDetail } from "@/api/useProductDetail";
import styles from "./product-index.module.css";

// Shared, server-rendered link index used by BOTH /product-index and the
// /products page, so every product and variant page gets more than one internal
// link (a page with a single inlink is fragile). Plain semantic HTML + next/link
// so the <a href>s land in the static HTML regardless of JS — a Server Component
// also can't pass `component={Link}` to a MUI Client Component.

export type IndexVariant = { id: string; label: string };
export type IndexProduct = {
  id: string;
  name: string;
  hasDetail: boolean;
  variants: IndexVariant[];
};
export type IndexCategory = {
  id: string;
  label: string;
  products: IndexProduct[];
};

// Compact, human-readable anchor text from a variant's specs (drops the raw SKU
// and price), falling back to the id so a chip is never blank.
function variantLabel(variant: ProductVariant): string {
  const parts = Object.entries(variant.specs)
    .filter(([k]) => k !== "SKU" && k !== "Price")
    .map(([, v]) => v);
  return parts.length ? parts.join(" · ") : variant.id;
}

export async function buildProductIndex(): Promise<IndexCategory[]> {
  return Promise.all(
    CATEGORIES.map(async (cat) => {
      let products: { id: string; name: string }[] = [];
      try {
        const catalog = await fetchCatalog(cat.id);
        products = catalog.products ?? [];
      } catch {
        products = [];
      }
      const indexProducts = await Promise.all(
        products.map(async (p) => {
          // Fetch variants and probe the detail record in parallel. Some series
          // (e.g. the one-piece range) have neither — commit 71a58a9 makes those
          // product pages 404, so we must not link them here or we'd point at
          // dead pages. Both throwing on 404 is expected and swallowed.
          const [variants, hasDetail] = await Promise.all([
            fetchVariants(p.id)
              .then((data) =>
                (data.variants ?? []).map((v) => ({
                  id: v.id,
                  label: variantLabel(v),
                })),
              )
              .catch(() => [] as IndexVariant[]),
            fetchProductDetail(p.id)
              .then(() => true)
              .catch(() => false),
          ]);
          return { id: p.id, name: p.name, hasDetail, variants };
        }),
      );
      // Only keep products that actually resolve to a real page: a detail page
      // and/or at least one variant page. Drops the 404-only series.
      const linkable = indexProducts.filter(
        (p) => p.hasDetail || p.variants.length > 0,
      );
      return { id: cat.id, label: cat.label, products: linkable };
    }),
  );
}

export default function ProductLinkList({
  index,
}: {
  index: IndexCategory[];
}) {
  return (
    <>
      {index.map((cat) => (
        <section key={cat.id} className={styles.category}>
          <h2 className={styles.catHeading}>
            <Link href={`/products/${cat.id}`} className={styles.catLink}>
              {cat.label}
            </Link>
          </h2>

          {cat.products.length === 0 && (
            <p className={styles.empty}>No products available.</p>
          )}

          {cat.products.map((product) => (
            <div key={product.id} className={styles.product}>
              <h3 className={styles.productHeading}>
                {product.hasDetail ? (
                  <Link
                    // A product with the category's own id is the category page.
                    href={product.id === cat.id ? `/products/${cat.id}` : `/products/${cat.id}/${product.id}`}
                    className={styles.productLink}
                  >
                    {product.name}
                  </Link>
                ) : (
                  product.name
                )}
              </h3>

              {product.variants.length > 0 && (
                <div className={styles.chips}>
                  {product.variants.map((v) => (
                    <Link
                      key={v.id}
                      href={`/products/${cat.id}/${product.id}/variants/${v.id}`}
                      className={styles.chip}
                    >
                      {v.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      ))}
    </>
  );
}

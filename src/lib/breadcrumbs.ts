import { CATEGORIES, SERIES } from "@/app/products/data/categories";

export type Crumb = { label: string; href?: string; mono?: boolean };

/**
 * Breadcrumbs for the product tree:
 * Home / Products / {category} / {product} / ...extra
 * Pass only the levels the page is at; the last crumb is the current page.
 */
export function productCrumbs({
  categoryId,
  product,
  extra = [],
}: {
  categoryId: string;
  product?: { id: string; name: string };
  extra?: Crumb[];
}): Crumb[] {
  const category = CATEGORIES.find((c) => c.id === categoryId) ?? SERIES.find((c) => c.id === categoryId);
  return [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: category?.label ?? categoryId, href: `/products/${categoryId}` },
    // Single-product categories (e.g. one-piece) use the same id for the
    // category and the product, so skip the product level there.
    ...(product && product.id !== categoryId
      ? [{ label: product.name, href: `/products/${categoryId}/${product.id}` }]
      : []),
    ...extra,
  ];
}

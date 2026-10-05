import type { AddToCartRequest } from "@/api/cart.api";
import type { ProductVariant } from "@/api/useProductVariants";

/**
 * Builds the add-to-cart request for a variant. Every "Add to cart" button
 * uses this so the cart always receives the same fields, including the
 * display price. The price is for showing in the cart only: the server never
 * trusts it and re-prices every item from the database when a quote is sent.
 */
export function toAddToCartRequest(
  seriesId: string,
  variant: ProductVariant,
  pictureUrl?: string | null,
  quantity = 1,
): AddToCartRequest {
  const price = parseFloat(variant.specs["Price"] ?? "");
  return {
    seriesId,
    variantId: variant.id,
    productDescription: variant.specs["SKU"] ?? variant.id,
    quantity,
    pictureUrl: pictureUrl ?? "",
    unitPrice: Number.isFinite(price) ? price : 0,
  };
}

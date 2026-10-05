import axiosClient from "./axiosClient";

export interface BasketItem {
  id: string;
  productId: string;
  productDescription: string;
  unitPrice: number;
  quantity: number;
  pictureUrl: string;
  // The variant's series. Returned by the server for the saved cart; kept on
  // cart-page items so they can be saved (the server prices by series + variant).
  seriesId?: string;
}

export interface CustomerBasket {
  customerBasketId: string;
  userId?: string;
  items: BasketItem[];
  createdAt: string;
  updatedAt: string;
}

// Matches Mars.API.Models.Basket.AddToCartRequest exactly:
// backend keys off SeriesId + VariantId to look up price server-side,
// then stores the result under BasketItem.ProductId (= VariantId).
// UnitPrice is intentionally NOT sent — CartService always recalculates
// it from the repository, so a client-supplied price would be ignored anyway.
export interface AddToCartRequest {
  seriesId: string;
  variantId: string;
  productDescription: string;
  quantity: number;
  pictureUrl: string;
  // Client-local only — carried so the store can show a running subtotal
  // while the basket lives entirely client-side. Stripped before the request
  // is sent to the server, which recalculates price itself anyway.
  unitPrice?: number;
}

// The saved cart belongs to the signed-in user (found by the user id in their
// login token; axiosClient attaches it), so no cookies or session are involved.
// The cart page itself lives in the browser (useCartStore) until "Save Cart".

// unitPrice is client-local (for the running subtotal); the server always
// prices items itself, so it's never sent.
const toServerItem = (item: AddToCartRequest) => ({
  seriesId: item.seriesId,
  variantId: item.variantId,
  productDescription: item.productDescription,
  quantity: item.quantity,
  pictureUrl: item.pictureUrl,
});

export const fetchBasket = async (): Promise<CustomerBasket> => {
  const { data } = await axiosClient.get("/api/basket");
  return data;
};

// POST /api/basket: saves the cart page's items into the saved cart. Items
// already saved have their quantities increased; new items are added.
export const saveBasketRequest = async (
  items: AddToCartRequest[],
): Promise<CustomerBasket> => {
  const { data } = await axiosClient.post("/api/basket", {
    items: items.map(toServerItem),
  });
  return data;
};

// quantity 0 removes the item.
export const updateQuantityRequest = async (
  productId: string,
  quantity: number,
): Promise<CustomerBasket> => {
  const { data } = await axiosClient.put(
    `/api/basket/items/${encodeURIComponent(productId)}`,
    { quantity },
  );
  return data;
};

export const removeItemRequest = async (productId: string): Promise<void> => {
  await axiosClient.delete(`/api/basket/items/${encodeURIComponent(productId)}`);
};

export const clearBasketRequest = async (): Promise<void> => {
  await axiosClient.delete("/api/basket");
};

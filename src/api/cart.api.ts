import axiosClient from "./axiosClient";

export interface BasketItem {
  id: string;
  productId: string;
  productDescription: string;
  unitPrice: number;
  quantity: number;
  pictureUrl: string;
}

export interface CustomerBasket {
  customerBasketId: string;
  userId?: string;
  sessionId: string;
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
}

export const fetchBasket = async (): Promise<CustomerBasket> => {
  const { data } = await axiosClient.get("/api/basket", {
    withCredentials: true,
  });
  return data;
};

export const addToCartRequest = async (
  request: AddToCartRequest,
): Promise<CustomerBasket> => {
  const { data } = await axiosClient.post("/api/basket/items", request, {
    withCredentials: true,
  });
  return data;
};

export const updateQuantityRequest = async (
  productId: string,
  quantity: number,
): Promise<CustomerBasket> => {
  const { data } = await axiosClient.put(
    `/api/basket/items/${productId}`,
    { quantity },
    { withCredentials: true },
  );
  return data;
};

export const removeItemRequest = async (productId: string): Promise<void> => {
  await axiosClient.delete(`/api/basket/items/${productId}`, {
    withCredentials: true,
  });
};

export const clearBasketRequest = async (): Promise<void> => {
  await axiosClient.delete("/api/basket", { withCredentials: true });
};

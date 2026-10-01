import axiosClient from "./axiosClient";

export interface BasketItem {
  id: string;
  productId: string;
  productDescription: string;
  unitPrice: number;
  quantity: number;
  pictureUrl: string;
  // Client-local only. The basket is now built in the store without hitting
  // the API, so each item has to remember the seriesId it came from in order
  // to rebuild an AddToCartRequest when the basket is synced to the server at
  // submit-for-quote time. Never sent back by the server.
  seriesId?: string;
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
  // Client-local only — carried so the store can show a running subtotal
  // while the basket lives entirely client-side. Stripped before the request
  // is sent to the server, which recalculates price itself anyway.
  unitPrice?: number;
}

// Matches Mars.API.Models.Basket.QuoteRequestItem.
// UnitPrice is nullable server-side (decimal?) — an item can genuinely have
// no price yet, distinct from the basket's price-defaults-to-0 behavior.
export interface QuoteRequestItem {
  id: string;
  productId: string;
  productDescription: string;
  unitPrice: number | null;
  quantity: number;
  pictureUrl: string;
  quoteRequestId: string;
}

// Matches Mars.API.Models.Basket.QuoteRequest, returned by
// POST /api/basket/submit-for-quote.
export interface QuoteRequest {
  quoteRequestId: string;
  userId: string;
  items: QuoteRequestItem[];
  createdAt: string;
  updatedAt: string;
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

// POST /api/basket/submit-for-quote — [Authorize]'d on the backend.
// BasketController.SubmitForQuote returns:
//   401 if the JWT is missing/invalid (Unauthorized())
//   400 "Your basket is empty." if there are no items (BadRequest(string))
//   200 QuoteRequest on success, and the basket is deleted server-side.
// axiosClient's interceptor already attaches the Bearer token when one is
// stored, so no extra header handling is needed here — just let 401/400
// reject normally so the caller can branch on error.response.status.
export const submitForQuoteRequest = async (): Promise<QuoteRequest> => {
  const { data } = await axiosClient.post(
    "/api/basket/submit-for-quote",
    null,
    { withCredentials: true },
  );
  return data;
};

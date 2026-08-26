import { create } from "zustand";
import { isAxiosError } from "axios";
import {
  fetchBasket,
  addToCartRequest,
  updateQuantityRequest,
  removeItemRequest,
  clearBasketRequest,
  submitForQuoteRequest,
  type CustomerBasket,
  type AddToCartRequest,
  type QuoteRequest,
} from "@/api/cart.api";

// Distinguishes *why* submitForQuote failed so the UI can react differently
// (prompt login vs. show a plain error) instead of collapsing everything
// into one generic message.
export type SubmitQuoteError =
  | { kind: "not-authenticated" }
  | { kind: "empty-basket" }
  | { kind: "unknown"; message: string };

interface CartState {
  basket: CustomerBasket | null;
  isLoading: boolean;
  error: string | null;

  isSubmittingQuote: boolean;
  lastQuoteRequest: QuoteRequest | null;
  submitQuoteError: SubmitQuoteError | null;

  fetchBasket: () => Promise<void>;
  addToCart: (request: AddToCartRequest) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearBasket: () => Promise<void>;
  submitForQuote: () => Promise<QuoteRequest | null>;
  clearSubmitQuoteError: () => void;
  setSubmitQuoteError: (error: SubmitQuoteError) => void;

  itemCount: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  basket: null,
  isLoading: false,
  error: null,

  isSubmittingQuote: false,
  lastQuoteRequest: null,
  submitQuoteError: null,

  fetchBasket: async () => {
    set({ isLoading: true, error: null });
    try {
      const basket = await fetchBasket();
      set({ basket, isLoading: false });
    } catch {
      set({ error: "Could not load your cart.", isLoading: false });
    }
  },

  addToCart: async (request) => {
    try {
      const basket = await addToCartRequest(request);
      set({ basket, error: null });
    } catch {
      set({ error: "Couldn't add that item." });
    }
  },

  updateQuantity: async (productId, quantity) => {
    const previous = get().basket;

    set((state) => ({
      basket: state.basket
        ? {
            ...state.basket,
            items:
              quantity <= 0
                ? state.basket.items.filter((i) => i.productId !== productId)
                : state.basket.items.map((i) =>
                    i.productId === productId ? { ...i, quantity } : i,
                  ),
          }
        : state.basket,
    }));

    try {
      const basket = await updateQuantityRequest(productId, quantity);
      set({ basket, error: null });
    } catch {
      set({ basket: previous, error: "Couldn't update that item." });
    }
  },

  removeItem: async (productId) => {
    const previous = get().basket;

    set((state) => ({
      basket: state.basket
        ? {
            ...state.basket,
            items: state.basket.items.filter((i) => i.productId !== productId),
          }
        : state.basket,
    }));

    try {
      await removeItemRequest(productId);
      set({ error: null });
    } catch {
      set({ basket: previous, error: "Couldn't remove that item." });
    }
  },

  clearBasket: async () => {
    const previous = get().basket;
    set({ basket: null });

    try {
      await clearBasketRequest();
    } catch {
      set({ basket: previous, error: "Couldn't clear your cart." });
    }
  },

  // Submits the current basket as an RFQ. Does NOT check auth itself —
  // the caller (CartPage) checks useAuthStore().isAuthenticated first so
  // an anonymous user gets an inline prompt instead of firing a request
  // that's guaranteed to 401. This still handles a 401 that slips through
  // (e.g. token expired between page load and click) as "not-authenticated"
  // rather than a generic error.
  submitForQuote: async () => {
    set({ isSubmittingQuote: true, submitQuoteError: null });
    try {
      const quoteRequest = await submitForQuoteRequest();
      // Backend deletes the basket on success (CartService.DeleteBasketAsync
      // in BasketController.SubmitForQuote) — mirror that client-side rather
      // than refetching, since a refetch would just come back empty anyway.
      set({
        basket: null,
        lastQuoteRequest: quoteRequest,
        isSubmittingQuote: false,
        submitQuoteError: null,
      });
      return quoteRequest;
    } catch (err) {
      let submitQuoteError: SubmitQuoteError;
      if (isAxiosError(err)) {
        if (err.response?.status === 401) {
          submitQuoteError = { kind: "not-authenticated" };
        } else if (err.response?.status === 400) {
          // BasketController returns BadRequest("Your basket is empty.")
          // as a plain string body — treat any 400 here as the empty-basket
          // case, since that's the only 400 this endpoint sends today.
          submitQuoteError = { kind: "empty-basket" };
        } else {
          submitQuoteError = {
            kind: "unknown",
            message: "Couldn't submit your quote request. Please try again.",
          };
        }
      } else {
        submitQuoteError = {
          kind: "unknown",
          message: "Couldn't submit your quote request. Please try again.",
        };
      }
      set({ isSubmittingQuote: false, submitQuoteError });
      return null;
    }
  },

  clearSubmitQuoteError: () => set({ submitQuoteError: null }),
  setSubmitQuoteError: (submitQuoteError) => set({ submitQuoteError }),

  itemCount: () =>
    get().basket?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0,
  subtotal: () =>
    get().basket?.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0) ??
    0,
}));

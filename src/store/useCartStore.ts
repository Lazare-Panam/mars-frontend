import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  type CustomerBasket,
  type BasketItem,
  type AddToCartRequest,
} from "@/api/cart.api";

interface CartState {
  basket: CustomerBasket | null;
  // Kept so existing callers (CartPage's initial-load spinner) still compile.
  // Always false now that the basket never loads from the network.
  isLoading: boolean;
  error: string | null;

  fetchBasket: () => Promise<void>;
  addToCart: (request: AddToCartRequest) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearBasket: () => Promise<void>;

  itemCount: () => number;
  subtotal: () => number;
}

// Builds a CustomerBasket-shaped object around a fresh item list. The basket
// lives entirely in this (persisted) store — customerBasketId/sessionId are
// local placeholders; there is no server-side basket anymore. On "Proceed to
// quote" the items are handed to useQuoteStore and the user finishes the
// enquiry on /contact, the same pattern the product pages already use.
const withItems = (
  previous: CustomerBasket | null,
  items: BasketItem[],
): CustomerBasket => {
  const now = new Date().toISOString();
  return {
    customerBasketId: previous?.customerBasketId ?? "local",
    sessionId: previous?.sessionId ?? "local",
    userId: previous?.userId,
    items,
    createdAt: previous?.createdAt ?? now,
    updatedAt: now,
  };
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      basket: null,
      isLoading: false,
      error: null,

      // No-op: the basket is sourced entirely from the persisted store now,
      // not the server. Kept on the interface so existing callers (Navbar,
      // CartPage) don't need to change.
      fetchBasket: async () => {},

      // Local-only. No network call — the item is merged into the store.
      addToCart: async (request) => {
        set((state) => {
          const items = state.basket ? [...state.basket.items] : [];
          const idx = items.findIndex((i) => i.productId === request.variantId);

          if (idx >= 0) {
            items[idx] = {
              ...items[idx],
              quantity: items[idx].quantity + request.quantity,
            };
          } else {
            items.push({
              id: request.variantId,
              productId: request.variantId,
              seriesId: request.seriesId,
              productDescription: request.productDescription,
              unitPrice: request.unitPrice ?? 0,
              quantity: request.quantity,
              pictureUrl: request.pictureUrl,
            });
          }

          return { basket: withItems(state.basket, items), error: null };
        });
      },

      // Local-only. quantity <= 0 removes the item, matching the behavior the
      // cart UI relies on.
      updateQuantity: async (productId, quantity) => {
        set((state) => {
          if (!state.basket) return state;
          const items =
            quantity <= 0
              ? state.basket.items.filter((i) => i.productId !== productId)
              : state.basket.items.map((i) =>
                  i.productId === productId ? { ...i, quantity } : i,
                );
          return { basket: withItems(state.basket, items), error: null };
        });
      },

      // Local-only.
      removeItem: async (productId) => {
        set((state) => {
          if (!state.basket) return state;
          const items = state.basket.items.filter(
            (i) => i.productId !== productId,
          );
          return { basket: withItems(state.basket, items), error: null };
        });
      },

      // Local-only.
      clearBasket: async () => {
        set({ basket: null, error: null });
      },

      itemCount: () =>
        get().basket?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0,
      subtotal: () =>
        get().basket?.items.reduce(
          (sum, i) => sum + i.unitPrice * i.quantity,
          0,
        ) ?? 0,
    }),
    {
      name: "mars-cart",
      storage: createJSONStorage(() => localStorage),
      // Only the basket needs to survive a reload.
      partialize: (state) => ({ basket: state.basket }),
    },
  ),
);

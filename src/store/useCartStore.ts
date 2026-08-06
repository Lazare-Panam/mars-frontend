import { create } from "zustand";
import {
  fetchBasket,
  addToCartRequest,
  updateQuantityRequest,
  removeItemRequest,
  clearBasketRequest,
  type CustomerBasket,
  type AddToCartRequest,
} from "@/api/cart.api";

interface CartState {
  basket: CustomerBasket | null;
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

export const useCartStore = create<CartState>((set, get) => ({
  basket: null,
  isLoading: false,
  error: null,

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

  itemCount: () =>
    get().basket?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0,
  subtotal: () =>
    get().basket?.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0) ??
    0,
}));

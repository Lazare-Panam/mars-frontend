import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import {
  type CustomerBasket,
  type BasketItem,
  type AddToCartRequest,
  saveBasketRequest,
} from "@/api/cart.api";
import { hasValidLogin } from "@/lib/auth";
import { useAuthStore } from "./useAuthStore";
import { useSavedCartStore } from "./useSavedCartStore";

// The cart page ("Your Cart"). It always lives in the browser, logged in or not.
// "Save Cart" sends it to the user's saved cart on the server (My Account), where
// the items join anything saved before, and then empties it.
//
// "login" means the user has to log in first; the save then runs right after
// login (see pendingSave and LoginForm).
export type SaveCartResult = "saved" | "login" | "error";

interface CartState {
  basket: CustomerBasket | null;
  // Set when "Save Cart" was clicked while logged out, so it happens after login.
  pendingSave: boolean;
  isSaving: boolean;
  error: string | null;

  // Resolves to true if the item was added (callers show "Added" only then).
  addToCart: (request: AddToCartRequest) => Promise<boolean>;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearBasket: () => void;
  saveCart: () => Promise<SaveCartResult>;

  itemCount: () => number;
  subtotal: () => number;
}

const withItems = (previous: CustomerBasket | null, items: BasketItem[]): CustomerBasket | null => {
  if (items.length === 0) return null;
  const now = new Date().toISOString();
  return {
    customerBasketId: previous?.customerBasketId ?? "local",
    items,
    createdAt: previous?.createdAt ?? now,
    updatedAt: now,
  };
};

const addLocally = (basket: CustomerBasket | null, request: AddToCartRequest) => {
  const items = basket ? [...basket.items] : [];
  const idx = items.findIndex((i) => i.productId === request.variantId);
  if (idx >= 0) {
    items[idx] = { ...items[idx], quantity: items[idx].quantity + request.quantity };
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
  return withItems(basket, items);
};

const toSaveRequest = (items: BasketItem[]): AddToCartRequest[] =>
  items
    .filter((i) => i.seriesId)
    .map((i) => ({
      seriesId: i.seriesId!,
      variantId: i.productId,
      productDescription: i.productDescription,
      quantity: i.quantity,
      pictureUrl: i.pictureUrl,
    }));

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      basket: null,
      pendingSave: false,
      isSaving: false,
      error: null,

      addToCart: async (request) => {
        set((state) => ({ basket: addLocally(state.basket, request), error: null }));
        return true;
      },

      // quantity <= 0 removes the item.
      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (!state.basket) return state;
          const items =
            quantity <= 0
              ? state.basket.items.filter((i) => i.productId !== productId)
              : state.basket.items.map((i) => (i.productId === productId ? { ...i, quantity } : i));
          return { basket: withItems(state.basket, items), error: null };
        }),

      removeItem: (productId) => get().updateQuantity(productId, 0),

      clearBasket: () => set({ basket: null, pendingSave: false, error: null }),

      saveCart: async () => {
        const items = toSaveRequest(get().basket?.items ?? []);
        if (items.length === 0) {
          set({ pendingSave: false });
          return "saved";
        }
        if (!hasValidLogin()) {
          set({ pendingSave: true });
          return "login";
        }

        set({ isSaving: true, error: null });
        try {
          const saved = await saveBasketRequest(items);
          useSavedCartStore.getState().setBasket(saved);
          // Saved: empty the cart page so saving again can't add the same items twice.
          set({ basket: null, pendingSave: false });
          return "saved";
        } catch (err) {
          if (axios.isAxiosError(err) && err.response?.status === 401) {
            // The stored login was rejected (expired): log in again, then save.
            useAuthStore.getState().clearToken();
            set({ pendingSave: true });
            return "login";
          }
          // Keep the cart so nothing is lost; the user can try again.
          set({ error: "We couldn't save your cart. Please try again." });
          return "error";
        } finally {
          set({ isSaving: false });
        }
      },

      itemCount: () => get().basket?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0,
      subtotal: () => get().basket?.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0) ?? 0,
    }),
    {
      name: "mars-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ basket: state.basket, pendingSave: state.pendingSave }),
    },
  ),
);

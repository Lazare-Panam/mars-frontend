import { create } from "zustand";
import axios from "axios";
import {
  type CustomerBasket,
  fetchBasket,
  updateQuantityRequest,
  removeItemRequest,
  clearBasketRequest,
} from "@/api/cart.api";
import { useAuthStore } from "./useAuthStore";

// The signed-in user's saved cart (My Account → Saved Cart). It lives on the
// server (by user id), so it isn't kept in localStorage; every action returns
// the latest copy from the API.
interface SavedCartState {
  basket: CustomerBasket | null;
  isLoading: boolean;
  error: string | null;

  setBasket: (basket: CustomerBasket) => void;
  // Forget the saved cart in this tab (on logout); it stays saved on the server.
  reset: () => void;
  fetchSavedCart: () => Promise<void>;
  // Resolves to true when the change was saved (e.g. to close the edit dialog).
  updateQuantity: (productId: string, quantity: number) => Promise<boolean>;
  removeItem: (productId: string) => Promise<boolean>;
  clearSavedCart: () => Promise<boolean>;
}

const isStatus = (err: unknown, status: number) =>
  axios.isAxiosError(err) && err.response?.status === status;

const errorMessage = (err: unknown) => {
  if (isStatus(err, 401)) {
    // The stored login was rejected (expired or invalid): forget it.
    useAuthStore.getState().clearToken();
    return "Your login has expired. Please log in again to see your saved cart.";
  }
  return "We couldn't update your saved cart. Please try again.";
};

export const useSavedCartStore = create<SavedCartState>()((set) => ({
  basket: null,
  isLoading: false,
  error: null,

  setBasket: (basket) => set({ basket, error: null }),

  reset: () => set({ basket: null, isLoading: false, error: null }),

  fetchSavedCart: async () => {
    set({ isLoading: true, error: null });
    try {
      set({ basket: await fetchBasket() });
    } catch (err) {
      set({ error: errorMessage(err) });
    } finally {
      set({ isLoading: false });
    }
  },

  updateQuantity: async (productId, quantity) => {
    try {
      set({ basket: await updateQuantityRequest(productId, quantity), error: null });
      return true;
    } catch (err) {
      set({ error: errorMessage(err) });
      return false;
    }
  },

  removeItem: async (productId) => {
    try {
      await removeItemRequest(productId);
      set((state) => ({
        basket: state.basket
          ? { ...state.basket, items: state.basket.items.filter((i) => i.productId !== productId) }
          : null,
        error: null,
      }));
      return true;
    } catch (err) {
      set({ error: errorMessage(err) });
      return false;
    }
  },

  clearSavedCart: async () => {
    try {
      await clearBasketRequest();
    } catch (err) {
      // 404 just means there was nothing saved.
      if (!isStatus(err, 404)) {
        set({ error: errorMessage(err) });
        return false;
      }
    }
    set((state) => ({ basket: state.basket ? { ...state.basket, items: [] } : null, error: null }));
    return true;
  },
}));

import { logoutUser } from "@/api/useAuth";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import { useSavedCartStore } from "@/store/useSavedCartStore";

/**
 * Logs the user out: tells the server (which only records it; the API doesn't
 * revoke tokens), then discards the token and both carts in this browser. The
 * token is the only thing that keeps the user signed in, so dropping it here is
 * what actually logs them out. The saved cart stays on the server for next time.
 */
export async function logout(): Promise<void> {
  // The endpoint requires a token, so skip the call when there isn't one.
  if (useAuthStore.getState().token || localStorage.getItem("authToken")) {
    try {
      await logoutUser();
    } catch {
      // The token may already be expired or invalid; log out locally anyway.
    }
  }
  useAuthStore.getState().clearToken();
  useSavedCartStore.getState().reset();
  useCartStore.getState().clearBasket();
}

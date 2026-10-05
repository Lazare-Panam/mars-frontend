import { useSyncExternalStore } from "react";
import { useAuthStore } from "@/store/useAuthStore";

// True when a login token is stored and hasn't expired. Login (useLogin) and
// useAuthStore write these two keys; this is a plain function so non-React
// code like the cart store can check it.
export function hasValidLogin(): boolean {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem("authToken");
  const expiration = localStorage.getItem("authExpiration");
  return Boolean(token && expiration && new Date(expiration) > new Date());
}

const subscribe = (onChange: () => void) => {
  // Login/logout in this tab go through useAuthStore; other tabs fire "storage".
  const unsubscribe = useAuthStore.subscribe(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    unsubscribe();
    window.removeEventListener("storage", onChange);
  };
};

/**
 * Whether the user is logged in, kept up to date as they log in or out.
 * Always false on the server (there's no localStorage there).
 */
export function useIsLoggedIn(): boolean {
  return useSyncExternalStore(subscribe, hasValidLogin, () => false);
}

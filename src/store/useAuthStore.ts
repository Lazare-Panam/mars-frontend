import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  setToken: (token: string, expiration: string) => void;
  clearToken: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null,

  setToken: (token, expiration) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("authExpiration", expiration);
    set({ token, isAuthenticated: true });
  },

  clearToken: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authExpiration");
    set({ token: null, isAuthenticated: false });
  },

  hydrate: () => {
    const token = localStorage.getItem("authToken");
    const expiration = localStorage.getItem("authExpiration");
    const isValid = token && expiration && new Date(expiration) > new Date();
    set({
      token: isValid ? token : null,
      isAuthenticated: Boolean(isValid),
    });
    if (!isValid && token) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authExpiration");
    }
  },
}));

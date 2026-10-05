import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  /** Full name from the login token, e.g. "Disha Panam". */
  userName: string | null;
  /** Initials for the header avatar, e.g. "DP". */
  initials: string | null;
  setToken: (token: string, expiration: string) => void;
  clearToken: () => void;
  hydrate: () => void;
}

/**
 * Reads the user's name from the JWT. The API puts "First Last" in the
 * standard "name" claim (Mars.API AuthService.CreateToken). This only decodes
 * the payload for display; it doesn't verify the token (the API does that).
 */
function nameFromToken(token: string): string | null {
  try {
    const payload = token.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const claims = JSON.parse(decodeURIComponent(escape(json))) as { name?: string; email?: string };
    return claims.name?.trim() || claims.email || null;
  } catch {
    return null;
  }
}

/** "Disha Panam" -> "DP"; "disha" -> "D". */
function initialsFor(name: string | null): string | null {
  if (!name) return null;
  const parts = name.split(/[\s@.]+/).filter(Boolean);
  const letters = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0]?.[0] ?? "";
  return letters.toUpperCase() || null;
}

const userFields = (token: string | null) => {
  const userName = token ? nameFromToken(token) : null;
  return { userName, initials: initialsFor(userName) };
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null,
  userName: null,
  initials: null,

  setToken: (token, expiration) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("authExpiration", expiration);
    set({ token, isAuthenticated: true, ...userFields(token) });
  },

  clearToken: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authExpiration");
    set({ token: null, isAuthenticated: false, userName: null, initials: null });
  },

  hydrate: () => {
    const token = localStorage.getItem("authToken");
    const expiration = localStorage.getItem("authExpiration");
    const isValid = token && expiration && new Date(expiration) > new Date();
    set({
      token: isValid ? token : null,
      isAuthenticated: Boolean(isValid),
      ...userFields(isValid ? token : null),
    });
    if (!isValid && token) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authExpiration");
    }
  },
}));

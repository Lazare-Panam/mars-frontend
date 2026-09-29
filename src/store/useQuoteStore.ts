import { create } from "zustand";

export interface QuoteRequest {
  sku: string;
  product?: string;
}

interface QuoteState {
  request: QuoteRequest | null;
  setRequest: (request: QuoteRequest) => void;
  clear: () => void;
}

/**
 * Hands a "Request quote" part number from a product page to the contact form
 * in memory, so the link stays a plain /contact (no query string). A button
 * calls setRequest() and navigates to /contact; ContactForm reads it once and
 * clears it. Opening /contact directly (or in a new tab) shows the blank form.
 */
export const useQuoteStore = create<QuoteState>((set) => ({
  request: null,
  setRequest: (request) => set({ request }),
  clear: () => set({ request: null }),
}));

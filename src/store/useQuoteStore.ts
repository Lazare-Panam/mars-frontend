import { create } from "zustand";

export interface QuoteLine {
  sku: string;
  product?: string;
  quantity: number;
}

export interface QuoteRequest {
  sku: string;
  product?: string;
  // Present when a whole cart is handed over (see CartPage "Proceed to quote").
  // When set, ContactForm pre-fills an itemized message from these lines
  // instead of the single-part message; `sku`/`product` above stay as the
  // first line so the single-item callers are unaffected.
  items?: QuoteLine[];
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

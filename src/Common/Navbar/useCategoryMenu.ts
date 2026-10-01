import { create } from "zustand";

// Which category bar dropdown is open, shared by the category bar and the
// header's "Products" link (hovering Products opens the bar's first dropdown).
// The close timer is shared too, so moving from one to the other doesn't flicker.

let closeTimer: ReturnType<typeof setTimeout> | null = null;

const clearTimer = () => {
  if (closeTimer) clearTimeout(closeTimer);
  closeTimer = null;
};

interface CategoryMenuState {
  /** Label of the open category, or null when all are closed. */
  open: string | null;
  openItem: (label: string) => void;
  /** Close after a short delay, so crossing a gap doesn't snap it shut. */
  scheduleClose: () => void;
  close: () => void;
}

export const useCategoryMenu = create<CategoryMenuState>((set) => ({
  open: null,
  openItem: (label) => {
    clearTimer();
    set({ open: label });
  },
  scheduleClose: () => {
    clearTimer();
    closeTimer = setTimeout(() => set({ open: null }), 150);
  },
  close: () => {
    clearTimer();
    set({ open: null });
  },
}));

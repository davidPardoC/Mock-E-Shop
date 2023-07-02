import { create } from "zustand";

type GlobalStore = {
  error: { show: boolean; message: string };
  showError: (message: string) => void;
  hideError: () => void;
};

export const useGlobalStore = create<GlobalStore>((set) => ({
  error: { show: false, message: "" },
  searchTerm: "",
  showError: (message: string) => {
    const timeout = setTimeout(() => {
        set({ error: { show: false, message: "" } });
        clearTimeout(timeout);
    }, 1000);
    return set({ error: { show: true, message } });
  },
  hideError: () => set({ error: { show: false, message: "" } }),
}));

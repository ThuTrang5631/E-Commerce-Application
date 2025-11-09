import { create } from "zustand";

export const useProducts = create((set) => ({
  products: [],
  isSearch: false,
  setProducts: (products: any) => set({ products }),
  clearProducts: () => set({ products: [] }),
  setIsSearch: (isSearch: boolean) => set({ isSearch }),
}));

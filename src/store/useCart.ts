import { create } from "zustand";
import { CARTS } from "../utils/constants";
import { getValueFromLocalStorage } from "../utils/handler";

const loadCartsFromStorage = () => {
  try {
    const savedCarts = getValueFromLocalStorage(CARTS);
    return savedCarts ? JSON.parse(savedCarts) : [];
  } catch (error) {
    console.error("Error loading carts from localStorage:", error);
    return [];
  }
};

export const useCarts = create((set) => ({
  carts: loadCartsFromStorage(),
  setCarts: (carts: any) => set({ carts }),
}));

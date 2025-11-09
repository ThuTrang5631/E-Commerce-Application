import { create } from "zustand";

export const useAuth = create((set) => ({
  user: {},
  setUser: (user: any) => set({ user }),
  clearUser: () => set({ user: {} }),
}));

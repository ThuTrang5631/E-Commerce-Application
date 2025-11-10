import { create } from "zustand";
import type { IUser } from "../pages/Login/data.t";

export const useAuth = create((set) => ({
  user: {},
  setUser: (user: IUser) => set({ user }),
  clearUser: () => set({ user: {} }),
}));

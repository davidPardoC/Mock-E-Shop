import { create } from "zustand";

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
};

export type User = {
  id: string;
  email: string;
};

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  setUser: (user: User) => {
    return set({ user });
  },
}));

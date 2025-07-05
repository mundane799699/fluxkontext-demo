import { create } from "zustand";

type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string;
};

type AuthState = {
  user: User | null;
  isPending: boolean;
  setUser: (user: User | null) => void;
  setIsPending: (isPending: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isPending: false,
  setUser: (user) => set({ user }),
  setIsPending: (isPending) => set({ isPending }),
}));

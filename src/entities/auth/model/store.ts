import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { AuthStore, User } from "./types";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

export const useAuthStore = create<AuthStore>()(
  immer((set) => ({
    ...initialState,

    // Actions defined inside the store (proper Immer usage)
    setUser: (user: User | null) => {
      set((state) => {
        state.user = user;
        state.isAuthenticated = !!user;
        state.isLoading = false;
        state.error = null;
      });
    },

    setLoading: (isLoading: boolean) => {
      set((state) => {
        state.isLoading = isLoading;
      });
    },

    setError: (error: string | null) => {
      set((state) => {
        state.error = error;
        state.isLoading = false;
      });
    },

    reset: () => {
      set(() => ({
        ...initialState,
        isLoading: false,
      }));
    },
  }))
);

export const authActions = {
  setUser: (user: User | null) => useAuthStore.getState().setUser(user),
  setLoading: (isLoading: boolean) =>
    useAuthStore.getState().setLoading(isLoading),
  setError: (error: string | null) => useAuthStore.getState().setError(error),
  reset: () => useAuthStore.getState().reset(),
};

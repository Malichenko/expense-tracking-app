import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";

import { AuthStore, User } from "./types";
import { authApi } from "../api";
import { createAsyncHandler } from "@shared/utils/fp";
import { showErrorAlert } from "@shared/utils/alert";

const useAuthStore = create<AuthStore>()(
  immer((set) => {
    const handleAsync = createAsyncHandler({
      onStart: () => {
        set((state) => {
          state.isLoading = true;
          state.error = null;
        });
      },
      onSuccess: () => {
        set((state) => {
          state.error = null;
        });
      },
      onError: (error) => {
        set((state) => {
          state.error = error;
        });
        showErrorAlert("Failed to check authentication status.", error);
      },
      onFinally: () => {
        set((state) => {
          state.isLoading = false;
        });
      },
    });

    return {
      user: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,
      actions: {
        setUser: (user: User | null) => {
          set((state) => {
            state.user = user;
            state.isAuthenticated = !!user;
            state.error = null;
          });
        },
        setError: (error: string | null) => {
          set((state) => {
            state.error = error;
          });
        },
        reset: () => {
          set((state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
          });
        },
        fetchCurrentUser: async (options) => {
          const operation = async () => {
            const user = await authApi.getCurrentUser({
              signal: options?.signal,
            });

            set((state) => {
              state.user = user;
              state.isAuthenticated = !!user;
            });
          };

          await handleAsync(
            operation,
            "Failed to check authentication status."
          )();
        },
      },
    };
  })
);

export const useUser = () => useAuthStore((s) => s.user);

export const useIsAuthenticated = () => useAuthStore((s) => s.isAuthenticated);

export const useAuthActions = () =>
  useAuthStore(
    useShallow((s) => ({
      setUser: s.actions.setUser,
      setError: s.actions.setError,
      reset: s.actions.reset,
      fetchCurrentUser: s.actions.fetchCurrentUser,
    }))
  );

export const useAuthStatus = () =>
  useAuthStore(
    useShallow((s) => ({
      isLoading: s.isLoading,
      error: s.error,
    }))
  );

export const authActions = {
  setUser: (user: User | null) => useAuthStore.getState().actions.setUser(user),
  setError: (error: string | null) =>
    useAuthStore.getState().actions.setError(error),
  reset: () => useAuthStore.getState().actions.reset(),
  fetchCurrentUser: (options?: { signal?: AbortSignal }) =>
    useAuthStore.getState().actions.fetchCurrentUser(options),
};

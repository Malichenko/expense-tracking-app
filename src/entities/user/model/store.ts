import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";

import type { User, UserStore } from "./types";
import { userApi } from "../api";
import { createAsyncHandler } from "@shared/utils/fp";
import { showErrorAlert } from "@shared/utils/alert";

const useUserStore = create<UserStore>()(
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
            const user = await userApi.getCurrentUser({
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

export const useUser = () => useUserStore((s) => s.user);

export const useIsAuthenticated = () => useUserStore((s) => s.isAuthenticated);

export const useUserActions = () =>
  useUserStore(
    useShallow((s) => ({
      setUser: s.actions.setUser,
      setError: s.actions.setError,
      reset: s.actions.reset,
      fetchCurrentUser: s.actions.fetchCurrentUser,
    }))
  );

export const useUserStatus = () =>
  useUserStore(
    useShallow((s) => ({
      isLoading: s.isLoading,
      error: s.error,
    }))
  );

export const userActions = {
  setUser: (user: User | null) => useUserStore.getState().actions.setUser(user),
  setError: (error: string | null) =>
    useUserStore.getState().actions.setError(error),
  reset: () => useUserStore.getState().actions.reset(),
  fetchCurrentUser: (options?: { signal?: AbortSignal }) =>
    useUserStore.getState().actions.fetchCurrentUser(options),
};

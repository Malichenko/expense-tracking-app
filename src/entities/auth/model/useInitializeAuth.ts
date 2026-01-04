import { useEffect } from "react";

import { authActions } from "./store";
import { authApi } from "../api";
import { showErrorAlert } from "@shared/utils/alert";

export const useInitializeAuth = () => {
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        authActions.setLoading(true);
        const user = await authApi.getCurrentUser();

        if (user) {
          authActions.setUser(user);
        } else {
          authActions.setUser(null);
        }
      } catch (error) {
        showErrorAlert("Failed to check authentication status", error);
        authActions.setError("Failed to check authentication status");
      } finally {
        authActions.setLoading(false);
      }
    };

    initializeAuth();
  }, []);
};

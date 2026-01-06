import { authApiClient } from "@shared/api";
import { tokenStorage } from "@shared/secure-storage";
import { refreshToken } from "@shared/api/auth";
import type { User } from "../model/types";
import type { FirebaseLookupResponse } from "@shared/api/auth/types";
import type { AsyncOptions } from "@shared/api";
import { mapFirebaseToUser } from "../lib";

export const userApi = {
  async getCurrentUser({ signal }: AsyncOptions = {}): Promise<User | null> {
    const hasTokens = await tokenStorage.hasTokens();

    if (!hasTokens) {
      return null;
    }

    const isExpired = await tokenStorage.isTokenExpired();

    if (isExpired) {
      const newToken = await refreshToken({ signal });

      if (!newToken) {
        return null;
      }
    }

    const tokens = await tokenStorage.getTokens();

    if (!tokens) {
      return null;
    }

    try {
      const response = await authApiClient.lookup.post<FirebaseLookupResponse>(
        "",
        { idToken: tokens.idToken },
        { signal }
      );

      const userData = response.data.users.at(0);

      if (!userData) {
        return null;
      }

      return mapFirebaseToUser(userData);
    } catch {
      await tokenStorage.clearTokens();
      return null;
    }
  },
};

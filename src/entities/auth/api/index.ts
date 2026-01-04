import { authApiClient } from "@shared/api";
import { tokenStorage } from "@shared/secure-storage";
import {
  User,
  LoginCredentials,
  RegistrationCredentials,
  FirebaseAuthResponse,
  FirebaseRefreshResponse,
  FirebaseLookupResponse,
} from "../model/types";
import { mapFirebaseUserToUser } from "../lib/mappers";

interface AuthOptions {
  signal?: AbortSignal;
}

const storeAuthTokens = async (
  response: FirebaseAuthResponse
): Promise<void> => {
  const expiresInMs = parseInt(response.expiresIn, 10) * 1000;
  const expiresAt = Date.now() + expiresInMs;

  await tokenStorage.setTokens({
    idToken: response.idToken,
    refreshToken: response.refreshToken,
    expiresAt,
  });
};

export const authApi = {
  async login(
    { email, password }: LoginCredentials,
    { signal }: AuthOptions = {}
  ): Promise<User> {
    const response = await authApiClient.signIn.post<FirebaseAuthResponse>(
      "",
      {
        email,
        password,
        returnSecureToken: true,
      },
      { signal }
    );

    await storeAuthTokens(response.data);

    return mapFirebaseUserToUser(response.data);
  },

  async register(
    { email, password }: RegistrationCredentials,
    { signal }: AuthOptions = {}
  ): Promise<User> {
    const response = await authApiClient.signUp.post<FirebaseAuthResponse>(
      "",
      {
        email,
        password,
        returnSecureToken: true,
      },
      { signal }
    );

    await storeAuthTokens(response.data);

    return mapFirebaseUserToUser(response.data);
  },

  async logout(): Promise<void> {
    await tokenStorage.clearTokens();
  },

  async refreshToken({ signal }: AuthOptions = {}): Promise<string | null> {
    const currentRefreshToken = await tokenStorage.getRefreshToken();

    if (!currentRefreshToken) {
      return null;
    }

    try {
      const response =
        await authApiClient.refreshToken.post<FirebaseRefreshResponse>(
          "",
          new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: currentRefreshToken,
          }).toString(),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            signal,
          }
        );

      const expiresInMs = parseInt(response.data.expires_in, 10) * 1000;
      const expiresAt = Date.now() + expiresInMs;

      await tokenStorage.setTokens({
        idToken: response.data.id_token,
        refreshToken: response.data.refresh_token,
        expiresAt,
      });

      return response.data.id_token;
    } catch {
      await tokenStorage.clearTokens();
      return null;
    }
  },

  async getCurrentUser({ signal }: AuthOptions = {}): Promise<User | null> {
    const hasTokens = await tokenStorage.hasTokens();

    if (!hasTokens) {
      return null;
    }

    const isExpired = await tokenStorage.isTokenExpired();

    if (isExpired) {
      const newToken = await this.refreshToken({ signal });

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

      const userData = response.data.users[0];

      if (!userData) {
        return null;
      }

      return {
        uid: userData.localId,
        email: userData.email,
        displayName: userData.displayName ?? null,
        emailVerified: userData.emailVerified,
        photoURL: userData.photoUrl ?? null,
      };
    } catch {
      await tokenStorage.clearTokens();
      return null;
    }
  },

  async getIdToken(): Promise<string | null> {
    const isExpired = await tokenStorage.isTokenExpired();

    if (isExpired) {
      return this.refreshToken();
    }

    return tokenStorage.getIdToken();
  },
};

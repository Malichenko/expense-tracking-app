import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";
const REFRESH_TOKEN_KEY = "auth_refresh_token";
const TOKEN_EXPIRY_KEY = "auth_token_expiry";

export interface AuthTokens {
  idToken: string;
  refreshToken: string;
  expiresAt: number;
}

export const tokenStorage = {
  async setTokens(tokens: AuthTokens): Promise<void> {
    await Promise.all([
      SecureStore.setItemAsync(TOKEN_KEY, tokens.idToken),
      SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refreshToken),
      SecureStore.setItemAsync(TOKEN_EXPIRY_KEY, tokens.expiresAt.toString()),
    ]);
  },

  async getTokens(): Promise<AuthTokens | null> {
    const [idToken, refreshToken, expiresAtStr] = await Promise.all([
      SecureStore.getItemAsync(TOKEN_KEY),
      SecureStore.getItemAsync(REFRESH_TOKEN_KEY),
      SecureStore.getItemAsync(TOKEN_EXPIRY_KEY),
    ]);

    if (!idToken || !refreshToken || !expiresAtStr) {
      return null;
    }

    return {
      idToken,
      refreshToken,
      expiresAt: parseInt(expiresAtStr, 10),
    };
  },

  async getIdToken(): Promise<string | null> {
    return SecureStore.getItemAsync(TOKEN_KEY);
  },

  async getRefreshToken(): Promise<string | null> {
    return SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  },

  async isTokenExpired(): Promise<boolean> {
    const expiresAtStr = await SecureStore.getItemAsync(TOKEN_EXPIRY_KEY);

    if (!expiresAtStr) {
      return true;
    }

    const expiresAt = parseInt(expiresAtStr, 10);
    const bufferMs = 60 * 1000;

    return Date.now() >= expiresAt - bufferMs;
  },

  async clearTokens(): Promise<void> {
    await Promise.all([
      SecureStore.deleteItemAsync(TOKEN_KEY),
      SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
      SecureStore.deleteItemAsync(TOKEN_EXPIRY_KEY),
    ]);
  },

  async hasTokens(): Promise<boolean> {
    const idToken = await SecureStore.getItemAsync(TOKEN_KEY);
    return idToken !== null;
  },
};

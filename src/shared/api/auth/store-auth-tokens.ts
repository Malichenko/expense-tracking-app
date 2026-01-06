import { tokenStorage } from "../../secure-storage";
import type { FirebaseAuthResponse } from "./types";

export const storeAuthTokens = async (
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

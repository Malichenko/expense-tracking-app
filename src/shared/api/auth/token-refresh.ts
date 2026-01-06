import { authApiClient } from "../clients";
import { tokenStorage } from "../../secure-storage";
import type { AsyncOptions } from "../types";

interface FirebaseRefreshResponse {
  expires_in: string;
  token_type: string;
  refresh_token: string;
  id_token: string;
  user_id: string;
  project_id: string;
}

export const refreshToken = async ({ signal }: AsyncOptions = {}): Promise<
  string | null
> => {
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
};

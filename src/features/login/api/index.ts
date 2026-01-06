import {
  authApiClient,
  storeAuthTokens,
  type AsyncOptions,
  type FirebaseAuthResponse,
} from "@shared/api";
import { mapFirebaseToUser, type User } from "@entities/user";
import type { LoginCredentials } from "../model/types";

export const loginApi = {
  async login(
    { email, password }: LoginCredentials,
    { signal }: AsyncOptions = {}
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

    return mapFirebaseToUser(response.data);
  },
};

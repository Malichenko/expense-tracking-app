import {
  authApiClient,
  storeAuthTokens,
  mapFirebaseUserToUser,
  type AsyncOptions,
  type FirebaseAuthResponse,
} from "@shared/api";
import type { User } from "@entities/user";
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

    return mapFirebaseUserToUser(response.data);
  },
};

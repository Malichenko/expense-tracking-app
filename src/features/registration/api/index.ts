import {
  authApiClient,
  storeAuthTokens,
  mapFirebaseUserToUser,
  type AsyncOptions,
  type FirebaseAuthResponse,
} from "@shared/api";
import type { User } from "@entities/user";
import type { RegistrationCredentials } from "../model/types";

export const registrationApi = {
  async register(
    { email, password }: RegistrationCredentials,
    { signal }: AsyncOptions = {}
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
};

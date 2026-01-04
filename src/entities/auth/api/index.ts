import { apiClient } from "@shared/api";
import {
  User,
  LoginCredentials,
  RegistrationCredentials,
} from "../model/types";

interface LoginResponse {
  user: User;
  token: string;
}

interface RegisterResponse {
  user: User;
  token: string;
}

interface AuthOptions {
  signal?: AbortSignal;
}

const storeToken = async (_token: string): Promise<void> => {
  // TODO: Implement secure token storage
};

const clearToken = async (): Promise<void> => {
  // TODO: Implement token removal from storage
};

export const authApi = {
  async login(
    credentials: LoginCredentials,
    { signal }: AuthOptions = {}
  ): Promise<User> {
    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      credentials,
      { signal }
    );

    await storeToken(response.data.token);

    return response.data.user;
  },

  async register(
    credentials: RegistrationCredentials,
    { signal }: AuthOptions = {}
  ): Promise<User> {
    const response = await apiClient.post<RegisterResponse>(
      "/auth/register",
      credentials,
      { signal }
    );

    await storeToken(response.data.token);

    return response.data.user;
  },

  async logout({ signal }: AuthOptions = {}): Promise<void> {
    try {
      await apiClient.post("/auth/logout", undefined, { signal });
    } finally {
      await clearToken();
    }
  },

  async refreshToken({ signal }: AuthOptions = {}): Promise<string | null> {
    try {
      const response = await apiClient.post<{ token: string }>(
        "/auth/refresh",
        undefined,
        { signal }
      );
      await storeToken(response.data.token);
      return response.data.token;
    } catch {
      await clearToken();
      return null;
    }
  },

  async getCurrentUser({ signal }: AuthOptions = {}): Promise<User | null> {
    try {
      const response = await apiClient.get<{ user: User }>("/auth/me", {
        signal,
      });
      return response.data.user;
    } catch {
      return null;
    }
  },
};

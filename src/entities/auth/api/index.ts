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

const storeToken = async (_token: string): Promise<void> => {
  // TODO: Implement secure token storage
};

const clearToken = async (): Promise<void> => {
  // TODO: Implement token removal from storage
};

export const authApi = {
  async login(credentials: LoginCredentials): Promise<User> {
    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      credentials
    );

    await storeToken(response.data.token);

    return response.data.user;
  },

  async register(credentials: RegistrationCredentials): Promise<User> {
    const response = await apiClient.post<RegisterResponse>(
      "/auth/register",
      credentials
    );

    await storeToken(response.data.token);

    return response.data.user;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      await clearToken();
    }
  },

  async refreshToken(): Promise<string | null> {
    try {
      const response = await apiClient.post<{ token: string }>("/auth/refresh");
      await storeToken(response.data.token);
      return response.data.token;
    } catch {
      await clearToken();
      return null;
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await apiClient.get<{ user: User }>("/auth/me");
      return response.data.user;
    } catch {
      return null;
    }
  },
};

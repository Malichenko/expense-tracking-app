import { tokenStorage } from "@shared/secure-storage";

export const logoutApi = {
  async logout(): Promise<void> {
    await tokenStorage.clearTokens();
  },
};

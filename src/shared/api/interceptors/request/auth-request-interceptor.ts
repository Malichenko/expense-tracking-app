import type { InternalAxiosRequestConfig } from "axios";
import { tokenStorage } from "../../../secure-storage";

export const authRequestInterceptor = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  const idToken = await tokenStorage.getIdToken();

  if (idToken) {
    config.params = {
      ...config.params,
      auth: idToken,
    };
  }

  return config;
};

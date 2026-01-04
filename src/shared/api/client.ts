import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { tokenStorage } from "../secure-storage";

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_FIREBASE_BACKEND_URL,
});

apiClient.interceptors.request.use(async (config) => {
  const idToken = await tokenStorage.getIdToken();

  if (idToken) {
    config.params = {
      ...config.params,
      auth: idToken,
    };
  }

  return config;
});

interface FailedRequest {
  resolve: (token: string | null) => void;
  reject: (error: Error) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (
  error: Error | null,
  token: string | null = null
): void => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              if (token && originalRequest.params) {
                originalRequest.params.auth = token;
              }
              resolve(apiClient(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // TODO: Cannot import from the entities layer as is topper layer. Need to think how to resolve it.
        const { authApi } = await import("@entities/auth/api");
        const newToken = await authApi.refreshToken();

        if (newToken) {
          processQueue(null, newToken);

          if (originalRequest.params) {
            originalRequest.params.auth = newToken;
          }

          return apiClient(originalRequest);
        }

        processQueue(new Error("Token refresh failed"), null);
        // TODO: Cannot import from the entities layer as is topper layer. Need to think how to resolve it.
        const { authActions } = await import("@entities/auth/model/store");
        authActions.reset();

        return Promise.reject(error);
      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        // TODO: Cannot import from the entities layer as is topper layer. Need to think how to resolve it.
        const { authActions } = await import("@entities/auth/model/store");
        authActions.reset();

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

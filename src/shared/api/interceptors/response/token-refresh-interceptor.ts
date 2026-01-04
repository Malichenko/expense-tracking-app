import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { authHandlersRegistry } from "../../auth-handlers-registry";
import { createTokenRefreshQueue } from "./lib";

interface RetryableRequest extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const HTTP_UNAUTHORIZED = 401;

const isUnauthorizedError = (error: AxiosError): boolean =>
  error.response?.status === HTTP_UNAUTHORIZED;

const updateRequestToken = (
  request: InternalAxiosRequestConfig,
  token: string
): void => {
  if (request.params) {
    request.params.auth = token;
  }
};

export const createTokenRefreshInterceptor = (client: AxiosInstance) => {
  const queue = createTokenRefreshQueue();

  const handleQueuedRequest = (
    originalRequest: RetryableRequest
  ): Promise<unknown> =>
    new Promise((resolve, reject) => {
      queue.enqueue({
        resolve: (token) => {
          if (token) {
            updateRequestToken(originalRequest, token);
          }
          resolve(client(originalRequest));
        },
        reject,
      });
    });

  const handleTokenRefresh = async (
    originalRequest: RetryableRequest,
    error: AxiosError
  ): Promise<unknown> => {
    originalRequest._retry = true;
    queue.setRefreshing(true);

    try {
      const newToken = await authHandlersRegistry.refreshToken();

      if (!newToken) {
        queue.rejectAll(new Error("Token refresh failed"));
        authHandlersRegistry.resetAuth();

        return Promise.reject(error);
      }

      queue.resolveAll(newToken);
      updateRequestToken(originalRequest, newToken);

      return client(originalRequest);
    } catch (refreshError) {
      queue.rejectAll(refreshError as Error);
      authHandlersRegistry.resetAuth();

      return Promise.reject(refreshError);
    } finally {
      queue.setRefreshing(false);
    }
  };

  return async (error: AxiosError): Promise<unknown> => {
    const originalRequest = error.config as RetryableRequest;

    if (!isUnauthorizedError(error) || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (queue.isRefreshing()) {
      return handleQueuedRequest(originalRequest);
    }

    return handleTokenRefresh(originalRequest, error);
  };
};

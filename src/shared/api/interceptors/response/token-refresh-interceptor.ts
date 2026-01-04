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

/**
 * Creates an Axios response interceptor that handles automatic token refresh.
 *
 * When a request fails with 401 Unauthorized:
 * 1. If no refresh is in progress → triggers token refresh and retries the request
 * 2. If refresh is already in progress → queues the request to retry after refresh completes
 *
 * This prevents multiple simultaneous refresh calls and ensures all failed requests
 * are retried with the new token once refresh succeeds.
 */
export const createTokenRefreshInterceptor = (client: AxiosInstance) => {
  // Queue holds requests that arrived while token refresh is in progress
  const queue = createTokenRefreshQueue();

  /**
   * Queues a failed request to be retried after the ongoing token refresh completes.
   * The request will be resolved/rejected when queue.resolveAll/rejectAll is called.
   */
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

  /**
   * Initiates the token refresh flow:
   * 1. Marks request as retried to prevent infinite loops
   * 2. Sets refreshing flag to queue subsequent 401 errors
   * 3. Attempts to get a new token
   * 4. On success: retries all queued requests with new token
   * 5. On failure: rejects all queued requests and resets auth state
   */
  const handleTokenRefresh = async (
    originalRequest: RetryableRequest,
    error: AxiosError
  ): Promise<unknown> => {
    // Mark as retried to prevent infinite retry loops
    originalRequest._retry = true;
    queue.setRefreshing(true);

    try {
      const newToken = await authHandlersRegistry.refreshToken();

      // Refresh returned no token - session is invalid
      if (!newToken) {
        queue.rejectAll(new Error("Token refresh failed"));
        authHandlersRegistry.resetAuth();

        return Promise.reject(error);
      }

      // Refresh succeeded - retry all queued requests with new token
      queue.resolveAll(newToken);
      updateRequestToken(originalRequest, newToken);

      return client(originalRequest);
    } catch (refreshError) {
      // Refresh failed - reject all queued requests and logout
      queue.rejectAll(refreshError as Error);
      authHandlersRegistry.resetAuth();

      return Promise.reject(refreshError);
    } finally {
      queue.setRefreshing(false);
    }
  };

  /**
   * Main interceptor function - attached to Axios response error handler.
   * Routes 401 errors to either queue (if refresh in progress) or refresh flow.
   */
  return async (error: AxiosError): Promise<unknown> => {
    const originalRequest = error.config as RetryableRequest;

    // Skip if not 401 or already retried (prevents infinite loops)
    if (!isUnauthorizedError(error) || originalRequest._retry) {
      return Promise.reject(error);
    }

    // If refresh is already in progress, queue this request
    if (queue.isRefreshing()) {
      return handleQueuedRequest(originalRequest);
    }

    // First 401 - initiate token refresh
    return handleTokenRefresh(originalRequest, error);
  };
};

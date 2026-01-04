import type { QueuedRequest } from "./types";

export const createTokenRefreshQueue = () => {
  let isRefreshing = false;
  let queue: QueuedRequest[] = [];

  const processQueue = (error: Error | null, token: string | null): void => {
    queue.forEach((request) => {
      if (error) {
        request.reject(error);
      } else {
        request.resolve(token);
      }
    });
    queue = [];
  };

  return {
    isRefreshing: () => isRefreshing,

    setRefreshing: (value: boolean) => {
      isRefreshing = value;
    },

    enqueue: (request: QueuedRequest) => {
      queue.push(request);
    },

    resolveAll: (token: string | null) => {
      processQueue(null, token);
    },

    rejectAll: (error: Error) => {
      processQueue(error, null);
    },
  };
};

export type TokenRefreshQueue = ReturnType<typeof createTokenRefreshQueue>;

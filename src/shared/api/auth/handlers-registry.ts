export type RefreshTokenHandler = () => Promise<string | null>;
export type ResetAuthHandler = () => void;

export interface AuthHandlers {
  refreshToken: RefreshTokenHandler | null;
  resetAuth: ResetAuthHandler | null;
}

const createAuthHandlersRegistry = () => {
  const handlers: AuthHandlers = {
    refreshToken: null,
    resetAuth: null,
  };

  return {
    register: (newHandlers: Partial<AuthHandlers>): void => {
      if (newHandlers.refreshToken) {
        handlers.refreshToken = newHandlers.refreshToken;
      }
      if (newHandlers.resetAuth) {
        handlers.resetAuth = newHandlers.resetAuth;
      }
    },

    refreshToken: async (): Promise<string | null> =>
      handlers.refreshToken?.() ?? null,

    resetAuth: (): void => {
      handlers.resetAuth?.();
    },
  };
};

export const authHandlersRegistry = createAuthHandlersRegistry();

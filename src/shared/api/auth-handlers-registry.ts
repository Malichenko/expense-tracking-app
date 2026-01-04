type RefreshTokenHandler = () => Promise<string | null>;
type ResetAuthHandler = () => void;

interface AuthHandlers {
  refreshToken: RefreshTokenHandler | null;
  resetAuth: ResetAuthHandler | null;
}

const authHandlers: AuthHandlers = {
  refreshToken: null,
  resetAuth: null,
};

export const authHandlersRegistry = {
  register(handlers: Partial<AuthHandlers>): void {
    if (handlers.refreshToken) {
      authHandlers.refreshToken = handlers.refreshToken;
    }
    if (handlers.resetAuth) {
      authHandlers.resetAuth = handlers.resetAuth;
    }
  },

  async refreshToken(): Promise<string | null> {
    if (!authHandlers.refreshToken) {
      return null;
    }
    return authHandlers.refreshToken();
  },

  resetAuth(): void {
    if (!authHandlers.resetAuth) {
      return;
    }
    authHandlers.resetAuth();
  },
};

import { authHandlersRegistry, refreshToken } from "@shared/api";
import { userActions } from "@entities/user";

export const setupAuthHandlers = (): void => {
  authHandlersRegistry.register({
    refreshToken: () => refreshToken(),
    resetAuth: () => userActions.reset(),
  });
};

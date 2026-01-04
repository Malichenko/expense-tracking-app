import { authHandlersRegistry } from "@shared/api/auth-handlers-registry";

import { authApi } from "../api";
import { authActions } from "../model/store";

export const setupAuthHandlers = (): void => {
  authHandlersRegistry.register({
    refreshToken: () => authApi.refreshToken(),
    resetAuth: () => authActions.reset(),
  });
};

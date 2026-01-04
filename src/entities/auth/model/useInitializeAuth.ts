import { useEffect } from "react";

import { authActions } from "./store";
import { useAbortController } from "@shared/hooks";

export const useInitializeAuth = () => {
  const getSignal = useAbortController();

  useEffect(() => {
    authActions.fetchCurrentUser({ signal: getSignal() });
  }, []);
};

import { useEffect } from "react";

import { userActions } from "./store";
import { useAbortController } from "@shared/hooks";

export const useInitializeUser = () => {
  const getSignal = useAbortController();

  useEffect(() => {
    userActions.fetchCurrentUser({ signal: getSignal() });
  }, []);
};

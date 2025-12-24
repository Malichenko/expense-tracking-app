import { useEffect } from "react";
import { useAbortController } from "@shared/lib/hooks";
import { useExpenseActions, useExpenseStatus } from "./store";

export const useInitializeExpenses = () => {
  const { fetch } = useExpenseActions();
  const { isLoading, error } = useExpenseStatus();
  const getSignal = useAbortController();

  useEffect(() => {
    void fetch({ signal: getSignal() });
  }, [fetch, getSignal]);

  return { isLoading, error, refetch: fetch };
};

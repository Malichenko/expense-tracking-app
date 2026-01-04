import { useCallback, useEffect } from "react";
import { useAbortController } from "@shared/hooks";
import { useExpenseActions, useExpenseStatus } from "./store";

interface UseInitializeExpensesOptions {
  userId: string | undefined;
}

export const useInitializeExpenses = ({
  userId,
}: UseInitializeExpensesOptions) => {
  const { fetch } = useExpenseActions();
  const { isLoading, error } = useExpenseStatus();
  const getSignal = useAbortController();

  const refetch = useCallback(() => {
    if (!userId) return;
    return fetch({ signal: getSignal(), userId });
  }, [fetch, getSignal, userId]);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return { isLoading, error, refetch };
};

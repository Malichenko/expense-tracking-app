import { useEffect } from "react";
import { ScreenLayout, LoadingOverlay, ErrorOverlay } from "@shared/ui";
import { ExpensesOutput } from "@widgets/expenses-output";
import { AppRoutes, useAppNavigation } from "@shared/routes";
import {
  useExpenseActions,
  useExpenseStatus,
  useRecentExpenses,
} from "@entities/expense";
import { useAbortController } from "@shared/lib/hooks";

export const RecentExpensesScreen = () => {
  const navigation = useAppNavigation();
  const expenses = useRecentExpenses(7);
  const { fetch } = useExpenseActions();
  const { isLoading, error } = useExpenseStatus();
  const getSignal = useAbortController();

  const expensePressHandler = (expenseId: string) => {
    navigation.navigate(AppRoutes.ManageExpense, { expenseId });
  };

  useEffect(() => {
    void fetch({ signal: getSignal() });
  }, [fetch, getSignal]);

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={() => fetch()} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <ScreenLayout>
      <ExpensesOutput
        periodName="Last 7 Days"
        onExpensePress={expensePressHandler}
        expenses={expenses}
      />
    </ScreenLayout>
  );
};

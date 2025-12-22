import { useEffect, useMemo } from "react";
import { ScreenLayout, LoadingOverlay, ErrorOverlay } from "@shared/ui";
import { ExpensesOutput } from "@widgets/expenses-output";
import { AppRoutes, useAppNavigation } from "@shared/routes";
import {
  useExpenseActions,
  useExpenseStatus,
  useRecentExpenses,
} from "@entities/expense";
import { createDateMinusDays } from "@entities/expense/lib/utils/createDateMinusDays";

export const RecentExpensesScreen = () => {
  const navigation = useAppNavigation();
  const expenses = useRecentExpenses();
  const { fetch } = useExpenseActions();
  const { isLoading, error } = useExpenseStatus();

  const recentExpenses = useMemo(() => {
    const cutoffDate = createDateMinusDays(7);
    return expenses.filter((expense) => expense.date >= cutoffDate);
  }, [expenses]);

  const expensePressHandler = (expenseId: string) => {
    navigation.navigate(AppRoutes.ManageExpense, { expenseId });
  };

  useEffect(() => {
    const abortController = new AbortController();

    void fetch({ signal: abortController.signal });

    return () => abortController.abort();
  }, [fetch]);

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={fetch} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <ScreenLayout>
      <ExpensesOutput
        periodName="Last 7 Days"
        onExpensePress={expensePressHandler}
        expenses={recentExpenses}
      />
    </ScreenLayout>
  );
};

import { ScreenLayout, LoadingOverlay, ErrorOverlay } from "@shared/ui";
import { ExpensesOutput } from "@widgets/expenses-output";
import { AppRoutes, useAppNavigation } from "@shared/routes";
import {
  useExpenses,
  useExpenseLoading,
  useExpenseError,
} from "@entities/expense";
import { createDateMinusDays } from "@entities/expense/lib/utils/createDateMinusDays";
import { useEffect, useMemo } from "react";

export const RecentExpensesScreen = () => {
  const navigation = useAppNavigation();
  const { fetchExpenses, expenses } = useExpenses();
  const isLoading = useExpenseLoading();
  const error = useExpenseError();

  const recentExpenses = useMemo(() => {
    const cutoffDate = createDateMinusDays(7);
    return expenses.filter((expense) => expense.date >= cutoffDate);
  }, [expenses]);

  const expensePressHandler = (expenseId: string) => {
    navigation.navigate(AppRoutes.ManageExpense, { expenseId });
  };

  useEffect(() => {
    const abortController = new AbortController();

    void fetchExpenses({ signal: abortController.signal });

    return () => abortController.abort();
  }, [fetchExpenses]);

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={fetchExpenses} />;
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

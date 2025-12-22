import { ScreenLayout, LoadingOverlay, ErrorOverlay } from "@shared/ui";
import { ExpensesOutput } from "@widgets/expenses-output";
import { AppRoutes, useAppNavigation } from "@shared/routes";
import {
  useExpenses,
  useExpenseLoading,
  useExpenseError,
  useFetchExpenses,
} from "@entities/expense";
import { useEffect } from "react";

export const AllExpensesScreen = () => {
  const expenses = useExpenses();
  const fetchExpenses = useFetchExpenses();
  const isLoading = useExpenseLoading();
  const error = useExpenseError();
  const navigation = useAppNavigation();

  useEffect(() => {
    const abortController = new AbortController();

    fetchExpenses({ signal: abortController.signal });

    return () => abortController.abort();
  }, [fetchExpenses]);

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={fetchExpenses} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  const expensePressHandler = (expenseId: string) => {
    navigation.navigate(AppRoutes.ManageExpense, { expenseId });
  };

  return (
    <ScreenLayout>
      <ExpensesOutput
        periodName="Total"
        onExpensePress={expensePressHandler}
        expenses={expenses}
      />
    </ScreenLayout>
  );
};

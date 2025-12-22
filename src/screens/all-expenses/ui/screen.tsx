import { ScreenLayout, LoadingOverlay, ErrorOverlay } from "@shared/ui";
import { ExpensesOutput } from "@widgets/expenses-output";
import { AppRoutes, useAppNavigation } from "@shared/routes";
import {
  useExpenseActions,
  useExpenses,
  useExpenseStatus,
} from "@entities/expense";
import { useEffect } from "react";

export const AllExpensesScreen = () => {
  const expenses = useExpenses();
  const { fetch } = useExpenseActions();
  const { isLoading, error } = useExpenseStatus();
  const navigation = useAppNavigation();

  useEffect(() => {
    const abortController = new AbortController();

    fetch({ signal: abortController.signal });

    return () => abortController.abort();
  }, [fetch]);

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={fetch} />;
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

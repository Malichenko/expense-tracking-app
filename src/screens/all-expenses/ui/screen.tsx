import { ScreenLayout, LoadingOverlay, ErrorOverlay } from "@shared/ui";
import { ExpensesOutput } from "@widgets/expenses-output";
import { AppRoutes, useAppNavigation } from "@shared/routes";
import {
  useExpenseActions,
  useExpenses,
  useExpenseStatus,
} from "@entities/expense";
import { useEffect } from "react";
import { useAbortController } from "@shared/lib/hooks";

export const AllExpensesScreen = () => {
  const expenses = useExpenses();
  const { fetch } = useExpenseActions();
  const { isLoading, error } = useExpenseStatus();
  const navigation = useAppNavigation();
  const getSignal = useAbortController();

  useEffect(() => {
    void fetch({ signal: getSignal() });
  }, [fetch, getSignal]);

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

import { ScreenLayout, LoadingOverlay, ErrorOverlay } from "@shared/ui";
import { ExpensesOutput } from "@widgets/expenses-output";
import { AppRoutes, useAppNavigation } from "@shared/routes";
import { useInitializeExpenses, useRecentExpenses } from "@entities/expense";
import { useUser } from "@entities/auth";

export const RecentExpensesScreen = () => {
  const navigation = useAppNavigation();
  const user = useUser();
  const expenses = useRecentExpenses();
  const { isLoading, error, refetch } = useInitializeExpenses({
    userId: user?.uid,
  });

  const expensePressHandler = (expenseId: string) => {
    navigation.navigate(AppRoutes.ManageExpense, { expenseId });
  };

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={refetch} />;
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

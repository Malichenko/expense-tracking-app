import { ScreenLayout } from "@shared/ui";
import { ExpensesOutput } from "@widgets/expenses-output";
import { AppRoutes, useAppNavigation } from "@shared/routes";
import { useRecentExpenses } from "@entities/expense";

export const RecentExpensesScreen = () => {
  const navigation = useAppNavigation();
  const expenses = useRecentExpenses();

  const expensePressHandler = (expenseId: string) => {
    navigation.navigate(AppRoutes.ManageExpense, { expenseId });
  };

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

import { ScreenLayout } from "@shared/ui";
import { ExpensesOutput } from "@widgets/expenses-output";
import { AppRoutes, useAppNavigation } from "@shared/routes";
import { useExpenses } from "@entities/expence";

export const AllExpensesScreen = () => {
  const expenses = useExpenses();
  const navigation = useAppNavigation();

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

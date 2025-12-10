import { ScreenLayout } from "@shared/ui";
import { ExpensesOutput } from "@widgets/expenses-output";
import { AppRoutes, useAppNavigation } from "@shared/routes";

export const AllExpensesScreen = () => {
  const navigation = useAppNavigation();

  const expensePressHandler = (expenseId: string) => {
    navigation.navigate(AppRoutes.ManageExpense, { expenseId });
  };

  return (
    <ScreenLayout>
      <ExpensesOutput periodName="Total" onExpensePress={expensePressHandler} />
    </ScreenLayout>
  );
};

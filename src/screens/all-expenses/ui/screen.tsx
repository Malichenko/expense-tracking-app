import { ScreenLayout } from "@shared/ui";
import { ExpensesOutput } from "@widgets/expenses-output";

export const AllExpensesScreen = () => {
  return (
    <ScreenLayout>
      <ExpensesOutput periodName="Total" />
    </ScreenLayout>
  );
};

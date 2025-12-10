import { ScreenLayout } from "@shared/ui";
import { ExpensesOutput } from "@widgets/expenses-output";

export const RecentExpensesScreen = () => {
  return (
    <ScreenLayout>
      <ExpensesOutput periodName="Last 7 Days" />
    </ScreenLayout>
  );
};

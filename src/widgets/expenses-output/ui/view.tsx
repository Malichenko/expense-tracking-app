import { View } from "react-native";
import type { Expense } from "@entities/expence";
import { ExpenceSummary, ExpensesList } from "@entities/expence";

export const ExpensesOutput = ({ expenses }: { expenses: Expense[] }) => {
  return (
    <View>
      <ExpenceSummary />

      <ExpensesList expenses={expenses} />
    </View>
  );
};

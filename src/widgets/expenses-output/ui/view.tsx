import { View, StyleSheet } from "react-native";
import type { Expense } from "@entities/expense";
import { ExpenseSummary, ExpensesList } from "@entities/expense";
import { type FC } from "react";
import theme from "@shared/config/theme";

interface ExpensesOutputProps {
  expenses: Expense[];
  periodName: string;
  onExpensePress: (id: string) => void;
}

export const ExpensesOutput: FC<ExpensesOutputProps> = ({
  expenses,
  periodName,
  onExpensePress,
}: ExpensesOutputProps) => {
  const isNoExpenses = expenses.length === 0;

  return (
    <View style={styles.container}>
      {!isNoExpenses && (
        <ExpenseSummary periodName={periodName} expenses={expenses} />
      )}

      <ExpensesList expenses={expenses} onExpensePress={onExpensePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: theme.spacing.x4,
  },
});

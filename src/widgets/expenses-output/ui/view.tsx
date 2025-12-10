import { View, StyleSheet } from "react-native";
import type { Expense } from "@entities/expence";
import { ExpenceSummary, ExpensesList } from "@entities/expence";
import { FC } from "react";
import theme from "@shared/config/theme";

const DUMMY_EXPENSES: Expense[] = [
  {
    id: "e1",
    amount: 100.71,
    date: new Date(),
    description: "A pair of shoes",
  },
  {
    id: "e2",
    amount: 200.0,
    date: new Date(),
    description: "A new phone",
  },
  {
    id: "e3",
    amount: 300.04,
    date: new Date(),
    description: "A new laptop",
  },
  {
    id: "e4",
    amount: 400.06,
    date: new Date(),
    description: "A new car",
  },
  {
    id: "e5",
    amount: 500.08,
    date: new Date(),
    description: "A new house",
  },
  {
    id: "e6",
    amount: 600.1,
    date: new Date(),
    description: "A new boat",
  },
  {
    id: "e7",
    amount: 700.12,
    date: new Date(),
    description: "A new plane",
  },
  {
    id: "e8",
    amount: 800.14,
    date: new Date(),
    description: "A new train",
  },
  {
    id: "e9",
    amount: 900.16,
    date: new Date(),
    description: "A new ship",
  },
  {
    id: "e10",
    amount: 1000.18,
    date: new Date(),
    description: "A new rocket",
  },
  {
    id: "e11",
    amount: 1100.2,
    date: new Date(),
    description: "A new spaceship",
  },
  {
    id: "e12",
    amount: 1200.22,
    date: new Date(),
    description: "A new spaceship",
  },
];

interface ExpensesOutputProps {
  // TODO: make expenses mandatory
  expenses?: Expense[];
  periodName: string;
  onExpensePress: (id: string) => void;
}

export const ExpensesOutput: FC<ExpensesOutputProps> = ({
  // TODO: remove default value
  expenses = DUMMY_EXPENSES,
  periodName,
  onExpensePress,
}: ExpensesOutputProps) => {
  return (
    <View style={styles.container}>
      <ExpenceSummary periodName={periodName} expenses={expenses} />

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

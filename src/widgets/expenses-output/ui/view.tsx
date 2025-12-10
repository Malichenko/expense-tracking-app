import { View } from "react-native";
import type { Expense } from "@entities/expence";
import { ExpenceSummary, ExpensesList } from "@entities/expence";
import { FC } from "react";

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
];

interface ExpensesOutputProps {
  // TODO: make expenses mandatory
  expenses?: Expense[];
  periodName: string;
}

export const ExpensesOutput: FC<ExpensesOutputProps> = ({
  // TODO: remove default value
  expenses = DUMMY_EXPENSES,
  periodName,
}: ExpensesOutputProps) => {
  return (
    <View>
      <ExpenceSummary periodName={periodName} expenses={expenses} />

      <ExpensesList expenses={expenses} />
    </View>
  );
};

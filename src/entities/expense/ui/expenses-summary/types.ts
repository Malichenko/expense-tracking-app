import { Expense } from "../../model/types";
import { FC } from "react";

interface ExpenseSummaryProps {
  periodName: string;
  expenses: Expense[];
}

export type ExpenseSummaryContract = FC<ExpenseSummaryProps>;

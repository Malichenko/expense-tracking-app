import { Expense } from "../../model/types";
import { FC } from "react";

interface ExpenceSummaryProps {
  periodName: string;
  expenses: Expense[];
}

export type ExpenceSummaryContract = FC<ExpenceSummaryProps>;

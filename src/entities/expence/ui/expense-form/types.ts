import { Expense } from "@entities/expence";
import { FC } from "react";

interface ExpenseFormProps {
  expense?: Partial<Expense>;
}

export type ExpenseFormContract = FC<ExpenseFormProps>;

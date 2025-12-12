import type { FC, ReactNode } from "react";
import type { Expense } from "@entities/expence";

export interface ExpenseFormValues {
  amount: string;
  description: string;
  date: Date | null;
}

export interface ExpenseFormState {
  data: ExpenseFormValues;
  isValid: boolean;
}

interface ExpenseFormProps {
  expense?: Partial<Expense>;
  children: (state: ExpenseFormState) => ReactNode;
}

export type ExpenseFormContract = FC<ExpenseFormProps>;

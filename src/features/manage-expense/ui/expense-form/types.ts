import type { Expense } from "@entities/expense";
import type { FC, ReactNode } from "react";
import type { ExpenseFormState } from "../../model/types";

export interface ExpenseFormProps {
  expense?: Partial<Expense>;
  children: (state: ExpenseFormState) => ReactNode;
}

export type ExpenseFormContract = FC<ExpenseFormProps>;

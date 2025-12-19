import type { Expense } from "@entities/expense";
import type { ExpenseFormValues } from "../../model/types";

export const getInitialExpenseFormData =
  (expense?: Partial<Expense>) => (): ExpenseFormValues => ({
    amount: expense?.amount?.toString() ?? "",
    description: expense?.description ?? "",
    date: expense?.date ?? null,
  });

import type { Expense } from "@entities/expense";
import type { ExpenseFormValues } from "../../../model/types";

export type GetInitialExpenseFormDataContract = (
  expense?: Partial<Expense>
) => () => ExpenseFormValues;

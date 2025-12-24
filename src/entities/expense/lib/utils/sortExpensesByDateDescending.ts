import type { Expense } from "../../model/types";

export const sortExpensesByDateDescending = (expenses: Expense[]): Expense[] =>
  expenses.toSorted((a, b) => b.date.getTime() - a.date.getTime());

import type { Expense } from "../../model/types";

export const sortExpensesByDateDescending = (expenses: Expense[]): Expense[] =>
  [...expenses].sort((a, b) => b.date.getTime() - a.date.getTime());

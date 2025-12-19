import { Expense } from "@entities/expense";

export const sortExpensesByDateDescending = (
  expenses: Expense[]
): Expense[] => {
  return [...expenses].sort((a, b) => b.date.getTime() - a.date.getTime());
};

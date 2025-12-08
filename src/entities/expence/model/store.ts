import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { ExpenseStore } from "./types";

export const useExpenseStore = create<ExpenseStore>()(
  immer((set) => ({
    expenses: [],
    addExpense: (expense) =>
      set((state) => {
        state.expenses.push(expense);
      }),
    removeExpense: (id) =>
      set((state) => {
        state.expenses = state.expenses.filter((expense) => expense.id !== id);
      }),
    updateExpense: (expense) =>
      set((state) => {
        const index = state.expenses.findIndex((e) => e.id === expense.id);
        if (index !== -1) {
          state.expenses.splice(index, 1, expense);
        }
      }),
  }))
);

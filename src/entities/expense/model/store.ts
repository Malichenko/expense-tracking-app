import { useCallback } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";

import type { Expense, ExpenseStore } from "./types";
import { pipe } from "remeda";
import { createDateMinusDays } from "../lib/utils/createDateMinusDays";
import { sortExpensesByDateDescending } from "../lib/utils/sortExpensesByDateDescending";

const useExpenseStore = create<ExpenseStore>()(
  immer((set) => ({
    expenses: [],
    addExpense: (expense) => {
      set((state) => {
        state.expenses.push(expense);
      });
    },
    removeExpense: (id) => {
      set((state) => {
        state.expenses = state.expenses.filter((expense) => expense.id !== id);
      });
    },
    updateExpense: (expense) => {
      set((state) => {
        const index = state.expenses.findIndex((e) => e.id === expense.id);
        if (index !== -1) {
          state.expenses[index] = expense;
        }
      });
    },
  }))
);

const selectExpenseById = (id: string | undefined) => (state: ExpenseStore) =>
  id ? state.expenses.find((expense) => expense.id === id) : undefined;
const selectAllExpenses = (state: ExpenseStore): Expense[] =>
  sortExpensesByDateDescending(state.expenses);
const selectRecentExpenses =
  (days: number) =>
  (state: ExpenseStore): Expense[] => {
    const cutoffDate = createDateMinusDays(days);
    const recentExpenses = state.expenses.filter(
      (expense) => expense.date >= cutoffDate
    );
    return sortExpensesByDateDescending(recentExpenses);
  };
const selectRemoveExpense = (state: ExpenseStore) => state.removeExpense;
const selectAddExpense = (state: ExpenseStore) => state.addExpense;
const selectUpdateExpense = (state: ExpenseStore) => state.updateExpense;

export const useExpenseById = (id?: string) => {
  return pipe(
    selectExpenseById(id),
    (selector) => useShallow(selector),
    (selector) => useCallback(selector, [id]),
    (selector) => useExpenseStore(selector)
  );
};

export const useExpenses = () => {
  return pipe(
    selectAllExpenses,
    (selector) => useShallow(selector),
    (selector) => useCallback(selector, []),
    (selector) => useExpenseStore(selector)
  );
};

export const useRecentExpenses = (days = 7) => {
  return pipe(
    selectRecentExpenses(days),
    (selector) => useShallow(selector),
    (selector) => useCallback(selector, [days]),
    (selector) => useExpenseStore(selector)
  );
};

export const useExpenseAdd = () => {
  return useExpenseStore(selectAddExpense);
};

export const useExpenseUpdate = () => {
  return useExpenseStore(selectUpdateExpense);
};

export const useExpenseDelete = () => {
  return useExpenseStore(selectRemoveExpense);
};

import { useCallback } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { ExpenseStore } from "./types";
import { useShallow } from "zustand/shallow";
import { pipe } from "remeda";

const now = Date.now();

const dateMinusDays = (days: number) =>
  new Date(now - days * 24 * 60 * 60 * 1000);

const useExpenseStore = create<ExpenseStore>()(
  immer((set, get) => ({
    expenses: [],
    getExpenses: () =>
      get().expenses.sort((a, b) => a.date.getTime() - b.date.getTime()),
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

export const useExpenseById = (id?: string) =>
  useExpenseStore(
    useCallback(
      (state) => state.expenses.find((expense) => expense.id === id),
      [id]
    )
  );

export const useExpenseDelete = () =>
  useExpenseStore(useCallback((state) => state.removeExpense, []));

export const useExpenseAdd = () =>
  useExpenseStore(useCallback((state) => state.addExpense, []));

export const useExpenseUpdate = () =>
  useExpenseStore(useCallback((state) => state.updateExpense, []));

export const useExpenses = () =>
  useExpenseStore(
    useCallback(
      useShallow((state) =>
        [...state.expenses].sort((a, b) => b.date.getTime() - a.date.getTime())
      ),
      []
    )
  );

const recentExpensesSelector =
  (days = 7) =>
  (state: ExpenseStore) =>
    state.expenses
      .filter(({ date }) => date >= dateMinusDays(days))
      .sort((a, b) => b.date.getTime() - a.date.getTime());

export const useRecentExpenses = (days = 7) =>
  pipe(
    recentExpensesSelector(days),
    (selector) => useShallow(selector),
    (selector) => useCallback(selector, [days]),
    (selector) => useExpenseStore(selector)
  );

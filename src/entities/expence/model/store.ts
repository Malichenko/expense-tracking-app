import { useCallback } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { ExpenseStore } from "./types";
import { useShallow } from "zustand/shallow";
import { pipe } from "remeda";

const now = Date.now();

const dateMinusDays = (days: number) =>
  new Date(now - days * 24 * 60 * 60 * 1000);

const DUMMY_EXPENSES = [
  {
    id: "e1",
    amount: 100.71,
    date: dateMinusDays(1),
    description: "A pair of shoes",
  },
  {
    id: "e2",
    amount: 200.0,
    date: dateMinusDays(2),
    description: "A new phone",
  },
  {
    id: "e3",
    amount: 300.04,
    date: dateMinusDays(3),
    description: "A new laptop",
  },
  {
    id: "e4",
    amount: 400.06,
    date: dateMinusDays(4),
    description: "A new car",
  },
  {
    id: "e5",
    amount: 500.08,
    date: dateMinusDays(5),
    description: "A new house",
  },
  {
    id: "e6",
    amount: 600.1,
    date: dateMinusDays(6),
    description: "A new boat",
  },
  {
    id: "e7",
    amount: 700.12,
    date: dateMinusDays(7),
    description: "A new plane",
  },
  {
    id: "e8",
    amount: 800.14,
    date: dateMinusDays(8),
    description: "A new train",
  },
  {
    id: "e9",
    amount: 900.16,
    date: dateMinusDays(9),
    description: "A new ship",
  },
  {
    id: "e10",
    amount: 1000.18,
    date: dateMinusDays(10),
    description: "A new rocket",
  },
  {
    id: "e11",
    amount: 1100.2,
    date: dateMinusDays(11),
    description: "A new spaceship",
  },
  {
    id: "e12",
    amount: 1200.22,
    date: dateMinusDays(12),
    description: "A new spaceship",
  },
];

const useExpenseStore = create<ExpenseStore>()(
  immer((set) => ({
    expenses: DUMMY_EXPENSES,
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

export const useExpenses = () =>
  useExpenseStore(useCallback((state) => state.expenses, []));

const recentExpensesSelector =
  (days = 7) =>
  (state: ExpenseStore) =>
    state.expenses.filter(({ date }) => date >= dateMinusDays(days));

export const useRecentExpenses = (days = 7) =>
  pipe(
    recentExpensesSelector(days),
    (selector) => useShallow(selector),
    (selector) => useCallback(selector, [days]),
    (selector) => useExpenseStore(selector)
  );

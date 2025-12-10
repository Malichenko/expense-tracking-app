import { useCallback } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { ExpenseStore } from "./types";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    amount: 100.71,
    date: new Date(),
    description: "A pair of shoes",
  },
  {
    id: "e2",
    amount: 200.0,
    date: new Date(),
    description: "A new phone",
  },
  {
    id: "e3",
    amount: 300.04,
    date: new Date(),
    description: "A new laptop",
  },
  {
    id: "e4",
    amount: 400.06,
    date: new Date(),
    description: "A new car",
  },
  {
    id: "e5",
    amount: 500.08,
    date: new Date(),
    description: "A new house",
  },
  {
    id: "e6",
    amount: 600.1,
    date: new Date(),
    description: "A new boat",
  },
  {
    id: "e7",
    amount: 700.12,
    date: new Date(),
    description: "A new plane",
  },
  {
    id: "e8",
    amount: 800.14,
    date: new Date(),
    description: "A new train",
  },
  {
    id: "e9",
    amount: 900.16,
    date: new Date(),
    description: "A new ship",
  },
  {
    id: "e10",
    amount: 1000.18,
    date: new Date(),
    description: "A new rocket",
  },
  {
    id: "e11",
    amount: 1100.2,
    date: new Date(),
    description: "A new spaceship",
  },
  {
    id: "e12",
    amount: 1200.22,
    date: new Date(),
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

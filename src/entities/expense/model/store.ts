import { useCallback } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";

import type { Expense, ExpenseStore } from "./types";
import { pipe } from "remeda";
import { createDateMinusDays } from "../lib/utils/createDateMinusDays";
import { sortExpensesByDateDescending } from "../lib/utils/sortExpensesByDateDescending";
import { expenseApi } from "../api";
import { createAsyncHandler } from "@shared/utils/fp";

const useExpenseStore = create<ExpenseStore>()(
  immer((set) => {
    const handleAsync = createAsyncHandler({
      onStart: () => {
        set((state) => {
          state.isLoading = true;
          state.error = null;
        });
      },
      onSuccess: () => {
        set((state) => {
          state.error = null;
        });
      },
      onError: (error) => {
        set((state) => {
          state.error = error;
        });
      },
      onFinally: () => {
        set((state) => {
          state.isLoading = false;
        });
      },
    });

    return {
      expenses: [],
      isLoading: false,
      error: null,
      actions: {
        setExpenses: (expenses) => {
          set((state) => {
            state.expenses = sortExpensesByDateDescending(expenses);
          });
        },
        setIsLoading: (isLoading) => {
          set((state) => {
            state.isLoading = isLoading;
          });
        },
        setError: (error) => {
          set((state) => {
            state.error = error;
          });
        },
        fetchExpenses: async (options) => {
          const operation = async () => {
            const expenses = await expenseApi.fetchExpenses({
              signal: options?.signal,
            });

            set((state) => {
              state.expenses = sortExpensesByDateDescending(expenses);
            });
          };

          await handleAsync(operation, "Could not fetch expenses.")();
        },
        addExpense: async (expenseData, options) => {
          const operation = async () => {
            const id = await expenseApi.addExpense(expenseData, {
              signal: options?.signal,
            });
            const expense: Expense = { id, ...expenseData };
            set((state) => {
              state.expenses = sortExpensesByDateDescending([
                ...state.expenses,
                expense,
              ]);
            });
            return id;
          };

          return handleAsync(operation, "Could not add expense.")();
        },
        updateExpense: async (id, expenseData, options) => {
          const operation = async () => {
            await expenseApi.updateExpense(id, expenseData, {
              signal: options?.signal,
            });
            set((state) => {
              const index = state.expenses.findIndex((e) => e.id === id);
              if (index === -1) return;
              state.expenses[index] = { id, ...expenseData };
              state.expenses = sortExpensesByDateDescending(state.expenses);
            });
          };

          return handleAsync(operation, "Could not update expense.")();
        },
        removeExpense: async (id, options) => {
          const operation = async () => {
            await expenseApi.deleteExpense(id, { signal: options?.signal });
            set((state) => {
              state.expenses = state.expenses.filter(
                (expense) => expense.id !== id
              );
            });
          };

          return handleAsync(operation, "Could not delete expense.")();
        },
      },
    };
  })
);

// Selectors
const selectAllExpenses = (state: ExpenseStore): Expense[] => state.expenses;
const selectExpenseById = (id: string | undefined) => (state: ExpenseStore) =>
  id ? state.expenses.find((expense) => expense.id === id) : undefined;
const selectRecentExpenses = (days: number) => {
  const cutoffDate = createDateMinusDays(days);
  return (state: ExpenseStore): Expense[] =>
    state.expenses.filter((expense) => expense.date >= cutoffDate);
};

// Hooks
export const useExpenses = () => {
  return useExpenseStore(selectAllExpenses);
};

export const useExpenseById = (id?: string) => {
  return useExpenseStore(selectExpenseById(id));
};

export const useRecentExpenses = (days = 7) => {
  return pipe(
    selectRecentExpenses(days),
    (selector) => useShallow(selector),
    (selector) => useCallback(selector, [days]),
    (selector) => useExpenseStore(selector)
  );
};

export const useExpenseActions = () =>
  useExpenseStore(
    useShallow((s) => ({
      fetch: s.actions.fetchExpenses,
      add: s.actions.addExpense,
      update: s.actions.updateExpense,
      remove: s.actions.removeExpense,
    }))
  );

export const useExpenseStatus = () =>
  useExpenseStore(
    useShallow((s) => ({
      isLoading: s.isLoading,
      error: s.error,
    }))
  );

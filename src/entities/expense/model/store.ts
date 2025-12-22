import { useCallback } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";

import type { Expense, ExpenseStore, ExpenseUpsertData } from "./types";
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
        addExpense: async (expenseData: ExpenseUpsertData, options) => {
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
        updateExpense: async (
          id: string,
          expenseData: ExpenseUpsertData,
          options
        ) => {
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
        removeExpense: async (id: string, options) => {
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

const selectExpenseById = (id: string | undefined) => (state: ExpenseStore) =>
  id ? state.expenses.find((expense) => expense.id === id) : undefined;
const selectAllExpenses = (state: ExpenseStore): Expense[] => state.expenses;
const selectRecentExpenses =
  (days: number) =>
  (state: ExpenseStore): Expense[] => {
    const cutoffDate = createDateMinusDays(days);
    return state.expenses.filter((expense) => expense.date >= cutoffDate);
  };
const selectRemoveExpense = (state: ExpenseStore) =>
  state.actions.removeExpense;
const selectAddExpense = (state: ExpenseStore) => state.actions.addExpense;
const selectUpdateExpense = (state: ExpenseStore) =>
  state.actions.updateExpense;
const selectFetchExpenses = (state: ExpenseStore) =>
  state.actions.fetchExpenses;
const selectIsLoading = (state: ExpenseStore) => state.isLoading;
const selectError = (state: ExpenseStore) => state.error;

export const useExpenseById = (id?: string) => {
  return pipe(
    selectExpenseById(id),
    (selector) => useShallow(selector),
    (selector) => useCallback(selector, [id]),
    (selector) => useExpenseStore(selector)
  );
};

export const useFetchExpenses = () => {
  return useExpenseStore(selectFetchExpenses);
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

export const useExpenseLoading = () => {
  return useExpenseStore(selectIsLoading);
};

export const useExpenseError = () => {
  return useExpenseStore(selectError);
};

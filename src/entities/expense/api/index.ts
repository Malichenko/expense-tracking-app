import { apiClient } from "@shared/api";
import type { Expense } from "../model/types";

interface ExpensesOptions {
  signal?: AbortSignal;
}

type ExpenseDto = {
  amount: number;
  date: string;
  description: string;
};

type ExpenseRecord = Record<string, ExpenseDto>;

export const expenseApi = {
  async fetchExpenses({ signal }: ExpensesOptions = {}) {
    const response = await apiClient.get<ExpenseRecord | null>(
      "/expenses.json",
      {
        signal,
      }
    );

    if (!response.data) return [];

    const expenses: Expense[] = [];

    for (const key in response.data) {
      const expense = response.data[key];
      expenses.push({
        id: key,
        amount: expense.amount,
        date: new Date(expense.date),
        description: expense.description,
      });
    }

    return expenses;
  },

  async addExpense(
    expenseData: Omit<Expense, "id">,
    { signal }: ExpensesOptions = {}
  ) {
    const response = await apiClient.post<{ name: string }>(
      "/expenses.json",
      expenseData,
      { signal }
    );
    return response.data.name; // Returns ID from Firebase
  },

  async updateExpense(
    id: string,
    expenseData: Omit<Expense, "id">,
    { signal }: ExpensesOptions = {}
  ) {
    return apiClient.put(`/expenses/${id}.json`, expenseData, { signal });
  },

  async deleteExpense(id: string, { signal }: ExpensesOptions = {}) {
    return apiClient.delete(`/expenses/${id}.json`, { signal });
  },
};

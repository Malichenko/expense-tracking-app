import { apiClient } from "@shared/api";
import type { Expense } from "../model/types";
import {
  mapEntityToDto,
  mapExpenseRecordToEntities,
  type ExpenseRecord,
} from "../lib/mappers";

interface ExpensesOptions {
  signal?: AbortSignal;
}

export const expenseApi = {
  async fetchExpenses({ signal }: ExpensesOptions = {}) {
    const response = await apiClient.get<ExpenseRecord | null>(
      "/expenses.json",
      {
        signal,
      }
    );

    if (!response.data) return [];

    return mapExpenseRecordToEntities(response.data);
  },

  async addExpense(
    expenseData: Omit<Expense, "id">,
    { signal }: ExpensesOptions = {}
  ) {
    const response = await apiClient.post<{ name: string }>(
      "/expenses.json",
      mapEntityToDto(expenseData),
      { signal }
    );

    return response.data.name; // Returns ID from Firebase
  },

  async updateExpense(
    id: string,
    expenseData: Omit<Expense, "id">,
    { signal }: ExpensesOptions = {}
  ) {
    return apiClient.put(`/expenses/${id}.json`, mapEntityToDto(expenseData), {
      signal,
    });
  },

  async deleteExpense(id: string, { signal }: ExpensesOptions = {}) {
    return apiClient.delete(`/expenses/${id}.json`, { signal });
  },
};

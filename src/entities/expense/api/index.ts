import { apiClient } from "@shared/api";
import type { Expense } from "../model/types";
import {
  mapEntityToDto,
  mapExpenseRecordToEntities,
  type ExpenseRecord,
} from "../lib/mappers";

interface ExpensesOptions {
  signal?: AbortSignal;
  userId: string;
}

const getUserExpensesPath = (userId: string) => `/users/${userId}/expenses`;

export const expenseApi = {
  async fetchExpenses({ signal, userId }: ExpensesOptions) {
    const response = await apiClient.get<ExpenseRecord | null>(
      `${getUserExpensesPath(userId)}.json`,
      { signal }
    );

    if (!response.data) return [];

    return mapExpenseRecordToEntities(response.data);
  },

  async addExpense(expenseData: Omit<Expense, "id">, options: ExpensesOptions) {
    const { signal, userId } = options;
    const response = await apiClient.post<{ name: string }>(
      `${getUserExpensesPath(userId)}.json`,
      mapEntityToDto(expenseData),
      { signal }
    );

    return response.data.name;
  },

  async updateExpense(
    id: string,
    expenseData: Omit<Expense, "id">,
    options: ExpensesOptions
  ) {
    const { signal, userId } = options;
    return apiClient.put(
      `${getUserExpensesPath(userId)}/${id}.json`,
      mapEntityToDto(expenseData),
      { signal }
    );
  },

  async deleteExpense(id: string, options: ExpensesOptions) {
    const { signal, userId } = options;
    return apiClient.delete(`${getUserExpensesPath(userId)}/${id}.json`, {
      signal,
    });
  },
};

export type Expense = {
  id: string;
  amount: number;
  date: Date;
  description: string;
};

export type ExpenseUpsertData = Omit<Expense, "id">;

export interface ExpenseStoreState {
  expenses: Expense[];
  isLoading: boolean;
  error: string | null;
}

interface ExpenseStoreOptions {
  signal?: AbortSignal;
}

export interface ExpenseStoreActions {
  setExpenses: (expenses: Expense[]) => void;
  fetchExpenses: (options?: ExpenseStoreOptions) => Promise<void>;
  addExpense: (
    expenseData: ExpenseUpsertData,
    options?: ExpenseStoreOptions
  ) => Promise<string>;
  removeExpense: (id: string, options?: ExpenseStoreOptions) => Promise<void>;
  updateExpense: (
    id: string,
    expenseData: ExpenseUpsertData,
    options?: ExpenseStoreOptions
  ) => Promise<void>;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export interface ExpenseStore extends ExpenseStoreState {
  actions: ExpenseStoreActions;
}

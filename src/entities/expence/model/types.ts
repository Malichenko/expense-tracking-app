export type Expense = {
  id: string;
  amount: number;
  date: Date;
  description: string;
};

export interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  updateExpense: (expense: Expense) => void;
}

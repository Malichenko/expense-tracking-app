export interface ExpenseFormValues {
  amount: string;
  description: string;
  date: Date | null;
}

export interface ExpenseFormState {
  data: ExpenseFormValues;
  isValid: boolean;
}

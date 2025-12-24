export interface ExpenseFormValues {
  amount: string;
  description: string;
  date: Date | null;
}

export type ExpenseFormField = keyof ExpenseFormValues;

export type FieldValidity = Record<ExpenseFormField, boolean>;

export interface ExpenseFormState {
  data: ExpenseFormValues;
  isValid: boolean;
}

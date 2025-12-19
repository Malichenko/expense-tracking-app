import type { GetInitialExpenseFormDataContract } from "./types";

export const getInitialExpenseFormData: GetInitialExpenseFormDataContract =
  (expense) => () => ({
    amount: expense?.amount?.toString() ?? "",
    description: expense?.description ?? "",
    date: expense?.date ?? null,
  });

import type { FC } from "react";
import type { ExpenseFormState } from "../../model/types";

interface ManageExpenseActionsProps {
  isEditing: boolean;
  expenseId?: string;
  formState: ExpenseFormState;
  onCancel: () => void;
  onSuccess: () => void;
}

export type ManageExpenseActionsContract = FC<ManageExpenseActionsProps>;

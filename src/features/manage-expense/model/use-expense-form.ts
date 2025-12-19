import { useCallback, useMemo, useState } from "react";
import type { Expense } from "@entities/expense";

import { getInitialExpenseFormData } from "../lib/utils/get-initial-expense-form-data";
import type { ExpenseFormValues } from "./types";

export const useExpenseForm = (expense?: Partial<Expense>) => {
  const [formData, setFormData] = useState(getInitialExpenseFormData(expense));
  const [isValid, setIsValid] = useState(true);

  const updateField = useCallback(
    <K extends keyof ExpenseFormValues>(
      field: K,
      value: ExpenseFormValues[K]
    ) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const updateAmount = useMemo(
    () => updateField.bind(null, "amount"),
    [updateField]
  );
  const updateDescription = useMemo(
    () => updateField.bind(null, "description"),
    [updateField]
  );
  const updateDate = useMemo(
    () => updateField.bind(null, "date"),
    [updateField]
  );

  const updateFieldValidity = useCallback((nextIsValid: boolean) => {
    setIsValid(nextIsValid);
  }, []);

  return {
    formData,
    isValid,
    updateAmount,
    updateDescription,
    updateDate,
    updateFieldValidity,
  };
};

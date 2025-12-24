import { useCallback, useMemo, useState } from "react";
import type { Expense } from "@entities/expense";

import { getInitialExpenseFormData } from "../lib/utils/get-initial-expense-form-data";
import type {
  ExpenseFormField,
  ExpenseFormValues,
  FieldValidity,
} from "./types";

const INITIAL_FIELD_VALIDITY: FieldValidity = {
  amount: true,
  description: true,
  date: true,
};

export const useExpenseForm = (expense?: Partial<Expense>) => {
  const [formData, setFormData] = useState(getInitialExpenseFormData(expense));
  const [fieldValidity, setFieldValidity] = useState<FieldValidity>(
    INITIAL_FIELD_VALIDITY
  );

  const isValid = useMemo(
    () => Object.values(fieldValidity).every(Boolean),
    [fieldValidity]
  );

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

  const updateFieldValidity = useCallback(
    (field: ExpenseFormField, isFieldValid: boolean) => {
      setFieldValidity((prev) => ({ ...prev, [field]: isFieldValid }));
    },
    []
  );

  return {
    formData,
    isValid,
    updateAmount,
    updateDescription,
    updateDate,
    updateFieldValidity,
  };
};

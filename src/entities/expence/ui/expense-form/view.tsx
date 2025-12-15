import { useState, useCallback, useMemo, FC, PropsWithChildren } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import type { Expense } from "@entities/expence";
import { AmountInput, DescriptionInput, DateInput } from "@shared/ui";
import theme from "@shared/config/theme";

import type { ExpenseFormContract, ExpenseFormValues } from "./types";
const DismissKeyboard: FC<PropsWithChildren> = ({ children }) => (
  <TouchableWithoutFeedback
    onPress={() => Keyboard.dismiss()}
    accessible={false}
  >
    {children}
  </TouchableWithoutFeedback>
);
const getInitialFormData =
  (expense?: Partial<Expense>) => (): ExpenseFormValues => ({
    amount: expense?.amount?.toString() ?? "",
    description: expense?.description ?? "",
    date: expense?.date ?? null,
  });

export const ExpenseForm: ExpenseFormContract = ({ expense, children }) => {
  const [formData, setFormData] = useState(getInitialFormData(expense));
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
  const updateAmount = useMemo(() => updateField.bind(null, "amount"), []);
  const updateDescription = useMemo(
    () => updateField.bind(null, "description"),
    []
  );
  const updateDate = useMemo(() => updateField.bind(null, "date"), []);

  const updateFieldValidity = useCallback((isValid: boolean) => {
    setIsValid(isValid);
  }, []);

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <AmountInput
            label="Amount"
            value={formData.amount}
            onChangeText={updateAmount}
            placeholder="0.00"
            required
            onValidationChange={updateFieldValidity}
          />

          <DescriptionInput
            label="Description"
            value={formData.description}
            onChangeText={updateDescription}
            placeholder="Enter description"
            maxLength={200}
            required
            onValidationChange={updateFieldValidity}
          />

          <DateInput
            label="Date"
            value={formData.date}
            onChange={updateDate}
            placeholder="Select date"
            maxDate={new Date()}
            required
            onValidationChange={updateFieldValidity}
          />
        </View>

        {children({ data: formData, isValid })}
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: theme.spacing.x4,
  },
});

import { useMemo } from "react";
import { View, StyleSheet } from "react-native";

import {
  AmountInput,
  DescriptionInput,
  DateInput,
  DismissKeyboard,
} from "@shared/ui";
import theme from "@shared/config/theme";
import { useExpenseForm } from "../../model/use-expense-form";
import type { ExpenseFormContract } from "./types";

export const ExpenseForm: ExpenseFormContract = ({ expense, children }) => {
  const {
    formData,
    isValid,
    updateAmount,
    updateDescription,
    updateDate,
    updateFieldValidity,
  } = useExpenseForm(expense);

  const state = useMemo(
    () => ({ data: formData, isValid }),
    [formData, isValid]
  );

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

        {children(state)}
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

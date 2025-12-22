import { useEffect, useRef } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button } from "@shared/ui";
import theme from "@shared/config/theme";
import {
  useExpenseAdd,
  useExpenseUpdate,
  type Expense,
} from "@entities/expense";
import type { ManageExpenseActionsContract } from "./types";

export const ManageExpenseActions: ManageExpenseActionsContract = ({
  isEditing,
  expenseId,
  formState,
  onCancel,
  onSuccess,
}) => {
  const expenseAdd = useExpenseAdd();
  const expenseUpdate = useExpenseUpdate();
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const handleConfirm = async () => {
    const { data, isValid } = formState;
    if (!isValid || !data.date) return;

    const expenseData: Omit<Expense, "id"> = {
      amount: Number.parseFloat(data.amount),
      description: data.description,
      date: data.date,
    };

    abortControllerRef.current = new AbortController();

    try {
      if (isEditing && expenseId) {
        await expenseUpdate(expenseId, expenseData, {
          signal: abortControllerRef.current.signal,
        });
      } else {
        await expenseAdd(expenseData, {
          signal: abortControllerRef.current.signal,
        });
      }
      onSuccess();
    } catch (error) {
      const message =
        error instanceof Error
          ? `Please try again.\n\n${error.message}`
          : "Please try again.";

      Alert.alert("Failed to save expense", message);
    }
  };

  const confirmButtonText = isEditing ? "Update" : "Add";

  return (
    <View style={styles.buttonsContainer}>
      <View style={styles.buttonBox}>
        <Button variant="flat" onPress={onCancel}>
          Cancel
        </Button>
      </View>

      <View style={styles.buttonBox}>
        <Button onPress={handleConfirm} disabled={!formState.isValid}>
          {confirmButtonText}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: theme.spacing.x2,
    marginTop: theme.spacing.x4,
  },
  buttonBox: {
    flex: 1,
  },
});

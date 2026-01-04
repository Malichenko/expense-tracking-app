import { View, StyleSheet } from "react-native";
import { Button } from "@shared/ui";
import theme from "@shared/config/theme";
import { useExpenseActions, type Expense } from "@entities/expense";
import { useUser } from "@entities/auth";
import { useAbortController } from "@shared/hooks";
import { showErrorAlert } from "@shared/utils/alert";
import type { ManageExpenseActionsContract } from "./types";

export const ManageExpenseActions: ManageExpenseActionsContract = ({
  isEditing,
  expenseId,
  formState,
  onCancel,
  onSuccess,
}) => {
  const user = useUser();
  const { add, update } = useExpenseActions();
  const getSignal = useAbortController();

  const handleConfirm = async () => {
    const { data, isValid } = formState;
    if (!isValid || !data.date || !user?.uid) return;

    const expenseData: Omit<Expense, "id"> = {
      amount: Number.parseFloat(data.amount),
      description: data.description,
      date: data.date,
    };

    try {
      if (isEditing && expenseId) {
        await update(expenseId, expenseData, {
          signal: getSignal(),
          userId: user.uid,
        });
      } else {
        await add(expenseData, {
          signal: getSignal(),
          userId: user.uid,
        });
      }
      onSuccess();
    } catch (error) {
      showErrorAlert("Failed to save expense", error);
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

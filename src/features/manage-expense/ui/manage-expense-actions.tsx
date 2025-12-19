import { View, StyleSheet } from "react-native";
import { Button } from "@shared/ui";
import theme from "@shared/config/theme";
import {
  useExpenseAdd,
  useExpenseUpdate,
  type ExpenseFormState,
  type Expense,
} from "@entities/expense";

interface ManageExpenseActionsProps {
  isEditing: boolean;
  expenseId?: string;
  formState: ExpenseFormState;
  onCancel: () => void;
  onSuccess: () => void;
}

export const ManageExpenseActions = ({
  isEditing,
  expenseId,
  formState,
  onCancel,
  onSuccess,
}: ManageExpenseActionsProps) => {
  const expenseAdd = useExpenseAdd();
  const expenseUpdate = useExpenseUpdate();

  const handleConfirm = () => {
    const { data, isValid } = formState;
    if (!isValid || !data.date) return;

    const expenseData: Omit<Expense, "id"> = {
      amount: Number.parseFloat(data.amount),
      description: data.description,
      date: data.date,
    };

    if (isEditing && expenseId) {
      expenseUpdate({ id: expenseId, ...expenseData });
    } else {
      expenseAdd({ id: Date.now().toString(), ...expenseData });
    }

    onSuccess();
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

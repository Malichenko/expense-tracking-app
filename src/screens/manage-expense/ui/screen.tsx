import { StyleSheet, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ScreenLayout, IconButton, Button } from "@shared/ui";
import theme from "@shared/config/theme";
import { AppRoutes, type RootStackParamList } from "@shared/routes";
import {
  ExpenseForm,
  useExpenseAdd,
  useExpenseById,
  useExpenseDelete,
  useExpenseUpdate,
  type ExpenseFormState,
} from "@entities/expence";

export const ManageExpenseScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, AppRoutes.ManageExpense>) => {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const expense = useExpenseById(expenseId);
  const expenseDelete = useExpenseDelete();
  const expenseAdd = useExpenseAdd();
  const expenseUpdate = useExpenseUpdate();

  const goBack = () => {
    navigation.goBack();
  };

  const handleDelete = (id: string) => {
    expenseDelete(id);
    goBack();
  };

  const handleCancel = () => {
    goBack();
  };

  const handleConfirm = ({ data, isValid }: ExpenseFormState) => {
    if (!isValid || !data.date) return;

    const expenseData = {
      amount: Number.parseFloat(data.amount),
      description: data.description,
      date: data.date,
    };

    if (isEditing && expenseId) {
      expenseUpdate({ id: expenseId, ...expenseData });
    } else {
      expenseAdd({ id: Date.now().toString(), ...expenseData });
    }

    goBack();
  };

  const confirmButtonText = isEditing ? "Update" : "Add";

  return (
    <ScreenLayout style={styles.container}>
      <ExpenseForm expense={expense}>
        {(formState) => (
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonBox}>
              <Button variant="flat" onPress={handleCancel}>
                Cancel
              </Button>
            </View>

            <View style={styles.buttonBox}>
              <Button
                onPress={() => handleConfirm(formState)}
                disabled={!formState.isValid}
              >
                {confirmButtonText}
              </Button>
            </View>
          </View>
        )}
      </ExpenseForm>

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            onPress={() => handleDelete(expenseId)}
            color={theme.palette.error[50]}
            size="large"
          />
        </View>
      )}
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.x3,
  },
  deleteContainer: {
    marginTop: theme.spacing.x4,
    alignItems: "center",
    borderTopWidth: 2,
    borderTopColor: theme.palette.accent[50],
    paddingTop: theme.spacing.x2,
  },
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

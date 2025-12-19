import { StyleSheet, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ScreenLayout } from "@shared/ui";
import theme from "@shared/config/theme";
import { AppRoutes, type RootStackParamList } from "@shared/routes";
import { useExpenseById } from "@entities/expense";
import { DeleteExpenseButton } from "@features/delete-expense";
import { ManageExpenseActions, ExpenseForm } from "@features/manage-expense";

export const ManageExpenseScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, AppRoutes.ManageExpense>) => {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const expense = useExpenseById(expenseId);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ScreenLayout>
      <ExpenseForm expense={expense}>
        {(formState) => (
          <ManageExpenseActions
            isEditing={isEditing}
            expenseId={expenseId}
            formState={formState}
            onCancel={goBack}
            onSuccess={goBack}
          />
        )}
      </ExpenseForm>

      {isEditing && expenseId && (
        <View style={styles.deleteContainer}>
          <DeleteExpenseButton id={expenseId} onDelete={goBack} />
        </View>
      )}
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  deleteContainer: {
    marginTop: theme.spacing.x4,
    alignItems: "center",
    borderTopWidth: 2,
    borderTopColor: theme.palette.accent[50],
    paddingTop: theme.spacing.x2,
  },
});

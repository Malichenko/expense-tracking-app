import { ScreenLayout } from "@shared/ui/screen-layout";

import { useExpenseById, useExpenseDelete } from "@entities/expence";
import { IconButton } from "@shared/ui/icon-button";
import theme from "@shared/config/theme";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppRoutes, RootStackParamList } from "@shared/routes";
import { Button } from "@shared/ui";
import { Expense } from "@entities/expence";

const ExpenseForm = ({ expense }: { expense?: Partial<Expense> }) => {
  return (
    <View>
      <View>
        <Text>Description</Text>
        <TextInput
          value={expense?.description}
          onChangeText={() => {}}
          placeholder="Enter description"
        />
      </View>

      <View>
        <Text>Amount</Text>
        <TextInput
          value={expense?.amount?.toString()}
          onChangeText={() => {}}
          placeholder="0.00"
          keyboardType="decimal-pad"
        />
      </View>

      <View>
        <Text>Date</Text>
        <TextInput
          value={expense?.date?.toISOString()}
          onChangeText={() => {}}
          placeholder="YYYY-MM-DD"
        />
      </View>
    </View>
  );
};

export const ManageExpenseScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, AppRoutes.ManageExpense>) => {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const expenseDelete = useExpenseDelete();

  const expense = useExpenseById(expenseId);

  const goBack = () => {
    navigation.goBack();
  };

  const expenseDeleteHandler = (id: string) => {
    expenseDelete(id);
    goBack();
  };

  const expenseCancelHandler = () => {
    goBack();
  };

  const confirmHandler = () => {
    goBack();
  };

  const confirmButtonText = isEditing ? "Update" : "Add";

  return (
    <ScreenLayout style={styles.container}>
      <ExpenseForm expense={expense} />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonBox}>
          <Button variant="flat" onPress={expenseCancelHandler}>
            Cancel
          </Button>
        </View>

        <View style={styles.buttonBox}>
          <Button onPress={confirmHandler}>{confirmButtonText}</Button>
        </View>
      </View>

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            onPress={() => expenseDeleteHandler(expenseId)}
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
  },
  buttonBox: {
    flex: 1,
  },
});

import { ScreenLayout } from "@shared/ui/screen-layout";
import { ScreenProps } from "@shared/routes";
import { useExpenseById } from "@entities/expence";
import { IconButton } from "@shared/ui/icon-button";
import theme from "@shared/config/theme";
import { StyleSheet, View } from "react-native";

export const ManageExpenseScreen = ({
  route,
}: ScreenProps["ManageExpense"]) => {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const expense = useExpenseById(expenseId);

  const expenseDeleteHandler = () => {
    // eslint-disable-next-line no-console
    console.log("expense delete", expense?.id);
  };

  return (
    <ScreenLayout style={styles.container}>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            onPress={expenseDeleteHandler}
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
});

import { StyleSheet } from "react-native";

import { ScreenLayout } from "@shared/ui";
import { ExpensesOutput } from "@widgets/expenses-output";

export const AllExpensesScreen = () => {
  return (
    <ScreenLayout style={styles.container}>
      <ExpensesOutput periodName="Total" />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

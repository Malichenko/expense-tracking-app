import { StyleSheet } from "react-native";

import { ScreenLayout } from "@shared/ui";
import { ExpensesOutput } from "@widgets/expenses-output";

export const RecentExpensesScreen = () => {
  return (
    <ScreenLayout style={styles.container}>
      <ExpensesOutput periodName="Last 7 Days" />
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

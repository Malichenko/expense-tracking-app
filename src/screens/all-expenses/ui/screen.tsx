import { Text, StyleSheet } from "react-native";

import { ScreenLayout } from "@shared/ui";

export const AllExpensesScreen = () => {
  return (
    <ScreenLayout style={styles.container}>
      <Text style={styles.text}>All Expenses Screen</Text>
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

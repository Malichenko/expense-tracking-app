import { Expense } from "../../model/types";
import { FlatList, StyleSheet, Text } from "react-native";
import { ExpenseItem } from "./components";
import theme from "@shared/config/theme";

export const ExpensesList = ({ expenses }: { expenses: Expense[] }) => {
  return (
    <FlatList
      style={styles.container}
      data={expenses}
      renderItem={({ item }) => <ExpenseItem item={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<Text>No expenses found</Text>}
      bounces={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: theme.spacing.x2,
  },
});

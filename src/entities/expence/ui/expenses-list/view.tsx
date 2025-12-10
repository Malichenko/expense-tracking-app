import { Expense } from "../../model/types";
import { FlatList, StyleSheet, Text } from "react-native";
import { ExpenseItem } from "./components";
import theme from "@shared/config/theme";

interface ExpensesListProps {
  expenses: Expense[];
  onExpensePress: (id: string) => void;
}

export const ExpensesList = ({
  expenses,
  onExpensePress,
}: ExpensesListProps) => {
  return (
    <FlatList
      style={styles.container}
      data={expenses}
      renderItem={({ item }) => (
        <ExpenseItem item={item} onPress={() => onExpensePress(item.id)} />
      )}
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

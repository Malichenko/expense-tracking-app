import { Expense } from "../../model/types";
import { FlatList, StyleSheet } from "react-native";
import { ExpenseItem, NoItems } from "./components";
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
      ListEmptyComponent={<NoItems />}
      bounces={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    gap: theme.spacing.x2,
  },
});

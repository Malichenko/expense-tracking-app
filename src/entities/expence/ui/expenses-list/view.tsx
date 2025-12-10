import { Expense } from "../../model/types";
import { FlatList } from "react-native";
import { ExpenseItem } from "./components";

export const ExpensesList = ({ expenses }: { expenses: Expense[] }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={ExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

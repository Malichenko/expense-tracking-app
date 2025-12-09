import { Expense } from "../../model/types";
import { FlatList, Text } from "react-native";

export const ExpensesList = ({ expenses }: { expenses: Expense[] }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) => <Text>{item.description}</Text>}
    />
  );
};

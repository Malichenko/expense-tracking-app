import { Text, View } from "react-native";
import { ExpenseItemContract } from "./types";
import { numberToCurrencyFormatter } from "@shared/utils";

export const ExpenseItem: ExpenseItemContract = ({ item }) => {
  const formattedAmount = numberToCurrencyFormatter()(item.amount);

  return (
    <View>
      <Text>{item.description}</Text>
      <Text>{formattedAmount}</Text>
    </View>
  );
};

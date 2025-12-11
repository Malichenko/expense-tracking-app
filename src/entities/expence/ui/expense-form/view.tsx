import { View } from "react-native";
import { ExpenseFormContract } from "./types";
import { Input } from "@shared/ui";

export const ExpenseForm: ExpenseFormContract = ({ expense }) => {
  return (
    <View>
      <Input
        label="Description"
        value={expense?.description}
        onChangeText={() => {}}
        placeholder="Enter description"
      />

      <Input
        label="Amount"
        value={expense?.amount?.toString()}
        onChangeText={() => {}}
        placeholder="0.00"
        keyboardType="decimal-pad"
      />

      <Input
        label="Date"
        value={expense?.date?.toISOString()}
        onChangeText={() => {}}
        placeholder="YYYY-MM-DD"
      />
    </View>
  );
};

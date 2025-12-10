import { numberToCurrencyFormatter } from "@shared/utils";
import { Expense } from "../../model/types";
import { View, Text } from "react-native";
import { sumBy, pipe } from "remeda";
import { FC } from "react";

interface ExpenceSummaryProps {
  periodName: string;
  expenses: Expense[];
}

export const ExpenceSummary: FC<ExpenceSummaryProps> = ({
  periodName,
  expenses,
}) => {
  const formattedSum = pipe(
    expenses,
    sumBy(({ amount }) => amount),
    numberToCurrencyFormatter()
  );

  return (
    <View>
      <Text>{periodName}</Text>
      <Text>{formattedSum}</Text>
    </View>
  );
};

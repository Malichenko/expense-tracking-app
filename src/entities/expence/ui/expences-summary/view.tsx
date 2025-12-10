import { numberToCurrencyFormatter } from "@shared/utils/currency";
import { Text, StyleSheet } from "react-native";
import { sumBy, pipe } from "remeda";
import { ExpenceSummaryContract } from "./types";
import { Card } from "@shared/ui";
import theme from "@shared/config/theme";

export const ExpenceSummary: ExpenceSummaryContract = ({
  periodName,
  expenses,
}) => {
  const formattedSum = pipe(
    expenses,
    sumBy(({ amount }) => amount),
    numberToCurrencyFormatter()
  );

  return (
    <Card>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.amount}>{formattedSum}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  period: {
    fontSize: theme.fontSize.sm,
    color: theme.palette.primary[50],
  },
  amount: {
    fontSize: theme.fontSize.base,
    fontWeight: "bold",
    color: theme.palette.primary[70],
  },
});

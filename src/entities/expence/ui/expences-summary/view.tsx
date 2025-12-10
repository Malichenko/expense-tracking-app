import { numberToCurrencyFormatter } from "@shared/utils";
import { View, Text, StyleSheet } from "react-native";
import { sumBy, pipe } from "remeda";
import { ExpenceSummaryContract } from "./types";
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
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.amount}>{formattedSum}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.x2,
    backgroundColor: theme.palette.primary[10],
    borderRadius: theme.spacing.x2,
    elevation: 4,
    shadowColor: theme.palette.shadow.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
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

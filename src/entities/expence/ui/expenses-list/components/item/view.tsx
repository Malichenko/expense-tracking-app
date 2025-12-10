import { Text, View, StyleSheet, Pressable } from "react-native";
import { ExpenseItemContract } from "./types";
import { numberToCurrencyFormatter } from "@shared/utils";
import theme from "@shared/config/theme";
import { format } from "date-fns";
import { Card } from "@shared/ui";

export const ExpenseItem: ExpenseItemContract = ({ item }) => {
  const formattedAmount = numberToCurrencyFormatter()(item.amount);

  return (
    <Pressable>
      <Card style={styles.card}>
        <View style={styles.descriptionBox}>
          <Text style={[styles.textBase, styles.description]}>
            {item.description}
          </Text>
          <Text style={[styles.textBase, styles.date]}>
            {format(item.date, "dd MMM yyyy")}
          </Text>
        </View>

        <View style={styles.amountBox}>
          <Text style={[styles.textBase, styles.amount]}>
            {formattedAmount}
          </Text>
        </View>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: theme.spacing.x3,
  },
  textBase: {
    color: theme.palette.primary[50],
  },
  descriptionBox: {
    gap: theme.spacing.x1,
  },
  description: {
    fontSize: theme.fontSize.base,
    fontWeight: "bold",
  },
  date: {
    fontSize: theme.fontSize.xs,
  },
  amountBox: {
    paddingHorizontal: theme.spacing.x3,
    paddingVertical: theme.spacing.x1,
    backgroundColor: theme.palette.neutral[10],
    borderRadius: theme.spacing.x2,
    justifyContent: "center",
    alignItems: "center",
  },
  amount: {
    fontSize: theme.fontSize.base,
    fontWeight: "bold",
  },
});

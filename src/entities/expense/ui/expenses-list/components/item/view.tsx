import { Text, View, StyleSheet, Pressable } from "react-native";
import { ExpenseItemContract } from "./types";
import { numberToCurrencyFormatter } from "@shared/utils/currency";
import { dateFormatter } from "@shared/utils/date";
import theme from "@shared/config/theme";
import { Card } from "@shared/ui";

export const ExpenseItem: ExpenseItemContract = ({ item, onPress }) => {
  const formattedAmount = numberToCurrencyFormatter()(item.amount);
  const formattedDate = dateFormatter()(item.date);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Card style={styles.card}>
        <View style={styles.descriptionBox}>
          <Text style={[styles.textBase, styles.description]}>
            {item.description}
          </Text>
          <Text style={[styles.textBase, styles.date]}>{formattedDate}</Text>
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
    paddingHorizontal: theme.spacing.x2,
    paddingVertical: theme.spacing.x3,
    backgroundColor: theme.palette.neutral[10],
    borderRadius: theme.spacing.x2,
    justifyContent: "center",
    alignItems: "center",
    minWidth: theme.spacing.x22,
  },
  amount: {
    fontSize: theme.fontSize.base,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
  },
});

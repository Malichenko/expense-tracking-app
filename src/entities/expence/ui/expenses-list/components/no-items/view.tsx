import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import theme from "@shared/config/theme";
import { Card } from "@shared/ui";

export const NoItems = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Ionicons
          name="wallet-outline"
          size={48}
          color={theme.palette.primary[60]}
          accessibilityLabel="No expenses icon"
        />
        <Text style={styles.title}>No expenses recorded</Text>
        <Text style={styles.subtitle}>Tap the plus and add your first one</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "-30%",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.x1,
    padding: theme.spacing.x10,
  },
  title: {
    fontSize: theme.fontSize.base,
    fontWeight: "600",
    color: theme.palette.neutral[90],
  },
  subtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.palette.neutral[70],
  },
});

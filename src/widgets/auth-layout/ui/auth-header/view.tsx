import { View, Text, StyleSheet } from "react-native";
import theme from "@shared/config/theme";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: theme.spacing.x6,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: "bold",
    color: theme.palette.neutral[10],
    marginBottom: theme.spacing.x2,
  },
  subtitle: {
    fontSize: theme.fontSize.base,
    color: theme.palette.neutral[40],
    textAlign: "center",
  },
});

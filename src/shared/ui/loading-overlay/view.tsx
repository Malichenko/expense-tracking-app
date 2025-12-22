import { View, ActivityIndicator, StyleSheet } from "react-native";
import theme from "@shared/config/theme";

export const LoadingOverlay = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.x6,
    backgroundColor: theme.palette.primary[70],
  },
});

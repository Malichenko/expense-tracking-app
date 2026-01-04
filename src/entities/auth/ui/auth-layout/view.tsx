import theme from "@shared/config/theme";
import { FC, PropsWithChildren } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>{children}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.x4,
    paddingVertical: theme.spacing.x4,
  },
});

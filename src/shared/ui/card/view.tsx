import { StyleSheet, View } from "react-native";

import theme from "@shared/config/theme";

import type { CardContract } from "./types";

export const Card: CardContract = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
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
    padding: theme.spacing.x2,
  },
});

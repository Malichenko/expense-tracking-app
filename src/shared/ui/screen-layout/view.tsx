import { type FC } from "react";
import { StyleSheet, View } from "react-native";

import theme from "@shared/config/theme";

import { type ScreenLayoutProps } from "./types";

export const ScreenLayout: FC<ScreenLayoutProps> = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.x3,
    gap: theme.spacing.x4,
    backgroundColor: theme.palette.primary[80],
  },
});

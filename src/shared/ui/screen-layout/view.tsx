import { type FC } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import theme from "@shared/config/theme";

import { type ScreenLayoutProps } from "./types";

export const ScreenLayout: FC<ScreenLayoutProps> = ({
  children,
  style,
  edges = ["top"],
}) => {
  return (
    <SafeAreaView edges={edges} style={[styles.container, style]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.x3,
    gap: theme.spacing.x4,
  },
});

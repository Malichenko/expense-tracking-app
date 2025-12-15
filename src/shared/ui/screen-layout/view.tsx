import { type FC } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import theme from "@shared/config/theme";

import { type ScreenLayoutProps } from "./types";
import { DEFAULT_EDGES, getPadding } from "./lib";

export const ScreenLayout: FC<ScreenLayoutProps> = ({
  children,
  style,
  edges = DEFAULT_EDGES,
  contentContainerStyle,
}) => {
  const insets = useSafeAreaInsets();
  const padding = getPadding(edges, insets);

  return (
    <View style={[styles.container, padding, style]}>
      <View style={[styles.contentContainer, contentContainerStyle]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.primary[60],
  },
  contentContainer: {
    flexGrow: 1,
    padding: theme.spacing.x3,
    gap: theme.spacing.x4,
  },
});

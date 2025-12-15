import { type PropsWithChildren } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { Edge } from "react-native-safe-area-context";

export interface ScreenLayoutProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
  edges?: Edge[];
  contentContainerStyle?: StyleProp<ViewStyle>;
}

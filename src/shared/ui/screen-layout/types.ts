import { type PropsWithChildren } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { type Edges } from "react-native-safe-area-context";

export interface ScreenLayoutProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
  scrollEnabled?: boolean;
  edges?: Edges;
}

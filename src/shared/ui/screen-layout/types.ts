import { type PropsWithChildren } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export interface ScreenLayoutProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}

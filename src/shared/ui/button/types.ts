import type { PropsWithChildren } from "react";
import { type GestureResponderEvent, StyleProp, ViewStyle } from "react-native";

export type Variant = "primary" | "secondary" | "danger";

export interface ButtonProps extends PropsWithChildren {
  onPress: null | ((event: GestureResponderEvent) => void) | undefined;
  variant?: Variant;
  style?: StyleProp<ViewStyle>;
}

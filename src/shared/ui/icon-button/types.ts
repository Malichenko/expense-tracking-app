import type { StyleProp, ViewStyle } from "react-native";
import type { FC } from "react";
import type { Ionicons } from "@expo/vector-icons";

type IconButtonSize = "small" | "medium" | "large";

interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  size?: IconButtonSize;
  color?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export type IconButtonContract = FC<IconButtonProps>;

export type { IconButtonProps, IconButtonSize };

import { type TextStyle, type ViewStyle } from "react-native";

import { styles } from "./styles";
import type { Variant } from "./types";

const BUTTON_MAP: Record<Variant, ViewStyle> = {
  primary: styles.buttonPrimary,
  secondary: styles.buttonSecondary,
  danger: styles.buttonDanger,
  flat: styles.buttonFlat,
};

const TEXT_MAP: Record<Variant, TextStyle> = {
  primary: styles.textPrimary,
  secondary: styles.textSecondary,
  danger: styles.textDanger,
  flat: styles.textFlat,
};

export const getButtonStyle = (variant: Variant): ViewStyle => {
  return BUTTON_MAP[variant];
};

export const getTextStyle = (variant: Variant): TextStyle => {
  return TEXT_MAP[variant];
};

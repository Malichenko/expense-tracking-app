import theme from "@shared/config/theme";

export const ICON_SIZES = {
  small: 20,
  medium: 24,
  large: 32,
} as const;

export const BUTTON_SIZES = {
  small: theme.spacing.x5,
  medium: theme.spacing.x6,
  large: theme.spacing.x8,
} as const;

export const BUTTON_STATES = {
  default: "default",
  pressed: "pressed",
  disabled: "disabled",
} as const;

export const OPACITY = {
  default: 1,
  pressed: 0.7,
  disabled: 0.5,
} as const;

import theme from "@shared/config/theme";

export const ICON_SIZES = {
  small: 24,
  medium: 32,
  large: 40,
} as const;

export const BUTTON_SIZES = {
  small: theme.spacing.x6,
  medium: theme.spacing.x8,
  large: theme.spacing.x10,
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

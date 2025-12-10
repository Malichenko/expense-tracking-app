import {
  Pressable,
  type PressableStateCallbackType,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import theme from "@shared/config/theme";
import type { IconButtonContract } from "./types";
import { ICON_SIZES, BUTTON_SIZES, getButtonState, getOpacity } from "./lib";
import { useCallback } from "react";
import { piped } from "remeda";

export const IconButton: IconButtonContract = ({
  icon,
  onPress,
  size = "medium",
  color = theme.palette.neutral[50],
  disabled = false,
  style,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const iconSize = ICON_SIZES[size];
  const buttonSize = BUTTON_SIZES[size];

  const getOpacityPipe = piped(getButtonState.bind(null, disabled), getOpacity);
  const getStyles = useCallback(
    ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => [
      {
        width: buttonSize,
        height: buttonSize,
        opacity: getOpacityPipe(pressed),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: theme.spacing.x1,
      },
      style,
    ],
    [buttonSize, disabled, style]
  );

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={getStyles}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
    >
      <Ionicons name={icon} size={iconSize} color={color} />
    </Pressable>
  );
};

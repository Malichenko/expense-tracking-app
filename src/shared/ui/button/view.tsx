import { type FC, useRef } from "react";

import { Animated, Pressable, Text } from "react-native";

import { styles } from "./styles";
import type { ButtonProps } from "./types";
import { getButtonStyle, getTextStyle } from "./variants";

export const Button: FC<ButtonProps> = ({
  onPress,
  children,
  variant = "primary",
  style,
  disabled = false,
}) => {
  const opacity = useRef(new Animated.Value(1)).current;

  const fadeToValue = (value: number) => () => {
    Animated.timing(opacity, {
      toValue: value,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const dynamicButtonStyle = getButtonStyle(variant);
  const dynamicTextStyle = getTextStyle(variant);

  return (
    <Pressable
      onPressIn={disabled ? undefined : fadeToValue(0.75)}
      onPressOut={disabled ? undefined : fadeToValue(1)}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    >
      <Animated.View
        style={[
          styles.button,
          dynamicButtonStyle,
          { opacity },
          disabled && styles.disabled,
          style,
        ]}
      >
        <Text style={[styles.text, dynamicTextStyle]}>{children}</Text>
      </Animated.View>
    </Pressable>
  );
};

import { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

import theme from "@shared/config/theme";

import { type InputContract } from "./types";

export const Input: InputContract = ({
  label,
  value,
  onChangeText,
  errorMessage,
  containerStyle,
  inputStyle,
  editable = true,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const { accessibilityLabel, ...inputProps } = rest;
  const resolvedBorderColor = errorMessage
    ? theme.palette.error[50]
    : isFocused
      ? theme.palette.accent[50]
      : theme.palette.primary[20];
  const resolvedBackgroundColor = editable
    ? theme.palette.neutral[10]
    : theme.palette.neutral[20];

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor={theme.palette.neutral[40]}
        accessibilityLabel={accessibilityLabel ?? label}
        style={[
          styles.input,
          {
            borderColor: resolvedBorderColor,
            backgroundColor: resolvedBackgroundColor,
          },
          inputStyle,
        ]}
        {...inputProps}
      />

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.x1,
  },
  label: {
    color: theme.palette.neutral[50],
    fontSize: theme.fontSize.base,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderRadius: theme.spacing.x2,
    paddingVertical: theme.spacing.x2,
    paddingHorizontal: theme.spacing.x3,
    color: theme.palette.neutral[90],
    fontSize: theme.fontSize.base,
  },
  error: {
    color: theme.palette.error[60],
    fontSize: theme.fontSize.sm,
  },
});

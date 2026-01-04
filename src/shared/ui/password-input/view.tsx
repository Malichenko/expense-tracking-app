import { useState, useCallback, useMemo } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

import theme from "@shared/config/theme";

import type { PasswordInputContract } from "./types";
import { createPasswordSchema } from "./lib";

export const PasswordInput: PasswordInputContract = ({
  value,
  onChangeText,
  label,
  placeholder = "Enter your password",
  errorMessage: externalError,
  disabled = false,
  containerStyle,
  inputStyle,
  validateOnChange = true,
  onValidationChange,
  required = false,
  schema: customSchema,
  errorMessages,
  minLength = 6,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalError, setInternalError] = useState<string | undefined>();

  const schema = useMemo(
    () =>
      customSchema ??
      createPasswordSchema({ required, minLength, errorMessages }),
    [customSchema, required, minLength, errorMessages]
  );

  const handleValidation = useCallback(
    (text: string) => {
      if (!validateOnChange) return;

      const result = schema.safeParse(text);

      if (result.success) {
        setInternalError(undefined);
        onValidationChange?.(true);
      } else {
        const firstError = result.error.errors[0]?.message;
        setInternalError(firstError);
        onValidationChange?.(false);
      }
    },
    [validateOnChange, schema, onValidationChange]
  );

  const handleChangeText = useCallback(
    (text: string) => {
      onChangeText(text);
      handleValidation(text);
    },
    [onChangeText, handleValidation]
  );

  const resolvedError = externalError ?? internalError;
  const { accessibilityLabel, ...inputProps } = {
    accessibilityLabel: label,
    autoCapitalize: "none" as const,
    autoComplete: "password-new" as const,
    textContentType: "password" as const,
    secureTextEntry: true,
  };

  const resolvedBorderColor = resolvedError
    ? theme.palette.error[50]
    : isFocused
      ? theme.palette.accent[50]
      : theme.palette.primary[20];
  const resolvedBackgroundColor = disabled
    ? theme.palette.neutral[20]
    : theme.palette.neutral[10];

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TextInput
        value={value}
        onChangeText={handleChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={theme.palette.neutral[40]}
        editable={!disabled}
        style={[
          styles.input,
          {
            borderColor: resolvedBorderColor,
            backgroundColor: resolvedBackgroundColor,
          },
          inputStyle,
        ]}
        accessibilityLabel={accessibilityLabel ?? label}
        {...inputProps}
      />

      {resolvedError ? <Text style={styles.error}>{resolvedError}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.x1,
  },
  label: {
    color: theme.palette.neutral[10],
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

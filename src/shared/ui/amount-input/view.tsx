import { useState, useCallback, useMemo } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

import theme from "@shared/config/theme";

import type { AmountInputContract } from "./types";
import { createAmountSchema } from "./lib";

export const AmountInput: AmountInputContract = ({
  value,
  onChangeText,
  label,
  placeholder = "0.00",
  errorMessage: externalError,
  currencySymbol = "$",
  disabled = false,
  containerStyle,
  inputStyle,
  validateOnChange = true,
  onValidationChange,
  required = false,
  schema: customSchema,
  errorMessages,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalError, setInternalError] = useState<string | undefined>();

  const schema = useMemo(
    () => customSchema ?? createAmountSchema({ required, errorMessages }),
    [customSchema, required, errorMessages]
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

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    handleValidation(value);
  }, [handleValidation, value]);

  const displayError = externalError ?? internalError;

  const borderColor = displayError
    ? theme.palette.error[50]
    : isFocused
      ? theme.palette.accent[50]
      : theme.palette.primary[20];

  const backgroundColor = disabled
    ? theme.palette.neutral[20]
    : theme.palette.neutral[10];

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.inputWrapper,
          { borderColor, backgroundColor },
          disabled && styles.disabled,
        ]}
      >
        <Text style={styles.currencySymbol}>{currencySymbol}</Text>
        <TextInput
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.palette.neutral[40]}
          keyboardType="decimal-pad"
          editable={!disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          accessibilityLabel={label ?? "Amount input"}
          style={[styles.input, inputStyle]}
        />
      </View>

      {displayError ? <Text style={styles.error}>{displayError}</Text> : null}
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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: theme.spacing.x2,
    paddingHorizontal: theme.spacing.x3,
  },
  currencySymbol: {
    color: theme.palette.neutral[50],
    fontSize: theme.fontSize.base,
    fontWeight: "600",
    marginRight: theme.spacing.x1,
  },
  input: {
    flex: 1,
    paddingVertical: theme.spacing.x2,
    color: theme.palette.neutral[90],
    fontSize: theme.fontSize.base,
  },
  disabled: {
    opacity: 0.6,
  },
  error: {
    color: theme.palette.error[60],
    fontSize: theme.fontSize.sm,
  },
});

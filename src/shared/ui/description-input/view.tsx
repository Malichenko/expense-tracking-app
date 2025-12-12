import { useState, useCallback, useMemo } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

import theme from "@shared/config/theme";

import type { DescriptionInputContract } from "./types";
import { createDescriptionSchema, DEFAULT_MAX_LENGTH } from "./lib";

export const DescriptionInput: DescriptionInputContract = ({
  value,
  onChangeText,
  label,
  placeholder = "Enter description",
  errorMessage: externalError,
  maxLength = DEFAULT_MAX_LENGTH,
  minLength,
  showCharacterCount = true,
  numberOfLines = 3,
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
    () =>
      customSchema ??
      createDescriptionSchema({
        required,
        minLength,
        maxLength,
        errorMessages,
      }),
    [customSchema, required, minLength, maxLength, errorMessages]
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
      const truncated = text.slice(0, maxLength);
      onChangeText(truncated);
      handleValidation(truncated);
    },
    [maxLength, onChangeText, handleValidation]
  );

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    handleValidation(value);
  }, [handleValidation, value]);

  const displayError = externalError ?? internalError;
  const characterCount = value.length;
  const isNearLimit = characterCount >= maxLength * 0.9;
  const isAtLimit = characterCount >= maxLength;

  const borderColor = displayError
    ? theme.palette.error[50]
    : isFocused
      ? theme.palette.accent[50]
      : theme.palette.primary[20];

  const backgroundColor = disabled
    ? theme.palette.neutral[20]
    : theme.palette.neutral[10];

  const counterColor = isAtLimit
    ? theme.palette.error[60]
    : isNearLimit
      ? theme.palette.warning[60]
      : theme.palette.neutral[40];

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TextInput
        value={value}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.palette.neutral[40]}
        multiline
        numberOfLines={numberOfLines}
        textAlignVertical="top"
        editable={!disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        accessibilityLabel={label ?? "Description input"}
        style={[
          styles.input,
          { borderColor, backgroundColor, minHeight: numberOfLines * 24 },
          disabled && styles.disabled,
          inputStyle,
        ]}
      />

      <View style={styles.footer}>
        {displayError ? (
          <Text style={styles.error}>{displayError}</Text>
        ) : (
          <View />
        )}

        {showCharacterCount ? (
          <Text style={[styles.counter, { color: counterColor }]}>
            {characterCount}/{maxLength}
          </Text>
        ) : null}
      </View>
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
  disabled: {
    opacity: 0.6,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  error: {
    color: theme.palette.error[60],
    fontSize: theme.fontSize.sm,
    flex: 1,
  },
  counter: {
    fontSize: theme.fontSize.sm,
    textAlign: "right",
  },
});

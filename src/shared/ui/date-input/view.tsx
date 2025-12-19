import { useState, useCallback, useMemo } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Platform,
  Keyboard,
} from "react-native";
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

import theme from "@shared/config/theme";

import type { DateInputContract } from "./types";
import { createDateSchema } from "./lib";
import { dateFormatter } from "@shared/utils/date";

export const DateInput: DateInputContract = ({
  value,
  onChange,
  label,
  placeholder = "Select date",
  errorMessage: externalError,
  minDate,
  maxDate,
  disabled = false,
  containerStyle,
  inputStyle,
  displayFormat,
  locale = "en-US",
  validateOnChange = true,
  onValidationChange,
  required = false,
  schema: customSchema,
  errorMessages,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [internalError, setInternalError] = useState<string | undefined>();

  const schema = useMemo(
    () =>
      customSchema ??
      createDateSchema({ required, minDate, maxDate, errorMessages }),
    [customSchema, required, minDate, maxDate, errorMessages]
  );

  const handleValidation = useCallback(
    (date: Date | null) => {
      if (!validateOnChange) return;

      const result = schema.safeParse(date);

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

  const handlePress = useCallback(() => {
    Keyboard.dismiss();
    if (disabled) return;
    setShowPicker(true);
  }, [disabled]);

  const handleChange = useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      if (Platform.OS === "android") {
        setShowPicker(false);
      }

      if (event.type === "set" && selectedDate) {
        onChange(selectedDate);
        handleValidation(selectedDate);
      }

      if (event.type === "dismissed") {
        setShowPicker(false);
      }
    },
    [onChange, handleValidation]
  );

  const handleIOSConfirm = useCallback(() => {
    setShowPicker(false);
  }, []);

  const displayError = externalError ?? internalError;
  const displayValue = dateFormatter(locale, displayFormat)(value);

  const borderColor = displayError
    ? theme.palette.error[50]
    : theme.palette.primary[20];

  const backgroundColor = disabled
    ? theme.palette.neutral[20]
    : theme.palette.neutral[10];

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <Pressable
        onPress={handlePress}
        disabled={disabled}
        accessibilityLabel={label ?? "Date input"}
        accessibilityRole="button"
        style={[
          styles.inputWrapper,
          { borderColor, backgroundColor },
          disabled && styles.disabled,
          inputStyle,
        ]}
      >
        <Text
          style={[styles.inputText, !displayValue && styles.placeholder]}
          numberOfLines={1}
        >
          {displayValue || placeholder}
        </Text>
        <Ionicons
          name="calendar-outline"
          size={20}
          color={theme.palette.neutral[50]}
        />
      </Pressable>

      {displayError ? <Text style={styles.error}>{displayError}</Text> : null}

      {showPicker && (
        <View>
          {Platform.OS === "ios" ? (
            <View style={styles.iosPickerContainer}>
              <View style={styles.iosPickerHeader}>
                <Pressable onPress={handleIOSConfirm}>
                  <Text style={styles.iosConfirmButton}>Done</Text>
                </Pressable>
              </View>
              <DateTimePicker
                value={value ?? new Date()}
                mode="date"
                display="spinner"
                onChange={handleChange}
                minimumDate={minDate}
                maximumDate={maxDate}
              />
            </View>
          ) : (
            <DateTimePicker
              value={value ?? new Date()}
              mode="date"
              display="default"
              onChange={handleChange}
              minimumDate={minDate}
              maximumDate={maxDate}
            />
          )}
        </View>
      )}
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
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: theme.spacing.x2,
    paddingVertical: theme.spacing.x2,
    paddingHorizontal: theme.spacing.x3,
  },
  inputText: {
    flex: 1,
    color: theme.palette.neutral[90],
    fontSize: theme.fontSize.base,
  },
  placeholder: {
    color: theme.palette.neutral[40],
  },
  disabled: {
    opacity: 0.6,
  },
  error: {
    color: theme.palette.error[60],
    fontSize: theme.fontSize.sm,
  },
  iosPickerContainer: {
    backgroundColor: theme.palette.neutral[10],
    borderRadius: theme.spacing.x2,
    marginTop: theme.spacing.x2,
    overflow: "hidden",
  },
  iosPickerHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: theme.spacing.x3,
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.neutral[30],
  },
  iosConfirmButton: {
    color: theme.palette.accent[50],
    fontSize: theme.fontSize.base,
    fontWeight: "600",
  },
});

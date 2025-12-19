import type { FC } from "react";
import type { StyleProp, ViewStyle, TextStyle } from "react-native";
import type { ZodType } from "zod";

interface DateInputProps {
  value?: Date;
  onChange: (date: Date | null) => void;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  displayFormat?: Intl.DateTimeFormatOptions;
  locale?: Intl.LocalesArgument;
  validateOnChange?: boolean;
  onValidationChange?: (isValid: boolean) => void;
  required?: boolean;
  schema?: ZodType<Date | null>;
  errorMessages?: {
    required?: string;
    minDate?: string;
    maxDate?: string;
  };
}

export type DateInputContract = FC<DateInputProps>;

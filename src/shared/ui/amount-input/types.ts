import type { FC } from "react";
import type { StyleProp, ViewStyle, TextStyle } from "react-native";
import type { ZodType } from "zod";

interface AmountInputProps {
  value: string;
  onChangeText: (value: string) => void;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  currencySymbol?: string;
  maxDecimals?: number;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  validateOnChange?: boolean;
  onValidationChange?: (isValid: boolean) => void;
  required?: boolean;
  schema?: ZodType<string>;
  errorMessages?: {
    required?: string;
    invalid?: string;
    positive?: string;
  };
}

export type AmountInputContract = FC<AmountInputProps>;

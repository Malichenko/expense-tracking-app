import type { FC } from "react";
import type { StyleProp, ViewStyle, TextStyle } from "react-native";
import type { ZodType } from "zod";

interface PasswordInputProps {
  value: string;
  onChangeText: (value: string) => void;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  validateOnChange?: boolean;
  onValidationChange?: (isValid: boolean) => void;
  required?: boolean;
  schema?: ZodType<string>;
  errorMessages?: {
    required?: string;
    minLength?: string;
    uppercase?: string;
    number?: string;
    specialChar?: string;
  };
  minLength?: number;
}

export type PasswordInputContract = FC<PasswordInputProps>;

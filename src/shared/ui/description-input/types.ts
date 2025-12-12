import type { FC } from "react";
import type { StyleProp, ViewStyle, TextStyle } from "react-native";
import type { ZodType } from "zod";

interface DescriptionInputProps {
  value: string;
  onChangeText: (value: string) => void;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  maxLength?: number;
  minLength?: number;
  showCharacterCount?: boolean;
  numberOfLines?: number;
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
    maxLength?: string;
  };
}

export type DescriptionInputContract = FC<DescriptionInputProps>;

import type { FC } from "react";
import type {
  StyleProp,
  TextInputProps as RNTextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";

interface InputProps
  extends Omit<RNTextInputProps, "style" | "onChangeText" | "value"> {
  value?: string;
  label?: string;
  errorMessage?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  onChangeText: (value: string) => void;
}

export type InputContract = FC<InputProps>;

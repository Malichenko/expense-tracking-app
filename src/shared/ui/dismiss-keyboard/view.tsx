import { FC, PropsWithChildren } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export const DismissKeyboard: FC<PropsWithChildren> = ({ children }) => (
  <TouchableWithoutFeedback
    onPress={() => Keyboard.dismiss()}
    accessible={false}
  >
    {children}
  </TouchableWithoutFeedback>
);

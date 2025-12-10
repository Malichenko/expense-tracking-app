import { BUTTON_SIZES, BUTTON_STATES, OPACITY } from "./constants";
import type { IconButtonSize } from "../types";

type ButtonState = keyof typeof BUTTON_STATES;

export const getButtonState = (
  disabled: boolean,
  pressed: boolean
): ButtonState => {
  switch (true) {
    case disabled:
      return BUTTON_STATES.disabled;
    case pressed:
      return BUTTON_STATES.pressed;
    default:
      return BUTTON_STATES.default;
  }
};

export const getOpacity = (state: ButtonState): number => OPACITY[state];

export const getButtonSize = (size: IconButtonSize): number =>
  BUTTON_SIZES[size];

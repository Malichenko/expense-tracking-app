import { BUTTON_SIZES, BUTTON_STATES, OPACITY } from "./constants";
import type { IconButtonSize } from "../types";
import { pipe, conditional } from "remeda";

type ButtonState = keyof typeof BUTTON_STATES;

export const getButtonState = (
  disabled: boolean,
  pressed: boolean
): ButtonState => {
  return pipe(
    [disabled, pressed],
    conditional(
      [([disabled]) => Boolean(disabled), () => BUTTON_STATES.disabled],
      [([, pressed]) => Boolean(pressed), () => BUTTON_STATES.pressed],
      () => BUTTON_STATES.default
    )
  );
};

export const getOpacity = (state: ButtonState): number => OPACITY[state];

export const getButtonSize = (size: IconButtonSize): number =>
  BUTTON_SIZES[size];

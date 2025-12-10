import type { StyleProp, ViewStyle } from "react-native";
import type { FC, PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}

export type CardContract = FC<CardProps>;

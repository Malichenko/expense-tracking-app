import type { ReactNode } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { IconProps } from "../../lib/types";

export const View = ({ color, size }: IconProps): ReactNode => {
  return <Ionicons name="today" size={size} color={color} />;
};

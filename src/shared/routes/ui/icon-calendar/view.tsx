import Ionicons from "@expo/vector-icons/Ionicons";
import type { IconProps } from "../types";

export const View = ({ color, size }: IconProps) => {
  return <Ionicons name="calendar" size={size} color={color} />;
};

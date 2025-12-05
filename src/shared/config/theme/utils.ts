import { Dimensions } from "react-native";

export const getBasesize = () => {
  const { width, height } = Dimensions.get("window");
  return Math.min(width, height);
};

import type { Edge, EdgeInsets } from "react-native-safe-area-context";

export const getPadding = (edges: Edge[], insets: EdgeInsets) => {
  return {
    paddingTop: edges.includes("top") ? insets.top : 0,
    paddingBottom: edges.includes("bottom") ? insets.bottom : 0,
    paddingLeft: edges.includes("left") ? insets.left : 0,
    paddingRight: edges.includes("right") ? insets.right : 0,
  } as const;
};

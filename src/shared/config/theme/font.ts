import { getBasesize } from "./utils";

const DIMENSION_BASE = getBasesize();
const FONT_SIZE_BASE = Math.round(DIMENSION_BASE / 27.5);

export const fontSize = {
  xs: FONT_SIZE_BASE * 0.75,
  sm: FONT_SIZE_BASE * 0.875,
  base: FONT_SIZE_BASE * 1,
  lg: FONT_SIZE_BASE * 1.125,
  xl: FONT_SIZE_BASE * 1.25,
  "2xl": FONT_SIZE_BASE * 1.5,
  "3xl": FONT_SIZE_BASE * 1.875,
  "4xl": FONT_SIZE_BASE * 2.25,
  "5xl": FONT_SIZE_BASE * 3,
  "6xl": FONT_SIZE_BASE * 3.75,
  "7xl": FONT_SIZE_BASE * 4.5,
  "8xl": FONT_SIZE_BASE * 6,
  "9xl": FONT_SIZE_BASE * 8,
} as const;

export const lineHeight = {
  none: 1, // line-height: 1
  tight: 1.25, // line-height: 1.25
  snug: 1.375, // line-height: 1.375
  normal: 1.5, // line-height: 1.5
  relaxed: 1.625, // line-height: 1.625
  loose: 2, // line-height: 2
} as const;

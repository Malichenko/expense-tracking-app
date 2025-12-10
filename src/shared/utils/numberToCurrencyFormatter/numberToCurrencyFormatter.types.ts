export type StringNumericLiteral =
  | `${number}`
  | "Infinity"
  | "-Infinity"
  | "+Infinity";

export type NumberToCurrencyFormatterContract = (
  locale?: Intl.LocalesArgument,
  options?: Intl.NumberFormatOptions
) => (value: number | bigint | StringNumericLiteral) => string;

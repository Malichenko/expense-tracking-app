import { NumberToCurrencyFormatterContract } from "./numberToCurrencyFormatter.types";

export const numberToCurrencyFormatter: NumberToCurrencyFormatterContract =
  (
    locale = "en-US",
    options = {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }
  ) =>
  (value) =>
    Intl.NumberFormat(locale, options).format(value);

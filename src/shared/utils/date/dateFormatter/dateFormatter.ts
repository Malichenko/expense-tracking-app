export const dateFormatter =
  (
    locales: Intl.LocalesArgument = "en-US",
    options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  ) =>
  (date: Date) =>
    Intl.DateTimeFormat(locales, options).format(date);

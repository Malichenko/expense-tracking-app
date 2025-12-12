const DEFAULT_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
};

export const formatDateForDisplay = (
  date: Date | null,
  locale: Intl.LocalesArgument = "en-US",
  options: Intl.DateTimeFormatOptions = DEFAULT_FORMAT_OPTIONS
): string => {
  if (!date) return "";
  return new Intl.DateTimeFormat(locale, options).format(date);
};

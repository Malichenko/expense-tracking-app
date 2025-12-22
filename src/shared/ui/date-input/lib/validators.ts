import { predicatePipe } from "@shared/utils/fp";

type DateValue = Date | null;
type DateWithLimit = readonly [DateValue, Date | undefined];

export const isRequired = (required: boolean) => (value: DateValue) =>
  !required || value !== null;

export const isMinDate = (minDate?: Date) => (value: DateValue) =>
  Boolean(minDate) &&
  predicatePipe<DateWithLimit>(
    ([v]) => v === null,
    ([, min]) => min === undefined,
    ([v, min]) => v === null || min === undefined || v >= min
  )([value, minDate]);

export const isMaxDate = (maxDate?: Date) => (value: DateValue) =>
  Boolean(maxDate) &&
  predicatePipe<DateWithLimit>(
    ([v]) => v === null,
    ([, max]) => max === undefined,
    ([v, max]) => v === null || max === undefined || v <= max
  )([value, maxDate]);

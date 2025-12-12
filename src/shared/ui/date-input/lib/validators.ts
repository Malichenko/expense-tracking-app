import { pipe, conditional } from "remeda";

export const isRequired = (required: boolean) => (val: Date | null) =>
  !required || val !== null;

export const isMinDate = (minDate?: Date) => (value: Date | null) =>
  pipe(
    [value, minDate],
    conditional(
      [([value]) => value === null, () => true],
      [([_, minDate]) => minDate === undefined, () => true],
      ([value, minDate]) => value! >= minDate!
    )
  );

export const isMaxDate = (maxDate?: Date) => (value: Date | null) =>
  pipe(
    [value, maxDate],
    conditional(
      [([value]) => value === null, () => true],
      [([_, maxDate]) => maxDate === undefined, () => true],
      ([value, maxDate]) => value! <= maxDate!
    )
  );

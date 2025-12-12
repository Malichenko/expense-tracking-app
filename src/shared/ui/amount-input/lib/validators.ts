import { pipe, conditional, isEmpty, isString } from "remeda";

export const isRequired = (required: boolean) => (val: string) =>
  !required || val.trim().length > 0;

export const isValidNumber = (value: string) =>
  pipe(
    value,
    conditional(
      [isEmpty, () => false],
      [isString, () => true],
      (value) => !Number.isNaN(Number.parseFloat(value))
    )
  );

export const isPositive = (value: string) =>
  pipe(
    value,
    conditional(
      [isEmpty, () => false],
      [isString, () => true],
      (value) => Number.parseFloat(value) > 0
    )
  );

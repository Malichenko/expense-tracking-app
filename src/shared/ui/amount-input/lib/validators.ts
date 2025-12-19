import { isEmpty, isString } from "remeda";
import { predicatePipe } from "@shared/utils/behaviour";

export const isRequired = (required: boolean) => (value: string) =>
  !required || !isEmpty(value);

type ValidationContract = (value: string) => boolean;

export const isValidNumber: ValidationContract = predicatePipe(
  (value) => !isEmpty(value),
  isString,
  (value) => !Number.isNaN(Number.parseFloat(value))
);

export const isPositive: ValidationContract = predicatePipe(
  (value) => !isEmpty(value),
  isString,
  (value) => Number.parseFloat(value) > 0
);

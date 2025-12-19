import { isEmpty } from "remeda";
import { predicatePipe } from "@shared/utils/behaviour";

export const isRequired = (required: boolean) => (value: string) =>
  !required || !isEmpty(value);

export const isMinLength = (minLength?: number) =>
  predicatePipe<string>(
    (value) =>
      minLength === undefined || !isEmpty(value) || value.length >= minLength
  );

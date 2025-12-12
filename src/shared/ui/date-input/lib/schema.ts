import { z } from "zod";

import { isRequired, isMinDate, isMaxDate } from "./validators";

interface DateSchemaOptions {
  required?: boolean;
  minDate?: Date;
  maxDate?: Date;
  errorMessages?: {
    required?: string;
    minDate?: string;
    maxDate?: string;
  };
}

export const createDateSchema = (options: DateSchemaOptions = {}) => {
  const {
    required = false,
    minDate,
    maxDate,
    errorMessages = {
      required: "Date is required",
      minDate: "Date is too early",
      maxDate: "Date cannot be in the future",
    },
  } = options;

  return z
    .date()
    .nullable()
    .refine(isRequired(required), {
      message: errorMessages.required,
    })
    .refine(isMinDate(minDate), {
      message: errorMessages.minDate,
    })
    .refine(isMaxDate(maxDate), {
      message: errorMessages.maxDate,
    });
};

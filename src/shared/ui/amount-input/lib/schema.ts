import { z } from "zod";

import { isRequired, isValidNumber, isPositive } from "./validators";

interface AmountSchemaOptions {
  required?: boolean;
  errorMessages?: {
    required?: string;
    invalid?: string;
    positive?: string;
  };
}

export const createAmountSchema = (options: AmountSchemaOptions = {}) => {
  const {
    required = false,
    errorMessages = {
      required: "Amount is required",
      invalid: "Amount must be a valid number",
      positive: "Amount must be a positive number",
    },
  } = options;

  return z
    .string()
    .refine(isRequired(required), {
      message: errorMessages.required,
    })
    .refine(isValidNumber, {
      message: errorMessages.invalid,
    })
    .refine(isPositive, {
      message: errorMessages.positive,
    });
};

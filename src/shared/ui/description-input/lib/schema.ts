import { z } from "zod";

import { DEFAULT_MAX_LENGTH } from "./constants";
import { isRequired, isMinLength } from "./validators";
interface DescriptionSchemaOptions {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  errorMessages?: {
    required?: string;
    minLength?: string;
    maxLength?: string;
  };
}

export const createDescriptionSchema = (
  options: DescriptionSchemaOptions = {}
) => {
  const {
    required = false,
    minLength,
    maxLength = DEFAULT_MAX_LENGTH,
    errorMessages = {
      required: "Description is required",
      minLength: `Must be at least ${minLength} characters`,
      maxLength: `Must be less than ${maxLength} characters`,
    },
  } = options;

  return z
    .string()
    .max(maxLength, errorMessages.maxLength)
    .refine(isRequired(required), {
      message: errorMessages.required,
    })
    .refine(isMinLength(minLength), {
      message: errorMessages.minLength,
    });
};

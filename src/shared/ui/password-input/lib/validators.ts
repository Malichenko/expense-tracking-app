import { type ZodString } from "zod";

export const requiredValidator =
  (errorMessage: string) =>
  (schema: ZodString): ZodString =>
    schema.min(1, { message: errorMessage });

export const minLengthValidator =
  (minLength: number, errorMessage: string) =>
  (schema: ZodString): ZodString =>
    schema.min(minLength, { message: errorMessage });

export const uppercaseValidator =
  (errorMessage: string) =>
  (schema: ZodString): ZodString =>
    schema.regex(/[A-Z]/, { message: errorMessage });

export const lowercaseValidator =
  (errorMessage: string) =>
  (schema: ZodString): ZodString =>
    schema.regex(/[a-z]/, { message: errorMessage });

export const numberValidator =
  (errorMessage: string) =>
  (schema: ZodString): ZodString =>
    schema.regex(/[0-9]/, { message: errorMessage });

export const specialCharValidator =
  (errorMessage: string) =>
  (schema: ZodString): ZodString =>
    schema.regex(/[!@#$%^&*(),.?":{}|<>]/, { message: errorMessage });

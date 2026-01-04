import { conditional, pipe } from "remeda";
import { z, type ZodString } from "zod";
import {
  requiredValidator,
  minLengthValidator,
  uppercaseValidator,
  numberValidator,
  specialCharValidator,
} from "./validators";

interface PasswordErrorMessages {
  required: string;
  minLength: string;
  uppercase: string;
  number: string;
  specialChar: string;
}

interface PasswordSchemaOptions {
  required?: boolean;
  minLength?: number;
  errorMessages?: Partial<PasswordErrorMessages>;
}

export const createPasswordSchema = ({
  required = false,
  minLength = 6,
  errorMessages = {
    required: "Password is required",
    minLength: `Password must be at least ${minLength} characters`,
    uppercase: "Password must contain at least 1 uppercase letter",
    number: "Password must contain at least 1 number",
    specialChar: "Password must contain at least 1 special character",
  },
}: PasswordSchemaOptions = {}): ZodString =>
  pipe(
    z.string(),
    minLengthValidator(minLength, errorMessages.minLength!),
    uppercaseValidator(errorMessages.uppercase!),
    numberValidator(errorMessages.number!),
    specialCharValidator(errorMessages.specialChar!),
    conditional([() => required, requiredValidator(errorMessages.required!)])
  );

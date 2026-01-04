import { conditional, pipe } from "remeda";
import { z, type ZodString } from "zod";
import { emailValidator, requiredValidator } from "./validators";

interface EmailErrorMessages {
  required: string;
  invalid: string;
}

interface EmailSchemaOptions {
  required?: boolean;
  errorMessages?: Partial<EmailErrorMessages>;
}

export const createEmailSchema = ({
  required = false,
  errorMessages = {
    required: "Email is required",
    invalid: "Please enter a valid email address",
  },
}: EmailSchemaOptions = {}): ZodString =>
  pipe(
    z.string(),
    emailValidator(errorMessages.invalid!),
    conditional([() => required, requiredValidator(errorMessages.required!)])
  );

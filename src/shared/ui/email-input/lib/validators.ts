import { type ZodString } from "zod";

export const emailValidator = (invalidMsg: string) => (string: ZodString) => {
  return string.email({
    message: invalidMsg,
  });
};

export const requiredValidator =
  ({ required, errorMessage }: { required: boolean; errorMessage: string }) =>
  (string: ZodString) => {
    return required
      ? string.min(1, {
          message: errorMessage,
        })
      : string;
  };

import { type ZodString } from "zod";

export const emailValidator = (invalidMsg: string) => (string: ZodString) => {
  return string.email({
    message: invalidMsg,
  });
};

export const requiredValidator =
  (requiredMsg: string) => (string: ZodString) => {
    return string.min(1, {
      message: requiredMsg,
    });
  };

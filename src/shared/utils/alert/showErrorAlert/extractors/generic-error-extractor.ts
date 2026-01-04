import type { ErrorMessageExtractor } from "../types";

export const genericErrorExtractor: ErrorMessageExtractor = (error) => {
  if (!(error instanceof Error)) {
    return null;
  }

  return `Please try again.\n\n${error.message}`;
};

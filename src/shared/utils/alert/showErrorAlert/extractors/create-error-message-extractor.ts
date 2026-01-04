import { find, isNonNullish, map, pipe } from "remeda";
import type { ErrorMessageExtractor } from "../types";

const DEFAULT_ERROR_MESSAGE = "Please try again.";

type GuaranteedErrorMessageExtractor = (error: unknown) => string;

export const createErrorMessageExtractor =
  (extractors: ErrorMessageExtractor[]): GuaranteedErrorMessageExtractor =>
  (error) =>
    pipe(
      extractors,
      map((extractor) => extractor(error)),
      find(isNonNullish)
    ) ?? DEFAULT_ERROR_MESSAGE;

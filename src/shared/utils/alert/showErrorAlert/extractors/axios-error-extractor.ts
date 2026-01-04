import axios from "axios";
import type { ErrorMessageExtractor } from "../types";

interface FirebaseErrorResponse {
  error?: {
    message?: string;
    code?: number;
  };
}

export const axiosErrorExtractor: ErrorMessageExtractor = (error) => {
  if (!axios.isAxiosError<FirebaseErrorResponse>(error)) {
    return null;
  }

  return error.response?.data?.error?.message ?? error.message;
};

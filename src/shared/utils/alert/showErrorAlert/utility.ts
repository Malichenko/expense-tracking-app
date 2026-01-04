import { Alert } from "react-native";
import {
  axiosErrorExtractor,
  createErrorMessageExtractor,
  genericErrorExtractor,
} from "./extractors";

const extractErrorMessage = createErrorMessageExtractor([
  axiosErrorExtractor,
  genericErrorExtractor,
]);

export const showErrorAlert = (title: string, error: unknown) => {
  const message = extractErrorMessage(error);
  Alert.alert(title, message);
};

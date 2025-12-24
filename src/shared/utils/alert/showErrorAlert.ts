import { Alert } from "react-native";

export const showErrorAlert = (title: string, error: unknown) => {
  const message =
    error instanceof Error
      ? `Please try again.\n\n${error.message}`
      : "Please try again.";

  Alert.alert(title, message);
};

import { Alert, View } from "react-native";

import { Button, EmailInput, PasswordInput } from "@shared/ui";
import { useLoginForm } from "../model/useLoginForm";
import { authApi, authActions } from "@entities/auth";
import { showErrorAlert } from "@shared/utils/alert";
import { useAbortController } from "@shared/hooks";

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const getSignal = useAbortController();
  const {
    email,
    password,
    errors,
    isSubmitting,
    setEmail,
    setPassword,
    handleSubmit,
  } = useLoginForm();

  const onSubmit = async () => {
    try {
      const credentials = await handleSubmit();
      if (credentials) {
        const user = await authApi.login(credentials, { signal: getSignal() });
        authActions.setUser(user);

        Alert.alert("Success", "Logged in successfully!", [
          {
            text: "OK",
            onPress: onSuccess,
          },
        ]);
      }
    } catch (error) {
      showErrorAlert("Login failed", error);
    }
  };

  return (
    <View style={{ gap: 16 }}>
      <EmailInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        errorMessage={errors.email}
        placeholder="Enter your email"
        required
      />

      <PasswordInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        errorMessage={errors.password}
        placeholder="Enter your password"
        required
      />

      <Button
        onPress={onSubmit}
        disabled={isSubmitting}
        style={{ marginTop: 24 }}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </View>
  );
};

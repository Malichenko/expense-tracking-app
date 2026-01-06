import { View } from "react-native";

import { Button, EmailInput, PasswordInput } from "@shared/ui";
import { useLoginForm } from "../model/useLoginForm";
import { loginApi } from "../api";
import { userActions } from "@entities/user";
import { showErrorAlert } from "@shared/utils/alert";
import { useAbortController } from "@shared/hooks";

export const LoginForm = () => {
  const getSignal = useAbortController();
  const {
    email,
    password,
    isFormValid,
    isSubmitting,
    fieldSetter,
    getCredentials,
  } = useLoginForm();

  const onSubmit = async () => {
    const credentials = getCredentials();
    if (!credentials) return;

    fieldSetter.setIsSubmitting(true);

    try {
      const user = await loginApi.login(credentials, { signal: getSignal() });
      userActions.setUser(user);
    } catch (error) {
      showErrorAlert("Login failed", error);
    } finally {
      fieldSetter.setIsSubmitting(false);
    }
  };

  return (
    <View style={{ gap: 16 }}>
      <EmailInput
        label="Email"
        value={email}
        onChangeText={fieldSetter.setEmail}
        onValidationChange={fieldSetter.setEmailValidity}
        placeholder="Enter your email"
        required
      />

      <PasswordInput
        label="Password"
        value={password}
        onChangeText={fieldSetter.setPassword}
        onValidationChange={fieldSetter.setPasswordValidity}
        placeholder="Enter your password"
        required
      />

      <Button
        onPress={onSubmit}
        disabled={isSubmitting || !isFormValid}
        style={{ marginTop: 24 }}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </View>
  );
};

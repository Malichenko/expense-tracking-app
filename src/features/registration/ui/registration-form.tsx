import { View } from "react-native";

import { Button, EmailInput, Input } from "@shared/ui";
import { useRegistrationForm } from "../model/useRegistrationForm";
import { authApi, authActions } from "@entities/auth";
import { showErrorAlert } from "@shared/utils/alert";
import { useAbortController } from "@shared/hooks";

// TODO: Refactor this component to fields etc
export const RegistrationForm = () => {
  const getSignal = useAbortController();
  const {
    email,
    emailConfirmation,
    password,
    confirmPassword,
    errors,
    isSubmitting,
    setEmail,
    setEmailConfirmation,
    setPassword,
    setConfirmPassword,
    setIsSubmitting,
    handleSubmit,
  } = useRegistrationForm();

  const onSubmit = async () => {
    try {
      const credentials = handleSubmit();

      if (credentials) {
        const user = await authApi.register(credentials, {
          signal: getSignal(),
        });
        authActions.setUser(user);
      }
    } catch (error) {
      showErrorAlert("Registration failed", error);
    } finally {
      setIsSubmitting(false);
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

      <EmailInput
        label="Email Confirmation"
        value={emailConfirmation}
        onChangeText={setEmailConfirmation}
        errorMessage={errors.emailConfirmation}
        placeholder="Enter your email confirmation"
        required
      />

      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        errorMessage={errors.password}
        placeholder="Enter your password"
        secureTextEntry
        autoComplete="password-new"
      />

      <Input
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        errorMessage={errors.confirmPassword}
        placeholder="Confirm your password"
        secureTextEntry
        autoComplete="password-new"
      />

      <Button
        onPress={onSubmit}
        disabled={isSubmitting}
        style={{ marginTop: 24 }}
      >
        {isSubmitting ? "Creating Account..." : "Register"}
      </Button>
    </View>
  );
};

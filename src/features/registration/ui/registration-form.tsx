import { View } from "react-native";

import { Button, EmailInput, PasswordInput } from "@shared/ui";
import { useRegistrationForm } from "../model/useRegistrationForm";
import { registrationApi } from "../api";
import { userActions } from "@entities/user";
import { showErrorAlert } from "@shared/utils/alert";
import { useAbortController } from "@shared/hooks";

export const RegistrationForm = () => {
  const getSignal = useAbortController();
  const {
    email,
    emailConfirmation,
    password,
    confirmPassword,
    emailConfirmationError,
    confirmPasswordError,
    isFormValid,
    isSubmitting,
    setField,
    getCredentials,
  } = useRegistrationForm();

  const onSubmit = async () => {
    const credentials = getCredentials();
    if (!credentials) return;

    setField.isSubmitting(true);

    try {
      const user = await registrationApi.register(credentials, {
        signal: getSignal(),
      });
      userActions.setUser(user);
    } catch (error) {
      showErrorAlert("Registration failed", error);
    } finally {
      setField.isSubmitting(false);
    }
  };

  return (
    <View style={{ gap: 16 }}>
      <EmailInput
        label="Email"
        value={email}
        onChangeText={setField.email}
        onValidationChange={setField.validity.email}
        placeholder="Enter your email"
        required
      />

      <EmailInput
        label="Email Confirmation"
        value={emailConfirmation}
        onChangeText={setField.emailConfirmation}
        errorMessage={emailConfirmationError}
        placeholder="Confirm your email"
      />

      <PasswordInput
        label="Password"
        value={password}
        onChangeText={setField.password}
        onValidationChange={setField.validity.password}
        placeholder="Enter your password"
        required
      />

      <PasswordInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setField.confirmPassword}
        onValidationChange={setField.validity.confirmPassword}
        errorMessage={confirmPasswordError}
        placeholder="Confirm your password"
      />

      <Button
        onPress={onSubmit}
        disabled={isSubmitting || !isFormValid}
        style={{ marginTop: 24 }}
      >
        {isSubmitting ? "Creating Account..." : "Register"}
      </Button>
    </View>
  );
};

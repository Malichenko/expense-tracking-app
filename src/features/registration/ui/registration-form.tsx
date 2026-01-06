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
    setEmail,
    setEmailConfirmation,
    setPassword,
    setConfirmPassword,
    setEmailValidity,
    setPasswordValidity,
    setIsSubmitting,
    getCredentials,
  } = useRegistrationForm();

  const onSubmit = async () => {
    const credentials = getCredentials();
    if (!credentials) return;

    setIsSubmitting(true);

    try {
      const user = await registrationApi.register(credentials, {
        signal: getSignal(),
      });
      userActions.setUser(user);
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
        onValidationChange={setEmailValidity}
        placeholder="Enter your email"
        required
      />

      <EmailInput
        label="Email Confirmation"
        value={emailConfirmation}
        onChangeText={setEmailConfirmation}
        errorMessage={emailConfirmationError}
        placeholder="Confirm your email"
      />

      <PasswordInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        onValidationChange={setPasswordValidity}
        placeholder="Enter your password"
        required
      />

      <PasswordInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        errorMessage={confirmPasswordError}
        placeholder="Confirm your password"
        validateOnChange={false}
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

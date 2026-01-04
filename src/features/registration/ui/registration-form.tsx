import { Alert, View } from "react-native";

import { Button, EmailInput, Input } from "@shared/ui";
import { useRegistrationForm } from "../model/useRegistrationForm";
import { authApi, authActions } from "@entities/auth";
import { showErrorAlert } from "@shared/utils/alert";

interface RegistrationFormProps {
  onSuccess?: () => void;
}
// TODO: Refactor this component to fields etc
export const RegistrationForm = ({ onSuccess }: RegistrationFormProps) => {
  const {
    email,
    password,
    confirmPassword,
    displayName,
    errors,
    isSubmitting,
    setEmail,
    setPassword,
    setConfirmPassword,
    setDisplayName,
    handleSubmit,
  } = useRegistrationForm();

  const onSubmit = async () => {
    try {
      const credentials = handleSubmit();

      if (credentials) {
        const user = await authApi.register(credentials);
        authActions.setUser(user);

        Alert.alert("Success", "Account created successfully!", [
          {
            text: "OK",
            onPress: onSuccess,
          },
        ]);
      }
    } catch (error) {
      showErrorAlert("Registration failed", error);
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

      <Input
        label="Display Name (Optional)"
        value={displayName}
        onChangeText={setDisplayName}
        errorMessage={errors.displayName}
        placeholder="Enter your display name"
        autoCapitalize="words"
        autoComplete="name"
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

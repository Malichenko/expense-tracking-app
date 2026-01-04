import { useState } from "react";

import { RegistrationCredentials } from "@entities/auth";

interface RegistrationFormState {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  errors: {
    email?: string;
    password?: string;
    confirmPassword?: string;
    displayName?: string;
  };
  isSubmitting: boolean;
}

export const useRegistrationForm = () => {
  const [state, setState] = useState<RegistrationFormState>({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
    errors: {},
    isSubmitting: false,
  });

  const validateForm = (): boolean => {
    const errors: RegistrationFormState["errors"] = {};

    if (!state.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!state.password.trim()) {
      errors.password = "Password is required";
    } else if (state.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!state.confirmPassword.trim()) {
      errors.confirmPassword = "Please confirm your password";
    } else if (state.password !== state.confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
    }

    if (state.displayName.trim() && state.displayName.trim().length < 2) {
      errors.displayName = "Display name must be at least 2 characters";
    }

    setState((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const setField = (
    field: keyof Omit<RegistrationFormState, "errors" | "isSubmitting">,
    value: string
  ) => {
    setState((prev) => ({
      ...prev,
      [field]: value,
      errors: { ...prev.errors, [field]: undefined },
    }));
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setState((prev) => ({ ...prev, isSubmitting: true }));

    const credentials: RegistrationCredentials = {
      email: state.email.trim(),
      password: state.password,
      displayName: state.displayName.trim() || undefined,
    };

    return credentials;
  };

  return {
    email: state.email,
    password: state.password,
    confirmPassword: state.confirmPassword,
    displayName: state.displayName,
    errors: state.errors,
    isSubmitting: state.isSubmitting,
    setEmail: (email: string) => setField("email", email),
    setPassword: (password: string) => setField("password", password),
    setConfirmPassword: (confirmPassword: string) =>
      setField("confirmPassword", confirmPassword),
    setDisplayName: (displayName: string) =>
      setField("displayName", displayName),
    handleSubmit,
  };
};

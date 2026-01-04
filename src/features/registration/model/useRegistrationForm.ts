import { useState } from "react";

import { RegistrationCredentials } from "@entities/auth";

interface RegistrationFormState {
  email: string;
  emailConfirmation: string;
  password: string;
  confirmPassword: string;
  errors: {
    email?: string;
    emailConfirmation?: string;
    password?: string;
    confirmPassword?: string;
  };
  isSubmitting: boolean;
}

export const useRegistrationForm = () => {
  const [state, setState] = useState<RegistrationFormState>({
    email: "",
    emailConfirmation: "",
    password: "",
    confirmPassword: "",
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

    if (
      state.emailConfirmation.trim() &&
      state.emailConfirmation.trim() !== state.email
    ) {
      errors.emailConfirmation = "Email confirmation must match the email";
    }

    setState((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const setField = <Field extends keyof Omit<RegistrationFormState, "errors">>(
    field: Field,
    value: RegistrationFormState[Field]
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
    };

    return credentials;
  };

  return {
    email: state.email,
    password: state.password,
    confirmPassword: state.confirmPassword,
    emailConfirmation: state.emailConfirmation,
    errors: state.errors,
    isSubmitting: state.isSubmitting,
    setEmail: (email: string) => setField("email", email),
    setPassword: (password: string) => setField("password", password),
    setIsSubmitting: (isSubmitting: boolean) =>
      setField("isSubmitting", isSubmitting),
    setConfirmPassword: (confirmPassword: string) =>
      setField("confirmPassword", confirmPassword),
    setEmailConfirmation: (emailConfirmation: string) =>
      setField("emailConfirmation", emailConfirmation),
    handleSubmit,
  };
};

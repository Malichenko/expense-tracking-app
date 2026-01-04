import { useState } from "react";

import { LoginCredentials } from "@entities/auth";

interface LoginFormState {
  email: string;
  password: string;
  errors: {
    email?: string;
    password?: string;
  };
  isSubmitting: boolean;
}

export const useLoginForm = () => {
  const [state, setState] = useState<LoginFormState>({
    email: "",
    password: "",
    errors: {},
    isSubmitting: false,
  });

  const validateForm = (): boolean => {
    const errors: LoginFormState["errors"] = {};

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

    setState((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const setField = <
    Field extends keyof Pick<
      LoginFormState,
      "email" | "password" | "isSubmitting"
    >,
  >(
    field: Field,
    value: LoginFormState[Field]
  ) => {
    setState((prev) => ({
      ...prev,
      [field]: value,
      errors: { ...prev.errors, [field]: undefined },
    }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      const credentials: LoginCredentials = {
        email: state.email.trim(),
        password: state.password,
      };

      return credentials;
    } catch (error) {
      setState((prev) => ({ ...prev, isSubmitting: false }));
      throw error;
    }
  };

  return {
    email: state.email,
    password: state.password,
    errors: state.errors,
    isSubmitting: state.isSubmitting,
    setEmail: (email: string) => setField("email", email),
    setPassword: (password: string) => setField("password", password),
    setIsSubmitting: (isSubmitting: boolean) =>
      setField("isSubmitting", isSubmitting),
    handleSubmit,
  };
};

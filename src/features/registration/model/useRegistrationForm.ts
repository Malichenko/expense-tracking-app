import { useCallback, useMemo, useState } from "react";

import type { RegistrationCredentials } from "./types";

interface RegistrationFormState {
  email: string;
  emailConfirmation: string;
  password: string;
  confirmPassword: string;
  validity: {
    email: boolean;
    emailConfirmation: boolean;
    password: boolean;
    confirmPassword: boolean;
  };
  isSubmitting: boolean;
}

export const useRegistrationForm = () => {
  const [state, setState] = useState<RegistrationFormState>({
    email: "",
    emailConfirmation: "",
    password: "",
    confirmPassword: "",
    validity: {
      email: false,
      emailConfirmation: true,
      password: false,
      confirmPassword: false,
    },
    isSubmitting: false,
  });

  const emailConfirmationError = useMemo(() => {
    if (!state.emailConfirmation.trim()) return undefined;
    if (state.emailConfirmation.trim() !== state.email.trim()) {
      return "Email confirmation must match";
    }
    return undefined;
  }, [state.email, state.emailConfirmation]);

  const confirmPasswordError = useMemo(() => {
    if (!state.confirmPassword.trim()) return "Please confirm your password";
    if (state.password !== state.confirmPassword) {
      return "Passwords don't match";
    }
    return undefined;
  }, [state.password, state.confirmPassword]);

  const isFormValid =
    state.validity.email &&
    state.validity.password &&
    !emailConfirmationError &&
    !confirmPasswordError;

  const setEmail = useCallback((email: string) => {
    setState((prev) => ({ ...prev, email }));
  }, []);

  const setEmailConfirmation = useCallback((emailConfirmation: string) => {
    setState((prev) => ({ ...prev, emailConfirmation }));
  }, []);

  const setPassword = useCallback((password: string) => {
    setState((prev) => ({ ...prev, password }));
  }, []);

  const setConfirmPassword = useCallback((confirmPassword: string) => {
    setState((prev) => ({ ...prev, confirmPassword }));
  }, []);

  const setEmailValidity = useCallback((isValid: boolean) => {
    setState((prev) => ({
      ...prev,
      validity: { ...prev.validity, email: isValid },
    }));
  }, []);

  const setPasswordValidity = useCallback((isValid: boolean) => {
    setState((prev) => ({
      ...prev,
      validity: { ...prev.validity, password: isValid },
    }));
  }, []);

  const setIsSubmitting = useCallback((isSubmitting: boolean) => {
    setState((prev) => ({ ...prev, isSubmitting }));
  }, []);

  const getCredentials = useCallback((): RegistrationCredentials | null => {
    if (!isFormValid) return null;

    return {
      email: state.email.trim(),
      password: state.password,
    };
  }, [isFormValid, state.email, state.password]);

  return {
    email: state.email,
    emailConfirmation: state.emailConfirmation,
    password: state.password,
    confirmPassword: state.confirmPassword,
    emailConfirmationError,
    confirmPasswordError,
    isFormValid,
    isSubmitting: state.isSubmitting,
    setEmail,
    setEmailConfirmation,
    setPassword,
    setConfirmPassword,
    setEmailValidity,
    setPasswordValidity,
    setIsSubmitting,
    getCredentials,
  };
};

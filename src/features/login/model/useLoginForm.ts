import { useCallback, useMemo, useState } from "react";

import type { LoginCredentials } from "./types";
import { values } from "remeda";

interface LoginFormState {
  email: string;
  password: string;
  validity: {
    email: boolean;
    password: boolean;
  };
  isSubmitting: boolean;
}

export const useLoginForm = () => {
  const [state, setState] = useState<LoginFormState>({
    email: "",
    password: "",
    validity: { email: false, password: false },
    isSubmitting: false,
  });

  const isFormValid = values(state.validity).every(Boolean);

  const fieldSetter = useMemo(
    () => ({
      setEmail: (email: string) => setState((prev) => ({ ...prev, email })),
      setPassword: (password: string) =>
        setState((prev) => ({ ...prev, password })),
      setIsSubmitting: (isSubmitting: boolean) =>
        setState((prev) => ({ ...prev, isSubmitting })),
      setEmailValidity: (isValid: boolean) =>
        setState((prev) => ({
          ...prev,
          validity: { ...prev.validity, email: isValid },
        })),
      setPasswordValidity: (isValid: boolean) =>
        setState((prev) => ({
          ...prev,
          validity: { ...prev.validity, password: isValid },
        })),
    }),
    []
  );

  const getCredentials = useCallback((): LoginCredentials | null => {
    if (!isFormValid) return null;

    return {
      email: state.email.trim(),
      password: state.password,
    };
  }, [isFormValid, state.email, state.password]);

  return {
    email: state.email,
    password: state.password,
    isFormValid,
    isSubmitting: state.isSubmitting,
    fieldSetter,
    getCredentials,
  };
};

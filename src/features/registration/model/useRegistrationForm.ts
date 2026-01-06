import { produce } from "immer";
import { useCallback, useMemo, useState } from "react";
import { setPath } from "remeda";

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

type PathsOf<T, Prefix extends readonly string[] = []> = T extends object
  ? {
      [K in keyof T & string]:
        | readonly [...Prefix, K]
        | PathsOf<T[K], readonly [...Prefix, K]>;
    }[keyof T & string]
  : never;

type ValueAtPath<T, P extends readonly string[]> = P extends readonly [
  infer Head extends keyof T,
  ...infer Rest extends readonly string[],
]
  ? Rest extends []
    ? T[Head]
    : ValueAtPath<T[Head], Rest>
  : never;

export const useRegistrationForm = () => {
  const [state, setState] = useState<RegistrationFormState>({
    email: "",
    emailConfirmation: "",
    password: "",
    confirmPassword: "",
    validity: {
      email: false,
      emailConfirmation: false,
      password: false,
      confirmPassword: false,
    },
    isSubmitting: false,
  });

  const emailConfirmationError = useMemo(() => {
    if (state.emailConfirmation.trim() !== state.email.trim()) {
      return "Email confirmation must match";
    }

    return;
  }, [state.email, state.emailConfirmation]);

  const confirmPasswordError = useMemo(() => {
    if (state.password !== state.confirmPassword) {
      return "Passwords don't match";
    }

    return;
  }, [state.password, state.confirmPassword]);

  const isFormValid =
    state.validity.email &&
    state.validity.password &&
    !emailConfirmationError &&
    !confirmPasswordError;

  const _setField = useCallback(
    <Path extends PathsOf<RegistrationFormState>>(
      path: Path,
      value: ValueAtPath<RegistrationFormState, Path>
    ) => {
      setState(produce((draft) => setPath(draft, path, value)));
    },
    []
  );

  const setField = useMemo(
    () => ({
      email(email: string) {
        _setField(["email"], email);
      },
      emailConfirmation(emailConfirmation: string) {
        _setField(["emailConfirmation"], emailConfirmation);
      },
      password(password: string) {
        _setField(["password"], password);
      },
      confirmPassword(confirmPassword: string) {
        _setField(["confirmPassword"], confirmPassword);
      },
      isSubmitting(isSubmitting: boolean) {
        _setField(["isSubmitting"], isSubmitting);
      },
      validity: {
        email(isValid: boolean) {
          _setField(["validity", "email"], isValid);
        },
        emailConfirmation(isValid: boolean) {
          _setField(["validity", "emailConfirmation"], isValid);
        },
        password(isValid: boolean) {
          _setField(["validity", "password"], isValid);
        },
        confirmPassword(isValid: boolean) {
          _setField(["validity", "confirmPassword"], isValid);
        },
      },
    }),
    [_setField]
  );

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
    setField,
    getCredentials,
  };
};

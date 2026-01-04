export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
  photoURL: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationCredentials {
  email: string;
  password: string;
  displayName?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AsyncOptions {
  signal?: AbortSignal;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  reset: () => void;
  fetchCurrentUser: (options?: AsyncOptions) => Promise<void>;
}

export interface AuthStore extends AuthState {
  actions: AuthActions;
}

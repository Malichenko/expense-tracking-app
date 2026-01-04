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
  logout: () => Promise<void>;
  fetchCurrentUser: (options?: AsyncOptions) => Promise<void>;
}

export interface AuthStore extends AuthState {
  actions: AuthActions;
}

export interface FirebaseAuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export interface FirebaseRefreshResponse {
  expires_in: string;
  token_type: string;
  refresh_token: string;
  id_token: string;
  user_id: string;
  project_id: string;
}

export interface FirebaseLookupUser {
  localId: string;
  email: string;
  emailVerified: boolean;
  displayName?: string;
  photoUrl?: string;
}

export interface FirebaseLookupResponse {
  users: FirebaseLookupUser[];
}

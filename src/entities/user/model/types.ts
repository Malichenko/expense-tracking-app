import type { AsyncOptions } from "@shared/api";

export interface User {
  uid: string;
  email: string | null;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface UserActions {
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  reset: () => void;
  fetchCurrentUser: (options?: AsyncOptions) => Promise<void>;
}

export interface UserStore extends UserState {
  actions: UserActions;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface FirebaseAuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
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

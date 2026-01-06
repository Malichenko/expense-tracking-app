import type { FirebaseAuthResponse } from "./types";

export interface MappedFirebaseUser {
  uid: string;
  email: string;
  displayName: null;
  emailVerified: false;
  photoURL: null;
}

export const mapFirebaseUserToUser = (
  response: FirebaseAuthResponse
): MappedFirebaseUser => ({
  uid: response.localId,
  email: response.email,
  displayName: null,
  emailVerified: false,
  photoURL: null,
});

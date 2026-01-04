import { User, FirebaseAuthResponse } from "../../model/types";

export const mapFirebaseUserToUser = (
  response: FirebaseAuthResponse
): User => ({
  uid: response.localId,
  email: response.email,
  displayName: null,
  emailVerified: false,
  photoURL: null,
});

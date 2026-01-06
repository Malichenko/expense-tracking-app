import type { User } from "../model/types";

interface FirebaseUserData {
  localId: string;
  email: string;
}

export const mapFirebaseToUser = <T extends FirebaseUserData>(
  data: T
): User => ({
  uid: data.localId,
  email: data.email,
});
